import { Button } from "@material-tailwind/react";
import { ethers, verifyMessage } from "ethers";
import axios from "axios";
import Web3Token from "web3-token";
import useUserInfoStore from "../../stores/UserInfoStore";
import { useNavigate } from "react-router";
import { UserIdCard } from "./UserIdCard";
import { useState } from "react";

export function LoginButton(props) {

    const sendDataToParent = () => {
        const data = "paypal";
        props.onDataFromChild(data);
    };

    // 메타마스크가 있으면 window에 ethereum이 정의가 돼있어야 함 (확장프로그램에 의해 생성)
    // window에 ethereum이 정의돼있는 것을 injectedProvider라고 함
    // 메타마스크 외에 다른 지갑들도 injectedProvider를 제공하기 때문에, 메타마스크인지 확인하는 절차 필요
    const setAccessToken = useUserInfoStore((state) => state.setAccessToken);
    const setWalletAddress = useUserInfoStore((state) => state.setWalletAddress);
    const navigate = useNavigate();
    const [showUserIdCard, setShowUserIdCard] = useState(false);

    function setAuthorizationToken(token) {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        // else {
        //     delete axios.defaults.headers.common["Authorization"];
        // }
    }

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

    async function connectMetaMask() {
        // 메타마스크 확장 프로그램이 없으면 에러 발생
        if (!detectMetaMask()) {
            console.error("MetaMask is not installed");
            // 메타마스크 설치 메세지 및 홈페이지 이동
            alert("MetaMask를 설치해주세요");
            // window.location.href = "https://metamask.io/";
            window.open("https://metamask.io/", '_blank').focus()
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
        setWalletAddress(address);
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

        try {
            const response = await axios.get(`/api/users/login`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                    walletAddress: address,
                },
            });
            console.log(response);

            if (response.status === 200) {
                console.log("로그인 성공 !! : ", response.data.response);
                setAccessToken(response.data.response);
                setAuthorizationToken(response.data.response);
                alert("로그인에 성공하였습니다!");

                // 로그인 성공 시 회원 정보 바탕으로 신분증 보여주기
                setShowUserIdCard(true);
            }

        } catch (e) {
            console.log("로그인 에러 발생 " + e);
            if (e.response && e.response.status === 404) {
                console.log("login failed", e.response);
                console.log('e.response.data', e.response.data);
                if (e.response.data) {
                    alert("DITI 인증서 등록이 되어있지 않습니다.");
                    // window.location.href = e.response.data.ditiAddress;
                    const newTab = window.open(e.response.data.ditiAddress, '_blank');
                    if (newTab) {
                      newTab.focus();
                    } else {
                      alert('팝업 차단이 활성화되어 새 탭을 열 수 없습니다.');
                    }
                } else {
                    alert("UNIQON에 등록된 회원이 아닙니다! 회원가입을 해주세요");
                    sendDataToParent();
                    // navigate("/signup");
                }

            } else if(e.response && e.response.status === 500) {
                console.log("login failed", e.response);
                alert(
                    "DITI 인증서 로그인에 실패했습니다."
                );
            }
            return
        }
    }


      // UserIdCard 확인 버튼 클릭 시 실행될 함수
    const handleUserIdCardConfirm = () => {
        // 카드 확인버튼 누르면 거래 페이지로 이동
        navigate("/transaction");
    };


    return (
        <div>
          <Button
            className="text-sm w-70 h-30 mx-5 mt-3 bg-gradient-to-r from-green-300 to-[#438fff]"
            // color="green"
            onClick={connectMetaMask}
          >
            DITI 인증 로그인
          </Button>

            {showUserIdCard && (
                <UserIdCard onConfirm={handleUserIdCardConfirm} />
            )}
        
      </div>
    );
}
