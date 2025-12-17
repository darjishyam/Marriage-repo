import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from '../services/api';
import { useAuth } from './AuthContext';

interface Wedding {
  groomName: string;
  brideName: string;
  date: Date;
  totalBudget: number;
  startStatistics?: {
    guestCount: number;
    totalSpent: number;
  };
  _id?: string;
}

interface WeddingContextType {
  weddings: Wedding[];
  weddingData: Wedding | null;
  isLoading: boolean;
  hasWedding: boolean;
  refreshWeddingData: () => Promise<void>;
  switchWedding: (weddingId: string) => Promise<void>;
  updateBudget: (budget: number) => Promise<void>;
  createWedding: (data: Partial<Wedding>) => Promise<void>;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export function WeddingProvider({ children }: { children: ReactNode }) {
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [weddingData, setWeddingData] = useState<Wedding | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const hasWedding = !!weddingData;

  useEffect(() => {
    if (user) {
      refreshWeddingData();
    } else {
      setWeddings([]);
      setWeddingData(null);
      setIsLoading(false);
    }
  }, [user]);

  const refreshWeddingData = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      // Get all weddings
      const allRes = await api.get('/weddings');
      if (allRes.data && Array.isArray(allRes.data)) {
        setWeddings(allRes.data);
      }

      // Get active wedding details
      const res = await api.get('/weddings/my');
      if (res.data) {
        setWeddingData({
          ...res.data,
          date: new Date(res.data.date)
        });
      } else {
        setWeddingData(null);
      }
    } catch (error) {
      console.log("No active wedding found or error fetching");
      setWeddingData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const switchWedding = async (weddingId: string) => {
    setIsLoading(true);
    try {
      const res = await api.get(`/weddings/my?weddingId=${weddingId}`);
      if (res.data) {
        setWeddingData({
          ...res.data,
          date: new Date(res.data.date)
        });
      }
    } catch (error) {
      console.error("Failed to switch wedding", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBudget = async (budget: number) => {
    if (!weddingData?._id) return;
    try {
      const res = await api.put(`/weddings/${weddingData._id}`, { totalBudget: budget });
      // Update local state, preserving other data
      setWeddingData(prev => prev ? { ...prev, totalBudget: res.data.totalBudget } : null);

      // Also update the list if needed, or just refresh
      refreshWeddingData();
    } catch (error) {
      console.error("Failed to update budget", error);
    }
  };

  const createWedding = async (data: Partial<Wedding>) => {
    setIsLoading(true);
    try {
      const res = await api.post('/weddings', data);
      setWeddingData({
        ...res.data,
        date: new Date(res.data.date)
      });
      // Refresh list to include new one
      const allRes = await api.get('/weddings');
      if (allRes.data) setWeddings(allRes.data);
    } catch (error) {
      console.error("Failed to create wedding", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WeddingContext.Provider value={{
      hasWedding,
      weddingData,
      weddings,
      isLoading,
      refreshWeddingData,
      switchWedding,
      updateBudget,
      createWedding
    }}>
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error("useWedding must be used within a WeddingProvider");
  }
  return context;
}
