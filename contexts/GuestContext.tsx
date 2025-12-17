import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { useWedding } from './WeddingContext';

interface Guest {
    _id: string;
    name: string;
    familyCount: number;
    cityVillage: string;
}

interface GuestContextType {
    guests: Guest[];
    isLoading: boolean;
    addGuest: (name: string, count: number, city: string) => Promise<void>;
    fetchGuests: () => Promise<void>;
}

const GuestContext = createContext<GuestContextType | undefined>(undefined);

export function GuestProvider({ children }: { children: ReactNode }) {
    const { hasWedding } = useWedding();
    const [guests, setGuests] = useState<Guest[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (hasWedding) {
            fetchGuests();
        } else {
            setGuests([]);
        }
    }, [hasWedding]);

    const fetchGuests = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/guests');
            setGuests(res.data);
        } catch (error) {
            console.error("Failed to fetch guests", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addGuest = async (name: string, count: number, city: string) => {
        setIsLoading(true);
        try {
            const res = await api.post('/guests', {
                name,
                familyCount: count,
                cityVillage: city
            });
            setGuests(prev => [...prev, res.data]);
        } catch (error) {
            console.error("Failed to add guest", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GuestContext.Provider value={{ guests, isLoading, addGuest, fetchGuests }}>
            {children}
        </GuestContext.Provider>
    );
}

export function useGuest() {
    const context = useContext(GuestContext);
    if (context === undefined) {
        throw new Error('useGuest must be used within a GuestProvider');
    }
    return context;
}
