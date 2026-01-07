import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addShagun as addShagunAction,
  deleteShagun as deleteShagunAction,
  updateShagun as updateShagunAction
} from '../store/slices/shagunSlice';

export function useShagun() {
  const dispatch = useAppDispatch();
  const { shagunEntries } = useAppSelector(state => state.shagun);

  const addShagun = async (entry: any) => {
    await dispatch(addShagunAction(entry)).unwrap();
  };

  const deleteShagun = async (id: string) => {
    await dispatch(deleteShagunAction(id)).unwrap();
  };

  const updateShagun = async (id: string, data: any) => {
    await dispatch(updateShagunAction({ id, data })).unwrap();
  };

  return {
    shagunEntries,
    addShagun,
    deleteShagun,
    updateShagun
  };
}

export function ShagunProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
