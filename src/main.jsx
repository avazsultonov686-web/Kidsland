import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Вставляем скрипт Telegram Web Apps SDK в <head>
const telegramScriptId = 'telegram-web-app-sdk';
if (!document.getElementById(telegramScriptId)) {
  const script = document.createElement('script');
  script.src = 'https://telegram.org/js/telegram-web-app.js';
  script.id = telegramScriptId;
  script.async = true;
  document.head.appendChild(script);
}

// Компонент-обертка для инициализации Telegram Web App
function TelegramWebAppInitializer({ children }) {
  useEffect(() => {
    // Дожидаемся загрузки sdk, затем инициализируем WebApp
    function onReady() {
      if (window.Telegram && window.Telegram.WebApp && typeof window.Telegram.WebApp.ready === 'function') {
        window.Telegram.WebApp.ready();
      }
    }

    if (window.Telegram && window.Telegram.WebApp && typeof window.Telegram.WebApp.ready === 'function') {
      onReady();
    } else {
      const interval = setInterval(() => {
        if (window.Telegram && window.Telegram.WebApp && typeof window.Telegram.WebApp.ready === 'function') {
          onReady();
          clearInterval(interval);
        }
      }, 50);
      // Fail-safe timeout after 5 seconds
      setTimeout(() => clearInterval(interval), 5000);
    }
  }, []);

  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TelegramWebAppInitializer>
      <App />
    </TelegramWebAppInitializer>
  </React.StrictMode>,
)
