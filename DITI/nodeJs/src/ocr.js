import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config();

/**
 * 네이버 OCR API
 * @param {*} image 이미지 객체
 * @returns 결과에 따른 데이터 혹은 오류 리턴
 */
export async function readImage(image) {
    const data=await requestOcrWithFile(image)
    if (data.images[0].inferResult === "SUCCESS") {
      const res = data.images[0].fields;
      let gender = "";
      if (res[2].inferText.split("-")[1][0] === "1" || res[2].inferText.split("-")[1][0] === "3") {
        gender = "남성";
      } else {
        gender = "여성";
      }
      let birthYear = "";
      if (res[2].inferText.split("-")[1][0] === "3" || res[2].inferText.split("-")[1][0] === "4") {
        birthYear = "20" + res[2].inferText.slice(0, 2);
      } else {
        birthYear = "19" + res[2].inferText.slice(0, 2);
      }

      const authId = {
        idName: res[0].inferText,
        name: res[1].inferText.split("(")[0],
        pin: res[2].inferText,
        gender: gender,
        birth: birthYear + "." + res[2].inferText.slice(2, 4) + "." + res[2].inferText.slice(4, 6),
      };
      console.log("authId:",authId)
      return authId
    }
  }

export function requestOcrWithFile(image) {
    return new Promise((resolve, reject) => {
        // filestream 으로 생성
        const file = fs.createReadStream(image.path);
        // const file = Readable.from(image.buffer)
        const message = {
            images: [
                {
                    format: image.mimetype.split("/")[1],
                    name: image.filename,
                    // name: image.originalname,
                },
            ],
            requestId: "",
            timestamp: 0,
            version: "V2",
        };
        const formData = new FormData();

        formData.append("file", file);
        formData.append("message", JSON.stringify(message));

        // API Gateway로 요청
        axios
            .post(process.env.NAVER_API_GATEWAY, formData, {
                headers: {
                    "X-OCR-SECRET": process.env.NAVER_OCR_API_KEY,
                    ...formData.getHeaders(),
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    resolve(res.data);
                } else {
                    reject(new Error(`Request failed with status ${res.status}`));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}
