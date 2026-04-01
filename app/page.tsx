// app/page.tsx
// Serves the v5.0 standalone card generator as a full-page app.
// The entire UI lives in /public/index-standalone.html which is the
// canonical source of truth. This page embeds it so `npm run dev`
// shows the exact same thing as opening the HTML file directly.
export default function Home() {
  return (
    <iframe
      src="/index-standalone.html"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
      title="Concrete Cards Identity Generator"
    />
  );
}
