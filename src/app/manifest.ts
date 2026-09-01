import { MetadataRoute } from 'next';

// Manifest PWA — App Router convention. Diserve otomatis di /manifest.webmanifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Raven Stone',
    short_name: 'Raven Stone',
    description: 'Raven Stone',
    start_url: '/',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
