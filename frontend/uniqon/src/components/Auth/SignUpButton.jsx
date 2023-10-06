import { Button } from "@material-tailwind/react";
import useUserInfoStore from "../../stores/UserInfoStore";
import axios from "axios";
import { useRef, useState } from "react";
import { ethers } from "ethers";
import Web3Token from "web3-token";
import { useNavigate } from "react-router";
import { Input } from "@material-tailwind/react";
import { UserIdCard } from "./UserIdCard";
import { Typography } from "@material-tailwind/react";


export function SignUpButton(props) {

  const sendDataToParent = () => {
    const data = "card";
    props.onDataFromChild(data);
};

  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
  const navigate = useNavigate();

  // const profileRef = useRef(null);
  // const nicknameRef = useRef(null);
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  function detectMetaMask() {
    let injectedProvider = false;
    if (typeof window.ethereum !== "undefined") {
      // 프로바이더가 존재
      injectedProvider = true;
      console.log(window.ethereum);
    }
    // 메타마스크인지 확인 (메타마스크면 window.ethereum.isMetaMask값이 true로 저장돼있음)
    const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false;
    return isMetaMask;
  }

  // 네트워크 추가
  async function addStgGeth() {
    const response = await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          // "chainId": "0x79F5",
          chainId: "0x562",
          // "chainName": "SSAFY",
          chainName: "STG-GETH",
          rpcUrls: [
            // "https://rpc.ssafy-blockchain.com"
            "https://gethrpc.ssafy-blockchain.com",
          ],
          iconUrls: [
            "https://xdaichain.com/fake/example/url/xdai.svg",
            "https://xdaichain.com/fake/example/url/xdai.png",
          ],
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          blockExplorerUrls: ["https://blockscout-geth.ssafy-blockchain.com/"],
        },
      ],
    });
    console.log("addStgGeth:", response);
  }

  async function signUp() {
    // 닉네임 유효성 검사
    // 닉네임 1자 이상 입력, 공백 미포함
    if (nickname.length < 1) {
      alert("닉네임을 입력해주세요!")
      return
    } else if (nickname.includes(' ')) {
      alert("닉네임에 공백을 포함할 수 없습니다.");
      return
    }
    // 닉네임 중복 검사
    try {
      const response = await axios.get(`/api/users/duplicate/${nickname}`)
      // console.log('response.data', response.data);
      console.log('response.data', response.data.success);
      console.log('response.status', response.status);

      if (!response.data.success) {
        alert(response.data.error.message)
        return
      }
    } catch (e) {
      console.log(e);
      alert("회원가입에 실패했습니다.")
      return
    }


    // 메타마스크 확장 프로그램이 없으면 에러 발생
    if (!detectMetaMask()) {
      console.error("MetaMask is not installed");
      // 메타마스크 설치 메세지 및 홈페이지 이동
      alert("MetaMask를 설치해주세요");
      // window.location.href = "https://metamask.io/";
      const newTab = window.open('https://metamask.io/', '_blank');
      if (newTab) {
        newTab.focus();
      } else {
        alert('팝업 차단이 활성화되어 새 탭을 열 수 없습니다.');
      }
      return;
    }
    console.log("MetaMask exists");
    // 현재 체인ID를 가져와서 1378(ssafy 네트워크. 16진법으로 0x562)인지 아닌지 체크
    // https://docs.metamask.io/wallet/reference/eth_chainid/
    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
      params: [],
    });
    // 현재 체인ID가 1378이 아니면 1378(0x562, 16진법)을 더해주는 것 --> 31221로 변경 필요!! (79F5)
    // add와 switch가 있는데, add는 없으면 추가한 다음 switch를 하고, switch는 없으면 에러 발생 -> add 사용
    // switch : https://docs.metamask.io/wallet/reference/wallet_switchethereumchain/
    // add : https://docs.metamask.io/wallet/reference/wallet_addethereumchain/
    // if (currentChainId !== "0x79F5") {
    if (currentChainId !== "0x562") {
      await addStgGeth();
    }

    // injectedProvider에 대한 객체 생성(?)
    const provider = new ethers.BrowserProvider(window.ethereum);
    // It will prompt user for account connections if it isnt connected
    // signer -> 현재 account 정보를 담고 있음
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    const chainId = (await provider.getNetwork()).chainId;
    console.log("address:", address, "balance:", balance, "chainId:", chainId);

    let token = "";
    try {
      token = await Web3Token.sign(
        async (msg) => await signer.signMessage(msg),
        "1d"
      );
    } catch (e) {
      console.log("Could not get a sign", e);
      return;
    }

    const formData = new FormData();
    // formData.append("profileImg", profileRef.current.files[0]);
    // 프로필 사진 기능 빼기로 해서 빈 값으로 대체 
    formData.append("profileImg", new Blob([], { type: "file" }));

    // formData.append("nickname", nicknameRef.current.value)
    formData.append("nickname", nickname)
    console.log("nickname", nickname);
    // console.log("nickname:",nicknameRef.current.value,nicknameRef.current)

    try {
      const response = await axios.post("/api/users/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
          walletAddress: address,
        },
      });
      if (response.status === 200) {
        alert("회원가입에 성공하였습니다.");
        console.log(response.data);
        // 로그인 페이지로 이동
        sendDataToParent();
        // navigate("/login");
      } 
      console.log("signup success");

    } catch (e) {
      console.log("signup failed", e);
      // catch는 axios 외의 에러도 오기 때문에, e.response가 없을 수도 있어서 조건 추가
      if (e.response) {
        if (e.response.status === 401) {
          window.alert("DITI 인증서가 유효하지 않습니다! DITI 인증서를 새로 발급해주세요.");
          console.log(e.response);
          // window.location.href = e.response.data.ditiAddress
          const newTab = window.open(e.response.data.ditiAddress, '_blank');
          if (newTab) {
            newTab.focus();
          } else {
            alert('팝업 차단이 활성화되어 새 탭을 열 수 없습니다.');
          }
          return
          // 이미 가입된 회원인 경우
        } else if (e.response.status === 405) {
          alert(e.response.data)
          navigate("/transaction")
          return
        } else {
          alert("회원가입에 실패했습니다.");
        }
      }
    }
  }

  return (
    <div>
        <div>
          {/* 닉네임 입력칸 */}
          <div className="mb-5">
          <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-4 font-semibold"
                  >
                    닉네임 정하기
                  </Typography>
            {/* <Input label="닉네임을 입력해주세요" type="text" ref={nicknameRef} value="" /> */}
            <Input label="Nickname" type="text" value={nickname} onChange={handleNicknameChange} />
          </div>

          {/* 프로필 사진 업로드칸 */}
          {/* <div className="border-2 border-gray-400 m-10 max-w-3xl mx-auto">
          <p className="m-5 text-lg font-bold">프로필 사진 업로드</p>
          <input type="file" ref={profileRef} className="m-5"></input>
        </div> */}

          {/* 회원가입 버튼 */}
          <Button onClick={signUp} className="text-sm w-32 h-30 mx-5 mt-3 bg-gradient-to-l from-green-300 to-[#438fff]">
            회원가입
          </Button>
        </div>
    </div>
  );
}
