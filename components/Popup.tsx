import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface PopupProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    confirmButton?: string;
}


const Popup: React.FC<PopupProps> = ({
    visible,
    onClose,
    onSubmit,
    value,
    onChangeText,
    placeholder = 'new task',
    confirmButton = ''
}) => {
    if(!visible) return null;
    
    return (
        <>
          {/* Transparent overlay that closes the popup when clicked */}
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>

          {/* The actual popup content */}
          <View style={styles.popupContainer}>
            <View style={styles.popup}>
              <TextInput
              placeholder='new task'
              value={value}
              onChangeText={onChangeText}
              />

              <TouchableOpacity 
                style={styles.closeButton}
                onPress={onSubmit}
              >
                <Text style={styles.closeButtonText}>{confirmButton}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={onClose}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
    )
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
      popupContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'box-none', // Allows touches to pass through
      },
      popup: {
        width: '70%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      popupTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#00adf5',
        borderRadius: 5,
        alignItems: 'center',
      },
      closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
})

export default Popup;