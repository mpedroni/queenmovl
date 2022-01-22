import { createContext, ReactNode, useContext, useState } from 'react';

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

export interface SidebarDrawerContextData {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  handleState: () => void;
}

export const SidebarDrawerContext = createContext<SidebarDrawerContextData>(
  {} as SidebarDrawerContextData
);

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const [isOpen, setIsOpen] = useState(true);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function handleState() {
    isOpen ? close() : open();
  }

  return (
    <SidebarDrawerContext.Provider value={{ isOpen, open, close, handleState }}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export function useSidebarDrawer() {
  const context = useContext(SidebarDrawerContext);

  return context;
}
