import React from 'react';
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function Landing() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          여기는 랜딩페이지입니다.
        </p>
        <Button
          className="text-4xl w-96 h-28"
          onClick={() => {
            navigate("/collections");

          }}
          color="red"
          >

          도감
        </Button>
        <Button
          className="text-4xl w-96 h-28"
          onClick={() => {
            navigate("/mypage");

          }}
          color="yellow"
          >

          마이페이지
        </Button>
        <Button
          className="text-4xl w-96 h-28"
          onClick={() => {
            navigate("/transaction");

          }}
          color="black"
          >

          거래
        </Button>
        <Button
          className="text-4xl w-96 h-28"
          onClick={() => {
            navigate("/wishlist");

          }}
          color="blue"
          >

          위시리스트
        </Button>
      </header>
      
    </div>
  );
}