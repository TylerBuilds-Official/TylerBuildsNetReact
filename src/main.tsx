import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './styles/globals.css'
import logoUrl from './assets/TB_logo.png'

const ensureFavicon = () => {
  const head = document.head;
  let link = head.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    head.appendChild(link);
  }
  if (link) link.href = logoUrl;
  let theme = head.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!theme) {
    theme = document.createElement('meta');
    theme.name = 'theme-color';
    theme.content = '#0e1117';
    head.appendChild(theme);
  }
};
ensureFavicon();

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
     <App />
    </React.StrictMode>
)
