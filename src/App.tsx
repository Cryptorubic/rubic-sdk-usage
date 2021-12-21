import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate
} from 'react-router-dom';
import { Header } from 'src/Header';
import { useRubicSdk } from 'src/hooks/useRubicSdk';
import { CrossChain } from 'src/pages/CrossChain';
import { InstantTrades } from 'src/pages/InstantTrades';
import './App.scss';

// @ts-ignore
import { ToastMessage } from 'rimble-ui';
import { configuration } from 'src/rpc-providers';

function App() {
  const { sdk, setConfiguration } = useRubicSdk();

  useEffect(() => {
      if (!sdk) {
          setConfiguration(configuration);
      }
  }, [])

  return (
      <>
          {/* @ts-ignore */}
          <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
          <Router>
              <Header />

              <Routes>
                <Route path="/crosschain" element={<CrossChain />} />
                <Route path="/" element={<InstantTrades />} />
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
              </Routes>
          </Router>
      </>
  );
}

export default App;
