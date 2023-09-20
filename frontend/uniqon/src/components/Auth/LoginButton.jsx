import { Button } from "@material-tailwind/react"
import { ethers, verifyMessage } from "ethers"

export default function LoginButton() {
    function detectMetaMask() {
        let injectedProvider = false
        if (typeof window.ethereum !== 'undefined') {
            injectedProvider = true
            console.log(window.ethereum)
        }
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
                        "https://gethrpc.ssafy-blockchain.com"
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
        if (!detectMetaMask()) {
            console.error("MetaMask is not installed")
            return
        }
        console.log("MetaMask exists")
        const currentChainId = await window.ethereum.request({
            "method": "eth_chainId",
            "params": []
        });
        if (currentChainId != "0x562") {
            await addStgGeth()
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        // It will prompt user for account connections if it isnt connected
        const signer = await provider.getSigner();
        const address = await signer.getAddress()
        const balance = await provider.getBalance(address)
        const chainId = (await provider.getNetwork()).chainId
        console.log("address:",address, "balance:",balance, "chainId:",chainId)
        const message="Hello world"
        const signedMessage=await signer.signMessage(message)
        const rt=verifyMessage(message,signedMessage)
        console.log(message,signedMessage,rt)
    }
    return (
        <Button color="green" onClick={connectMetaMask}>Login</Button>
    )
}