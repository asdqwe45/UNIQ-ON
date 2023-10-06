import React from "react";
import { useNavigate } from "react-router-dom";


export function Section2() {
  return (
    <>
    <div className="flex flex-col w-[1440px] items-center px-[448px] py-0 relative bg-[#f8f8f8]">
      <div className="relative w-[1024px] h-[750px] ml-[-240.00px] mr-[-240.00px]">
        <img
          className="absolute w-[469px] h-[469px] top-[149px] left-0"
          alt="Rebranded"
          src="fox-large.png"
        />
        <div className="absolute w-[400px] h-[346px] top-[202px] left-[655px]">
          <div className="absolute h-[32px] top-[-5px] left-0 [font-family:'Segoe_UI-Bold',Helvetica] font-bold text-[#0fafaf] text-[24px] tracking-[0] leading-[normal]">
            NFT 발급
          </div>
          <div className="inline-flex flex-col items-start absolute top-[34px] left-[-2px]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Bold',Helvetica] font-bold [text-shadow:0px_4px_4px_#00000040] text-[#212529] text-[42px] tracking-[0] leading-[57px]">
              당신만의
              <br />
              귀여운 반려동물 NFT
            </div>
          </div>
          <div className="inline-flex flex-col items-start pl-0 pr-[71px] py-0 absolute top-[158px] left-0">
            <p className="relative w-fit mt-[4.00px] [font-family:'Segoe_UI-Regular',Helvetica] font-semibold text-[#7c7c7c] text-[20px] tracking-[0] leading-[30px]">
              NFT로 현실을 디지털로 변환하세요.
              <br />
              디지털 아트와 컬렉션을 소유하세요.
            </p>
          </div>
          <div className="absolute w-[369px] h-[115px] top-[250px] left-0">
            <div className="pl-[20px] pr-[28.02px] py-[12px] top-0 inline-flex items-start absolute left-0 bg-[#e9ecef] rounded-[6px]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Bold',Helvetica] font-bold text-[#212529] text-[18px] tracking-[0] leading-[23.8px] whitespace-nowrap">
                생성형 A.I.
              </div>
            </div>
            <div className="pl-[20px] pr-[33.02px] py-[12px] top-[57px] inline-flex items-start absolute left-0 bg-[#e9ecef] rounded-[6px]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Bold',Helvetica] font-bold text-[#212529] text-[18px] tracking-[0] leading-[23.8px] whitespace-nowrap">
                귀여운 당신의 희동이
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}