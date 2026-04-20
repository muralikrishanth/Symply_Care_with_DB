const TRANSLATIONS = {
  en: {
    dir: "ltr",
    flag: "🇬🇧",
    label: "English",
    // Header
    appName: "Symply",
    today: "Today",
    // Bottom nav
    navSymptoms: "Symptoms",
    navMood: "Mood",
    navMeds: "Meds",
    navExport: "Export",
    // Symptoms page
    logSymptom: "Log a symptom",
    symptomName: "Symptom name",
    symptomPlaceholder: "e.g. Headache, Nausea, Back pain...",
    severity: "Severity",
    mild: "Mild",
    severe: "Severe",
    notes: "Notes (optional)",
    notesPlaceholder: "When did it start? What makes it better or worse?",
    saveSymptom: "Save symptom",
    recentSymptoms: "Recent symptoms",
    noSymptoms: "No symptoms logged yet.",
    // Mood page
    howFeeling: "How are you feeling today?",
    mood: "Mood",
    energy: "Energy level",
    drained: "Drained",
    energetic: "Energetic",
    saveCheckin: "Save check-in",
    recentCheckins: "Recent check-ins",
    noCheckins: "No check-ins logged yet.",
    moodLabels: ["", "Terrible", "Bad", "Okay", "Good", "Great"],
    moodEmojis: ["", "😞", "😕", "😐", "🙂", "😄"],
    // Medications page
    addMedication: "Add a medication",
    medName: "Medication name",
    medNamePlaceholder: "Start typing e.g. Ibu...",
    dose: "Dose",
    dosePlaceholder: "e.g. 400mg, 1 tablet...",
    frequency: "Frequency",
    freqOptions: ["Once daily", "Twice daily", "Three times daily", "Every 4 hours", "As needed"],
    saveMedication: "Add medication",
    interactionChecker: "Interaction checker",
    interactionDesc: "Checks your current medications for dangerous combinations.",
    checkInteractions: "Check interactions ⚠️",
    checking: "⏳ Checking NLM → OpenFDA → DailyMed... please wait.",
    currentMeds: "Current medications",
    noMeds: "No medications added yet.",
    stopMed: "Stop",
    since: "Since",
    // Export page
    exportTitle: "Export for doctor visit",
    exportDesc: "Generate a PDF summary of your symptoms, mood, and medications to share with your doctor.",
    fromDate: "From date",
    toDate: "To date",
    downloadPdf: "Download PDF 📄",
    yourStats: "Your stats",
    symptomsLogged: "Symptoms logged",
    avgSeverity: "Avg severity",
    checkins: "Check-ins",
    avgMood: "Avg mood",
    // PDF
    pdfTitle: "Symply — Health Report",
    pdfPeriod: "Report period",
    pdfGenerated: "Generated",
    pdfDisclaimer: "This report is for informational purposes only and does not constitute medical advice. Always consult your doctor or healthcare provider.",
    pdfMeds: "Current Medications",
    pdfSymptoms: "Symptoms Log",
    pdfMood: "Mood & Energy Log",
    pdfNoMeds: "No medications recorded.",
    pdfNoSymptoms: "No symptoms recorded in this period.",
    pdfNoMood: "No mood entries recorded in this period.",
    pdfMedName: "Medication",
    pdfDose: "Dose",
    pdfFrequency: "Frequency",
    pdfSince: "Since",
    pdfDate: "Date",
    pdfSymptom: "Symptom",
    pdfSeverity: "Severity",
    pdfNotes: "Notes",
    pdfMoodCol: "Mood",
    pdfEnergy: "Energy",
    // Severity labels
    sevMild: "Mild",
    sevModerate: "Moderate",
    sevSevere: "Severe",
    // Toast messages
    toastSymptomSaved: "✅ Symptom saved!",
    toastCheckinSaved: "✅ Check-in saved!",
    toastMedSaved: "✅ Medication added!",
    toastMedRemoved: "Medication removed",
    toastSymptomRemoved: "Symptom removed",
    toastMoodRemoved: "Mood entry removed",
    toastError: "❌ Something went wrong",
    toastEnterSymptom: "Please enter a symptom name",
    toastEnterMed: "Please enter a medication name",
    toastSelectDate: "Please select a date range",
    toastGenerating: "⏳ Generating PDF...",
    // Interaction messages
    interactionDisclaimer: "⚠️ IMPORTANT: This checker queries NLM, OpenFDA, and DailyMed as a best-effort check only. It is NOT a substitute for professional medical advice. Always consult your doctor or pharmacist before combining any medications.",
    interactionNetworkError: "Could not reach any interaction database. Do NOT assume your medications are safe to combine. Please consult your pharmacist or doctor directly.",
    interactionAdd2: "Add at least 2 medications to check for interactions.",
    noAutoComplete: "No matches — try the generic name (e.g. ibuprofen not Nurofen)",
    notSpecified: "Not specified",
    translationNote: "⚠️ Translations may vary. Medical terms are kept in English for accuracy.",
  },

  de: {
    dir: "ltr",
    flag: "🇩🇪",
    label: "Deutsch",
    appName: "Symply",
    today: "Heute",
    navSymptoms: "Symptome",
    navMood: "Stimmung",
    navMeds: "Medikamente",
    navExport: "Export",
    logSymptom: "Symptom erfassen",
    symptomName: "Symptomname",
    symptomPlaceholder: "z.B. Kopfschmerzen, Übelkeit...",
    severity: "Schweregrad",
    mild: "Leicht",
    severe: "Schwer",
    notes: "Notizen (optional)",
    notesPlaceholder: "Wann hat es angefangen? Was hilft?",
    saveSymptom: "Symptom speichern",
    recentSymptoms: "Letzte Symptome",
    noSymptoms: "Noch keine Symptome erfasst.",
    howFeeling: "Wie fühlen Sie sich heute?",
    mood: "Stimmung",
    energy: "Energieniveau",
    drained: "Erschöpft",
    energetic: "Energiegeladen",
    saveCheckin: "Check-in speichern",
    recentCheckins: "Letzte Check-ins",
    noCheckins: "Noch keine Check-ins erfasst.",
    moodLabels: ["", "Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"],
    moodEmojis: ["", "😞", "😕", "😐", "🙂", "😄"],
    addMedication: "Medikament hinzufügen",
    medName: "Medikamentenname",
    medNamePlaceholder: "Tippen Sie z.B. Ibu...",
    dose: "Dosis",
    dosePlaceholder: "z.B. 400mg, 1 Tablette...",
    frequency: "Häufigkeit",
    freqOptions: ["Einmal täglich", "Zweimal täglich", "Dreimal täglich", "Alle 4 Stunden", "Bei Bedarf"],
    saveMedication: "Medikament hinzufügen",
    interactionChecker: "Wechselwirkungsprüfung",
    interactionDesc: "Prüft Ihre aktuellen Medikamente auf gefährliche Kombinationen.",
    checkInteractions: "Wechselwirkungen prüfen ⚠️",
    checking: "⏳ Prüfe NLM → OpenFDA → DailyMed... bitte warten.",
    currentMeds: "Aktuelle Medikamente",
    noMeds: "Noch keine Medikamente hinzugefügt.",
    stopMed: "Stopp",
    since: "Seit",
    exportTitle: "Export für Arztbesuch",
    exportDesc: "Erstellen Sie eine PDF-Zusammenfassung Ihrer Symptome, Stimmung und Medikamente.",
    fromDate: "Von Datum",
    toDate: "Bis Datum",
    downloadPdf: "PDF herunterladen 📄",
    yourStats: "Ihre Statistiken",
    symptomsLogged: "Erfasste Symptome",
    avgSeverity: "Ø Schweregrad",
    checkins: "Check-ins",
    avgMood: "Ø Stimmung",
    pdfTitle: "Symply — Gesundheitsbericht",
    pdfPeriod: "Berichtszeitraum",
    pdfGenerated: "Erstellt",
    pdfDisclaimer: "Dieser Bericht dient nur zu Informationszwecken und stellt keine medizinische Beratung dar. Konsultieren Sie immer Ihren Arzt.",
    pdfMeds: "Aktuelle Medikamente",
    pdfSymptoms: "Symptomprotokoll",
    pdfMood: "Stimmungs- & Energieprotokoll",
    pdfNoMeds: "Keine Medikamente erfasst.",
    pdfNoSymptoms: "Keine Symptome in diesem Zeitraum erfasst.",
    pdfNoMood: "Keine Stimmungseinträge in diesem Zeitraum erfasst.",
    pdfMedName: "Medikament",
    pdfDose: "Dosis",
    pdfFrequency: "Häufigkeit",
    pdfSince: "Seit",
    pdfDate: "Datum",
    pdfSymptom: "Symptom",
    pdfSeverity: "Schweregrad",
    pdfNotes: "Notizen",
    pdfMoodCol: "Stimmung",
    pdfEnergy: "Energie",
    sevMild: "Leicht",
    sevModerate: "Mittel",
    sevSevere: "Schwer",
    toastSymptomSaved: "✅ Symptom gespeichert!",
    toastCheckinSaved: "✅ Check-in gespeichert!",
    toastMedSaved: "✅ Medikament hinzugefügt!",
    toastMedRemoved: "Medikament entfernt",
    toastSymptomRemoved: "Symptom entfernt",
    toastMoodRemoved: "Stimmungseintrag entfernt",
    toastError: "❌ Etwas ist schiefgelaufen",
    toastEnterSymptom: "Bitte Symptomname eingeben",
    toastEnterMed: "Bitte Medikamentenname eingeben",
    toastSelectDate: "Bitte Datumsbereich auswählen",
    toastGenerating: "⏳ PDF wird erstellt...",
    interactionDisclaimer: "⚠️ WICHTIG: Diese Prüfung ist nur eine Orientierungshilfe. Sie ersetzt KEINE professionelle medizinische Beratung. Konsultieren Sie immer Ihren Arzt oder Apotheker.",
    interactionNetworkError: "Keine Verbindung zur Datenbank. Nehmen Sie NICHT an, dass Ihre Medikamente sicher kombinierbar sind. Bitte konsultieren Sie Ihren Apotheker.",
    interactionAdd2: "Fügen Sie mindestens 2 Medikamente hinzu, um Wechselwirkungen zu prüfen.",
    noAutoComplete: "Keine Treffer — versuchen Sie den Wirkstoffnamen",
    notSpecified: "Nicht angegeben",
    translationNote: "⚠️ Übersetzungen können variieren. Medizinische Begriffe werden zur Genauigkeit auf Englisch belassen.",
  },

  fr: {
    dir: "ltr",
    flag: "🇫🇷",
    label: "Français",
    appName: "Symply",
    today: "Aujourd'hui",
    navSymptoms: "Symptômes",
    navMood: "Humeur",
    navMeds: "Médicaments",
    navExport: "Export",
    logSymptom: "Enregistrer un symptôme",
    symptomName: "Nom du symptôme",
    symptomPlaceholder: "ex. Maux de tête, Nausées...",
    severity: "Sévérité",
    mild: "Léger",
    severe: "Sévère",
    notes: "Notes (optionnel)",
    notesPlaceholder: "Quand a-t-il commencé? Qu'est-ce qui aide?",
    saveSymptom: "Enregistrer le symptôme",
    recentSymptoms: "Symptômes récents",
    noSymptoms: "Aucun symptôme enregistré.",
    howFeeling: "Comment vous sentez-vous aujourd'hui?",
    mood: "Humeur",
    energy: "Niveau d'énergie",
    drained: "Épuisé",
    energetic: "Énergique",
    saveCheckin: "Enregistrer",
    recentCheckins: "Bilans récents",
    noCheckins: "Aucun bilan enregistré.",
    moodLabels: ["", "Terrible", "Mauvais", "Correct", "Bien", "Très bien"],
    moodEmojis: ["", "😞", "😕", "😐", "🙂", "😄"],
    addMedication: "Ajouter un médicament",
    medName: "Nom du médicament",
    medNamePlaceholder: "Commencez à taper ex. Ibu...",
    dose: "Dose",
    dosePlaceholder: "ex. 400mg, 1 comprimé...",
    frequency: "Fréquence",
    freqOptions: ["Une fois par jour", "Deux fois par jour", "Trois fois par jour", "Toutes les 4 heures", "Si nécessaire"],
    saveMedication: "Ajouter le médicament",
    interactionChecker: "Vérificateur d'interactions",
    interactionDesc: "Vérifie vos médicaments actuels pour des combinaisons dangereuses.",
    checkInteractions: "Vérifier les interactions ⚠️",
    checking: "⏳ Vérification NLM → OpenFDA → DailyMed... veuillez patienter.",
    currentMeds: "Médicaments actuels",
    noMeds: "Aucun médicament ajouté.",
    stopMed: "Arrêter",
    since: "Depuis",
    exportTitle: "Export pour visite médicale",
    exportDesc: "Générez un résumé PDF de vos symptômes, humeur et médicaments.",
    fromDate: "Date de début",
    toDate: "Date de fin",
    downloadPdf: "Télécharger le PDF 📄",
    yourStats: "Vos statistiques",
    symptomsLogged: "Symptômes enregistrés",
    avgSeverity: "Sévérité moyenne",
    checkins: "Bilans",
    avgMood: "Humeur moyenne",
    pdfTitle: "Symply — Rapport de Santé",
    pdfPeriod: "Période du rapport",
    pdfGenerated: "Généré le",
    pdfDisclaimer: "Ce rapport est fourni à titre informatif uniquement et ne constitue pas un avis médical. Consultez toujours votre médecin.",
    pdfMeds: "Médicaments actuels",
    pdfSymptoms: "Journal des symptômes",
    pdfMood: "Journal humeur & énergie",
    pdfNoMeds: "Aucun médicament enregistré.",
    pdfNoSymptoms: "Aucun symptôme enregistré pour cette période.",
    pdfNoMood: "Aucune entrée d'humeur pour cette période.",
    pdfMedName: "Médicament",
    pdfDose: "Dose",
    pdfFrequency: "Fréquence",
    pdfSince: "Depuis",
    pdfDate: "Date",
    pdfSymptom: "Symptôme",
    pdfSeverity: "Sévérité",
    pdfNotes: "Notes",
    pdfMoodCol: "Humeur",
    pdfEnergy: "Énergie",
    sevMild: "Léger",
    sevModerate: "Modéré",
    sevSevere: "Sévère",
    toastSymptomSaved: "✅ Symptôme enregistré!",
    toastCheckinSaved: "✅ Bilan enregistré!",
    toastMedSaved: "✅ Médicament ajouté!",
    toastMedRemoved: "Médicament supprimé",
    toastSymptomRemoved: "Symptôme supprimé",
    toastMoodRemoved: "Entrée d'humeur supprimée",
    toastError: "❌ Une erreur s'est produite",
    toastEnterSymptom: "Veuillez entrer un nom de symptôme",
    toastEnterMed: "Veuillez entrer un nom de médicament",
    toastSelectDate: "Veuillez sélectionner une plage de dates",
    toastGenerating: "⏳ Génération du PDF...",
    interactionDisclaimer: "⚠️ IMPORTANT: Ce vérificateur utilise NLM, OpenFDA et DailyMed à titre indicatif uniquement. Ce n'est PAS un substitut à un avis médical professionnel.",
    interactionNetworkError: "Impossible de contacter la base de données. Ne supposez PAS que vos médicaments sont sûrs à combiner. Consultez votre pharmacien.",
    interactionAdd2: "Ajoutez au moins 2 médicaments pour vérifier les interactions.",
    noAutoComplete: "Aucun résultat — essayez le nom générique",
    notSpecified: "Non spécifié",
    translationNote: "⚠️ Les traductions peuvent varier. Les termes médicaux sont conservés en anglais pour plus de précision.",
  },

  ar: {
    dir: "rtl",
    flag: "🇸🇦",
    label: "عربي",
    appName: "Symply",
    today: "اليوم",
    navSymptoms: "الأعراض",
    navMood: "المزاج",
    navMeds: "الأدوية",
    navExport: "تصدير",
    logSymptom: "تسجيل عرض",
    symptomName: "اسم العرض",
    symptomPlaceholder: "مثال: صداع، غثيان...",
    severity: "الشدة",
    mild: "خفيف",
    severe: "شديد",
    notes: "ملاحظات (اختياري)",
    notesPlaceholder: "متى بدأ؟ ما الذي يساعد؟",
    saveSymptom: "حفظ العرض",
    recentSymptoms: "الأعراض الأخيرة",
    noSymptoms: "لم يتم تسجيل أي أعراض بعد.",
    howFeeling: "كيف تشعر اليوم؟",
    mood: "المزاج",
    energy: "مستوى الطاقة",
    drained: "منهك",
    energetic: "نشيط",
    saveCheckin: "حفظ",
    recentCheckins: "آخر الفحوصات",
    noCheckins: "لم يتم تسجيل أي فحوصات بعد.",
    moodLabels: ["", "سيء جداً", "سيء", "مقبول", "جيد", "ممتاز"],
    moodEmojis: ["", "😞", "😕", "😐", "🙂", "😄"],
    addMedication: "إضافة دواء",
    medName: "اسم الدواء",
    medNamePlaceholder: "ابدأ الكتابة...",
    dose: "الجرعة",
    dosePlaceholder: "مثال: 400 مجم، قرص واحد...",
    frequency: "التكرار",
    freqOptions: ["مرة يومياً", "مرتين يومياً", "ثلاث مرات يومياً", "كل 4 ساعات", "عند الحاجة"],
    saveMedication: "إضافة الدواء",
    interactionChecker: "فاحص التفاعلات الدوائية",
    interactionDesc: "يفحص أدويتك الحالية بحثاً عن تركيبات خطيرة.",
    checkInteractions: "فحص التفاعلات ⚠️",
    checking: "⏳ جارٍ الفحص... يرجى الانتظار.",
    currentMeds: "الأدوية الحالية",
    noMeds: "لم تتم إضافة أي أدوية بعد.",
    stopMed: "إيقاف",
    since: "منذ",
    exportTitle: "تصدير لزيارة الطبيب",
    exportDesc: "إنشاء ملخص PDF لمشاركته مع طبيبك.",
    fromDate: "من تاريخ",
    toDate: "إلى تاريخ",
    downloadPdf: "تحميل PDF 📄",
    yourStats: "إحصائياتك",
    symptomsLogged: "الأعراض المسجلة",
    avgSeverity: "متوسط الشدة",
    checkins: "الفحوصات",
    avgMood: "متوسط المزاج",
    pdfTitle: "Symply — تقرير صحي",
    pdfPeriod: "فترة التقرير",
    pdfGenerated: "تاريخ الإنشاء",
    pdfDisclaimer: "هذا التقرير لأغراض إعلامية فقط ولا يشكل نصيحة طبية. استشر دائماً طبيبك.",
    pdfMeds: "الأدوية الحالية",
    pdfSymptoms: "سجل الأعراض",
    pdfMood: "سجل المزاج والطاقة",
    pdfNoMeds: "لم يتم تسجيل أي أدوية.",
    pdfNoSymptoms: "لم يتم تسجيل أي أعراض في هذه الفترة.",
    pdfNoMood: "لم يتم تسجيل أي إدخالات مزاج في هذه الفترة.",
    pdfMedName: "الدواء",
    pdfDose: "الجرعة",
    pdfFrequency: "التكرار",
    pdfSince: "منذ",
    pdfDate: "التاريخ",
    pdfSymptom: "العرض",
    pdfSeverity: "الشدة",
    pdfNotes: "ملاحظات",
    pdfMoodCol: "المزاج",
    pdfEnergy: "الطاقة",
    sevMild: "خفيف",
    sevModerate: "متوسط",
    sevSevere: "شديد",
    toastSymptomSaved: "✅ تم حفظ العرض!",
    toastCheckinSaved: "✅ تم حفظ الفحص!",
    toastMedSaved: "✅ تمت إضافة الدواء!",
    toastMedRemoved: "تم إزالة الدواء",
    toastSymptomRemoved: "تم إزالة العرض",
    toastMoodRemoved: "تم حذف إدخال المزاج",
    toastError: "❌ حدث خطأ ما",
    toastEnterSymptom: "يرجى إدخال اسم العرض",
    toastEnterMed: "يرجى إدخال اسم الدواء",
    toastSelectDate: "يرجى تحديد نطاق التاريخ",
    toastGenerating: "⏳ جارٍ إنشاء PDF...",
    interactionDisclaimer: "⚠️ مهم: هذا الفاحص يستخدم NLM وOpenFDA وDailyMed كفحص استرشادي فقط. إنه ليس بديلاً عن المشورة الطبية المتخصصة. استشر دائماً طبيبك أو الصيدلاني.",
    interactionNetworkError: "تعذر الوصول إلى قاعدة البيانات. لا تفترض أن أدويتك آمنة للدمج. يرجى استشارة الصيدلاني مباشرة.",
    interactionAdd2: "أضف دواءين على الأقل للتحقق من التفاعلات.",
    noAutoComplete: "لا توجد نتائج — جرب الاسم الجنيسي للدواء",
    notSpecified: "غير محدد",
    translationNote: "⚠️ قد تتفاوت الترجمات. تُبقى المصطلحات الطبية بالإنجليزية لضمان الدقة.",
  },

es: {
    dir: "ltr",
    flag: "🇪🇸",
    label: "Español",
    appName: "Symply",
    today: "Hoy",
    navSymptoms: "Síntomas",
    navMood: "Ánimo",
    navMeds: "Medicamentos",
    navExport: "Exportar",
    logSymptom: "Registrar síntoma",
    symptomName: "Nombre del síntoma",
    symptomPlaceholder: "ej. Dolor de cabeza, Náuseas...",
    severity: "Gravedad",
    mild: "Leve",
    severe: "Grave",
    notes: "Notas (opcional)",
    notesPlaceholder: "¿Cuándo empezó? ¿Qué ayuda?",
    saveSymptom: "Guardar síntoma",
    recentSymptoms: "Síntomas recientes",
    noSymptoms: "No hay síntomas registrados.",
    howFeeling: "¿Cómo te sientes hoy?",
    mood: "Ánimo",
    energy: "Nivel de energía",
    drained: "Agotado",
    energetic: "Enérgico",
    saveCheckin: "Guardar",
    recentCheckins: "Registros recientes",
    noCheckins: "No hay registros aún.",
    moodLabels: ["", "Terrible", "Malo", "Regular", "Bien", "Excelente"],
    moodEmojis: ["", "😞", "😕", "😐", "🙂", "😄"],
    addMedication: "Añadir medicamento",
    medName: "Nombre del medicamento",
    medNamePlaceholder: "Empieza a escribir ej. Ibu...",
    dose: "Dosis",
    dosePlaceholder: "ej. 400mg, 1 comprimido...",
    frequency: "Frecuencia",
    freqOptions: ["Una vez al día", "Dos veces al día", "Tres veces al día", "Cada 4 horas", "Según necesidad"],
    saveMedication: "Añadir medicamento",
    interactionChecker: "Verificador de interacciones",
    interactionDesc: "Verifica sus medicamentos actuales en busca de combinaciones peligrosas.",
    checkInteractions: "Verificar interacciones ⚠️",
    checking: "⏳ Verificando NLM → OpenFDA → DailyMed... por favor espere.",
    currentMeds: "Medicamentos actuales",
    noMeds: "No hay medicamentos añadidos.",
    stopMed: "Detener",
    since: "Desde",
    exportTitle: "Exportar para visita médica",
    exportDesc: "Genere un resumen PDF para compartir con su médico.",
    fromDate: "Fecha de inicio",
    toDate: "Fecha de fin",
    downloadPdf: "Descargar PDF 📄",
    yourStats: "Sus estadísticas",
    symptomsLogged: "Síntomas registrados",
    avgSeverity: "Gravedad media",
    checkins: "Registros",
    avgMood: "Ánimo medio",
    pdfTitle: "Symply — Informe de Salud",
    pdfPeriod: "Periodo del informe",
    pdfGenerated: "Generado",
    pdfDisclaimer: "Este informe es solo informativo y no constituye consejo médico. Siempre consulte a su médico.",
    pdfMeds: "Medicamentos actuales",
    pdfSymptoms: "Registro de síntomas",
    pdfMood: "Registro de ánimo y energía",
    pdfNoMeds: "No hay medicamentos registrados.",
    pdfNoSymptoms: "No hay síntomas registrados en este período.",
    pdfNoMood: "No hay entradas de ánimo en este período.",
    pdfMedName: "Medicamento",
    pdfDose: "Dosis",
    pdfFrequency: "Frecuencia",
    pdfSince: "Desde",
    pdfDate: "Fecha",
    pdfSymptom: "Síntoma",
    pdfSeverity: "Gravedad",
    pdfNotes: "Notas",
    pdfMoodCol: "Ánimo",
    pdfEnergy: "Energía",
    sevMild: "Leve",
    sevModerate: "Moderado",
    sevSevere: "Grave",
    toastSymptomSaved: "✅ ¡Síntoma guardado!",
    toastCheckinSaved: "✅ ¡Registro guardado!",
    toastMedSaved: "✅ ¡Medicamento añadido!",
    toastMedRemoved: "Medicamento eliminado",
    toastSymptomRemoved: "Síntoma eliminado",
    toastMoodRemoved: "Entrada de ánimo eliminada",
    toastError: "❌ Algo salió mal",
    toastEnterSymptom: "Por favor ingrese un nombre de síntoma",
    toastEnterMed: "Por favor ingrese un nombre de medicamento",
    toastSelectDate: "Por favor seleccione un rango de fechas",
    toastGenerating: "⏳ Generando PDF...",
    interactionDisclaimer: "⚠️ IMPORTANTE: Este verificador usa NLM, OpenFDA y DailyMed solo como referencia. NO sustituye el consejo médico profesional. Consulte siempre a su médico o farmacéutico.",
    interactionNetworkError: "No se pudo conectar a la base de datos. NO asuma que sus medicamentos son seguros de combinar. Consulte a su farmacéutico directamente.",
    interactionAdd2: "Añada al menos 2 medicamentos para verificar interacciones.",
    noAutoComplete: "Sin resultados — pruebe el nombre genérico",
    notSpecified: "No especificado",
    translationNote: "⚠️ Las traducciones pueden variar. Los términos médicos se mantienen en inglés para mayor precisión.",
}
};

