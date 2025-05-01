import React, { createContext, useState, ReactNode } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';


interface OverlayContextType {
  showOverlay: boolean;
  toggleOverlay: () => void;
}


export const OverlayContext = createContext<OverlayContextType>({
  showOverlay: false,
  toggleOverlay: () => {},
});


interface OverlayProviderProps {
  children: ReactNode;
}


export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [showOverlay, setShowOverlay] = useState(false);


  const toggleOverlay = () => {
    setShowOverlay(prev => !prev);
  };


  return (
    <OverlayContext.Provider value={{ showOverlay, toggleOverlay }}>
      {children}
      {showOverlay && (
        <View
          style={styles.overlay}
          pointerEvents="none" //This makes the view non-interactive, allowing touches to pass through
        />
      )}
    </OverlayContext.Provider>
  );
};


const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(128, 0, 128, 0.5)',
    zIndex: 1000,
    elevation: 10,
  },
});
