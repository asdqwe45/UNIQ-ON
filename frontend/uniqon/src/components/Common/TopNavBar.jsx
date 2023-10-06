import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TiMediaRecord } from "react-icons/ti";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Badge,
  List,
  Input,
Dialog, Typography, Card, CardBody, CardFooter, CardHeader
} from "@material-tailwind/react";
import useUserInfoStore from "../../stores/UserInfoStore";

export function TopNavBar() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(!open); };
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const { accessToken, walletAddress } = useUserInfoStore();
  

  const goToLanding = () => {
    if (accessToken) {
      navigate("/transaction");
    } else {
      navigate("/");
    }
  };
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

  const goLogout = () => {
    const url = window.location.href;
    const nowUrl = url.split(":")[1];
    useUserInfoStore.getState().clearUserInfo();
    if (nowUrl === "//localhost") {
      window.location.href = "http://localhost:5001/api/users/logout";
    } else {
      window.location.href = "https://j9c201.p.ssafy.io/api/users/logout";
    }
    alert("로그아웃 되었습니다!");
  };

  const handleNicknameEdit = () => {
    setIsEditingNickname(true);
  };

  const handleNicknameCancel = () => {
    setNewNickname(userInfo.nickname);
    setIsEditingNickname(false);
  }

  const handleNicknameChange = async (e) => {
    // console.log(newNickname);
    // if (e.target.value.length < 3) {
    //   alert("3글자 이상 입력해주세요");
    //   return;
    // }
    setNewNickname(e.target.value);
    if (newNickname !== e.target.value) {
      try {
        const response = await axios.get(`/api/users/duplicate/${e.target.value}`)
        if (response.status === 200 && response.data.success) {
          setIsNicknameAvailable(true);
        } else {
          setIsNicknameAvailable(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNicknameSave = async () => {
    try {
      const response1 = await axios.get(`/api/users/duplicate/${newNickname}`)
      console.log(response1);
      if (response1.status === 200 && response1.data.success) {
        const response2 = await axios.put(`/api/myPage/info/${newNickname}`);
        console.log(response2);
        if (response2.status === 200) {
          alert("닉네임 변경이 완료되었습니다!");
        }
      } else {
        return;
      }
      
    } catch (error) {
      console.log(error);
    }
    
    setUserInfo({ ...userInfo, nickname: newNickname });
    setIsEditingNickname(false);
  };

  const getNotifications = async () => {
    try {
      const response = await axios.get("/api/notifications", {
        params: {
          page: 0,
          size: 10
        }
      });
      console.log("알림 가져오기 성공", response);
      setNotifications(response.data.response.content);
      
    } catch (error) {
      console.log("알림 가져오기 실패", error);
    }
  };

  const getMyInfo = async () => {
    try {
      const response = await axios.get(`/api/myPage/info`);
      if (response.status === 200) {
        setUserInfo(response.data.response);
        setNewNickname(response.data.response.nickname);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("실패", error);
    }
  };

    const deleteNotification =  async(notification) => {
    const notificationId = notification.notificationId;
    try {
      const response = await axios.delete(`/api/notifications/${notificationId}`);
      if (response.status === 200 && response.data.success) {
        console.log("알림 삭제 완료", response);
      } else {
        console.log("알림 삭제 실패!", response);
      }
      } catch (error) {
      console.log("알림 삭제 실패", error);
      };
      getNotifications();
      
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const handleShowNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <div className="flex max-w-[1600px] w-[1440px] min-h-[80px] items-center justify-between pl-[24px] pr-[24.01px] py-[16px] absolute top-[2px] left-0">
        <div className="relative flex-1 grow h-[36px]">
          <img
            onClick={goToLanding}
            className="absolute w-[171px] h-[79px] top-[-22px] left-[4px] object-cover"
            src="/logo.png"
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
          <div className="relative w-[400px] h-[48px] ml-[-26.67px] mr-[-26.67px]">
            <div className="relative h-[48px] rounded-full">
              {/* <div className="flex w-[500px] min-h-[48px] items-center pl-[48px] pr-[32px] py-px absolute top-0 left-0 bg-[#0000000d] rounded-full overflow-hidden">
                <div className="inline-flex flex-col items-start pl-0 pr-[330px] py-0 relative flex-[0_0_auto]">
                </div>
              </div> */}
            </div>
          </div>
        </div>
        
        <div className="w-[50px] h-[48px] relative flex-1 grow">
          <div className="flex">
            <button
              onClick={createNFT}
              className="absolute w-[154px] h-[48px] top-0 left-[131px] bg-[#f8f0f0] rounded-full shadow-[0px_4px_4px_#00000040] all-[unset] box-border"
            >
              <div className="relative w-[146px] h-[94px] top-[-18px] left-[-24px]">
                <div className="absolute h-[19px] top-[31px] left-[84px] [font-family:'Pretendard-SemiBold',_Helvetica] font-semibold text-black text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  NFT 생성
                </div>
                <img
                  src="/nftlogo.png"
                  className="absolute w-[34px] h-[32px] top-7 left-10"
                  alt="Video player"
                />
                {/* <img className="absolute w-[112px] h-[94px] top-0 left-0" alt="Video player" /> */}
              </div>
            </button>
            <Menu>
              <MenuHandler>
                <Button className="absolute w-[154px] h-[48px] top-0 left-[310px] bg-black rounded-full shadow-[0px_4px_4px_#00000040] all-[unset] box-border">
                  <div className="absolute h-[19px] top-[13px] left-[56px] text-white [font-family:'Pretendard-SemiBold',_Helvetica] font-semibold text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                    마이페이지
                  </div>
                  <img
                    src="/avatar.png"
                    className="absolute w-[33px] h-[33px] top-[7px] left-[10px] object-cover"
                    alt="Avatars avatar"
                  />
                </Button>
              </MenuHandler>
              <MenuList className="absolute top-0 left-0">
                <MenuItem onClick={() => { handleOpen(); getMyInfo();}}>내 정보</MenuItem>
                <MenuItem onClick={goToMypage}>마이페이지</MenuItem>
                <MenuItem onClick={goLogout}>로그아웃</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>

        <Dialog
          size="sm"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
          >
            <Card className="mx-auto w-full max-w-[48rem]">
              <CardHeader
                variant="gradient"
                color="yellow"
                className="grid mb-4 h-28 place-items-center"
              >
                <Typography variant="h3" color="black">
                  내 정보
                </Typography>
              </CardHeader>

                <CardBody className="grid grid-cols-3 gap-4">  
                  {userInfo && (
                    <div>
                      <List><strong>지갑 주소 : </strong>{userInfo.walletAddress}</List>
                      <List><strong>이름 : </strong>{userInfo.name}</List>
                      <List><strong>닉네임 : </strong>{isEditingNickname ? (
                    <div>
                    <Input
                      type="text"
                      // value={userInfo.nickname}
                      value={newNickname}
                      onChange={handleNicknameChange}
                      // placeholder={userInfo.niname}
                    />
                    {isNicknameAvailable ? (
                      <strong className="text-green-500">사용 가능한 닉네임입니다.</strong>
                    ) : (
                      <strong className="text-red-500">이미 사용 중인 닉네임입니다.</strong>
                    )}
                    </div>
                  ) : (
                    userInfo.nickname
                  )}
                    {isEditingNickname ? (
                      <div>
                        <Button onClick={handleNicknameSave}>변경 완료</Button>
                        <Button onClick={handleNicknameCancel}>취소</Button>
                      </div>
                    ) : (
                      <Button onClick={handleNicknameEdit}>닉네임 변경하기</Button>
                    )}</List>
                      <List><strong>성별 : </strong>{userInfo.gender}</List>
                      <List><strong>생년월일 : </strong>{userInfo.birth}</List>
                      {/* <List><strong>프로필 이미지 : </strong>{userInfo.profileImage}</List> */}
                    </div>
                  )}

                </CardBody>
              
              <CardFooter className="pt-0">
                <Button variant="gradient" onClick={() => {handleOpen();}} fullWidth>닫기</Button>
              </CardFooter>
            </Card>
          </Dialog>

        <div id="알림버튼" className="relative top-[2px] ml-[70px] left-[30px]">
          <Badge content={notifications.length}>
            <Button
              onClick={() => {
                getNotifications();
                handleShowNotifications();
              }}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 20"
              >
                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
              </svg>
            </Button>
          </Badge>
          {showNotifications && (
            <div
              className="absolute top-[48px] left-[-430px] bg-white p-4 rounded-lg shadow-md z-10"
              style={{
                width: "500px",
                maxWidth: "500px",
              }}
            >
              <ul style={{ color: "black" }}>
                {notifications.length === 0 ? (
                  <li style={{ fontSize: "15px" }}>알림이 없어용~</li>
                ) : (
                  notifications.map((notification, index) => (
                    <li key={index} style={{ fontSize: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "5px"
                        }}
                      >
                        <TiMediaRecord
                          style={{ marginRight: "0.5rem", fontSize: "15px" }}
                        ></TiMediaRecord>
                        등록하신 "{notification.postTitle}" 판매 글의 NFT가 판매
                        되었습니다.
                        {/* {notification.content} */}
                      <p
                        onClick={() => { deleteNotification(notification); } }
                        variant="outlined"
                        color="red"
                        className="ml-4 text-red-500 hover:underline cursor-pointer"
                      >
                        삭제
                      </p>
                      </div>

                      {index !== notifications.length - 1 && (
                        <hr className="border-t border-gray-300 my-2"></hr>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
