import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ItemDetailCard } from "../../components/Common/ItemDetailCard";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { useState } from "react";
import { Button, Dialog, 
  Card, CardBody, Input, CardFooter, CardHeader, Typography, Textarea } from "@material-tailwind/react";
import { useTransactionStore } from "../../stores/TransactionStore";
import useUserInfoStore from "../../stores/UserInfoStore";
import { TiArrowLeftThick } from "react-icons/ti";

import { LuFileEdit } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
// import { useLocation } from 'react-router-dom';



export function TranItemDetail () {

  const navigate = useNavigate();
  // const location = useLocation();

  const { id } = useParams();
  const [ item, setItem ] = useState({});
  const [title, setTitle] = useState("test");
  const [content, setContent] = useState("test");
  const [price, setPrice] = useState("1000");
  const { forDetailItem, setForDetailItem } = useTransactionStore();
  // const URL = "http://localhost:5000"
  const { sellerAddress, setSellerAddress, selectedNftId, setSelectedNftId, selectedPostId, setSelectedPostId } = useTransactionStore();

  const { accessToken, walletAddress } = useUserInfoStore();

  const [수정open, set수정Open] = React.useState(false);
  const 수정handleOpen = () => { set수정Open(!수정open); };
  const [수정할NFTid, set수정할NFTid] = useState("");
  // const { wishCheck } = location.state;

  function goToTransaction() {
    navigate("/transaction");
  }


  useEffect(() => {

    console.log(id)
    setSelectedPostId(id)
    // setSelectedNftId(forDetailItem.nftId)
    
    console.log(forDetailItem)
    getSalesDetail();
  }, []);

  async function getSalesDetail() {
      
      const params = {
        walletAddress: walletAddress,
      };
  
      try {
        const res = await axios.get(`/api/sales/detail/${id}`,{
          headers: {
            Authorization: "Bearer " + accessToken,
            },
        }, {
          params: params,
        });
          // console.log(id)
          // console.log(res.data.response)
          setItem(res.data.response)
          setForDetailItem(res.data.response)
          
          setSellerAddress(res.data.response.SellerInfo.walletAddress)
  
      } catch(err) {
        console.log(err)
      }
  }

  

  async function updateSales(price, title, content) {

    try {
      const data = {
        price: price,
        title: title,
        content: content,
      };

      console.log(data)

      const updateForm=new FormData()
        updateForm.append("data",new Blob([JSON.stringify(data)],{type:'application/json'}))

      const res = await axios.put(`/api/sales/update/${id}`, updateForm, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "multipart/form-data"
          },
        }

      );
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
      const res = await axios.delete(`/api/sales/delete/${id}`,{
        headers: {
          Authorization: "Bearer " + accessToken,
          },
      }, {
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
          <div className="relative flex items-center justify-center top-28">
          {item ? (
                <ItemDetailCard item={item} />
                
              ) : (
                <p>Loading...</p>
              )}
              {/* <Button color="blue" onClick={updateSales}>판매 수정</Button>
        <br></br> */}
        </div>
        <div className="relative flex justify-end right-[240px] top-[140px]">
          {
            sellerAddress === walletAddress ? (
              <>
        <Button onClick={수정handleOpen} variant="gradient" className="flex items-center self-end">
          <LuFileEdit className="w-5 h-5 mr-1"/>
        판매글 수정
      </Button>
        <Button variant="gradient" onClick={deleteSales} className="flex items-center self-end">
        <MdDeleteOutline className="w-5 h-5 mr-1"/>
        판매글 삭제
        </Button>
        </> 
            ) : (
              <></>
            )
        }
        
        {/* <Button color="gray" onClick={getSalesDetail}>판매 상세 조회</Button> */}
          
        
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
          {item ? (
          <CardBody className="flex flex-col gap-4">
            <Input color="blue" label="판매글 제목" value={item.title} size="lg" onChange={(e) => setTitle(e.target.value)} />
            <Input color="blue" label="판매 가격" value={item.price} size="lg" onChange={(e) => setPrice(e.target.value)}/>
            <Textarea color="blue" label="판매글 내용" value={item.content} size="lg" onChange={(e) => setContent(e.target.value)}/>
          </CardBody>
          ) : (
            <p>Loading...</p>
          )}
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={() => {수정handleOpen(); updateSales( price, title, content)}} fullWidth>
              수정
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      </div>
      
      <div className="flex flex-row">
              <div style={{ marginLeft: '240px', marginTop: '300px'  }}>
                <Button onClick={() => navigate(-1)}>
                  <TiArrowLeftThick
                    style={{ fontSize: "20px" }}
                  ></TiArrowLeftThick>
                </Button>
              </div>
            </div>
        
        </div>
        
      </div>
      
        </header>
        
      </div>
  )
};