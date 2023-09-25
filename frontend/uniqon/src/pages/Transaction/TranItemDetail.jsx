import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ItemDetailCard } from "../../components/Common/ItemDetailCard";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useTransactionStore } from "../../stores/TransactionStore";


export function TranItemDetail () {

  const navigate = useNavigate();

  const { id } = useParams();
  const [ item, setItem ] = useState({});
  const { forDetailItem, setForDetailItem } = useTransactionStore();
  // const URL = "http://localhost:5000"
  const walletAddress = "0x1234567890123456789012345678901234567890";

  // const [수정open, set수정Open] = React.useState(false);
  // const 수정handleOpen = () => { set수정Open(!수정open); };
  // const [수정할NFTid, set수정할NFTid] = useState("");

  function goToTransaction() {
    navigate("/transaction");
  }


  useEffect(() => {

    // console.log(id)

    getSalesDetail();
  }, []);

  async function getSalesDetail() {
      
      const params = {
        walletAddress: walletAddress,
      };
  
      try {
        const res = await axios.get(`/api/sales/detail/${id}`, {
          params: params,
        });
          // console.log(id)
          // console.log(res.data.response)
          setItem(res.data.response)
  
      } catch(err) {
        console.log(err)
      }
  }

  

  async function updateSales() {

    try {
      const data = {
        price: "1000",
        content: "test",
        title: "test1",
        walletAddress: walletAddress,
      };



      const res = await axios.put(`/api/sales/update/${id}`, data, {
        headers: { 
          },
      });
        console.log(res.data)

    } catch(err) {
      console.log(err)
    }
  }

  async function deleteSales() {

    const params = {
      walletAddress: walletAddress,
    };

    try {
      const res = await axios.delete(`/api/sales/delete/${id}`, {
        params: params,
      });
        console.log(id)
        console.log(res.data)
        goToTransaction();


    } catch(err) {
      console.log(err)
    }
  }
  

  return (
    <div className="App">
      
      
    <header className="App-header">
    <div className="flex flex-row justify-center w-full bg-white">
      <div className="bg-white w-[1440px] h-[1024px] relative">
          <TopNavBar />
          <div className="relative top-28">
          {item ? (
                <ItemDetailCard item={item} />
                
              ) : (
                <p>Loading...</p>
              )}
              <Button color="blue" onClick={updateSales}>판매 수정</Button>
        <br></br>
        <Button color="cyan" onClick={deleteSales}>판매 삭제</Button>
        <br></br>
        <Button color="gray" onClick={getSalesDetail}>판매 상세 조회</Button>
          </div>
          {/* <Button onClick={수정handleOpen} variant="gradient" className="self-end">
        판매글 수정
      </Button>
      <Dialog
        size="xs"
        open={수정open}
        handler={수정handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="grid mb-4 h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              판매글 수정
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="판매 NFT 선택" value={수정할NFTit} size="lg" onChange={(e) => set수정할NFTid(e.target.value)}/>
            <Input label="판매글 제목" value={title} size="lg" onChange={(e) => setTitle(e.target.value)} />
            <Input label="판매글 내용" value={content} size="lg" onChange={(e) => setContent(e.target.value)}/>
            <Input label="판매 가격" value={price} size="lg" onChange={(e) => setPrice(e.target.value)}/>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={() => {수정handleOpen(); updateSales(title, content, price)}} fullWidth>
              등록
            </Button>
          </CardFooter>
        </Card>
      </Dialog> */}
      
        
        </div>
          
      </div>
      
        </header>
        
      </div>
  )
};