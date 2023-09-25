import express from "express"
const router = express.Router()
// multipart 데이터를 받기 위해 사용 (신분증 사진)
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

// 메세지로 본인 인증하는 함수 작성한 것 import
import { verifyLoginMessage } from "../src/auth.js"

import { readImage } from "../src/ocr.js"
import { createVC, createVP } from "../src/did.js"
import axios from "axios"

// 테스트 코드 
// router.get("/test", (req, res) => {
//     res.send("hello")
// })


// /vc 경로로 post 요청이 왔을 때의 로직
// https://inpa.tistory.com/entry/EXPRESS-%F0%9F%93%9A-multer-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4
router.post('/vc', upload.single("imgFile"), async (req, res) => {
    // body에는 텍스트 정보
    // const { walletAddress, originalMessage, signedMessage } = req.body
    // if (!verifyLoginMessage(walletAddress, originalMessage, signedMessage)) {
    //     res.status(400).send("login failed")
    // }
    const walletAddress = req.headers.walletaddress

    // OCR로 읽어들인 정보 처리 
    // console.log("log:",req.file)
    const ocrResult = await readImage(req.file)
    const vcJwt = await createVC(walletAddress, ocrResult)
    // 유저 테이블에 주소가 추가되는 것 (VC없이 지갑주소만 추가)
    try {
        const springJoin = await axios.post(process.env.SPRING_SERVER_URI + "/diti/auth/join",
            walletAddress,
            {
                headers: {
                    'Content-Type': 'text/plain',
                }
            })
    } catch (e) {
        console.log(e)
        console.log("/diti/auth/join failed")
    }
    // VC 테이블에 vcJwt 추가 
    try {
        const springResponse = await axios.post(process.env.SPRING_SERVER_URI + "/diti/vc",
            {
                walletAddress: walletAddress,
                vcJwt: vcJwt,
                type: "idCard",
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    } catch {
        console.log("/diti/vc failed")
    }
    res.send(vcJwt)
})


// VP 발급 
router.get("/vp/:walletAddress/:type", async (req, res) => {
    const walletAddress = req.params.walletAddress
    const type = req.params.type
    try {
        const springResponse = await axios.get(process.env.SPRING_SERVER_URI + "/diti/vc/" + walletAddress + "/" + type,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        const vcJwt = springResponse.data.response.vcJwt
        console.log("springResponse.data.response.vcJwt:",vcJwt)
        const vpJwt = await createVP(vcJwt)
        res.send(vpJwt)
    } catch {
        console.log("GET /diti/vc failed")
    }

})

export default router