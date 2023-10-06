import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  List,
Dialog, Typography, Card, CardBody, CardFooter, CardHeader
} from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { MyNft } from "./MyNft";
import { Purchase } from "./Purchase";
import { Sales } from "./Sales";
import { LikeNft } from "./LikeNft";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { MyWishList } from "./MyWishList";

export function MyPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("myNft");
  const [userInfo, setUserInfo] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(!open); };

  const data = [
    {
      value: "myNft",
      label: "나의 NFT",
    },
    {
      value: "purchaseList",
      label: "구매 내역",
    },
    {
      value: "salesList",
      label: "판매 내역",
    },
    {
      value: "LikeNft",
      label: "내가 좋아요 한 NFT",
    },
    {
      value: "MyWishList",
      label: "위시리스트",
    },
  ];

  // 정보 조회
  useEffect(() => {
    async function getuserInfo() {
      try {
        const response = await axios.get(`/api/myPage/info`);
        if (response.status === 200) {
          setUserInfo(response.data.response);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log("실패", error);
      }
    }
    getuserInfo();
  }, []);

  // 정보 수정
  async function updateInfo() {
    try {
      const data = {
        password: "string",
        nickname: "string",
        profileImage: "string",
      };
      const response = await axios.put(`/api/myPage/info`, data);
      console.log("성공", response);
    } catch (error) {
      console.log("실패", error);
    }
  }

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <div className="flex flex-row justify-center w-full bg-white">
        <div className="bg-white w-[1440px] h-[1024px] relative">
          {/* <div className="flex flex-col w-[1382px] h-[800px] items-start p-[24px] absolute top-[165px] left-[29px] rounded-[16px] overflow-hidden bg-cover bg-[50%_50%]">
              <div className="w-[1382px] h-[800px] left-0 bg-[#0000008a] absolute top-0" />
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
              </div>
            </div> */}

          <div className="mt-36">
            {/* <div className="text-right mb-3">
              <Button onClick={handleOpen}>내 정보</Button>
            </div> */}

          <Dialog
          size="sm"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
          >
            <Card className="mx-auto w-full max-w-[48rem]">
              <CardHeader
                variant="gradient"
                color="green"
                className="grid mb-4 h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  내 정보
                </Typography>
              </CardHeader>

                <CardBody className="grid grid-cols-3 gap-4">  

                </CardBody>
              
              <CardFooter className="pt-0">
                <Button variant="gradient" onClick={() => {handleOpen();}} fullWidth>닫기</Button>
              </CardFooter>
            </Card>
          </Dialog>
            
            <Tabs value={selectedTab}>
              <TabsHeader>
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setSelectedTab(value)}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                <TabPanel value="myNft">
                  <MyNft></MyNft>
                </TabPanel>
                <TabPanel value="purchaseList">
                  <Purchase></Purchase>
                </TabPanel>
                <TabPanel value="salesList">
                  <Sales></Sales>
                </TabPanel>
                <TabPanel value="LikeNft">
                  <LikeNft></LikeNft>
                </TabPanel>
                <TabPanel value="MyWishList">
                  <MyWishList></MyWishList>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
          <TopNavBar></TopNavBar>
        </div>
      </div>
      {/* </header> */}
    </div>
  );
}
