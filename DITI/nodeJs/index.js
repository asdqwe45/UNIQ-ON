// CommonJS
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// ES Modules
// 위와 동일
// package.json에서 type:module로 지정해줬기 때문에 아래 문법 사용 
import express from "express" // 서버 실행
import cors from "cors"
import dotenv from "dotenv" 
import didRouter from "./routes/didRouter.js";
import springProxy from "./routes/springProxy.js";
import { authMiddleWare } from "./src/auth.js";

// express서버, 7000번 포트 설정
const app = express();
const port = 7000;

// app.use(express.static("public"));
app.use("/diti",express.static("public"));
// app.use(express.static("../frontend/build"));
// app.use("/diti",express.static("../frontend/build"));
// app.use("/diti/**",express.static("../frontend/build"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

// 모듈화 
// /diti/did 경로로 들어오면 didRouter가 처리 
app.use("/diti/did", authMiddleWare, didRouter);
// /diti로 요청이 들어오면 springProxy가 처리
app.use("/diti/auth", authMiddleWare, springProxy)
app.use("/diti/vc", authMiddleWare, springProxy)
app.use("/diti/swagger*",springProxy)


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// 에러 발생해도 서버가 꺼지지 않게 강제
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception 발생:", error);
});