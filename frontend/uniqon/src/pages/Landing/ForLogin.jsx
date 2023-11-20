import React, { useEffect, useState } from "react";
import Scene from "../../components/Landing/Scene";
import { CheckoutForm } from "../../components/Common/CheckoutForm";

export function ForLogin() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
  }, []);

  if (isTransitioning === false) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-screen h-screen p-0 m-0 overflow-hidden bg-black -webkit-touch-callout-none flex">
        <Scene />
      </div>
      <div className="absolute top-[88px] right-[250px]">
        <CheckoutForm />
      </div>
    </>
  );
}
