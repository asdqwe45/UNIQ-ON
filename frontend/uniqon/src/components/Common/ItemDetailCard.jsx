import React from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  IconButton,
  Dialog,
  CardFooter,
} from "@material-tailwind/react";

import { FaEthereum } from "react-icons/fa6";

import { ethers } from "ethers";
import useUserInfoStore from "../../stores/UserInfoStore";

import contractAbi from "../contractAbi.json";

import { useEffect, useState } from "react";
import { useTransactionStore } from "../../stores/TransactionStore";

export function ItemDetailCard({ item }) {
  const { selectedPostId, selectedNftId } = useTransactionStore();

  const { accessToken, walletAddress } = useUserInfoStore();

  const [title, setTitle] = useState("test");
  const [content, setContent] = useState("test");
  const [detailPrice, setDetailPrice] = useState("");
  const [species, setSpecies] = useState("1");
  const [image, setImage] = useState("1");
  const [nickname, setNickname] = useState("1");

  const [구매모달open, set구매모달Open] = React.useState(false);

  const handleOpen = () => {
    set구매모달Open(!구매모달open);
  };

  // const { accessToken, walletAddress } = useUserInfoStore();

  // 아직 상세아이템 조회 api가 없어서 하드코딩하려고 거래 store에서 salesItemList 사용
  const { salesItemsList, setSalesItemsList } = useTransactionStore();

  const {
    forDetailItem,
    setForDetailItem,
    sellerAddress,
    tokenId,
    setSellerAddress,
    setTokenId,
    price,
    setPrice,
  } = useTransactionStore();

  const [진행중open, set진행중Open] = React.useState(false);

  const 진행중handleOpen = () => {
    set진행중Open(!진행중open);
  };

  const [itemwishcheck, setItemwishcheck] = React.useState(
    forDetailItem.PostInfo.wishCheck
  );

  const [postId, setPostId] = React.useState("");

  useEffect(() => {
    setItemwishcheck(item.wishCheck);
    console.log(forDetailItem);
    console.log(item);
    setDetailPrice(forDetailItem.PostInfo.price);
    setPostId(forDetailItem.PostInfo.postId);
    console.log(postId)
    setPrice(forDetailItem.PostInfo.price);
    setSellerAddress(forDetailItem.SellerInfo.walletAddress);
    setTokenId(forDetailItem.nftInfo.tokenId);
    console.log(sellerAddress);
    console.log(price);
    console.log(tokenId);
    console.log(detailPrice);

    console.log(postId);
    // console.log(salesItemsList);
    // setTitle(item.PostInfo.title);
    // setContent(item.PostInfo.content);
    // setPrice(item.PostInfo.price);
    // setSpecies(item.nftInfo.species);
    // setImage(item.nftInfo.image);
    // setNickname(item.SellerInfo.nickname);
  }, []);

  const toggleWishlist = () => {
    // setItemwishcheck((cur) => !cur); // 이전 상태를 반전시켜 새로운 상태 설정
    console.log(forDetailItem.PostInfo.wishCheck);
    console.log(itemwishcheck);
    setItemwishcheck(item.wishCheck);

    if (itemwishcheck === true) {
      deleteWishlist();
      setItemwishcheck(0);
    } else {
      addWishlist();
      setItemwishcheck(1);
    }
  };

  if (!forDetailItem) {
    // item 정보가 없을 경우 로딩 또는 오류 처리를 할 수 있습니다.
    return <div>Loading...</div>;
  }

  async function addWishlist() {
    console.log(postId);

    try {
      const res = await axios.post(`/api/wishlist/add/${postId}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      console.log(postId);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteWishlist() {
    try {
      const res = await axios.delete(`/api/wishlist/${postId}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function transact(price, sellerAddress, tokenId) {
    try {
    //price는 판매자가 등록한 가격 단위는 이더
    //sellerAddress 판매자 지갑 주소
    //tokenId 거래 될 NFT tokenId
    const provider = new ethers.BrowserProvider(window.ethereum);
    // 싸피 네트워크로 바꾸기
    const net = new ethers.JsonRpcProvider(
      "https://gethrpc.ssafy-blockchain.com"
    );

    const signer = await provider.getSigner();

    //나중에 싸피 네트워크 컨트랙트 주소로 변경 필요
    const contractAddress = "0x303a548f56ff203d435190ea3a082b59d726ce36";
    const gasProvider = await provider.getFeeData();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer,
      gasProvider
    );

    const fee=ethers.parseEther(price)
    const options = { value: fee };

    // const receipt=await contractInstance.connect(signer).saleNFT(sellerAddress,price,tokenId,fee,options)
    const receipt = await contractInstance
      .connect(signer)
      .saleNFT(
        sellerAddress,
        ethers.parseEther(price),
        tokenId,
        options
      );


    const rr = await receipt.wait();
    const txReceipt = await net.getTransactionReceipt(receipt.hash);
    // console.log(txReceipt)
    // status 1이면 성공 아니면 실패
    // 에러 처리 해서 실패했을 경우엔 백에 다음 요청 보내지 않기
    console.log(txReceipt.status);

    //다음 요청에 보내야 하는 값들
    console.log(receipt.hash); //tx hash
    // console.log(parseInt(txReceipt.logs[1].data,16)) //tokenId
    //판매자 주소
    //구매자 주소
    const saveTxHisData = {
      tokenId: tokenId,
      // 여기 tokenId 는 판매자가 등록한 tokenId로 바꾸기
      txHash: receipt.hash,
      postId: postId,
    };
    const saveTxHisForm = new FormData();
    saveTxHisForm.append("data",new Blob([JSON.stringify(saveTxHisData)],{type:'application/json'}));
    const saveTxHistory = await axios.post("/api/nfts/buy",saveTxHisForm,{
      headers:{
        "Content-Type":'multipart/form-data'
      }
    });
    console.log(saveTxHistory);
    alert("결제가 완료되었습니다.");
  } catch (error) {
    console.log(error);
    alert("결제에 실패했습니다.");
  }
}

  return (
    <Card className="w-full h-[24rem] max-w-[60rem] flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="w-2/5 m-0 rounded-r-none shrink-0"
      >
        <img
          src={forDetailItem.nftInfo.image}
          alt="card"
          className="object-cover w-full h-full"
        />
        <IconButton
          size="sm"
          color={itemwishcheck === 1 ? "red" : "gray"}
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
          onClick={() => {
            toggleWishlist();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={itemwishcheck ? "red" : "none"}
            stroke={itemwishcheck ? "none" : "currentColor"}
            // fill={itemwishcheck ? "currentColor" : "none"}
            // stroke={itemwishcheck ? "none" : "currentColor"}
            className="w-6 h-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody className="flex flex-col items-center justify-center w-[600px]">
        <Typography variant="h4" color="blue-gray" className="mb-4">
          {forDetailItem.PostInfo.title}
        </Typography>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {forDetailItem.nftInfo.species}
        </Typography>
        <Typography
          variant="h6"
          color="gray"
          className="flex items-center mb-4 uppercase"
        >
          <FaEthereum /> {forDetailItem.PostInfo.price} ETH
        </Typography>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {forDetailItem.nftInfo.name}
        </Typography>
        <Typography variant="h6" color="gray" className="mb-4 font-normal">
          by {forDetailItem.SellerInfo.nickname}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {forDetailItem.PostInfo.content}
        </Typography>
        <a href="#" className="inline-block">
          {walletAddress !== sellerAddress && (
            <Button
              onClick={handleOpen}
              variant="gradient"
              className="flex text-lg"
              color="red"
            >
              구매하기
              <img className="w-8 h-8 ml-1" src="/coin.gif" alt="" />
            </Button>
          )}
        </a>
      </CardBody>
      {/* 모달 */}
      <Dialog
        open={구매모달open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="grid mb-4 h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              구매 확인
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <img src="/basket.gif" alt="my-gif" />
            <div className="flex justify-center">
              <span className="text-lg">
                <span className="font-bold">
                  {forDetailItem.PostInfo.title}
                </span>
                를 구매하시겠습니까?
              </span>
            </div>
            <span className="flex items-center justify-center text-lg">
              <FaEthereum />{" "}
              <span className="font-bold">
                {forDetailItem.PostInfo.price} ETH
              </span>
            </span>
          </CardBody>
          <CardFooter className="flex justify-end pt-0">
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                handleOpen();
                transact(price, sellerAddress, tokenId);
              }}
            >
              <span>결제하기</span>
            </Button>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>취소</span>
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      {/* 결제 진행 중 */}
      {/* <Dialog
        open={진행중open}
        handler={진행중handleOpen}
        className="bg-transparent shadow-none"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <Card className="mx-auto w-full max-w-[24rem]">
        <CardHeader
            variant="gradient"
            color="blue"
            className="grid mb-4 h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              결제 진행 중
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
          <img src="/basket.gif" alt="my-gif" />
          귀여운 친구를 구매하고 있는 중입니다.
        </CardBody>
        <CardFooter className="flex justify-end pt-0">
        <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>결제하기</span>
          </Button>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >.
          </Button>
          
        </CardFooter>
        </Card>
      </Dialog> */}
    </Card>
  );
}
