import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
  Modal,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { OverlayContext } from './components/OverlayContext';

type TimerPhase = 'work' | 'break';

const Timer = () => {
  // Timer configuration
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  
  // Timer state
  const [phase, setPhase] = useState<TimerPhase>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [progress, setProgress] = useState(new Animated.Value(1));
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Get overlay context
  const { showOverlay, toggleOverlay } = useContext(OverlayContext);

  // Initialize or update timer when phase or durations change
  useEffect(() => {
    const newTotalTime = (phase === 'work' ? workMinutes : breakMinutes) * 60;
    setTimeLeft(newTotalTime);
    setTotalTime(newTotalTime);
    setProgress(new Animated.Value(1));
  }, [phase, workMinutes, breakMinutes]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          
          // Update progress bar
          const progressValue = newTime / totalTime;
          Animated.timing(progress, {
            toValue: progressValue,
            duration: 1000,
            useNativeDriver: false
          }).start();
          
          return newTime;
        });
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer completed
      handlePhaseCompletion();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, totalTime]);

  // Overlay effect
  useEffect(() => {
    if (isRunning && phase === 'work' && !showOverlay) {
      toggleOverlay();
    } else if ((!isRunning || phase !== 'work') && showOverlay) {
      toggleOverlay();
    }
  }, [isRunning, phase, showOverlay]);

  const handlePhaseCompletion = () => {
    setIsRunning(false);
    const newPhase = phase === 'work' ? 'break' : 'work';
    setPhase(newPhase);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
    setProgress(new Animated.Value(1));
  };

  const switchTimer = (newPhase: TimerPhase) => {
    if (!isRunning) {
      setPhase(newPhase);
    }
  };

  const handleTimeChange = (value: string, type: TimerPhase) => {
    const numValue = parseInt(value) || 1;
    const clampedValue = Math.min(Math.max(numValue, 1), 60);
    
    if (type === 'work') {
      setWorkMinutes(clampedValue);
    } else {
      setBreakMinutes(clampedValue);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pomodoro Timer</Text>
      
      {/* Timer selector */}
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={[
            styles.selectorButton,
            phase === 'work' && styles.activeSelector
          ]}
          onPress={() => switchTimer('work')}
          disabled={isRunning}
        >
          <Text style={[
            styles.selectorText,
            phase === 'work' && styles.activeSelectorText
          ]}>
            Work
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.selectorButton,
            phase === 'break' && styles.activeSelector
          ]}
          onPress={() => switchTimer('break')}
          disabled={isRunning}
        >
          <Text style={[
            styles.selectorText,
            phase === 'break' && styles.activeSelectorText
          ]}>
            Break
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Timer display */}
      <View style={styles.timerDisplay}>
        <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.phaseText}>
          {phase === 'work' ? 'Focus Time' : 'Break Time'}
        </Text>
        
        <View style={styles.progressBarContainer}>
          <Animated.View 
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                }),
                backgroundColor: phase === 'work' ? '#FF5252' : '#4CAF50'
              }
            ]}
          />
        </View>
      </View>
      
      {/* Control buttons */}
      <View style={styles.controlsContainer}>
        {!isRunning ? (
          <TouchableOpacity
            style={[styles.controlButton, styles.startButton]}
            onPress={toggleTimer}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.controlButton, styles.pauseButton]}
            onPress={toggleTimer}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.controlButton, styles.resetButton]}
          onPress={resetTimer}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={[styles.controlButton, styles.settingsButton]}
        onPress={() => setShowSettings(true)}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      
      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSettings}
        onRequestClose={() => setShowSettings(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Timer Settings</Text>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Work (minutes):</Text>
              <TextInput
                style={styles.timeInput}
                keyboardType="numeric"
                value={workMinutes.toString()}
                onChangeText={(text) => handleTimeChange(text, 'work')}
              />
            </View>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Break (minutes):</Text>
              <TextInput
                style={styles.timeInput}
                keyboardType="numeric"
                value={breakMinutes.toString()}
                onChangeText={(text) => handleTimeChange(text, 'break')}
              />
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.applyButton]}
                onPress={() => setShowSettings(false)}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );//I'm going to push this into a branch before changing anything
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#255ec2',
  },
  selectorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectorButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  activeSelector: {
    backgroundColor: '#255ec2',
  },
  selectorText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeSelectorText: {
    color: 'white',
  },
  timerDisplay: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  timeText: {
    fontSize: 72,
    fontWeight: '200',
    color: '#333',
    marginBottom: 5,
  },
  phaseText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  progressBarContainer: {
    width: '80%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  controlButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  resetButton: {
    backgroundColor: '#F44336',
  },
  settingsButton: {
    backgroundColor: '#607D8B',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: '#555',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    width: 80,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  modalButton: {
    padding: 12,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#255ec2',
  },
});

export default Timer;