import AddTimer from './components/AddTimer';
import { useState,useEffect } from 'react';
function App() {
   const [shop, setShop] = useState('');

  useEffect(() => {
    fetch('/api/whoami')
      .then((res) => {
        if (res.status === 401) {
          const shop = new URLSearchParams(location.search).get('shop');
          window.location.href = `/auth?shop=${shop}`;
        } else {
          return res.json();
        }
      })
      .then((data) => setShop(data?.shop));
  }, []);

  // ... authentication useEffect from before

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Countdown Timer Admin Panel</h1>
      <AddTimer />
    </div>
  );
}

export default App;
