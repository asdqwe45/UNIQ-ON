import { Button } from "@material-tailwind/react"
import { ethers, verifyMessage } from "ethers"

export default function LoginButton() {
// 메타마스크가 있으면 window에 ethereum이 정의가 돼있어야 함 (확장프로그램에 의해 생성)
// window에 ethereum이 정의돼있는 것을 injectedProvider라고 함
// 메타마스크 외에 다른 지갑들도 injectedProvider를 제공하기 때문에, 메타마스크인지 확인하는 절차 필요

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
                    "chainId": "0x79F5",
                    "chainName": "SSAFY",
                    "rpcUrls": [
                        "https://rpc.ssafy-blockchain.com"
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
                        "https://blockscout-geth.ssafy-blockchain.com/"
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
            window.location.href = 'https://metamask.io/';
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
        if (currentChainId !== "0x79F5") {
            await addStgGeth()
        }

// injectedProvider에 대한 객체 생성(?)
        const provider = new ethers.BrowserProvider(window.ethereum);
        // It will prompt user for account connections if it isnt connected
// signer -> 현재 account 정보를 담고 있음
        const signer = await provider.getSigner();
        const address = await signer.getAddress()
        const balance = await provider.getBalance(address)
        const chainId = (await provider.getNetwork()).chainId
        console.log("address:",address, "balance:",balance, "chainId:",chainId)
// 백엔드 서버에 이 주소로 로그인하겠다는 것을 알려야 함. 신원 증명 필요. 
// private key를 가지고 있고 서명을 만들 수 있다는 것을 증명
// hello world라는 임의의 메세지에 사인하는 것
        const message="Hello world"
        const signedMessage=await signer.signMessage(message)
// 백엔드 서버로, message와 signed message와 자신의 지갑 주소를 보내고, 백엔드에서 verifyMessage를 호출해서 나온 값이 자신의 주소와 일치해야 함 
        const rt=verifyMessage(message,signedMessage)
        console.log(message,signedMessage,rt)
    }
 
    return (
        <Button className="text-3xl w-70 h-30 m-5" color="green" onClick={connectMetaMask}>Login</Button>
    )
}