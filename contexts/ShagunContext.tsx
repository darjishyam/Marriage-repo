import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useWedding } from "./WeddingContext";

export interface ShagunEntry {
  id: string;
  name: string;
  amount: string;
  city?: string;
  gift?: string;
  contact?: string;
  wishes?: string;
  date: string;
}

interface ShagunContextType {
  shagunEntries: ShagunEntry[];
  addShagun: (entry: Omit<ShagunEntry, "id">) => void;
  deleteShagun: (id: string) => void;
}

const ShagunContext = createContext<ShagunContextType | undefined>(undefined);

export function ShagunProvider({ children }: { children: ReactNode }) {
  const [shagunEntries, setShagunEntries] = useState<ShagunEntry[]>([]);
  const { hasWedding } = useWedding();

  useEffect(() => {
    if (hasWedding) {
      fetchShaguns();
    } else {
      setShagunEntries([]);
    }
  }, [hasWedding]);

  const fetchShaguns = async () => {
    try {
      const res = await api.get('/shagun');
      // Map _id to id for frontend compatibility if needed, or ensure frontend uses _id
      const mapped = res.data.map((item: any) => ({
        ...item,
        id: item._id
      }));
      setShagunEntries(mapped);
    } catch (error) {
      console.error("Failed to fetch shagun", error);
    }
  };

  const addShagun = async (entry: Omit<ShagunEntry, "id">) => {
    try {
      const res = await api.post('/shagun', entry);
      const newEntry = { ...res.data, id: res.data._id };
      setShagunEntries((prev) => [newEntry, ...prev]);
    } catch (error) {
      console.error("Failed to add shagun", error);
    }
  };

  const deleteShagun = async (id: string) => {
    try {
      await api.delete(`/shagun/${id}`);
      setShagunEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Failed to delete shagun", error);
    }
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

