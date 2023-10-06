import React from "react";
import { useNavigate } from "react-router-dom";


export function Section4() {
  const navigate = useNavigate();

  function goToTransaction() {
    navigate("/transaction");
  }

  return (
    <>
    <div className="flex flex-col w-[1440px] items-center px-[448px] py-0 relative bg-[#f8f8f8]">
      <div className="relative w-[1024px] h-[750px] ml-[-240.00px] mr-[-240.00px]">
        <div className="relative w-[1218px] h-[656px] top-[56px] left-[-194px]">
          <img
            className="absolute w-[928px] h-[656px] top-0 left-0 object-cover"
            alt="Element"
            src="mockup.png"
          />
          <div className="absolute w-[380px] h-[298px] top-[170px] left-[859px]">
            <div className="absolute h-[32px] top-[-5px] left-0 text-[#10b0b0] text-[24px] leading-[normal] [font-family:'Segoe_UI-Bold',Helvetica] font-bold tracking-[0]">
              NFT 거래
            </div>
            <div className="inline-flex flex-col items-start pl-0 pr-[64.91px] py-0 absolute top-[34px] left-0">
              <div className="relative w-fit mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] text-[#212529] text-[42px] leading-[57px] [font-family:'Segoe_UI-Bold',Helvetica] font-bold tracking-[0]">
                나만의 NFT
                <br />
                희동이 거래하기
              </div>
            </div>
            <div className="absolute w-[232px] h-[60px] top-[158px] left-0">
              <p className="absolute h-[60px] mt-1 -top-px left-0 [font-family:'Segoe_UI-Regular',Helvetica] font-semibold text-[#7c7c7c] text-[20px] tracking-[0] leading-[30px]">
                쉽고, 편하게 유니콘으로 <br />
                희동이를 구할 수 있어요.
              </p>
            </div>
            <div onClick={goToTransaction} className="inline-flex items-start pl-[20px] pr-[30.02px] py-[12px] absolute top-[250px] left-0 bg-[#e9ecef] rounded-[6px]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Bold',Helvetica] font-bold text-[#212529] text-[18px] tracking-[0] leading-[23.8px] whitespace-nowrap">
                서비스 시작하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}