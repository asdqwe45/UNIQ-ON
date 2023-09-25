import logo from './logo.svg';
import './App.css';
import { Landing } from "./pages/Landing"
import { IssueCert } from "./pages/IssueCert"
import { CheckCert } from './pages/CheckCert';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { MetaMask } from './components/MetaMask';

function App() {
  return (
    <div className="App">
      <MetaMask />
      <BrowserRouter basename={process.env.DITI_BASENAME || ""}>
        <Routes>
          <Route index path="/diti/" element={<Landing />} />
          <Route path="/diti/issue" element={<IssueCert />} />
          <Route path="/diti/check" element={<CheckCert />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
