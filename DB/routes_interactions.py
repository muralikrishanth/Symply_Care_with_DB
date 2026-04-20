import requests
from flask import Blueprint, request, jsonify

interactions_bp = Blueprint("interactions", __name__)

# ─────────────────────────────────────────────────────────────
# SOURCE 1: NLM RxNav Interaction API (most reliable free source)
# ─────────────────────────────────────────────────────────────

def get_rxcui(drug_name):
    """
    Convert drug name to RxNorm RXCUI.
    Tries exact match first, then approximate.
    """
    try:
        # Try exact match first
        url = "https://rxnav.nlm.nih.gov/REST/rxcui.json"
        res = requests.get(url, params={"name": drug_name, "search": 1}, timeout=8)
        if res.status_code == 200:
            ids = res.json().get("idGroup", {}).get("rxnormId", [])
            if ids:
                return ids[0], drug_name

        # Try approximate match
        url2 = "https://rxnav.nlm.nih.gov/REST/approximateTerm.json"
        res2 = requests.get(url2, params={"term": drug_name, "maxEntries": 1}, timeout=8)
        if res2.status_code == 200:
            candidates = res2.json().get("approximateGroup", {}).get("candidate", [])
            if candidates:
                rxcui = candidates[0].get("rxcui")
                name = candidates[0].get("name", drug_name)
                return rxcui, name

        return None, drug_name

    except Exception:
        return None, drug_name


def check_nlm(drug1, drug2):
    """
    Check interactions using NLM RxNav Interaction API.
    Uses RXCUI-based lookup — most accurate free source.
    """
    try:
        rxcui1, resolved1 = get_rxcui(drug1)
        rxcui2, resolved2 = get_rxcui(drug2)

        if not rxcui1:
            return {
                "status": "drug_not_found",
                "source": "NLM RxNorm",
                "drug1": drug1,
                "drug2": drug2,
                "message": (
                    f"Could not find '{drug1}' in the NLM drug database. "
                    f"Check the spelling or try the generic name."
                )
            }

        if not rxcui2:
            return {
                "status": "drug_not_found",
                "source": "NLM RxNorm",
                "drug1": drug1,
                "drug2": drug2,
                "message": (
                    f"Could not find '{drug2}' in the NLM drug database. "
                    f"Check the spelling or try the generic name."
                )
            }

        # Check interactions for drug1 against all known interactions
        url = "https://rxnav.nlm.nih.gov/REST/interaction/interaction.json"
        res = requests.get(url, params={"rxcui": rxcui1, "sources": "DrugBank"}, timeout=8)

        if res.status_code not in (200, 404):
            return None

        if res.status_code == 200:
            data = res.json()
            for group in data.get("interactionTypeGroup", []):
                for itype in group.get("interactionType", []):
                    for pair in itype.get("interactionPair", []):
                        concepts = pair.get("interactionConcept", [])
                        pair_rxcuis = [
                            c.get("minConceptItem", {}).get("rxcui", "")
                            for c in concepts
                        ]
                        if rxcui2 in pair_rxcuis:
                            severity = pair.get("severity", "unknown").upper()
                            description = pair.get("description", "Interaction found.")
                            return {
                                "status": "interaction_found",
                                "source": "NLM DrugBank",
                                "drug1": resolved1,
                                "drug2": resolved2,
                                "severity": severity,
                                "message": description
                            }

        # Try without source filter as fallback
        res2 = requests.get(url, params={"rxcui": rxcui1}, timeout=8)
        if res2.status_code == 200:
            data2 = res2.json()
            for group in data2.get("interactionTypeGroup", []):
                for itype in group.get("interactionType", []):
                    for pair in itype.get("interactionPair", []):
                        concepts = pair.get("interactionConcept", [])
                        pair_rxcuis = [
                            c.get("minConceptItem", {}).get("rxcui", "")
                            for c in concepts
                        ]
                        if rxcui2 in pair_rxcuis:
                            severity = pair.get("severity", "unknown").upper()
                            description = pair.get("description", "Interaction found.")
                            source = group.get("sourceDisclaimer", "NLM RxNav")
                            return {
                                "status": "interaction_found",
                                "source": source,
                                "drug1": resolved1,
                                "drug2": resolved2,
                                "severity": severity,
                                "message": description
                            }

        # Both drugs found in NLM but no interaction between them
        return {
            "status": "no_data",
            "source": "NLM RxNav",
            "drug1": resolved1,
            "drug2": resolved2,
            "message": None
        }

    except requests.exceptions.ConnectionError:
        return {"status": "network_error", "source": "NLM", "drug1": drug1, "drug2": drug2}
    except requests.exceptions.Timeout:
        return {"status": "timeout", "source": "NLM", "drug1": drug1, "drug2": drug2}
    except Exception:
        return None


