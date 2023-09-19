import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";

export function TopNavBar() {

    const navigate = useNavigate();
    // 마켓플레이스(거래 목록 페이지)로 이동
    const goToTransaction = () => {
      navigate("/transaction");
    };
  
    // 도감 페이지로 이동
    const goToCollection = () => {
      navigate("/collections");
    };
  
    const createNFT = () => {
      navigate("/nft");
    };
  
    const goToMypage = () => {
      navigate("/mypage");
    };
  return(
    <>
    
    <div className="flex max-w-[1600px] w-[1440px] min-h-[80px] items-center justify-between pl-[24px] pr-[24.01px] py-[16px] absolute top-[2px] left-0">
              <div className="relative flex-1 grow h-[36px]">
                <img className="absolute w-[171px] h-[79px] top-[-22px] left-[4px] object-cover" src="logo.png" alt="Link foundation logo" />
                <div className="inline-flex items-start justify-center left-[213px] absolute top-0">
                  <button
                    onClick={goToTransaction}
                    className="h-[36px] items-center justify-center pl-[18.5px] pr-[18.3px] pt-[9px] pb-[8px] rounded-full inline-flex relative flex-[0_0_auto]"
                  >
                    <div className="relative w-fit mt-[-1.00px] text-[#000000b2] [font-family:'Pretendard-SemiBold',_Helvetica] font-semibold text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                      마켓플레이스
                    </div>
                  </button>
                  <button
                    onClick={goToCollection}
                    className="inline-flex h-[36px] items-center justify-center pt-[9px] pb-[8px] px-[24.14px] relative flex-[0_0_auto] rounded-full all-[unset] box-border"
                  >
                    <div className="relative w-fit mt-[-1.00px] text-[#000000b2] [font-family:'Pretendard-SemiBold',_Helvetica] font-semibold text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                      도감
                    </div>
                  </button>
                  <div className="relative flex-[0_0_auto] h-[36px] rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-center pl-[8.65px] pr-[8.68px] py-0 relative flex-1 grow">
                <div className="relative w-[500px] h-[48px] ml-[-26.67px] mr-[-26.67px]">
                  <div className="relative h-[48px] rounded-full">
                    <div className="flex w-[500px] min-h-[48px] items-center pl-[48px] pr-[32px] py-px absolute top-0 left-0 bg-[#0000000d] rounded-full overflow-hidden">
                      <div className="inline-flex flex-col items-start pl-0 pr-[330px] py-0 relative flex-[0_0_auto]">
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-Regular',_Helvetica] font-normal text-[#00000066] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                          Search NFT
                        </div>
                      </div>
                    </div>
                    <img src="search.png" className="absolute w-[18px] h-[18px] top-[15px] left-[20px]" alt="Svg" />
                  </div>
                </div>
              </div>
              <div className="h-[48px] relative flex-1 grow">
                <button
                  onClick={createNFT}
                  className="absolute w-[154px] h-[48px] top-0 left-[131px] bg-[#f8f0f0] rounded-full shadow-[0px_4px_4px_#00000040] all-[unset] box-border"
                >
                  <div className="relative w-[146px] h-[94px] top-[-18px] left-[-24px]">
                    <div className="absolute h-[19px] top-[31px] left-[84px] [font-family:'Pretendard-SemiBold',_Helvetica] font-semibold text-black text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                      NFT 생성
                    </div>
                    <img src="nftlogo.png" className="absolute w-[40px] h-[35px] top-6 left-9" alt="Video player" />
                    {/* <img className="absolute w-[112px] h-[94px] top-0 left-0" alt="Video player" /> */}
                  </div>
                </button>
                {/* <button
                  onClick={goToMypage}
                  className="absolute w-[154px] h-[48px] top-0 left-[310px] bg-black rounded-full shadow-[0px_4px_4px_#00000040] all-[unset] box-border"
                >
                  <div className="absolute h-[19px] top-[13px] left-[56px] text-white [font-family:'Pretendard-SemiBold',_Helvetica] font-semibold text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                    마이페이지
                  </div>
                  <img
                    src="avatar.png"
                    className="absolute w-[33px] h-[33px] top-[7px] left-[10px] object-cover"
                    alt="Avatars avatar"
                  />
                </button> */}
                <Menu>
                  <MenuHandler>
                    <Button
                      onClick={goToMypage}
                      className="absolute w-[154px] h-[48px] top-0 left-[310px] bg-black rounded-full shadow-[0px_4px_4px_#00000040] all-[unset] box-border"
                    >
                      <div className="absolute h-[19px] top-[13px] left-[56px] text-white [font-family:'Pretendard-SemiBold',_Helvetica] font-semibold text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        마이페이지
                      </div>
                      <img src="avatar.png" className="absolute w-[33px] h-[33px] top-[7px] left-[10px] object-cover" alt="Avatars avatar" />
                    </Button>
                  </MenuHandler>
                  <MenuList className="absolute top-0 left-0">
                    <MenuItem>Connect Wallet</MenuItem>
                    <MenuItem>나의 NFT</MenuItem>
                    <MenuItem>구매 이력</MenuItem>
                    <MenuItem>판매 이력</MenuItem>
                    <MenuItem>위시리스트</MenuItem>
                    <MenuItem>로그아웃</MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
    </>
  )
};