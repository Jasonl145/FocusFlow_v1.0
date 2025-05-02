import React  from 'react';

const PomodoroTimer {
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);


   
          if (prev <= 1) {
            clearInterval(timer);
            const nextMode = Focus;
            setIsFocus(nextMode);
            return (nextMode ,  focusTime : breakTime) * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return  = clearInterval(timer);
   [isRunning, isFocus, focusTime, breakTime]);
}

  const formatTime = (secs: number) =>
    ${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

  const reset   = {
    setIsRunning(false);
    setIsFocus(true);
    setTimeLeft(focusTime * 60);
  };

  return (
    <div style={{ textAlign: 'center', padding: 30, fontFamily: 'Arial', background: 'pink’ }}>
      <h1 style={{ backgroundColor: 'pink', color: 'blue' }}>Pomodoro Timer</h1>
           <hr />

      <div>
        <label>Focus Time (minutes): </label>
        <input
          type="number"
          value={focusTime}


        
      </div>

      <div>
        <label>Break Time (minutes): </label>
        <input
          type="number"
          value={breakTime}


      </div>

      <div style={{ marginTop: 15}}>
        <button onClick={() = setIsRunning(true)}>Click Here to Start</button>
        <button onClick={() = setIsRunning(false)}>Click Here to Stop</button>
        <button onClick={reset}>Click Here to Reset</button>
 <button onClick= Timer Remaining:</button>
      </div>

      <div style={{ fontSize: 20, marginTop: 50}}>
</div>

    </div>
  



