import { Button } from "@material-tailwind/react";
import { LoginButton } from "../../components/Auth/LoginButton"
import { SignUpButton } from "../../components/Auth/SignUpButton";
import useUserInfoStore from "../../stores/UserInfoStore";
import axios from "axios"

export function Login() {
  const {walletAddress, accessToken}=useUserInfoStore()
  // 정보 조회
  async function getMyPageInfo() {
    try {
      const response = await axios.get("/api/myPage/info/"+walletAddress,{
        headers:{
          Authorization: "Bearer " + accessToken
        }
      });
      console.log('성공', response);
    } catch (error) {
      console.log('실패', error);
    }
  }
  return (
    <div>
      <p>로그인 페이지</p>
      <LoginButton />
      <Button onClick={getMyPageInfo}>myPage 조회 테스트</Button>
    </div>
  );
}