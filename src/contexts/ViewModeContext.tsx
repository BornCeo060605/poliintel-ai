'use client';

import { createContext, useContext, useState } from 'react';
import type { ViewMode } from '@/types';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(
  undefined
);

export function ViewModeProvider({
  children,
  defaultMode = 'consultant',
}: {
  children: React.ReactNode;
  defaultMode?: ViewMode;
}) {
  const [viewMode, setViewModeState] = useState<ViewMode>(defaultMode);

  const setViewMode = (mode: ViewMode) => setViewModeState(mode);

  const toggleViewMode = () =>
    setViewModeState((prev) =>
      prev === 'consultant' ? 'leadership' : 'consultant'
    );

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode, toggleViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
}
