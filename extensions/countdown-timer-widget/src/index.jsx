import { extend, useEffect, useState } from '@shopify/checkout-ui-extensions-react';

extend('Checkout::Dynamic::Render', () => <TimerWidget />);

function TimerWidget() {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    async function fetchTimer() {
      // Shopify gives you shop domain through extension point
      const shopDomain = new URLSearchParams(location.search).get('shop');
      const res = await fetch(`https://your-ngrok-url.ngrok.io/api/timers/public/${shopDomain}`);
      const data = await res.json();
      setTimer(data[0]); // use latest timer
    }

    fetchTimer();
  }, []);

  if (!timer) return <p>Loading timer...</p>;

  const timeLeft = new Date(timer.endTime) - Date.now();
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <div style={{ padding: '1em', backgroundColor: '#ffe', border: '1px solid #ccc' }}>
      <p><strong>{timer.title}</strong></p>
      <p>Ends in: {minutes}:{seconds < 10 ? '0' : ''}{seconds}</p>
    </div>
  );
}
