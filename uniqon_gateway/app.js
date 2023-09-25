import express from "express";
import bodyParser from "body-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import { verifyPresentation } from "did-jwt-vc";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors()); // cors 설정
app.use(bodyParser.json()); // json 응답 설정
app.use(bodyParser.urlencoded({ extended: true }));

// 프로바이더 설정
const providerConfig = {
  // 사용한 블록체인 네트워크
  rpcUrl: process.env.BC_NETWORK,
  // DID 배포한 스마트 컨트랙트 주소
  registry: process.env.BC_SMART_CONTRACT_ADDRESS,
  // 사용한 블록체인 네트워크 이름
  name: process.env.BC_NETWORK_NAME,
};

// 기본 포트 설정
app.listen(process.env.PORT, () => {
  console.log(`Server Start on port [${process.env.PORT}] !!`);
});

// VP 검증 URI
app.post("/api/verifyVP", async (req, res) => {
  console.log("# VP 검증 요청 ..");
  const vpJwt = req.body.vpJwt;
  console.log(vpJwt);
  if (vpJwt) {
    try {
      const resolver = new Resolver(getResolver(providerConfig));
      const result = await verifyPresentation(vpJwt, resolver);
      if (result && result.verified) {
        res.sendStatus(200);
        console.log("검증 완료");
      } else {
        console.log("검증 실패");
        res.sendStatus(401);
      }
    } catch (error) {
      console.error("검증 중 에러 발생:", error);
      res.sendStatus(500);
    }
  } else {
    console.log("잘못된 요청");
    res.sendStatus(400);
  }
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception 발생:", error);
});

// 스프링 서버 세팅
const springProxy = createProxyMiddleware({
  target: process.env.SPRING_SERVER_URI,
  changeOrigin: true,
});

// 프록시 세팅
app.use("/api", springProxy);
