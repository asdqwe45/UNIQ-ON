import express from "express";
import bodyParser from "body-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import { verifyCredential, verifyPresentation } from "did-jwt-vc";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import cors from "cors";
import axios from "axios";
import multer from "multer";

dotenv.config();
const app = express(); // express : 서버, 요청받는 역할
app.use(cors()); // cors 설정
app.use(bodyParser.json()); // json 응답 설정
app.use(bodyParser.urlencoded({ extended: true }));

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 프로바이더 설정
const providerConfig = {
  // 사용한 블록체인 네트워크
  rpcUrl: process.env.BC_NETWORK,
  // DID 배포한 스마트 컨트랙트 주소
  registry: process.env.BC_SMART_CONTRACT_ADDRESS,
  // 사용한 블록체인 네트워크 이름
  name: process.env.BC_NETWORK_NAME,
};

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 기본 포트 설정
app.listen(process.env.PORT, () => {
  console.log(`Server Start on port [${process.env.PORT}] !!`);
});

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// VP 검증 함수
async function verifyVP(vpJwt) {
  try {
    // Resolver : did documnet 가져오는 역할
    // const resolver = new Resolver(getResolver(providerConfig));
    // 캐시 옵션 추가 -> 요청 시마다 매번 같은 did document를 불러오기 때문에 한번 불러온 뒤 저장
    const resolver = new Resolver(getResolver(providerConfig), { cache: true });
    // vp 검증
    const result = await verifyPresentation(vpJwt, resolver);
    // 결과가 있고, vp가 유효하면
    if (result && result.verified) {
      // vp배열 안 vc들 하나씩 검증
      console.log("result:", result.payload);
      const vcs = await Promise.all(
        result.payload.vp.verifiableCredential.map(async (vcJwt) => {
          try {
            const vcJwtResolved = await verifyCredential(vcJwt, resolver);
            if (vcJwtResolved && vcJwtResolved.verified) {
              // ocr로 읽은 정보들이 들어있는 부분 배열에 담기
              console.log("vcJwtResolved:", vcJwtResolved.payload);
              return vcJwtResolved.payload.vc.credentialSubject;
            } else {
              throw new Error("verify VC failed");
            }
          } catch (e) {
            throw e;
          }
        })
      );
      // 유효한 vcs 반환 ★★★
      return vcs;
    // 결과가 없거나, vp가 유효하지 않은 경우
    } else {
      throw new Error("verify VP failed");
    }
  } catch (e) {
    throw e;
  }
}

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
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

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception 발생:", error);
});

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 회원가입 요청 api
const upload = multer();
app.post("/api/users/signup", upload.single("profileImg"), async (req, res) => {
  try {
    // DITI에 vp 요청
    console.log("singup request form", req.headers.walletaddress);
    const ditiResponse = await axios.get(
      process.env.DITI_SERVER_URL +
        "/diti/did/vp/" +
        req.headers.walletaddress +
        "/idCard",
      {
        headers: {
          "Content-Type": "application/json",
          walletAddress: req.headers.walletaddress,
          Authorization: req.headers.authorization,
        },
      }
    );
    console.log("-------------------------");
    const vpJwt = ditiResponse.data;
    console.log("vpJwt:", vpJwt);
    // 유효한 vp인지 검증
    const vcs = await verifyVP(vpJwt);
    if (vcs.length == 0) {
      res.status(400).send("no VC");
    }
    console.log("vcs:", vcs[0]);
    // vp안의 여러 vc들 중 첫 번째 vc만 검증 (프로젝트에서 vc하나만 담도록 설계했기 때문)
    const data = {
      walletAddress: req.headers.walletaddress,
      name: vcs[0].data.name,
      // nickname: "nonickname",
      nickname: req.body.nickname,
      birth: vcs[0].data.birth,
      gender: vcs[0].data.gender,
      vpToken: vpJwt,

      // password는 지갑주소 마지막 20자리로 설정함
      password: req.headers.walletaddress.slice(-20),
    };
    console.log("------------------");
    console.log(req.body);
    console.log(data.walletAddress);
    console.log(data.password);
    console.log(data.nickname);
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    // file이 null값일 때 에러나는지 체크할 용도
    formData.append("file", new Blob([], { type: "file" }));

    // 유니콘 스프링 서버에 회원가입 요청
    try {
      const springResponse = await axios.post(
        process.env.SPRING_SERVER_URI + "/api/users/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (springResponse.status == 200) {
        res.status(200).send("success")
      } else {
        // 회원가입 실패
        res.status(springResponse.status).send(springResponse.data);
      }
    } catch (e) {
      console.log("오류" + e);
      if(e.response.status === 405) {
        res.status(405).send("이미 가입된 회원입니다.")
      } else {
      res
        .status(500)
        .send(
          "POST " + process.env.SPRING_SERVER_URI + "/api/users/signup failed"
        );
      }
      return
    }
  } catch (e) {
    console.log(
      "GET /diti/did/vp/" + req.headers.walletaddress + "/idCard failed"
    );
    console.log(e);
    // res
    //   .status(500)
    //   .send("GET /diti/did/vp/" + req.headers.walletaddress + "/idCard failed");
    res.status(401).json({
      error:
        "DITI 인증서가 유효하지 않습니다! DITI 인증서를 새로 발급해주세요.",
      ditiAddress: process.env.DITI_SERVER_URL + "/diti",
    });
    return;
  }
});

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 로그인 요청 api
app.get("/api/users/login", async (req, res) => {
  console.log("login request form", req.headers.walletaddress);
  const walletAddress = req.headers.walletaddress;
  const web3token = req.headers.authorization;
  let vpJwt = "";
  try {
    // DITI에 vp 요청
    const ditiResponse = await axios.get(
      process.env.DITI_SERVER_URL +
        "/diti/did/vp/" +
        req.headers.walletaddress +
        "/idCard",
      {
        headers: {
          "Content-Type": "application/json",
          walletAddress: walletAddress,
          Authorization: web3token,
        },
      }
    );
    vpJwt = ditiResponse.data; // VP 응답 

    // vp 요청 실패한 경우 
  } catch (e) {
    console.log(
      "GET /diti/did/vp/" + req.headers.walletaddress + "/idCard failed"
    );
    if (e.response) {
      if (e.response.status == 404) {
        // VC가 없을 경우
        // res.status(e.response.status).send(e.response.data);
        res.status(e.response.status).json({
          error: e.response.data,
          ditiAddress: process.env.DITI_SERVER_URL + "/diti",
        });
      } else {
        // 알 수 없는 DITI에러
        res
          .status(500)
          .send(
            "GET /diti/did/vp/" +
              req.headers.walletaddress +
              "/idCard failed, DITI error"
          );
      }
    } else {
      // response가 없는 에러
      console.log(e);
      res
        .status(500)
        .send(
          "GET /diti/did/vp/" +
            req.headers.walletaddress +
            "/idCard failed, no response from DITI"
        );
    }
    return;
  }

  // VP 검증
  try {
    console.log("vpJwt:", vpJwt);
    // 유효한 vp인지 검증 -> 유효하면 통과 
    const vcs = await verifyVP(vpJwt);

    // 유효하지 않은 vp인 경우 return
    if (vcs.length == 0) {
      res.status(404).send("zero VC");
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("VP 검증 실패");
    return;
  }

  // 유니콘 스프링 서버에 로그인 요청
  try {
    const userInfo = {
      walletAddress: walletAddress,
      password: walletAddress.slice(-20),
    };
    console.log("유저정보: " + userInfo.walletAddress);
    console.log("유저정보: " + userInfo.password);
    const springResponse = await axios.post(
      process.env.SPRING_SERVER_URI + "/api/auth/login",
      userInfo,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  
    // 유니콘에 회원가입이 되지 않은 상태인 경우 로그인 시도 시 에러 처리 
    if (springResponse.data.success) {
      res.status(springResponse.status).send(springResponse.data);
      return;
    } else {
      console.log("스프링 응답 에러 발생!!");
      console.log(springResponse.data);
      console.log(springResponse.data.split(",")[1]);
      if (springResponse.data.status === 404) {
        res.status(404).send(springResponse.data.message);
      } else {
        res.status(400).send("스프링 응답 에러 발생!!");
      }
      return;
    }
  } catch (e) {
    console.log("로그인 오류 발생!!");
    console.log(e);
    if (e.response.status === 404) {
      res.status(404).send("");
    }
    console.log(e.status);
    res
      .status(500)
      .send("GET " + process.env.SPRING_SERVER_URI + "/api/users/login failed");
    return;
  }
});

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 스프링 서버 세팅
const springProxy = createProxyMiddleware({
  host: "0.0.0.0",
  target: process.env.SPRING_SERVER_URI,
  changeOrigin: true,
});

// app.listen(5000)
// 프록시 세팅
// app.use("/api/**", springProxy);
app.use(springProxy);
