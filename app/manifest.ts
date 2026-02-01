import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Blaq Digital - AI-Native Digital Media Agency',
    short_name: 'Blaq Digital',
    description: 'Next-generation digital media and AI agency built at the intersection of entertainment, artificial intelligence, and Black culture. We build intelligent media systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#16A34A',
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
  }
}
