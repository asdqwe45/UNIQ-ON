import { Button } from "@material-tailwind/react";
import axios from "axios"

export function Collections() {

  // // 도감 리스트 조회
  // async function getList() {
  //   try {
  //     const response = await axios.get("/collections/list")
  //     // const response = await axios.get("http://localhost:8080/collections/list")
  //     console.log("success: ", response);
  //   }catch(e) {
  //     console.log("failed: ", e);
  //   }
  // }

  // // 삭제 
  // async function deleteItem() {
  //   try {
  //     const response = await axios.delete("/collections/0")
  //     console.log("success: ", response);
  //   }catch(e) {
  //     console.log("failed: ", e);
  //   }
  // }
  // // delete 다른 형식으로 작성한 코드
  // // axios.delete("/collections/0")
  // //   .then(function (response) {
  // //     console.log(response);
  // //   })
  // //   .catch(function (error) {
  // //     console.log(error);
  // //   })
  // //   .then(function () {
  // //     // always executed
  // //   });

  // // 등록
  // async function addItem() {
  //   try {
  //     // 요청을 보낼 데이터
  //     const data = {
  //       species: '종부류',
  //       name: '생물명',
  //       image: '이미지 URL',
  //     };

  //     const response = await axios.post("/collections/register", data, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data', 
  //       },
  //     });

  //     console.log("success: ", response);
  //   } catch (e) {
  //     console.log("failed: ", e);
  //   }
  // }

  // // 수정
  // async function editItem() {
  //   try {
  //     // 수정할 데이터
  //     const data = {
  //       id: 1, 
  //       species: '새로운 종부류',
  //       name: '새로운 생물명',
  //       image: '새로운 이미지 URL',
  //     };

  //     const response = await axios.put("/collections/info", data, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data', 
  //       },
  //     });

  //     console.log("success: ", response);
  //   } catch (e) {
  //     console.log("failed: ", e);
  //   }
  // }

  // // 대분류 (main)
  // async function mainCat() {
  //   try {
  //     const response = await axios.get("/collections/mainClassifications")
  //     console.log("success: ", response);
  //   }catch(e) {
  //     console.log("failed: ", e);
  //   }
  // }

  // // 중분류 (middle)
  // async function middleCat() {
  //   try {
  //     const response = await axios.get("/collections/middleClassifications")
  //     console.log("success: ", response);
  //   }catch(e) {
  //     console.log("failed: ", e);
  //   }
  // }

  // // 상세 조회
  // async function detailInfo() {
  //   try {
  //     const response = await axios.get("/collections/info")
  //     console.log("success: ", response);
  //   }catch(e) {
  //     console.log("failed: ", e);
  //   }
  // }

  // // 검색 
  // async function searchItem() {
  //   try {
  //     const response = await axios.get("/collections/search?query=df")
  //     console.log("success: ", response);
  //   }catch(e) {
  //     console.log("failed: ", e);
  //   }
  // }

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
      const response = await axios.get("/api/collections/list/1")
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
      const response = await axios.get("/api/collections/info/middle/{middleId}")
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
            className="text-3xl w-70 h-30 m-5"
            onClick={search}
            color="blue"
            >
            도감 검색
          </Button>

        {/* NFT 리스트 조회 버튼 */}
          <Button
            className="text-3xl w-70 h-30 m-5"
            onClick={nftList}
            color="blue"
            >
            NFT 리스트 조회
          </Button>

        {/* 중분류 리스트 조회 버튼 */}
          <Button
            className="text-3xl w-70 h-30 m-5"
            onClick={middleList}
            color="blue"
            >
            중분류 정보 조회
          </Button>

        {/* 대분류 조회 버튼 */}
          <Button
            className="text-3xl w-70 h-30 m-5"
            onClick={mainList}
            color="blue"
            >
            대분류 정보 조회
          </Button>

        {/* 중분류 조회 버튼 */}
          <Button
            className="text-3xl w-70 h-30 m-5"
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