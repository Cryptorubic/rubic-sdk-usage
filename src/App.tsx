import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate
} from 'react-router-dom';
import { CrossChain } from 'src/pages/CrossChain';
import { InstantTrades } from 'src/pages/InstantTrades';
import './App.scss';

function App() {
  return (
      <Router>
        <div>
          <nav className={'header-nav'}>
            <ul>
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active-nav-link' : '')}>Instant Trades</NavLink>
              </li>
              <li>
                <NavLink to="/crosschain" className={({ isActive }) => (isActive ? 'active-nav-link' : '')}>Cross Chain</NavLink>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/crosschain" element={<CrossChain />} />
            <Route path="/" element={<InstantTrades />} />
            <Route
                path="*"
                element={<Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
