import React from "react";


export function Section3() {
  return (
    <>
    <div className="flex flex-col w-[1440px] items-center pl-[430px] pr-[466px] py-0 relative bg-[#d0e6e6]">
      <div className="relative w-[1024px] h-[750px] ml-[-240.00px] mr-[-240.00px]">
        <div className="absolute w-[420px] h-[442px] top-[154px] left-0">
          <div className="absolute h-[32px] top-[-5px] left-0 [font-family:'Segoe_UI-Bold',Helvetica] font-bold text-[#10b0b0] text-[24px] tracking-[0] leading-[normal]">
            희귀동물 도감
          </div>
          <div className="inline-flex flex-col items-start pl-0 pr-[59px] py-0 absolute top-[34px] left-0">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Bold',Helvetica] font-bold [text-shadow:0px_4px_4px_#00000040] text-[#212529] text-[42px] tracking-[0] leading-[57px]">
              당신만 아는
              <br />
              동물 정보와 이야기
            </div>
          </div>
          <div className="inline-flex flex-col items-start pl-0 pr-[99px] py-0 absolute top-[158px] -left-px">
            <p className="relative w-[300px] h-[90px] mt-[16.00px] [font-family:'Segoe_UI-Regular',Helvetica] font-semibold text-[#7c7c7c] text-[20px] tracking-[0] leading-[30px]">
              몰랐던 희귀동물의 다양한 정보와
              <br />
              NFT를 알아볼까요?
            </p>
          </div>
          <div className="absolute w-[392px] h-[184px] top-[258px] left-0">
            <div className="left-0 flex flex-col w-[134px] items-start pl-0 pr-[10px] py-[16px] absolute top-0">
              <div className="relative w-[124px] h-[152px]">
                <img
                  className="absolute w-[56px] h-[56px] top-0 left-0"
                  alt="Div icon story"
                  src="qqicon.svg"
                />
                <div className="absolute h-[21px] top-[71px] left-0 [font-family:'Segoe_UI-Bold',Helvetica] font-bold text-[#212529] text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
                  희귀동물정보
                </div>
                <div className="flex flex-col w-[150px] items-start pl-0 pr-[21px] py-0 absolute top-[101px] left-0">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Regular',Helvetica] font-semibold text-[#7c7c7c] text-[13px] tracking-[0] leading-[17px]">
                    해당 동물의 정보를
                    <br />
                    탐색해보세요.
                  </div>
                </div>
              </div>
            </div>
            <div className="left-[155px] flex flex-col w-[134px] items-start pl-0 pr-[10px] py-[16px] absolute top-0">
              <div className="relative w-[124px] h-[152px]">
                <img className="absolute w-[56px] h-[56px] top-0 left-0" alt="Div icon story" src="nfticon.svg" />
                <div className="absolute h-[21px] top-[71px] left-0 [font-family:'Segoe_UI-Bold',Helvetica] font-bold text-[#212529] text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
                  NFT 목록
                </div>
                <div className="flex flex-col w-[150px] items-start pl-0 pr-[21px] py-0 absolute top-[101px] left-0">
                  <div className="relative w-fit mt-[-1.00px] mr-[-11.00px] [font-family:'Segoe_UI-Regular',Helvetica] font-semibold text-[#7c7c7c] text-[13px] tracking-[0] leading-[17px]">
                    해당 동물의 NFT들을
                    <br />
                    구경해보세요.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className="absolute w-[650px] h-[550px] top-[60px] left-[444px]"
          alt="Rebranded"
          src="dogambook.png"
        />
      </div>
    </div>
    </>
  )
}