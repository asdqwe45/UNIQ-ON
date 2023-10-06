import { Card, CardHeader, CardBody, Typography, CardFooter, Button } from "@material-tailwind/react";
import axios from "axios"
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode"
   
  export function UserIdCard({onConfirm}) {
    const [userInfo, setUserInfo] = useState({});

    // 유저 정보 불러오기
    useEffect(() => {
        async function getuserInfo() {
          try {
            const response = await axios.get(`/api/myPage/info`);
            if (response.status === 200) {
            console.log(response.data.response);
              // setUserInfo(response.data.response);
              const vpPayload=jwtDecode(response.data.response.vpToken)
              const vcPayload=jwtDecode(vpPayload.vp.verifiableCredential[0])
              const userData={
                ...vcPayload.vc.credentialSubject.data,
                nbf:vcPayload.nbf,
                exp:vcPayload.exp,
                walletAddress:vcPayload.sub.split(":").pop(),
                nickname:response.data.response.nickname,
              }
              console.log(userData)
              setUserInfo(userData)
            } else {
              console.log(response);
            }
          } catch (error) {
            console.log("실패", error);
          }
        }
        getuserInfo();
      }, []);

    return (
      <>
    {/* <div className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card
        shadow={false}
        className="relative grid h-[40rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
        
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
        >
          <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>

        <CardBody className="relative px-6 py-14 md:px-12">
        
        <Typography variant="h5" className="mb-4 text-blue-400">
        {userInfo.nickname}
        </Typography>
        <img src="/userIcon.png"  className="w-1/5 mx-auto" alt="User Icon" /> 

        <div>
            <div>{userInfo.name}</div>
            <div>{userInfo.gender}</div>
            <div>{userInfo.birth}</div>
            <div>{userInfo.walletAddress}</div>
            
            <div>{new Date(userInfo.nbf*1000).toLocaleString()}</div>
            
            <div>{new Date(userInfo.exp*1000).toLocaleString()}</div>
        </div>

        <CardFooter className="pt-3">
            <Button size="lg" color="blue" fullWidth={true} onClick={onConfirm}>
                확인
            </Button>
         </CardFooter>

        </CardBody>

      </Card>
    </div> */}
    <div className="fixed top-1/2 left-[700px] transform -translate-x-1/2 -translate-y-1/2">
    <Card className="w-100">
      <Typography className="mt-3 font-semibold">
      DITI 인증서
      </Typography>
      <CardHeader floated={false} className="flex h-50" style={{ backgroundColor: '#333' }}s>
      <lord-icon
        src="https://cdn.lordicon.com/cqgtrhpg.json"
        trigger="hover"
        colors="outline:#131432,primary:#606874,secondary:#4bb3fd,tertiary:#ebe6ef"
        style={{ width: "180px", height: "180px", left:"12px" }}>
      </lord-icon>
      <lord-icon
        src="https://cdn.lordicon.com/ccwgfhfg.json"
        trigger="hover"
        colors="outline:#121331,primary:#92140c,secondary:#4bb3fd,tertiary:#ebe6ef"
        style={{ width: "160px", height: "160px", top: "10px", right:"-15px" }}>
      </lord-icon>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
        {userInfo.name}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
        {userInfo.gender}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
        {userInfo.birth}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
        {userInfo.walletAddress}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
        발급시간 | {new Date(userInfo.nbf*1000).toLocaleString()}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
        유효기한 | {new Date(userInfo.exp*1000).toLocaleString()}
        </Typography>
      </CardBody>
      <CardFooter className="pt-3">
            <Button size="lg" className="flex flex-col items-center justify-center text-center bg-gradient-to-r to-green-300 from-[#438fff]" fullWidth={true} onClick={onConfirm}>

                <p className="text-lg">서비스 시작하기</p>
                <lord-icon
        src="https://cdn.lordicon.com/dykrlspk.json"
        trigger="hover"
        colors="outline:#121331,primary:#4bb3fd,secondary:#ebe6ef"
        style={{ width: "80px", height: "80px"}}>
      </lord-icon>
            </Button>
         </CardFooter>
    </Card>
    </div>
    </>
    );
  }