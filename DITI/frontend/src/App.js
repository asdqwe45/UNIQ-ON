import logo from './logo.svg';
import './App.css';
import { IssueCert } from "./pages/IssueCert"
import { CheckCert } from './pages/CheckCert';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { MetaMask } from './components/MetaMask';
import { Header } from './components/Header';
import useUserInfoStore from './stores/UserInfoStore';
import { useConfigStore } from './stores/ConfigStore';
import { MenuButton } from './components/MenuButton';
import { Footer } from "./components/Footer"

function App() {
  const { walletAddress } = useUserInfoStore()
  const { page } = useConfigStore()
  return (
    <div className="App">
      <Header />
      {walletAddress === null && <MenuButton />}
      {walletAddress !== null && page === "landing" && <MenuButton />}
      {walletAddress !== null && page === "issue" && <IssueCert />}
      {walletAddress !== null && page === "check" && <CheckCert />}
      <Footer />
      {/* <BrowserRouter basename={process.env.DITI_BASENAME || ""}>
        <Routes>
          <Route index path="/diti/" element={<Landing />} />
          <Route index path="/diti/login" element={<MetaMask />} />
          <Route path="/diti/issue" element={<IssueCert />} />
          <Route path="/diti/check" element={<CheckCert />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;