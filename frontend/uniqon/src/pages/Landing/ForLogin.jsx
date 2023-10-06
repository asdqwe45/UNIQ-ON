import React, { useEffect, useState } from 'react';
import Scene from '../../components/Landing/Scene';
import { CheckoutForm } from "../../components/Common/CheckoutForm";

export function ForLogin() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
  }, []);

  if (isTransitioning === false) {
    // item 정보가 없을 경우 로딩 또는 오류 처리를 할 수 있습니다.
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
