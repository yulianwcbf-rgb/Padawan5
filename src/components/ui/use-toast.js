import { useState } from 'react';

export function useToast() {
  const toast = ({ title, description, variant = 'default' }) => {
    console.log(`[${variant}] ${title}${description ? ': ' + description : ''}`);
  };

  return { toast };
}