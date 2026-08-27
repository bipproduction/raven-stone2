'use client';

import { useEffect } from 'react';

// Registrasi service worker PWA. Client component kecil di-mount dari root
// layout — ga render apapun, cuma efek samping registrasi.
export default function RegisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.error('Gagal register service worker:', err);
      });
    }
  }, []);

  return null;
}