# ─────────────────────────────────────────────────────────────
# SOURCE 2: OpenFDA — drug_interactions field only (strict)
# ─────────────────────────────────────────────────────────────

def check_openfda(drug1, drug2):
    """
    Check OpenFDA but ONLY search the drug_interactions field,
    and verify drug2 actually appears in that section.
    Avoids false positives from unrelated label sections.
    """
    try:
        # Search drug1's label for drug2 in the interactions field specifically
        url = "https://api.fda.gov/drug/label.json"
        params = {
            "search": f'openfda.generic_name:"{drug1.lower()}" AND drug_interactions:"{drug2.lower()}"',
            "limit": 3
        }
        res = requests.get(url, params=params, timeout=8)

        if res.status_code == 404:
            # Try reverse — search drug2's label for drug1
            params2 = {
                "search": f'openfda.generic_name:"{drug2.lower()}" AND drug_interactions:"{drug1.lower()}"',
                "limit": 3
            }
            res = requests.get(url, params=params2, timeout=8)

        if res.status_code == 404:
            return {
                "status": "no_data",
                "source": "OpenFDA",
                "drug1": drug1,
                "drug2": drug2,
                "message": None
            }

        if res.status_code != 200:
            return None

        data = res.json()
        results = data.get("results", [])

        for result in results:
            interaction_sections = result.get("drug_interactions", [])
            for section in interaction_sections:
                # Verify drug2 is actually mentioned in this specific section
                if drug2.lower() in section.lower():
                    # Extract just the relevant sentence
                    sentences = section.split(".")
                    relevant = [
                        s.strip() for s in sentences
                        if drug2.lower() in s.lower()
                    ]
                    excerpt = ". ".join(relevant[:2]).strip()
                    if excerpt:
                        return {
                            "status": "interaction_found",
                            "source": "OpenFDA Drug Label (drug_interactions section)",
                            "drug1": drug1,
                            "drug2": drug2,
                            "severity": "UNKNOWN",
                            "message": (
                                f"The official drug label for {drug1} mentions "
                                f"{drug2} in its interactions section: \"{excerpt}.\""
                            )
                        }

        return {
            "status": "no_data",
            "source": "OpenFDA",
            "drug1": drug1,
            "drug2": drug2,
            "message": None
        }

    except requests.exceptions.ConnectionError:
        return {"status": "network_error", "source": "OpenFDA", "drug1": drug1, "drug2": drug2}
    except requests.exceptions.Timeout:
        return {"status": "timeout", "source": "OpenFDA", "drug1": drug1, "drug2": drug2}
    except Exception:
        return None


# ─────────────────────────────────────────────────────────────
# SOURCE 3: DailyMed — official FDA labels last resort
# ─────────────────────────────────────────────────────────────

def check_dailymed(drug1, drug2):
    """
    Search DailyMed for drug1's label and check if drug2
    appears specifically in the drug interactions section.
    """
    try:
        # Search for drug1's label
        url = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json"
        res = requests.get(url, params={"drug_name": drug1, "pagesize": 1}, timeout=8)

        if res.status_code != 200:
            return None

        items = res.json().get("data", [])
        if not items:
            return {
                "status": "no_data",
                "source": "DailyMed",
                "drug1": drug1,
                "drug2": drug2,
                "message": None
            }

        set_id = items[0].get("setid", "")
        label_url = f"https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/{set_id}.json"
        label_res = requests.get(label_url, timeout=8)

        if label_res.status_code != 200:
            return None

        label_data = label_res.json()

        # Look specifically in drug interactions sections
        sections = label_data.get("data", {}).get("sections", [])
        for section in sections:
            title = section.get("title", "").lower()
            content = section.get("text", "").lower()
            if "interaction" in title and drug2.lower() in content:
                return {
                    "status": "interaction_found",
                    "source": "DailyMed (FDA Official Labels)",
                    "drug1": drug1,
                    "drug2": drug2,
                    "severity": "UNKNOWN",
                    "message": (
                        f"The official FDA label for {drug1} mentions "
                        f"{drug2} in its drug interactions section. "
                        f"Please consult your pharmacist for full details."
                    )
                }

        return {
            "status": "no_data",
            "source": "DailyMed",
            "drug1": drug1,
            "drug2": drug2,
            "message": None
        }

    except requests.exceptions.ConnectionError:
        return {"status": "network_error", "source": "DailyMed", "drug1": drug1, "drug2": drug2}
    except requests.exceptions.Timeout:
        return {"status": "timeout", "source": "DailyMed", "drug1": drug1, "drug2": drug2}
    except Exception:
        return None


