import './App.css';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { Transaction } from './pages/Transaction/Transaction';
import { TranItemDetail } from './pages/Transaction/TranItemDetail';
import { MyPage } from './pages/Mypage/MyPage';
import { Wishlist } from './pages/Transaction/Wishlist';
import { Landing } from './pages/Landing/Landing';
import { NFT } from './pages/NFT/NFT';
import { MainCollections } from './pages/Collections/MainCollections';
import { MidCollections } from './pages/Collections/MidCollec';
import { NFTList } from './pages/Collections/NFTList';
import { Login } from './pages/Auth/Login';
import { SignUp } from './pages/Auth/SignUp';

import { ForLogin } from './pages/Landing/ForLogin';

import { Suspense } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 여기서 401 오류를 처리할 수 있습니다.
    if (error.response.status === 401) {
      window.location.href = "/forlogin";
    }
    return Promise.reject(error);
  }
);
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/forlogin" element={<ForLogin />} />

        <Route path="/transaction" element={<Transaction />} />
        <Route path="/transaction/tranItemDetail/:id" element={<TranItemDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/nft" element={<NFT />} />

        <Route path="/collections" element={<MainCollections />} />
        <Route path="/midcollections" element={<MidCollections />} />
        <Route path="/nftlist" element={<NFTList />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
