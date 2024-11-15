import { useEffect, useState } from 'react';
import { requestAccount } from './utils/contractServices';

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchCurrentAccount = async () => {
      const account = await requestAccount();
      setAccount(account);
    };

    fetchCurrentAccount();
  }, []);

  useEffect(() => {
    const handleAccountChanged = (newAccounts) => {
      setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChanged);
    }

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountChanged);
    };
  });

  return <div>Hello, World</div>;
}

export default App;
