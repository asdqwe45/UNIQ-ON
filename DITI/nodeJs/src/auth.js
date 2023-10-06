// const express = require('express');
// const router = express.Router();
// const { ethers, verifyMessage } = require("ethers")
import { verifyMessage } from "ethers"
import Web3Token from 'web3-token';

export function verifyLoginMessage(walletAddress, originalMessage, signedMessage) {
    const recoveredAddress = verifyMessage(originalMessage, signedMessage)
    if (walletAddress == recoveredAddress) {
        return true
    }
    return false
}

// export function authMiddleWare(req,res,next){
//     console.log(req.headers)
//     const walletAddress=req.headers.walletaddress
//     const originalMessage=req.headers.originalmessage
//     const signedMessage=req.headers.signedmessage
//     console.log(walletAddress, originalMessage, signedMessage)
//     if (!verifyLoginMessage(walletAddress, originalMessage, signedMessage)) {
//         res.status(401).send("login failed")
//     }
//     console.log("DITI/nodeJs: login sucess for "+walletAddress)
//     next()
// }


export async function authMiddleWare(req,res,next){
    console.log(req.headers)
    const walletAddress=req.headers.walletaddress
    const token=req.headers.authorization
    // token 안에는 메세지, 서명된 메세지가 들어있음
    // 샘플코드에는  {address, body}로 되어있는데, body는 부가정보를 담고 있음

    let address=""
    try {
        address = Web3Token.verify(token).address;
    } catch (e) {
        // console.log(e)
        res.status(401).json({error:e.message})
        return
    }
    
    console.log("address:'",address,"'walletAddress:'",walletAddress,"'")
    if (address!=walletAddress.toLowerCase()) {
        res.status(401).send("login failed")
    }else {
    console.log("DITI/nodeJs: login success for " + walletAddress)
    next()
    }
}