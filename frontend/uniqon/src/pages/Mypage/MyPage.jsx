import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuHandler, MenuList, MenuItem, Button } from '@material-tailwind/react';

export function MyPage() {
  const navigate = useNavigate();

  async function getuserInfo() {
    try {
      const response = await axios.get(`http://localhost:8080/api/maypage/info/${1}`);
      console.log('성공', response);
    } catch (error) {
      console.log('실패', error);
    }
  }

  async function updateInfo() {
    try {
      const data = {
        password: 'string',
        nickname: 'string',
        profileImage: 'string'
      };
      const response = await axios.put(`http://localhost:8080/api/mypage/info`, data);
      console.log('성공', response);
    } catch (error) {
      console.log('실패', error);
    }
  }

  async function likeCollections() {
    try {
      const response = await axios.post(`http://localhost:8080/api/mypage/nft/${1}`);
      console.log('성공', response);
    } catch (error) {
      console.log('실패', error);
    }
  }

  async function deleteCollections() {
    try {
      const response = await axios.delete(`http://localhost:8080/api/mypage/nft/${1}`);
      console.log('성공', response);
    } catch (error) {
      console.log('실패', error);
    }
  }

  async function likeCollecList() {
    try {
      const response = await axios.get(`http://localhost:8080/api/mypage/nft`);
      console.log('성공', response);
    } catch (error) {
      console.log('실패', error);
    }
  }

  async function purchaseList() {
    try {
      const resonse = await axios.get(`http://localhost:8080/api/mypage/shoppingList`);
      console.log('성공', resonse);
    } catch (error) {
      console.log('실패', error);
    }
  }

  async function salesList() {
    try {
      const response = await axios.get(`http://localhost:8080/api/mypage/postList`);
      console.log('성공', response);
    } catch (error) {
      console.log('실패', error);
    }
  }

  // 마켓플레이스(거래 목록 페이지)로 이동
  const goToTransaction = () => {
    navigate('/transaction');
  };

  // 도감 페이지로 이동
  const goToCollection = () => {
    navigate('/collections');
  };

  const createNFT = () => {
    navigate('/nft');
  };

  const goToMypage = () => {
    navigate('/mypage');
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>MyPage</p>
        <br></br>
        <Button className="bg-red-500" onClick={getuserInfo}>
          정보 조회
        </Button>
        <br></br>
        <Button className="bg-orange-500" onClick={updateInfo}>
          정보 수정
        </Button>
        <br></br>
        <Button className="bg-yellow-600" onClick={likeCollections}>
          좋아요 도감
        </Button>
        <br></br>
        <Button className="bg-green-600" onClick={deleteCollections}>
          좋아요 도감 제거
        </Button>
        <br></br>
        <Button className="bg-blue-600" onClick={likeCollecList}>
          좋아요 도감 리스트
        </Button>
        <br></br>
        <Button className="bg-indigo-700" onClick={purchaseList}>
          구매 목록
        </Button>
        <br></br>
        <Button className="bg-purple-500" sonClick={salesList}>
          판매 목록
        </Button>
        <br></br>

        <div className="bg-white flex flex-row justify-center w-full">
          <div className="bg-white w-[1440px] h-[1024px] relative">
            <div className="flex flex-col w-[1382px] h-[400px] items-start p-[24px] absolute top-[165px] left-[29px] rounded-[16px] overflow-hidden bg-cover bg-[50%_50%]">
              <div className="w-[1382px] h-[400px] left-0 bg-[#0000008a] absolute top-0" />
              <div className="flex w-[1309px] items-start gap-[32px] relative flex-[0_0_auto] mb-[-8.00px]">
                <div className="flex flex-col w-[217px] h-[357px] items-start justify-end gap-[24px] relative">
                  <div className="flex flex-col items-start justify-end pl-0 pr-[110.75px] pt-[249px] pb-0 relative self-stretch w-full flex-[0_0_auto] mt-[-107.00px]">
                    <div className="inline-flex flex-col items-start px-0 py-[24px] relative flex-[0_0_auto]">
                      <div className="inline-flex items-center pl-[17px] pr-[26.03px] py-[7px] relative flex-[0_0_auto] bg-[#ffffff33] rounded-full">
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Consolas-Regular',_Helvetica] font-normal text-white text-[16px] tracking-[0] leading-[20px] whitespace-nowrap">
                          My NFTs
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto] mr-[-123.00px]">
                      <div className="inline-flex flex-col max-w-[720px] items-start pl-0 pr-[12.25px] py-0 relative flex-[0_0_auto]">
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Segoe_UI-Semibold',_Helvetica] font-normal text-white text-[32px] tracking-[-0.64px] leading-[32px] whitespace-nowrap">
                          나의 NFTs
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
                            <img className="relative max-w-[340px] w-[340px] h-[233px]" alt="Nft png" />
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
                            <img className="h-[235px] relative max-w-[340px] w-[340px]" alt="Nft png" />
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
                            <img className="h-[236px] relative max-w-[340px] w-[340px]" alt="Nft png" />
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
            <div className="flex max-w-[1600px] w-[1440px] min-h-[80px] items-center justify-between pl-[24px] pr-[24.01px] py-[16px] absolute top-[2px] left-0">
              <div className="relative flex-1 grow h-[36px]">
                <img
                  className="absolute w-[171px] h-[79px] top-[-22px] left-[4px] object-cover"
                  src="logo.png"
                  alt="Link foundation logo"
                />
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
                      <img
                        src="avatar.png"
                        className="absolute w-[33px] h-[33px] top-[7px] left-[10px] object-cover"
                        alt="Avatars avatar"
                      />
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
          </div>
        </div>
      </header>
    </div>
  );
}
