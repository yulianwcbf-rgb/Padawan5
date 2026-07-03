import { useState, useCallback } from 'react';

let toastId = 0;
const listeners = new Set();

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addListener = useCallback((listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  const toast = useCallback((props) => {
    const id = toastId++;
    const newToast = { id, ...props };
    listeners.forEach(listener => listener(newToast));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return { toast, toasts };
}