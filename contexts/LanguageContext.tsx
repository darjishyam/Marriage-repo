import { createContext, useContext, useState, ReactNode } from "react";

type Language = "English" | "Gujrati";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  English: {
    // Profile
    "hi_moon": "Hi Moon!",
    "edit": "Edit",
    "purchase_premium": "Purchase Premium",
    "export_data_pdf": "Export data to PDF without ads",
    "change_language": "Change Language",
    "change": "Change",
    "terms_of_service": "Terms of Service",
    "delete_account": "Delete Account",
    "contact_us": "Contact Us",
    "connect_instagram": "Connect on Instagram",
    "log_out": "Log out",
    "cancel": "Cancel",
    "save": "Save",
    "english": "English",
    "gujrati": "Gujrati",
    
    // Premium
    "upgrade_premium": "Upgrade to Premium",
    "unlock_features": "Unlock all premium features and enjoy an ad-free experience with PDF export capabilities.",
    "ads_free": "Ads Free",
    "export_shagun_pdf": "Export Shagun Book to PDF",
    "export_guest_pdf": "Export Guest List to PDF",
    "export_expense_pdf": "Export Expense Book to PDF",
    "support": "Support",
    "per_month": "month",
    "pay_apple": "Pay with Apple",
    "purchase_terms": "By purchasing, you agree to our Terms of Service and Privacy Policy. Subscription will auto-renew unless cancelled.",
  },
  Gujrati: {
    // Profile
    "hi_moon": "હાય મૂન!",
    "edit": "સંપાદન",
    "purchase_premium": "પ્રીમિયમ ખરીદો",
    "export_data_pdf": "વિજ્ઞાપનો વગર PDF માં ડેટા એક્સપોર્ટ કરો",
    "change_language": "ભાષા બદલો",
    "change": "બદલો",
    "terms_of_service": "સેવાની શરતો",
    "delete_account": "એકાઉન્ટ કાઢી નાખો",
    "contact_us": "અમારો સંપર્ક કરો",
    "connect_instagram": "ઇન્સ્ટાગ્રામ પર કનેક્ટ કરો",
    "log_out": "લૉગ આઉટ",
    "cancel": "રદ કરો",
    "save": "સાચવો",
    "english": "ઇંગ્લિશ",
    "gujrati": "ગુજરાતી",
    
    // Premium
    "upgrade_premium": "પ્રીમિયમમાં અપગ્રેડ કરો",
    "unlock_features": "બધી પ્રીમિયમ સુવિધાઓ અનલૉક કરો અને PDF એક્સપોર્ટ ક્ષમતાઓ સાથે વિજ્ઞાપન-મુક્ત અનુભવ માણો.",
    "ads_free": "વિજ્ઞાપન મુક્ત",
    "export_shagun_pdf": "શગુન બુક PDF માં એક્સપોર્ટ કરો",
    "export_guest_pdf": "મહેમાન યાદી PDF માં એક્સપોર્ટ કરો",
    "export_expense_pdf": "ખર્ચ બુક PDF માં એક્સપોર્ટ કરો",
    "support": "સહાય",
    "per_month": "મહિના",
    "pay_apple": "Apple સાથે ચૂકવણી કરો",
    "purchase_terms": "ખરીદી કરીને, તમે અમારી સેવાની શરતો અને ગોપનીયતા નીતિ સાથે સંમત થાઓ છો. રદ કર્યા સિવાય સબ્સ્ક્રિપ્શન આપમેળે નવીન થશે.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("English");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.English] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

