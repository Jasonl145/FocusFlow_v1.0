import React, { createContext, useState, ReactNode } from 'react';
import { View, StyleSheet, Text } from 'react-native';

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
        >
          <View style={styles.workingContainer}>
            <Text style={styles.workingText}>WORKING</Text>
          </View>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
    elevation: 10,
  },
  workingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-30deg' }],
  },
  workingText: {
    color: '#FF0000', 
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});