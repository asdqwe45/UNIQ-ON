import React from "react";
import axios from "axios";
import { Button, Card, CardBody, CardFooter, CardHeader, Dialog, Input, Typography,Textarea } from "@material-tailwind/react";
import { useTransactionStore } from "../../stores/TransactionStore";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { SalesCard } from "../../components/Common/SalesCard";
import { TransactionBanner } from "../../components/Transaction/TransactionBanner";
import useUserInfoStore from "../../stores/UserInfoStore";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import 'swiper/css';

import { MdOutlinePostAdd } from "react-icons/md";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

export function Transaction() {

  const { accessToken, walletAddress } = useUserInfoStore();

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(!open); };
  const [tokenId, setTokenId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [ 새로운등록발견, set새로운등록발견 ] = useState(false);

  const { salesItemsList, setSalesItemsList,
    nftList, setNftList,  
    } = useTransactionStore();


  useEffect(() => {
    // console.log(accessToken)
    getSales();
    // getNFTList();
  }, [새로운등록발견]);
  

  // 판매글 등록시에 내가 가지고 있는 NFT 조회
  
  const [page, setPage] = useState(0);
  const [result, setResult] = useState([]);

  const swiper = useSwiper();

  // const [totalPage, setTotalPage] = useState(0);
  // 나의 NFT 조회
  // useEffect(() => {
  //   async function getMyNft() {
  //     try {
  //       const response = await axios.get(`/api/myPage/mynfts`, {
  //         params: {
  //           page: page,
  //           size: 9, // 추후에 이 부분은 원하는 갯수로 변경
  //         },
  //       });
  //       if (response.status === 200) {
  //         setNftList(response.data.response.content);
  //       }
  //     } catch (error) {
  //       console.log("실패", error);
  //     }
  //   }
  //   getMyNft();
  // }, [page]);

  async function getSales() {
        
    try{
      const params = {
        walletAddress: walletAddress,
        page: 1,
        size: 9,
      };

      const res = await axios.get("/api/sales/post", {
        headers: {
          Authorization: "Bearer " + accessToken,
          },
      } , {
        params: params,
      });
            console.log(res.data.response) // response에 담긴 값 확인
            setSalesItemsList(res.data.response)
            console.log(salesItemsList) // salesItemsList에 담긴 값 확인
            console.log(accessToken)
        } catch(err) {
          console.log(err)
        }
      }

  // async function getNFTList(){
  //   const myNFTList=await axios.get("/api/myPage/mynfts",{
  //     params:{
  //       page: 0,
  //       size: 9,
  //     }
  //   })
  //   console.log("myNFTs",myNFTList.data.response)
  //   setNftList(myNFTList.data.response.content)
  //   console.log("nftList",nftList)
    
  // }

  function getNFTList() {
    axios.get("/api/myPage/mynfts", {
      params: {
        page: 0,
        size: 50,
      }
    })
    .then((response) => {
      console.log("myNFTs", response.data.response.content);
      setNftList(response.data.response.content);
    })
    .catch((error) => {
      console.error("Error fetching NFT list:", error);
    });
  }

  async function registerSales(title, content, price, tokenId) {

      try {
        

        const data = {
          price: price,
          content: content,
          title: title,
          tokenId: tokenId,
        };
        const registerForm=new FormData()
        registerForm.append("data",new Blob([JSON.stringify(data)],{type:'application/json'}))

        const res = await axios.post("/api/sales/register", registerForm, {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "multipart/form-data"
            },
        });
        console.log(res.data)
        set새로운등록발견(!새로운등록발견)
        
      } catch (err) {
        console.log(err);
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
          <div className="flex justify-end mt-3 mb-1">
          <Button onClick={()=>{handleOpen();getNFTList();}} variant="gradient" className="flex items-center self-end">
            <MdOutlinePostAdd className="w-6 h-6 mr-1"/>
        판매글 등록
      </Button>
      </div>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[48rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="grid mb-4 h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              판매글 등록
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-4">

            
          {/* 내가 가진 nft 목록 중에서 선택하기 */}
          

          {/* {nftList.length > 0 &&
    nftList.map((nft, index) => (
      <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
          <div>
            <Card className="w-full max-w-[20rem] shadow-lg">
              <CardHeader floated={false} color="blue-gray">
                <img src={nft.image} alt="ui/ux review check" />
                <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardFooter className="pt-3 pb-3">
                <Button
                  className="text-sm"
                  size="sm"
                  fullWidth={true}
                  onClick={() => setTokenId(nft.tokenId)}
                >
                  {nft.name}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    ))} */}

    <Swiper
    slidesPerView={2}
    spaceBetween={20}
    pagination={true} className="mySwiper" style={{ width: "100%", height: "100%" }}>
      {nftList.map((nft, index) => (
        <SwiperSlide key={index}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <img src={nft.image} alt={`포스트 이미지 ${index}`} onClick={() => setTokenId(nft.tokenId)} />
            
          </div>
          {
          nft.tokenId === tokenId ? (
          <Button variant="gradient"
          className="mt-2 text-sm"
          size="sm"
          fullWidth={true}
          color="amber"
        >
          선택됨
  </Button>
    ) : (
    <Button variant="gradient"
    className="mt-2 text-sm"
    size="sm"
    fullWidth={true}
    onClick={() => setTokenId(nft.tokenId)}
  >
    {nft.name}
</Button>
      )}
          
        </SwiperSlide>
      ))}
    </Swiper>
    {/* { nftList.length > 0 && 
      <Button className="flex items-end justify-end place-items-end flex-end" onClick={() => swiper.slideNext()}>Next</Button> } */}


        

            {/* <Input color="blue" label="판매 NFT선택" value={tokenId} size="lg" onChange={(e) => setTokenId(e.target.value)}/> */}
            <Input color="blue" label="판매글 제목" value={title} size="lg" onChange={(e) => setTitle(e.target.value)} />
            <Input color="blue" label="판매 가격(ETH)" value={price} size="lg" onChange={(e) => setPrice(e.target.value)}/>
            <Textarea color="blue" label="판매글 내용" value={content} size="lg" onChange={(e) => setContent(e.target.value)}/>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={() => {handleOpen(); registerSales(title, content, price, tokenId); console.log(tokenId);}} fullWidth>
              등록
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      
          <div className="flex flex-col justify-center">
              {/* 판매글 목록을 3개씩 한 줄에 보여주기 */}
              {groupedSalesItems.map((salesGroup, index) => (
                <div key={index} className="flex flex-row justify-between">
                  {salesGroup.map((item) => (
                    <SalesCard key={item.postId} item={item} id={item.postId} />
                  ))}
                </div>
              ))}
            </div>
          

        
        <br></br>
        </div>
        </div>
      </header>
      
    </div>
  );
}