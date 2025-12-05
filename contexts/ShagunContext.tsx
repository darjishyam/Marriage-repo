import { createContext, useContext, useState, ReactNode } from "react";

export interface ShagunEntry {
  id: string;
  brideName: string;
  groomName: string;
  date: string;
  amount: string;
  gift: string;
  wishes?: string;
}

interface ShagunContextType {
  shagunEntries: ShagunEntry[];
  addShagun: (entry: Omit<ShagunEntry, "id">) => void;
  deleteShagun: (id: string) => void;
}

const ShagunContext = createContext<ShagunContextType | undefined>(undefined);

export function ShagunProvider({ children }: { children: ReactNode }) {
  const [shagunEntries, setShagunEntries] = useState<ShagunEntry[]>([]);

  const addShagun = (entry: Omit<ShagunEntry, "id">) => {
    const newEntry: ShagunEntry = {
      ...entry,
      id: Date.now().toString(),
      wishes: entry.wishes || "happy marriage life",
    };
    setShagunEntries((prev) => [...prev, newEntry]);
  };

  const deleteShagun = (id: string) => {
    setShagunEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <ShagunContext.Provider value={{ shagunEntries, addShagun, deleteShagun }}>
      {children}
    </ShagunContext.Provider>
  );
}

export function useShagun() {
  const context = useContext(ShagunContext);
  if (context === undefined) {
    throw new Error("useShagun must be used within a ShagunProvider");
  }
  return context;
}

