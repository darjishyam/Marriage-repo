import { createContext, useContext, useState, ReactNode } from "react";

interface WeddingData {
  groomName: string;
  brideName: string;
  date: Date;
}

interface WeddingContextType {
  hasWedding: boolean;
  weddingData: WeddingData | null;
  setWeddingData: (data: WeddingData) => void;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export function WeddingProvider({ children }: { children: ReactNode }) {
  const [hasWedding, setHasWedding] = useState(false);
  const [weddingData, setWeddingDataState] = useState<WeddingData | null>(null);

  const setWeddingData = (data: WeddingData) => {
    setWeddingDataState(data);
    setHasWedding(true);
  };

  return (
    <WeddingContext.Provider value={{ hasWedding, weddingData, setWeddingData }}>
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

