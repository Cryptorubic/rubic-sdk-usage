import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate
} from 'react-router-dom';
import { Header } from 'src/Header';
import { CrossChain } from 'src/pages/CrossChain';
import { InstantTrades } from 'src/pages/InstantTrades';
import './App.scss';

// @ts-ignore
import { ToastMessage } from 'rimble-ui';

function App() {
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
