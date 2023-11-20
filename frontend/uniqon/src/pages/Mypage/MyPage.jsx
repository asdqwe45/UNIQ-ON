import axios from "axios";
import {
  Button,
  Dialog,
  Typography,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { MyNft } from "./MyNft";
import { Purchase } from "./Purchase";
import { Sales } from "./Sales";
import { LikeNft } from "./LikeNft";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { MyWishList } from "./MyWishList";

export function MyPage() {
  const [selectedTab, setSelectedTab] = useState("myNft");
  const [userInfo, setUserInfo] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

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
    } catch (error) {
      console.log("실패", error);
    }
  }

  return (
    <div className="App">
      <div className="flex flex-row justify-center w-full bg-white">
        <div className="bg-white w-[1440px] h-[1024px] relative">
          <div className="mt-36">
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
                <CardBody className="grid grid-cols-3 gap-4"> </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    variant="gradient"
                    onClick={() => {
                      handleOpen();
                    }}
                    fullWidth
                  >
                    닫기
                  </Button>
                </CardFooter>
              </Card>
            </Dialog>

            <Tabs value={selectedTab}>
              <TabsHeader>
                {data.map(({ label, value }) => (
                  <Tab key={value} value={value} onClick={() => setSelectedTab(value)}>
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
    </div>
  );
}
