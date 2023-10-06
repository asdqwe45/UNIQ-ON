import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from "@material-tailwind/react";
import axios from "axios"
import { ethers } from "ethers"
import useUserInfoStore from '../stores/UserInfoStore';
import { useConfigStore } from '../stores/ConfigStore';
// import { useNavigate } from 'react-router-dom'

// 요청
export function IssueCertTest() {
  const setPage = useConfigStore(s=>s.setPage)
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [wallet, setWallet] = useState({
    address: "",
    balance: "",
    chainId: "",
  })
  const inputFileRef = useRef(null)
  const userInfo = useUserInfoStore()
  // const navigate = useNavigate()

  // const walletAddress = useUserInforStore((state)=>state.walletAddress)
  // const {walletAddress, originalMessage, signedMessage } = useUserInfoStore()
  
  // const requestVC=useCallback(async ()=>{
  async function requestVC() {
        // 메타마스크 설치 확인
        if (typeof window.ethereum === 'undefined') {
          alert("MetaMask를 설치해주세요");
          // 메타마스크 홈페이지로 이동 
          // window.location.href = 'https://metamask.io/';
          const newTab = window.open('https://metamask.io/', '_blank');
          if (newTab) {
            newTab.focus();
          } else {
            alert('팝업 차단이 활성화되어 새 탭을 열 수 없습니다.');
          }
          return;
      }
  
      // 메타마스크 로그인 확인
      // if (!window.ethereum.selectedAddress) {
      console.log(userInfo.walletAddress)
      if (!userInfo.walletAddress||!userInfo.token||userInfo.token === "") {
          alert("MetaMask에 먼저 로그인 해주세요");
          // 로그인 페이지로 이동
          // window.location.href = '/diti/login';
          // navigate("/diti/login");
          setPage("landing")
          return;
      }
    // 백엔드 서버에 이 주소로 로그인하겠다는 것을 알려야 함. 신원 증명 필요. 
    // private key를 가지고 있고 서명을 만들 수 있다는 것을 증명
    // 임의의 메세지에 사인하는 것
    // const message = "Please issue a certificate"
    // const signedMessage = await signer.signMessage(message)
    // 백엔드 서버로, message와 signed message와 자신의 지갑 주소를 보내고, 백엔드에서 verifyMessage를 호출해서 나온 값이 자신의 주소와 일치해야 함 

    // const data = {
    //   "walletAddress": userInfo.walletAddress,
    //   "originalMessage": userInfo.originalMessage,
    //   "signedMessage": userInfo.signedMessage,
    // };

    const formData = new FormData()
    //formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }))
    // formData.append("walletAddress", data["walletAddress"])
    // formData.append("originalMessage", data["originalMessage"])
    // formData.append("signedMessage", data["signedMessage"])
    formData.append("imgFile", inputFileRef.current.files[0])

    try {
      const response = await axios.post("/diti/did/vc", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': userInfo.token,
          'walletAddress': userInfo.walletAddress,
        },
      });
      console.log(response)        
        
      if (response.status === 200) {
        console.log("VC발급 성공");
        alert("DITI 인증서 발급에 성공했습니다!")
        // navigate("/diti/check");
        setPage("check")
      } else {
        console.log('response : ', response);
      }


      } catch (e) {
        console.error(e)
        console.log(e.response.data);
        // console.log(e.response.status);
        if(e.response.status === 400) {
          alert(e.response.data)
          return
        }
      }
  }
  // },[userInfo.walletAddress])
  
  async function test() {
    // try {
    //   const response = await axios.get("/diti/did/test");
    //   console.log(response)
    // } catch (e) {
    //   console.error(e)
    // }

    // 임의의 메세지에 사인하는 것
    // const message = "Please issue a certificate"
    // const signedMessage = await signer.signMessage(message)

    // const data = {
      // "walletAddress": await signer.getAddress(),
      // "originalMessage": message,
      // "signedMessage": signedMessage,
    // };

    try {
      const response = await axios.get("/diti/did/vp/"+userInfo.walletAddress+"/idCard",{
        headers: {
          'Content-Type': 'application/json',
          // "walletAddress": data["walletAddress"],
          'walletAddress': userInfo.walletAddress,
          'Authorization': userInfo.token,
          // "originalMessage": data["originalMessage"],
          // "signedMessage": data["signedMessage"],

        }
      });
      console.log(response.data)
    } catch (e) {
      console.error(e)
      if (e.response.status === 404) {
        alert(e.response.data)
        return
      }
    }
  }


  return (
    <div className="App">
      <header className="App-header">

        {/* <div style={{ borderStyle:"solid", borderWidth:"2px" }} > */}
        <div className='border-while border-solid border-4 m-3 p-5'>
          <input className="text-[20px] text-center" ref={inputFileRef} type="file" name="imgFile" />
          <Button className="text-4xl w-96 h-28 mt-1" color="yellow" onClick={requestVC}>전자신분증 발급</Button>
        </div>

        <Button className="text-base w-50 h-20 m-20" color="blue" onClick={test}>VP검증 테스트 버튼</Button>
      </header>

    </div>
  );
}