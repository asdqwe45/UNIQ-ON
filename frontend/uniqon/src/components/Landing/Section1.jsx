import React from "react";
import { useNavigate } from "react-router-dom";
import useUserInfoStore from "../../stores/UserInfoStore";


export function Section1() {
  const navigate = useNavigate();
  const { accessToken } = useUserInfoStore();

  function goToForLogin() {
      navigate("/forlogin");
  }

  return (
    <>
    <div className="flex flex-col w-[1440px] items-center pt-[24px] pb-0 px-[448px] relative bg-[#c1dcdc]">
      <div className="flex flex-col h-[760px] items-start pt-0 pb-[235px] px-0 ml-[-240.00px] mr-[-240.00px] bg-[#c1dcdc] w-[1024px] relative">
        <div className="h-[525px] w-[1024px] relative">
          <div className="relative w-[1262px] h-[805px] top-[-25px]">
            <div className="absolute w-[1262px] h-[805px] top-0 left-0">
              <div className="flex flex-col w-[1100px] items-start pl-0 pr-[596px] pt-[200px] pb-0 absolute top-[25px] left-[-16px]">
                <div className="relative w-fit mt-[-1.00px] mr-[-153.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Segoe_UI-Bold',Helvetica] font-bold text-[#212529] text-[54px] tracking-[0] leading-[73px]">
                  비밀의 동물원,
                  <br />
                  여기서 NFT로 만나보세요
                </div>
              </div>
              <div className="flex w-[1024px] items-center gap-[12.78px] pl-0 pr-[651.22px] py-0 absolute top-[494px] left-0">
                <div className="relative w-[292px] h-[56px] bg-gradient-to-r from-green-300 to-[#438fff] rounded-[10px] shadow-[0px_4px_4px_#00000040] backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]">
                  <div onClick={goToForLogin} className="relative w-[247px] h-[28px] top-[12px] left-[29px]">
                    <img
                      className="absolute w-[38px] h-[38px] top-0 left-0"
                      alt="Google play white"
                      src="book.gif"
                    />
                    <div className="w-[243px] h-[28px] top-1 left-[4px] [font-family:'Segoe_UI-Bold',Helvetica] font-bold text-[#ffffff] text-[16px] text-center leading-[28px] absolute tracking-[0]">
                      서비스 시작하러 가기
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-[607px] h-[700px] top-[14px] left-[600px] bg-[#c1dcdc] rotate-[2.82deg]">
                <img
                  className="absolute w-[608px] h-[755px] top-[9px] left-[-18px] rotate-[-2.82deg]"
                  alt="Rebranded top"
                  src="heedong.png"
                />
              </div>
            </div>
            <p className="h-[60px] top-[401px] left-0 [font-family:'Segoe_UI-Regular',Helvetica] font-semibold text-[#7c7c7c] text-[20px] leading-[30px] absolute tracking-[0]">
              희동이는 희귀동물의 애칭이에요
              <br />
              유니콘에서 희동이를 만나고 소유해보세요
            </p>
            <img src="snake.gif" alt="" />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}