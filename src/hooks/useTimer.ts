import { useState, useEffect, useCallback, useRef } from 'react';

export const useTimer = (initialMinutes: number, onTimeUp?: () => void) => {
  const [state, setState] = useState({
    secondsLeft: initialMinutes * 60,
    isActive: false,
  });
  
  const onTimeUpRef = useRef(onTimeUp);

  // Update ref when onTimeUp changes
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    let interval: number | undefined;

    if (state.isActive) {
      interval = window.setInterval(() => {
        setState((prev) => {
          if (prev.secondsLeft <= 0) {
            if (interval) clearInterval(interval);
            return { ...prev, isActive: false };
          }
          
          const nextSeconds = prev.secondsLeft - 1;
          if (nextSeconds === 0 && onTimeUpRef.current) {
            onTimeUpRef.current();
          }
          
          return { ...prev, secondsLeft: nextSeconds };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isActive]);

  const start = useCallback(() => setState(prev => ({ ...prev, isActive: true })), []);
  const pause = useCallback(() => setState(prev => ({ ...prev, isActive: false })), []);
  const reset = useCallback(() => {
    setState({
      isActive: false,
      secondsLeft: initialMinutes * 60,
    });
  }, [initialMinutes]);

  const formatTime = () => {
    const minutes = Math.floor(state.secondsLeft / 60);
    const seconds = state.secondsLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    secondsLeft: state.secondsLeft,
    isActive: state.isActive,
    start,
    pause,
    reset,
    formatTime,
  };
};