# ─────────────────────────────────────────────────────────────
# MAIN CHECKER — runs all 3 sources in order
# ─────────────────────────────────────────────────────────────

def check_all_sources(drug1, drug2):
    sources_tried = []
    errors = []

    # ── Source 1: NLM ──────────────────────────────────────
    nlm_result = check_nlm(drug1, drug2)
    sources_tried.append("NLM RxNav")

    if nlm_result:
        if nlm_result["status"] == "interaction_found":
            nlm_result["sources_tried"] = sources_tried
            return nlm_result
        if nlm_result["status"] == "drug_not_found":
            nlm_result["sources_tried"] = sources_tried
            return nlm_result
        if nlm_result["status"] in ("network_error", "timeout"):
            errors.append(f"NLM ({nlm_result['status']})")

    # ── Source 2: OpenFDA ──────────────────────────────────
    fda_result = check_openfda(drug1, drug2)
    sources_tried.append("OpenFDA")

    if fda_result:
        if fda_result["status"] == "interaction_found":
            fda_result["sources_tried"] = sources_tried
            return fda_result
        if fda_result["status"] in ("network_error", "timeout"):
            errors.append(f"OpenFDA ({fda_result['status']})")

    # ── Source 3: DailyMed ─────────────────────────────────
    dm_result = check_dailymed(drug1, drug2)
    sources_tried.append("DailyMed")

    if dm_result:
        if dm_result["status"] == "interaction_found":
            dm_result["sources_tried"] = sources_tried
            return dm_result
        if dm_result["status"] in ("network_error", "timeout"):
            errors.append(f"DailyMed ({dm_result['status']})")

    # ── All sources failed with errors ─────────────────────
    if len(errors) == 3:
        return {
            "status": "all_sources_failed",
            "drug1": drug1,
            "drug2": drug2,
            "sources_tried": sources_tried,
            "message": (
                f"All 3 databases failed to respond while checking "
                f"{drug1} and {drug2}. "
                f"Do NOT assume they are safe — consult your pharmacist."
            )
        }

    # ── No interaction found in any source ─────────────────
    return {
        "status": "no_data",
        "drug1": drug1,
        "drug2": drug2,
        "sources_tried": sources_tried,
        "message": (
            f"No interaction data found for {drug1} and {drug2} "
            f"across all {len(sources_tried)} databases "
            f"({', '.join(sources_tried)}). "
            f"This does NOT confirm they are safe to combine. "
            f"Always consult your pharmacist."
        )
    }


# ─────────────────────────────────────────────────────────────
# FLASK ROUTE
# ─────────────────────────────────────────────────────────────

@interactions_bp.route("/api/interactions", methods=["GET"])
def get_interactions():
    meds_param = request.args.get("meds", "")
    med_names = [m.strip() for m in meds_param.split(",") if m.strip()]

    if len(med_names) < 2:
        return jsonify({
            "results": [],
            "disclaimer": "Please add at least 2 medications to check for interactions."
        })

    results = []
    for i in range(len(med_names)):
        for j in range(i + 1, len(med_names)):
            result = check_all_sources(med_names[i], med_names[j])
            results.append(result)

    return jsonify({
        "results": results,
        "disclaimer": (
            "⚠️ IMPORTANT: This checker queries NLM RxNav, OpenFDA, and "
            "DailyMed as a best-effort check only. It is NOT a substitute "
            "for professional medical advice. Always consult your doctor or "
            "pharmacist before combining any medications."
        )
    })