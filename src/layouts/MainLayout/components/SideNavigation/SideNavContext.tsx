import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SideNavContextType {
  isDropdownVisible: boolean;
  showDropdown: () => void;
  hideDropdown: () => void;
}

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

export const useSideNav = () => {
  const context = useContext(SideNavContext);
  if (context === undefined) {
    throw new Error('useSideNav must be used within a SideNavProvider');
  }
  return context;
};

interface SideNavProviderProps {
  children: ReactNode;
}

export const SideNavPorivder: React.FC<SideNavProviderProps> = ({ children }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const showDropdown = () => setIsDropdownVisible(true);
  const hideDropdown = () => setIsDropdownVisible(false);

  return (
    <SideNavContext.Provider value={{ isDropdownVisible, showDropdown, hideDropdown }}>
      {children}
    </SideNavContext.Provider>
  );
};
