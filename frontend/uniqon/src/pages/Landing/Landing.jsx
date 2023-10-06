import React from 'react';
import axios from 'axios';
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Section1 } from '../../components/Landing/Section1';
import { Section2 } from '../../components/Landing/Section2';
import { Section3 } from '../../components/Landing/Section3';
import { Section4 } from '../../components/Landing/Section4';
import { LoginButton } from '../../components/Auth/LoginButton';

export function Landing() {



  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
      <div className="flex flex-col w-[1440px] items-start relative">
      <Section1 />
      <Section2 />
      <Section3 />
      {/* <Section4 /> */}
      </div>
      {/* <Button
        variant='gradient'
          className="text-4xl w-96 h-28 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
          onClick={() => {
            navigate("/forlogin");

          }}
        >로그인 페이지 제작중 뚝딱뚝딱</Button> */}

        {/* <LoginButton />

         <Button
          className="text-4xl w-96 h-28"
          onClick={() => {
            navigate("/signup");

          }}
          color="orange"
        >
          회원가입
        </Button> */}
       

      </header>

    </div>
  );
}