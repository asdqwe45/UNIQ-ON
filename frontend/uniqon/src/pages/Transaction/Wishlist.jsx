import React from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { TopNavBar } from "../../components/Common/TopNavBar";

export function Wishlist() {
  async function getWishlist() {
    try {
      const res = await axios.get(`/api/wishlist`, {
        params: {
          page: 0,
          size: 10,
        },
      });
      if (res.status === 200 && res.data.success) {
        console.log(res.data.response.content);
      } else if (res.data.error.status === 404) {
        alert("위시리스트가 존재하지 않습니다");
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteWishlist() {
    const wishListId = 2;
    try {
      const res = await axios.delete(`/api/wishlist/${wishListId}`);
      if (res.status === 200 && res.data.success) {
        alert(`위시리스트에 정상적으로 삭제되었습니다.`);
      } else {
        console.log(res.data.error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function addWishlist() {
    const postId = 5;
    try {
      const res = await axios.post(`/api/wishlist/add/${postId}`);
      if (res.status === 200 && res.data.success) {
        alert(`위시리스트에 ${postId}번 포스트가 정상적으로 등록되었습니다.`);
      } else {
        console.log(res.data.error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-row justify-center w-full bg-white">
          <div className="bg-white w-[1440px] h-[1024px] relative">
            <TopNavBar />
            <div className="flex flex-col w-[1382px] h-[400px] items-start p-[24px] absolute top-[165px] left-[29px] rounded-[16px] overflow-hidden bg-cover bg-[50%_50%]">
              <div className="w-[1382px] h-[400px] left-0 bg-[#0000008a] absolute top-0" />
              <div className="flex w-[1309px] items-start gap-[32px] relative flex-[0_0_auto] mb-[-8.00px]">
                <div className="flex flex-col w-[217px] h-[357px] items-start justify-end gap-[24px] relative">
                  <div className="flex flex-col items-start justify-end pl-0 pr-[110.75px] pt-[249px] pb-0 relative self-stretch w-full flex-[0_0_auto] mt-[-107.00px]">
                    <div className="inline-flex flex-col items-start px-0 py-[24px] relative flex-[0_0_auto]">
                      <div className="inline-flex items-center pl-[17px] pr-[26.03px] py-[7px] relative flex-[0_0_auto] bg-[#ffffff33] rounded-full">
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Consolas-Regular',_Helvetica] font-normal text-white text-[16px] tracking-[0] leading-[20px] whitespace-nowrap">
                          Wishlist
                        </div>
                        <Button onClick={deleteWishlist}>위시리스트 삭제</Button>
                        <Button onClick={addWishlist}>위시리스트 추가</Button>
                        <Button onClick={getWishlist}>getWishlist</Button>
                      </div>
                    </div>
                    <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto] mr-[-123.00px]">
                      <div className="inline-flex flex-col max-w-[720px] items-start pl-0 pr-[12.25px] py-0 relative flex-[0_0_auto]">
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-white text-[32px] tracking-[-0.64px] leading-[32px] whitespace-nowrap">
                          나의 Wishlist
                        </div>
                      </div>
                      <div className="inline-flex items-center pl-0 pr-[167.91px] py-0 relative flex-[0_0_auto]">
                        <div className="inline-flex flex-col items-start pl-0 pr-[3.34px] py-0 relative flex-[0_0_auto]">
                          <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-white text-[16px] tracking-[0] leading-[normal]">
                            33 NFTs
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start pl-0 pr-[157.56px] py-0 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex-col items-start mr-[-123.00px] inline-flex relative flex-[0_0_auto]">
                      <div className="inline-flex h-[48px] items-center justify-center pl-[9px] pr-[13px] py-[8px] relative bg-[#ffffff33] rounded-full">
                        <div className="inline-flex max-w-[182.44px] items-center gap-[6px] relative flex-[0_0_auto]">
                          <div className="relative w-[32px] h-[32px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] bg-cover bg-[50%_50%]" />
                          <div className="relative w-[122.44px] h-[20px]">
                            <div className="absolute h-[20px] top-[-2px] left-[25px] [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-white text-[16px] text-center tracking-[0] leading-[20px] whitespace-nowrap">
                              @JeBread
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-[988px] items-start gap-[32px] relative">
                  <div className="inline-flex flex-col min-w-[340px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
                    <div className="inline-flex flex-col h-[233px] items-start relative">
                      <div className="inline-flex flex-col h-[278px] items-start relative mb-[-45.00px]">
                        <img className="relative max-w-[340px] w-[340px] h-[233px]" alt="Nft png" />
                      </div>
                    </div>
                    <div className="inline-flex flex-col items-start p-[20px] relative flex-[0_0_auto]">
                      <div className="inline-flex items-start justify-around pl-0 pr-[166.86px] py-0 relative flex-[0_0_auto]">
                        <div className="max-w-[133.14px] items-center gap-[6px] inline-flex relative flex-[0_0_auto]">
                          <div className="relative w-[20px] h-[20px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] bg-cover bg-[50%_50%]" />
                          <div className="relative w-[107.14px] h-[17.5px]">
                            <div className="absolute h-[18px] top-[-2px] left-0 [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#000000b2] text-[14px] tracking-[0] leading-[17.5px] whitespace-nowrap">
                              @JeBread
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute w-[340px] h-px top-0 left-0 bg-[#0000000d]" />
                      <div className="inline-flex items-end justify-between pt-[16px] pb-0 px-0 relative flex-[0_0_auto]">
                        <div className="inline-flex flex-col items-start gap-[2px] relative flex-[0_0_auto]">
                          <div className="inline-flex flex-col items-start pl-0 pr-[40.53px] py-0 relative flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#00000099] text-[14px] tracking-[0] leading-[normal]">
                              Last sold
                            </div>
                          </div>
                          <div className="relative w-fit [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#00000099] text-[20px] tracking-[0] leading-[normal]">
                            0.273 ETH
                          </div>
                        </div>
                        <div className="inline-flex items-start justify-around pr-[7.63e-06px] pl-[106.52px] py-px relative flex-[0_0_auto]">
                          <div className="max-w-[96.95px] items-center gap-[6px] inline-flex relative flex-[0_0_auto]">
                            <div className="relative w-[20px] h-[20px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] bg-cover bg-[50%_50%]" />
                            <div className="relative w-[70.95px] h-[17.5px]">
                              <div className="absolute h-[18px] top-[-2px] left-0 [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#000000b2] text-[14px] tracking-[0] leading-[17.5px] whitespace-nowrap">
                                @MJRoark
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex flex-col min-w-[340px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
                    <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                      <div className="inline-flex flex-col h-[235px] items-start relative">
                        <img className="h-[235px] relative max-w-[340px] w-[340px]" alt="Nft png" />
                      </div>
                    </div>
                    <div className="inline-flex flex-col items-start p-[20px] relative flex-[0_0_auto]">
                      <div className="inline-flex items-start justify-around pl-0 pr-[166.86px] py-0 relative flex-[0_0_auto]">
                        <div className="max-w-[133.14px] items-center gap-[6px] inline-flex relative flex-[0_0_auto]">
                          <div className="relative w-[20px] h-[20px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] bg-cover bg-[50%_50%]" />
                          <div className="relative w-[107.14px] h-[17.5px]">
                            <div className="absolute h-[18px] top-[-2px] left-0 [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#000000b2] text-[14px] tracking-[0] leading-[17.5px] whitespace-nowrap">
                              @JeBread
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex items-end justify-between pt-[16px] pb-0 px-0 relative flex-[0_0_auto]">
                        <div className="inline-flex flex-col items-start gap-[2px] relative flex-[0_0_auto]">
                          <div className="pl-0 pr-[30.81px] py-0 inline-flex flex-col items-start relative flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#00000099] text-[14px] tracking-[0] leading-[normal]">
                              Last sold
                            </div>
                          </div>
                          <div className="relative w-fit [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#00000099] text-[20px] tracking-[0] leading-[normal]">
                            0.40 ETH
                          </div>
                        </div>
                        <div className="inline-flex items-start justify-around pl-[94.8px] pr-0 py-px relative flex-[0_0_auto]">
                          <div className="max-w-[118.39px] items-center gap-[6px] inline-flex relative flex-[0_0_auto]">
                            <div className="relative w-[20px] h-[20px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] [background:linear-gradient(180deg,_rgb(253,_34,_173)_0%,_rgb(237,_86,_85)_100%)]" />
                            <div className="inline-flex flex-col items-start pl-0 pr-[13.39px] py-0 relative flex-[0_0_auto]">
                              <div className="relative w-fit mt-[-1.00px] [font-family:'Consolas-Regular',_Helvetica] font-normal text-[#000000b2] text-[13px] tracking-[0] leading-[16.2px] whitespace-nowrap">
                                0xAE06…3d2F
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute w-[340px] h-px top-0 left-0 bg-[#0000000d]" />
                    </div>
                  </div>
                  <div className="inline-flex flex-col min-w-[340px] items-start relative flex-[0_0_auto] mr-[-96.00px] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
                    <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                      <div className="inline-flex flex-col h-[236px] items-start relative">
                        <img className="h-[236px] relative max-w-[340px] w-[340px]" alt="Nft png" />
                      </div>
                      <div className="top-[236px] absolute w-[340px] h-px left-0 bg-[#0000000d]" />
                    </div>
                    <div className="inline-flex flex-col items-start p-[20px] relative flex-[0_0_auto]">
                      <div className="inline-flex items-start justify-around pl-0 pr-[166.86px] py-0 relative flex-[0_0_auto]">
                        <div className="max-w-[133.14px] items-center gap-[6px] inline-flex relative flex-[0_0_auto]">
                          <div className="relative w-[20px] h-[20px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] bg-cover bg-[50%_50%]" />
                          <div className="relative w-[107.14px] h-[17.5px]">
                            <div className="absolute h-[18px] top-[-2px] left-0 [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#000000b2] text-[14px] tracking-[0] leading-[17.5px] whitespace-nowrap">
                              @JeBread
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex items-end justify-between pt-[16px] pb-0 px-0 relative flex-[0_0_auto]">
                        <div className="inline-flex flex-col items-start gap-[2px] relative flex-[0_0_auto]">
                          <div className="pl-0 pr-[42.25px] py-0 inline-flex flex-col items-start relative flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#00000099] text-[14px] tracking-[0] leading-[normal]">
                              Last sold
                            </div>
                          </div>
                          <div className="relative w-fit [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#00000099] text-[20px] tracking-[0] leading-[normal]">
                            0.555 ETH
                          </div>
                        </div>
                        <div className="inline-flex items-start justify-around pl-[83.36px] pr-0 py-px relative flex-[0_0_auto]">
                          <div className="max-w-[118.39px] items-center gap-[6px] inline-flex relative flex-[0_0_auto]">
                            <div className="relative w-[20px] h-[20px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] [background:linear-gradient(180deg,_rgb(84,_188,_251)_0%,_rgb(67,_66,_243)_100%)]" />
                            <div className="inline-flex flex-col items-start pl-0 pr-[13.39px] py-0 relative flex-[0_0_auto]">
                              <div className="relative w-fit mt-[-1.00px] [font-family:'Consolas-Regular',_Helvetica] font-normal text-[#000000b2] text-[13px] tracking-[0] leading-[16.2px] whitespace-nowrap">
                                0x131C…a65E
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[1382px] h-[400px] items-start p-[24px] absolute top-[565px] left-[29px] rounded-[16px] overflow-hidden bg-cover bg-[50%_50%]">
              <div className="w-[1382px] h-[400px] left-0 bg-[#0000008a] absolute top-0" />
              <div className="flex w-[1309px] items-start gap-[32px] relative flex-[0_0_auto] mb-[-8.00px]">
                <div className="flex flex-col w-[217px] h-[357px] items-start justify-end gap-[24px] relative">
                  <div className="flex flex-col items-start justify-end pl-0 pr-[110.75px] pt-[249px] pb-0 relative self-stretch w-full flex-[0_0_auto] mt-[-107.00px]">
                    <div className="relative flex-[0_0_auto]" />
                    <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto] mr-[-65.00px]">
                      <div className="relative max-w-[720px] flex-[0_0_auto]" />
                      <div className="inline-flex items-center pl-0 pr-[167.91px] py-0 relative flex-[0_0_auto]">
                        <div className="relative flex-[0_0_auto]" />
                      </div>
                    </div>
                  </div>
                  <div className="relative self-stretch w-full flex-[0_0_auto]" />
                </div>
                <div className="flex w-[988px] items-start gap-[32px] relative">
                  <div className="inline-flex flex-col min-w-[340px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
                    <div className="inline-flex flex-col h-[233px] items-start relative">
                      <div className="inline-flex flex-col h-[278px] items-start relative mb-[-45.00px] overflow-hidden">
                        <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                            <img
                              className="relative max-w-[340px] w-[340px] h-[233px]"
                              alt="Nft png"
                            />
                          </div>
                          <div className="top-[339px] absolute w-[340px] h-px left-0 bg-[#0000000d]" />
                        </div>
                        <div className="relative max-w-[340px] w-[340px] h-[233px]" />
                      </div>
                    </div>
                    <div className="inline-flex flex-col items-start p-[20px] relative flex-[0_0_auto]">
                      <div className="inline-flex items-start justify-around pl-0 pr-[166.86px] py-0 relative flex-[0_0_auto]">
                        <div className="max-w-[133.14px] items-center gap-[6px] inline-flex relative flex-[0_0_auto]">
                          <div className="relative w-[20px] h-[20px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] bg-cover bg-[50%_50%]" />
                          <div className="relative w-[107.14px] h-[17.5px]">
                            <div className="absolute h-[18px] top-[-2px] left-0 [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#000000b2] text-[14px] tracking-[0] leading-[17.5px] whitespace-nowrap">
                              @JeBread
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute w-[340px] h-px top-0 left-0 bg-[#0000000d]" />
                      <div className="inline-flex items-end justify-between pt-[16px] pb-0 px-0 relative flex-[0_0_auto]">
                        <div className="inline-flex flex-col items-start gap-[2px] relative flex-[0_0_auto]">
                          <div className="inline-flex flex-col items-start pl-0 pr-[40.53px] py-0 relative flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#00000099] text-[14px] tracking-[0] leading-[normal]">
                              Last sold
                            </div>
                          </div>
                          <div className="relative w-fit [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#00000099] text-[20px] tracking-[0] leading-[normal]">
                            0.63 ETH
                          </div>
                        </div>
                        <div className="inline-flex items-start justify-around pr-[7.63e-06px] pl-[106.52px] py-px relative flex-[0_0_auto]">
                          <div className="max-w-[96.95px] items-center gap-[6px] inline-flex relative flex-[0_0_auto]">
                            <div className="relative w-[20px] h-[20px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] bg-cover bg-[50%_50%]" />
                            <div className="relative w-[70.95px] h-[17.5px]">
                              <div className="absolute h-[18px] top-[-2px] left-0 [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#000000b2] text-[14px] tracking-[0] leading-[17.5px] whitespace-nowrap">
                                @MJRoark
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex flex-col min-w-[340px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
                    <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                      <div className="inline-flex flex-col h-[235px] items-start relative overflow-hidden">
                        <div className="flex flex-col w-[340px] items-start relative flex-[0_0_auto]">
                          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                            <img
                              className="h-[235px] relative max-w-[340px] w-[340px]"
                              alt="Nft png"
                            />
                          </div>
                          <div className="top-[339px] absolute w-[340px] h-px left-0 bg-[#0000000d]" />
                        </div>
                        <div className="h-[340px] relative max-w-[340px] w-[340px]" />
                      </div>
                    </div>
                    <div className="inline-flex flex-col items-start p-[20px] relative flex-[0_0_auto]">
                      <div className="inline-flex items-start justify-around pl-0 pr-[166.86px] py-0 relative flex-[0_0_auto]">
                        <div className="max-w-[133.14px] items-center gap-[6px] inline-flex relative flex-[0_0_auto]">
                          <div className="relative w-[20px] h-[20px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] bg-cover bg-[50%_50%]" />
                          <div className="relative w-[107.14px] h-[17.5px]">
                            <div className="absolute h-[18px] top-[-2px] left-0 [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#000000b2] text-[14px] tracking-[0] leading-[17.5px] whitespace-nowrap">
                              @JeBread
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex items-end justify-between pt-[16px] pb-0 px-0 relative flex-[0_0_auto]">
                        <div className="inline-flex flex-col items-start gap-[2px] relative flex-[0_0_auto]">
                          <div className="pl-0 pr-[30.81px] py-0 inline-flex flex-col items-start relative flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#00000099] text-[14px] tracking-[0] leading-[normal]">
                              Last sold
                            </div>
                          </div>
                          <div className="relative w-fit [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#00000099] text-[20px] tracking-[0] leading-[normal]">
                            0.33 ETH
                          </div>
                        </div>
                        <div className="inline-flex items-start justify-around pl-[94.8px] pr-0 py-px relative flex-[0_0_auto]">
                          <div className="max-w-[118.39px] items-center gap-[6px] inline-flex relative flex-[0_0_auto]">
                            <div className="relative w-[20px] h-[20px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] [background:linear-gradient(180deg,_rgb(253,_34,_173)_0%,_rgb(237,_86,_85)_100%)]" />
                            <div className="inline-flex flex-col items-start pl-0 pr-[13.39px] py-0 relative flex-[0_0_auto]">
                              <div className="relative w-fit mt-[-1.00px] [font-family:'Consolas-Regular',_Helvetica] font-normal text-[#000000b2] text-[13px] tracking-[0] leading-[16.2px] whitespace-nowrap">
                                0xAE06…3d2F
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute w-[340px] h-px top-0 left-0 bg-[#0000000d]" />
                    </div>
                  </div>
                  <div className="inline-flex flex-col min-w-[340px] items-start relative flex-[0_0_auto] mr-[-96.00px] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
                    <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                      <div className="inline-flex flex-col h-[236px] items-start relative overflow-hidden">
                        <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                            <img
                              className="h-[236px] relative max-w-[340px] w-[340px]"
                              alt="Nft png"
                            />
                          </div>
                          <div className="top-[339px] absolute w-[340px] h-px left-0 bg-[#0000000d]" />
                        </div>
                        <div className="h-[340px] relative max-w-[340px] w-[340px]" />
                      </div>
                      <div className="top-[236px] absolute w-[340px] h-px left-0 bg-[#0000000d]" />
                    </div>
                    <div className="inline-flex flex-col items-start p-[20px] relative flex-[0_0_auto]">
                      <div className="inline-flex items-start justify-around pl-0 pr-[166.86px] py-0 relative flex-[0_0_auto]">
                        <div className="max-w-[133.14px] items-center gap-[6px] inline-flex relative flex-[0_0_auto]">
                          <div className="relative w-[20px] h-[20px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] bg-cover bg-[50%_50%]" />
                          <div className="relative w-[107.14px] h-[17.5px]">
                            <div className="absolute h-[18px] top-[-2px] left-0 [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#000000b2] text-[14px] tracking-[0] leading-[17.5px] whitespace-nowrap">
                              @JeBread
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex items-end justify-between pt-[16px] pb-0 px-0 relative flex-[0_0_auto]">
                        <div className="inline-flex flex-col items-start gap-[2px] relative flex-[0_0_auto]">
                          <div className="pl-0 pr-[42.25px] py-0 inline-flex flex-col items-start relative flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#00000099] text-[14px] tracking-[0] leading-[normal]">
                              Last sold
                            </div>
                          </div>
                          <div className="relative w-fit [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-[#00000099] text-[20px] tracking-[0] leading-[normal]">
                            0.15 ETH
                          </div>
                        </div>
                        <div className="inline-flex items-start justify-around pl-[83.36px] pr-0 py-px relative flex-[0_0_auto]">
                          <div className="max-w-[118.39px] items-center gap-[6px] inline-flex relative flex-[0_0_auto]">
                            <div className="relative w-[20px] h-[20px] rounded-full shadow-[inset_0px_0px_0px_1px_#0000000d] [background:linear-gradient(180deg,_rgb(84,_188,_251)_0%,_rgb(67,_66,_243)_100%)]" />
                            <div className="inline-flex flex-col items-start pl-0 pr-[13.39px] py-0 relative flex-[0_0_auto]">
                              <div className="relative w-fit mt-[-1.00px] [font-family:'Consolas-Regular',_Helvetica] font-normal text-[#000000b2] text-[13px] tracking-[0] leading-[16.2px] whitespace-nowrap">
                                0x131C…a65E
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute w-[327px] h-[29px] top-[109px] left-[29px]">
              <div className="inline-flex items-center gap-[16px] absolute top-0 left-0 shadow-[0px_4px_4px_#00000040]">
                <div className="inline-flex items-center justify-center gap-[10px] px-[12px] py-[6px] relative flex-[0_0_auto] bg-[#353945] rounded-[100px]">
                  <button className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-Bold',_Helvetica] font-bold text-[#fbfcfc] text-[14px] tracking-[0] leading-[16px] whitespace-nowrap">
                    나의 NFT
                  </button>
                </div>
              </div>
              <div className="flex w-[245px] items-center justify-center gap-[20px] px-[12px] py-[6px] absolute top-px left-[82px] rounded-[100px]">
                <button className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-Bold',_Helvetica] font-bold text-[#777e90] text-[14px] tracking-[0] leading-[16px] whitespace-nowrap">
                  구매 이력
                </button>
                <button className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-Bold',_Helvetica] font-bold text-[#777e90] text-[14px] tracking-[0] leading-[16px] whitespace-nowrap">
                  판매 이력
                </button>
                <button className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-Bold',_Helvetica] font-bold text-[#777e90] text-[14px] tracking-[0] leading-[16px] whitespace-nowrap">
                  위시리스트
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
