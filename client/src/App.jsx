import React, { useState, useEffect } from 'react';
import {
  getStoredValue,
  setStoredValue,
  connectMetaMask,
} from './utils/contract';
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';

function App() {
  const [storedValue, setStoredValueState] = useState(null);
  const [newValue, setNewValue] = useState('');
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the current stored value when the app loads
  useEffect(() => {
    const fetchStoredValue = async () => {
      setLoading(true);
      try {
        const value = await getStoredValue();
        setStoredValueState(value);
      } catch (err) {
        setError('Failed to fetch stored value.');
      } finally {
        setLoading(false);
      }
    };

    if (walletAddress) {
      fetchStoredValue(); // Fetch stored value once connected
    }
  }, [walletAddress]);

  const handleSetValue = async () => {
    if (newValue) {
      setLoading(true);
      try {
        await setStoredValue(newValue);
        setStoredValueState(newValue); // Update UI with the new value
        setNewValue(''); // Clear input field
      } catch (err) {
        setError('Failed to set new value.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    const address = await connectMetaMask();
    if (address) {
      setWalletAddress(address); // Set wallet address after successful connection
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Simple Storage DApp
        </Typography>

        {!walletAddress ? (
          <>
            <Typography variant="body1" align="center" gutterBottom>
              Please connect your wallet to interact with the DApp.
            </Typography>
            <Box display="flex" justifyContent="center" marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConnect}
                disabled={loading}
                sx={{ width: '200px' }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'Connect to MetaMask'
                )}
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6" align="center" gutterBottom>
              Wallet Address: <strong>{walletAddress}</strong>
            </Typography>

            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ textAlign: 'center', marginTop: 3 }}>
              <Typography variant="h6" gutterBottom>
                Stored Value: <strong>{storedValue}</strong>
              </Typography>

              <TextField
                label="New Value"
                variant="outlined"
                fullWidth
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                sx={{ marginBottom: 2 }}
                disabled={loading}
              />

              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSetValue}
                  disabled={loading || !newValue}
                  sx={{ width: '200px' }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    'Set New Value'
                  )}
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default App;
