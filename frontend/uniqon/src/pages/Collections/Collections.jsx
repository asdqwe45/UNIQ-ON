import { Button } from "@material-tailwind/react";
import axios from "axios"

export function Collections() {

  // 도감 검색
  async function search() {
    try {
      const response = await axios.get("/api/collections/search",{params:{query:"mystring"}})
      console.log("success: ", response);
    }catch(e) {
      console.log("failed: ", e);
    }
  }

  // nft 리스트
  async function nftList() {
    try {
      const response = await axios.get("/api/collections/list/nft/1")
      console.log("success: ", response);
    }catch(e) {
      console.log("failed: ", e);
    }
  }

  // 중분류 리스트
  async function middleList() {
    try {
      const response = await axios.get("/api/collections/list/middle/1")
      console.log("success: ", response);
    }catch(e) {
      console.log("failed: ", e);
    }
  }

  // 대분류 리스트 조회
  async function mainList() {
    try {
      const response = await axios.get("/api/collections/list/main")
      console.log("success: ", response);
    }catch(e) {
      console.log("failed: ", e);
    }
  }

  // 중분류 조회
  async function middleInfo() {
    try {
      const response = await axios.get("/api/collections/info/middle/1")
      console.log("success: ", response);
    }catch(e) {
      console.log("failed: ", e);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Collections
        </p>

        {/* <div className="container"> */}

        {/* 도감 검색 버튼 */}
          <Button
            className="m-5 text-3xl w-70 h-30"
            onClick={search}
            color="blue"
            >
            도감 검색
          </Button>

        {/* NFT 리스트 조회 버튼 */}
          <Button
            className="m-5 text-3xl w-70 h-30"
            onClick={nftList}
            color="blue"
            >
            NFT 리스트 조회
          </Button>

        {/* 중분류 리스트 조회 버튼 */}
          <Button
            className="m-5 text-3xl w-70 h-30"
            onClick={middleList}
            color="blue"
            >
            중분류 정보 조회
          </Button>

        {/* 대분류 조회 버튼 */}
          <Button
            className="m-5 text-3xl w-70 h-30"
            onClick={mainList}
            color="blue"
            >
            대분류 정보 조회
          </Button>

        {/* 중분류 조회 버튼 */}
          <Button
            className="m-5 text-3xl w-70 h-30"
            onClick={middleInfo}
            color="blue"
            >
            대분류
          </Button>
        
        {/* </div> */}

      </header>
    </div>
  );
}