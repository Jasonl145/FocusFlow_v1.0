import React, { useCallback, memo } from 'react';
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
  Pressable,
  Modal,
  Keyboard,
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


const PopupCompnent: React.FC<PopupProps> = ({
    visible,
    onClose,
    onSubmit,
    value,
    onChangeText,
    placeholder = 'new task',
    confirmButton = ''
}) => {
    if(!visible) return null;

    const handleClose = useCallback(() => {
      Keyboard.dismiss();
      onClose();
    }, [onClose]);

    const handleSubmit = useCallback(() => {
      Keyboard.dismiss();
      onSubmit();
    }, [onSubmit]);
      
    return (
      <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      >
        <View style={[styles.overlay, { opacity: visible ? 1 : 0 }]} />
        <View style={[styles.popupContainer, { display: visible ? 'flex' : 'none' }]}>
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
              onLayout={(e) => console.log('Layout:', e.nativeEvent.layout)}
              />

              <Pressable
                style={({ pressed }) => [
                  styles.closeButton,
                  { opacity: pressed ? 0.6 : 1 } 
                ]}
                
                onPress={handleSubmit}
              >
                <Text style={styles.closeButtonText}>{confirmButton}</Text>
              </Pressable>
              
              <Pressable
                style={({ pressed }) => [
                  styles.closeButton,
                  { opacity: pressed ? 0.6 : 1 } 
                ]}
                onPress={handleClose}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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

export default memo(PopupCompnent);