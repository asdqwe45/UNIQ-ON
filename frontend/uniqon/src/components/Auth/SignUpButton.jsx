import { Button } from "@material-tailwind/react";
import useUserInfoStore from "../../stores/UserInfoStore";
import axios from "axios";
import { useRef } from "react";
import { ethers } from "ethers";
import Web3Token from "web3-token";
import { useNavigate } from "react-router";

export function SignUpButton() {
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
  const navigate = useNavigate();

  const profileRef = useRef(null);
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
    // 메타마스크 확장 프로그램이 없으면 에러 발생
    if (!detectMetaMask()) {
      console.error("MetaMask is not installed");
      // 메타마스크 설치 메세지 및 홈페이지 이동
      alert("MetaMask를 설치해주세요");
      window.location.href = "https://metamask.io/";
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
    formData.append("profileImg", profileRef.current.files[0]);

    try {
      const response = await axios.post("/api/users/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
          walletAddress: address,
        },
      });
      if (response.status === 200) {
        alert("회원가입에 성공하였습니다!!");
        navigate("/login");
      } else if (response.status === 500) {
        alert(
          "블록체인과의 통신이 원할하지 않습니다. 잠시후에 다시 시도해주세요!"
        );
      }
      console.log("signup success");
    } catch (e) {
      console.log("signup failed", e);
    }
  }

  return (
    <>
      <input type="file" ref={profileRef}></input>
      <Button onClick={signUp} className="text-3xl w-70 h-30 m-5" color="blue">
        {" "}
        회원가입{" "}
      </Button>
    </>
  );
}