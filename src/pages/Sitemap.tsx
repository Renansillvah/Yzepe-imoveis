import { useEffect } from 'react'

const SITEMAP_URL = 'https://fzidmwnhyxmdwaupgzxr.supabase.co/functions/v1/sitemap'

export default function Sitemap() {
  useEffect(() => {
    window.location.replace(SITEMAP_URL)
  }, [])

  return (
    <div style={{ fontFamily: 'monospace', padding: '2rem' }}>
      <p>Redirecionando para o sitemap dinâmico...</p>
      <p>
        <a href={SITEMAP_URL}>{SITEMAP_URL}</a>
      </p>
    </div>
  )
}
