import { useState, useCallback } from 'react';

let toastId = 0;
const listeners = new Set();

export function useToast() {
  const toast = useCallback((props) => {
    const id = toastId++;
    const notification = { id, ...props, open: true };
    listeners.forEach(listener => listener(notification));
    
    setTimeout(() => {
      listeners.forEach(listener => listener({ ...notification, open: false }));
    }, 3000);
  }, []);

  return { toast };
}