// Get current language or default to English
function getLang() {
  return localStorage.getItem("appLang") || "en";
}

// Get current translation object
function t() {
  return TRANSLATIONS[getLang()] || TRANSLATIONS["en"];
}

// Apply language to entire app
function applyLanguage(langCode) {
  const lang = TRANSLATIONS[langCode] || TRANSLATIONS["en"];
  localStorage.setItem("appLang", langCode);

  // Set text direction for Arabic
  document.documentElement.dir = lang.dir;
  document.documentElement.lang = langCode;

  // Header
  document.getElementById("app-name").textContent = "🩺 " + lang.appName;

  // Bottom nav
  document.getElementById("nav-symptoms").textContent = lang.navSymptoms;
  document.getElementById("nav-mood").textContent = lang.navMood;
  document.getElementById("nav-meds").textContent = lang.navMeds;
  document.getElementById("nav-export").textContent = lang.navExport;

  // Symptoms page
  document.getElementById("lbl-log-symptom").textContent = lang.logSymptom;
  document.getElementById("lbl-symptom-name").textContent = lang.symptomName;
  document.getElementById("symptom-name").placeholder = lang.symptomPlaceholder;
  // Rebuild severity label preserving current slider value
  const sevVal = document.getElementById("severity-slider").value;
  document.getElementById("lbl-severity").innerHTML =
    `${lang.severity}: <span id="severity-label">${sevVal}</span>/10`;
  document.getElementById("severity-val").textContent = sevVal;
  document.getElementById("lbl-mild").textContent = lang.mild;
  document.getElementById("lbl-severe").textContent = lang.severe;
  document.getElementById("lbl-symptom-notes").textContent = lang.notes;
  document.getElementById("symptom-notes").placeholder = lang.notesPlaceholder;
  document.getElementById("btn-save-symptom").textContent = lang.saveSymptom;
  document.getElementById("lbl-recent-symptoms").textContent = lang.recentSymptoms;

  // Mood page
  document.getElementById("lbl-how-feeling").textContent = lang.howFeeling;
  document.getElementById("lbl-mood").textContent = lang.mood;
  // Rebuild energy label preserving current slider value
  const energyVal = document.getElementById("energy-slider").value;
  document.getElementById("lbl-energy").innerHTML =
    `${lang.energy}: <span id="energy-label">${energyVal}</span>/10`;
  document.getElementById("energy-val").textContent = energyVal;
  document.getElementById("lbl-drained").textContent = lang.drained;
  document.getElementById("lbl-energetic").textContent = lang.energetic;
  document.getElementById("lbl-mood-notes").textContent = lang.notes;
  document.getElementById("mood-notes").placeholder = lang.notesPlaceholder;
  document.getElementById("btn-save-checkin").textContent = lang.saveCheckin;
  document.getElementById("lbl-recent-checkins").textContent = lang.recentCheckins;

  // Medications page
  document.getElementById("lbl-add-medication").textContent = lang.addMedication;
  document.getElementById("lbl-med-name").textContent = lang.medName;
  document.getElementById("med-name").placeholder = lang.medNamePlaceholder;
  document.getElementById("lbl-dose").textContent = lang.dose;
  document.getElementById("med-dose").placeholder = lang.dosePlaceholder;
  document.getElementById("lbl-frequency").textContent = lang.frequency;
  document.getElementById("btn-save-medication").textContent = lang.saveMedication;
  document.getElementById("lbl-interaction-checker").textContent = lang.interactionChecker;
  document.getElementById("lbl-interaction-desc").textContent = lang.interactionDesc;
  document.getElementById("btn-check-interactions").textContent = lang.checkInteractions;
  document.getElementById("lbl-current-meds").textContent = lang.currentMeds;

  // Update frequency options
  const freqSelect = document.getElementById("med-frequency");
  Array.from(freqSelect.options).forEach((opt, i) => {
    if (lang.freqOptions[i]) opt.textContent = lang.freqOptions[i];
  });

  // Export page
  document.getElementById("lbl-export-title").textContent = lang.exportTitle;
  document.getElementById("lbl-export-desc").textContent = lang.exportDesc;
  document.getElementById("lbl-from-date").textContent = lang.fromDate;
  document.getElementById("lbl-to-date").textContent = lang.toDate;
  document.getElementById("btn-download-pdf").textContent = lang.downloadPdf;
  document.getElementById("lbl-your-stats").textContent = lang.yourStats;

  // Translation note
  document.getElementById("translation-note").textContent = lang.translationNote;

  // Update language button
  document.getElementById("lang-btn").textContent = "🌐 " + langCode.toUpperCase() + " ▾";

  // Update mood selector labels
  const moodOpts = document.querySelectorAll(".mood-opt");
  lang.moodLabels.slice(1).forEach((label, i) => {
    if (moodOpts[i]) {
      moodOpts[i].children[1].textContent = label;
    }
  });

  // Re-attach slider listeners after language change
  initSliders();

  // Reload all visible data in new language
  loadSymptoms();
  loadMood();
  loadMedications();
  loadStats();

  // Close panel
  closeLangPanel();
}