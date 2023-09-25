import React from "react";
import axios from "axios";
import { Button, Card, CardBody, CardFooter, CardHeader, Dialog, Input, Typography } from "@material-tailwind/react";
import { useTransactionStore } from "../../stores/TransactionStore";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { SalesCard } from "../../components/Common/SalesCard";
import { TransactionBanner } from "../../components/Transaction/TransactionBanner";
import { RegisterSalesItem } from "./RegisterSalesItem";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

export function Transaction() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(!open); };
  const [nftId, setnftId] = useState("1");
  const [title, setTitle] = useState("test");
  const [content, setContent] = useState("test");
  const [price, setPrice] = useState("1000");

  const [postId, setPostId] = React.useState('1');
  const [wishId, setWishId] = React.useState('1');

  const walletAddress = "0x1234567890123456789012345678901234567890";

  

  const { salesItemsList, setSalesItemsList  
    } = useTransactionStore();

  
  // const URL = "http://localhost:5000"


  useEffect(() => {
    getSales();
  }, []);

  async function getSales() {
        
    try{
      const params = {
        walletAddress: walletAddress,
      };

      const res = await axios.get("/api/sales/post", {
        params: params,
      });
            // console.log(res.data.response)
            setSalesItemsList(res.data.response)
            // console.log(salesItemsList)
        } catch(err) {
          console.log(err)
        }
      }

  async function registerSales(title, content, price, nftId) {

      try {
        const data = {
          price: price,
          content: content,
          title: title,
          nftId: nftId,
        };


        const res = await axios.post("/api/sales/register", data, {
          headers: {
            },
        });
        console.log(res.data)
        
      } catch (err) {
        console.log(err);
      }
    }

    async function addWishlist() {
      
      try {
          const res = await axios.post(`/api/wishlist/add/${postId}`);
            console.log(res.data)
  
        } catch(err) {
          console.log(err)
        }
      }
  
    async function deleteWishlist() {
        
      try {
          const res = await axios.delete(`/api/wishlist/${wishId}`);
            console.log(res.data)
  
        } catch(err) {
          console.log(err)
        }
      } 
    
      const groupedSalesItems = [];
    for (let i = 0; i < salesItemsList.length; i += 3) {
      groupedSalesItems.push(salesItemsList.slice(i, i + 3));
    }


  return (
    <div className="App">
      
      
      <header className="App-header">
      <div className="flex flex-row justify-center w-full bg-white">
        <div className="bg-white w-[1440px] h-[1024px] relative">
          <TopNavBar />
          <p>
            Transaction
          </p>
          <br></br>
          <TransactionBanner />
          <Button onClick={handleOpen} variant="gradient" className="self-end">
        판매글 등록
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="grid mb-4 h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              판매글 등록
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="판매 NFT선택" value={nftId} size="lg" onChange={(e) => setnftId(e.target.value)}/>
            <Input label="판매글 제목" value={title} size="lg" onChange={(e) => setTitle(e.target.value)} />
            <Input label="판매글 내용" value={content} size="lg" onChange={(e) => setContent(e.target.value)}/>
            <Input label="판매 가격" value={price} size="lg" onChange={(e) => setPrice(e.target.value)}/>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={() => {handleOpen(); registerSales(title, content, price, nftId)}} fullWidth>
              등록
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      
          <div className="flex flex-col justify-center">
              {/* 판매글 목록을 3개씩 한 줄에 보여주기 */}
              {groupedSalesItems.map((salesGroup, index) => (
                <div key={index} className="flex flex-row justify-evenly">
                  {salesGroup.map((item) => (
                    <SalesCard key={item.postId} item={item} id={item.postId} />
                  ))}
                </div>
              ))}
            </div>
          

        <Button color="teal" onClick={getSales}>판매글 조회</Button>
        <br></br>
        {/* <RegisterSalesItem /> */}
        </div>
        </div>
      </header>
      
    </div>
  );
}