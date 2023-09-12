import logo from './logo.svg';
import './App.css';
import { Button } from "@material-tailwind/react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Collections } from "./pages/Collections/Collections";
import { Transaction } from "./pages/Transaction/Transaction";
import { MyPage } from "./pages/Mypage/MyPage";
import { Wishlist } from "./pages/Transaction/Wishlist";
import { Landing } from "./pages/Landing/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;
