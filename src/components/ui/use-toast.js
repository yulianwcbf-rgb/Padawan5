import { useState, useCallback } from 'react';

const toasts = [];

export function useToast() {
  const [, setToastList] = useState(toasts);

  const toast = useCallback(({ title, description, variant = 'default' }) => {
    const id = Date.now();
    const newToast = { id, title, description, variant };
    toasts.push(newToast);
    setToastList([...toasts]);

    setTimeout(() => {
      toasts.splice(toasts.indexOf(newToast), 1);
      setToastList([...toasts]);
    }, 3000);
  }, []);

  return { toast };
}
