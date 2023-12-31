import React from 'react';
import { Button } from "@material-tailwind/react";
import { ethers } from "ethers"
import useUserInfoStore from '../stores/UserInfoStore.js'
import Web3Token from 'web3-token';
import { Typography } from "@material-tailwind/react";
import { useConfigStore } from '../stores/ConfigStore.js';
// 저장
export function LoginButton({ className }) {
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo)
  const setPage = useConfigStore((state) => state.setPage)

  function detectMetaMask() {
    let injectedProvider = false
    if (typeof window.ethereum !== 'undefined') {
      // 프로바이더가 존재
      injectedProvider = true
      console.log(window.ethereum)
    }
    // 메타마스크인지 확인 (메타마스크면 window.ethereum.isMetaMask값이 true로 저장돼있음)
    const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false
    return isMetaMask
  }

  async function addStgGeth() {
    const response = await window.ethereum.request({
      "method": "wallet_addEthereumChain",
      "params": [
        {
          "chainId": "0x562",
          "chainName": "STG-GETH",
          "rpcUrls": [
            process.env.SSAFY_RPC_URL
          ],
          "iconUrls": [
            "https://xdaichain.com/fake/example/url/xdai.svg",
            "https://xdaichain.com/fake/example/url/xdai.png"
          ],
          "nativeCurrency": {
            "name": "ETH",
            "symbol": "ETH",
            "decimals": 18
          },
          "blockExplorerUrls": [
            process.env.SSAFY_BLOCK_EXPLORER
          ]
        }
      ]
    });
    console.log("addStgGeth:", response)
  }

  async function connectMetaMask() {
    // 메타마스크 확장 프로그램이 없으면 에러 발생
    if (!detectMetaMask()) {
      console.error("MetaMask is not installed")
      // 메타마스크 설치 메세지 및 홈페이지 이동 
      alert('MetaMask를 설치해주세요');
      // window.location.href = 'https://metamask.io/';
      const newTab = window.open('https://metamask.io/', '_blank');
      if (newTab) {
        newTab.focus();
      } else {
        alert('팝업 차단이 활성화되어 새 탭을 열 수 없습니다.');
      }
      return
    }
    console.log("MetaMask exists")
    // 현재 체인ID를 가져와서 1378(ssafy 네트워크. 16진법으로 0x562)인지 아닌지 체크
    // https://docs.metamask.io/wallet/reference/eth_chainid/
    const currentChainId = await window.ethereum.request({
      "method": "eth_chainId",
      "params": []
    });
    // 현재 체인ID가 1378이 아니면 1378(0x562, 16진법)을 더해주는 것 --> 31221로 변경 필요!! (79F5)
    // add와 switch가 있는데, add는 없으면 추가한 다음 switch를 하고, switch는 없으면 에러 발생 -> add 사용
    // switch : https://docs.metamask.io/wallet/reference/wallet_switchethereumchain/
    // add : https://docs.metamask.io/wallet/reference/wallet_addethereumchain/
    // if (currentChainId !== "0x79F5") {
    if (currentChainId !== "0x562") {
      await addStgGeth()
    }

    // injectedProvider에 대한 객체 생성(?)
    const provider = new ethers.BrowserProvider(window.ethereum);
    // It will prompt user for account connections if it isnt connected
    // signer -> 현재 account 정보를 담고 있음
    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress()
      // const message = "Please issue a certificate"
      // const signedMessage = await signer.signMessage(message)
      // setUserInfo(address, message, signedMessage)
      const token = await Web3Token.sign(async msg => await signer.signMessage(msg), '1d');
      setUserInfo(address, token)
    } catch (e) {
      console.log("code:", e.code, "message:", e.message)
    }
  }

  return (
    <Typography
      as="button"
      className={
        "mx-2 px-4 py-2 font-normal text-lg border-2 border-gray-500 rounded-full hover:bg-blue-400 hover:text-white hover:border-blue-500"
        + className
        // + (walletAddress ? " hidden " : " ")
      }
      onClick={connectMetaMask}
    >
      로그인
    </Typography>

  );
}