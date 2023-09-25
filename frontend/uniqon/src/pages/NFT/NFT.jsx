import { Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip } from "@material-tailwind/react";
import axios from "axios"
import { useRef } from "react";
import { TopNavBar } from "../../components/Common/TopNavBar";

export function NFT() {
  const nftImg = useRef(null)

    // nft 등록
    async function nftAdd() {
        try {
        // 요청을 보낼 데이터
        const data = {
            "walletAddress": "string",
            "middleClassificationId": 0,
            "nftAddress": "string",
            "name": "string",
            "feature": "string",
            "age": 0
        };

        const formData = new FormData()
        formData.append("data", new Blob([JSON.stringify(data)], {type: "application/json"}))
        formData.append("file", nftImg.current.files[0])

        const response = await axios.post("/api/nfts/register", formData, {
            headers: {
            'Content-Type': 'multipart/form-data',  
            },
            // 파일 직접 넣기 
            file: nftImg.current.files[0],
        });

        console.log("success: ", response);
        } catch (e) {
        console.log("failed: ", e);
        }
    }

  

    // nft 조회
    async function nftInfo() {
        try {
        const response = await axios.get("/api/nfts/0")
        console.log("success: ", response);
        }catch(e) {
        console.log("failed: ", e);
        }
    }

    // nft 삭제
    async function nftDelete() {
        try {
        const response = await axios.delete("/api/nfts/0")
        console.log("success: ", response);
        }catch(e) {
        console.log("failed: ", e);
        }
    }
    

  return (
    <div className="App">
      <header className="App-header">
      <div className="flex flex-row justify-center w-full bg-white">
        <div className="bg-white w-[1440px] h-[1024px] relative">
          <TopNavBar />
          
        <div className="flex flex-col items-center justify-center w-full h-full">
          
          

<div className="flex flex-col items-center">
<Card className="w-96">
      <CardHeader floated={false} className="">
      <span className="flex justify-center">
        <lord-icon
          src="https://cdn.lordicon.com/qfbuijil.json"
          trigger="hover"
          colors="outline:#121331,primary:#f24c00,secondary:#2ca58d,tertiary:#ebe6ef"
          style={{ width: '150px', height: '150px' }}
        />
        <lord-icon
          src="https://cdn.lordicon.com/emzrtjck.json"
          trigger="hover"
          colors="outline:#121331,primary:#08a88a"
          style={{ width: '150px', height: '150px' }}
        />
      </span>
      </CardHeader>
      <CardBody className="text-center">
      <span>
      <input type="file" ref={nftImg} />
      <Button
        className="m-5 text-3xl w-70 h-30"
        onClick={nftAdd}
        color="blue"
      >
        NFT 발급
        <lord-icon
    src="https://cdn.lordicon.com/ejxwvtlg.json"
    trigger="hover"
    colors="outline:#121331,primary:#08a88a,secondary:#ebe6ef"
    style={{width:'250px',height:'250px'}}>
</lord-icon>
      </Button>
      </span>
      </CardBody>
    </Card>
    </div>   

        {/* NFT 조회 버튼 */}
          <Button
            className="m-5 text-3xl w-70 h-30"
            onClick={nftInfo}
            color="blue"
            >
            NFT 조회
          </Button>

        {/* NFT 삭제 버튼 */}
          <Button
            className="m-5 text-3xl w-70 h-30"
            onClick={nftDelete}
            color="blue"
            >
            NFT 삭제 
          </Button>
        
        </div>
        </div>
        </div>
      </header>
    </div>
  );
}