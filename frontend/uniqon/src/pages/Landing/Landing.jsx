import React from "react";
import { useNavigate } from "react-router-dom";
import { Section1 } from "../../components/Landing/Section1";
import { Section2 } from "../../components/Landing/Section2";
import { Section3 } from "../../components/Landing/Section3";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-col w-[1440px] items-start relative">
          <Section1 />
          <Section2 />
          <Section3 />
        </div>
      </header>
    </div>
  );
}
