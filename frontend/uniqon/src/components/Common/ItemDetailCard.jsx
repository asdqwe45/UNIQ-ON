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

import { useEffect, useState } from "react";
import { useTransactionStore } from "../../stores/TransactionStore";

export function ItemDetailCard( { item } ) {

  const [postId, setPostId] = React.useState('1');
  const [wishId, setWishId] = React.useState('1');

  const [title, setTitle] = useState("test");
  const [content, setContent] = useState("test");
  const [price, setPrice] = useState("1000");
  const [species, setSpecies] = useState("1");
  const [image, setImage] = useState("1");
  const [nickname, setNickname] = useState("1");

  const [ 구매모달open, set구매모달Open ] = React.useState(false);

  const handleOpen = () => { set구매모달Open(!구매모달open); };


  // 아직 상세아이템 조회 api가 없어서 하드코딩하려고 거래 store에서 salesItemList 사용
  const { salesItemsList, setSalesItemsList } = useTransactionStore();

  const { forDetailItem, setForDetailItem } = useTransactionStore();

  useEffect(() => {
    // console.log(forDetailItem)
    // console.log(item);
    // console.log(salesItemsList);
    // setTitle(item.PostInfo.title);
    // setContent(item.PostInfo.content);
    // setPrice(item.PostInfo.price);
    // setSpecies(item.nftInfo.species);
    // setImage(item.nftInfo.image);
    // setNickname(item.SellerInfo.nickname);
    
  }, []);

  if (!item) {
    // item 정보가 없을 경우 로딩 또는 오류 처리를 할 수 있습니다.
    return <div>Loading...</div>;
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

  return (
    <Card className="w-full max-w-[48rem] flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="w-2/5 m-0 rounded-r-none shrink-0"
      >
        <img
          // src={forDetailItem.nftInfo.image}
          alt="card"
          className="object-cover w-full h-full"
        />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"

        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody>
      <Typography variant="h4" color="blue-gray" className="mb-2">
          {/* 글 제목 | {forDetailItem.PostInfo.title} */}.
        </Typography>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {/* 종 분류 | {forDetailItem.nftInfo.species} */}.
        </Typography>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {/* 가격 | {forDetailItem.PostInfo.price} ETH */}.
        </Typography>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {/* 판매자 | {forDetailItem.SellerInfo.nickname} */}.
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {/* lorem ipsum {forDetailItem.PostInfo.content} */}.
        </Typography>
        <a href="#" className="inline-block">
        <Button onClick={handleOpen} variant="gradient" className="flex text-lg" color="red">
            구매하기
            <img  className="w-8 h-8 ml-1" src="/coin.gif" alt="" />
          </Button>
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

        <span className="text-lg"><span className="font-bold">{forDetailItem.title}
        </span>를 구매하시겠습니까?</span>
        <span className="text-lg">가격 | <span className="font-bold">{forDetailItem.price} ETH</span></span>
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
          >
            <span>취소</span>
          </Button>
          
        </CardFooter>
        </Card>
      </Dialog>
      
    </Card>
  );
}
      