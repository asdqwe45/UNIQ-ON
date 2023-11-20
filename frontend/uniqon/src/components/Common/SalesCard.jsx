import React from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { FaEthereum } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTransactionStore } from "../../stores/TransactionStore";
import useUserInfoStore from "../../stores/UserInfoStore";

export function SalesCard({ item, id }) {
  const navigate = useNavigate();
  const { accessToken, walletAddress } = useUserInfoStore();
  const { forDetailItem, setForDetailItem } = useTransactionStore();
  const [itemwishcheck, setItemwishcheck] = React.useState("");

  const toggleWishlist = () => {
    setItemwishcheck(item.wishCheck);

    if (itemwishcheck === 1) {
      deleteWishlist();
      setItemwishcheck(0);
    } else {
      addWishlist();
      setItemwishcheck(1);
    }
  };

  useEffect(() => {
    setItemwishcheck(item.wishCheck);
  }, []);

  async function getSalesDetail() {
    const params = {
      walletAddress: walletAddress,
    };

    try {
      const res = await axios.get(
        `/api/sales/detail/${id}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        },
        {
          params: params,
        }
      );
      setForDetailItem(res.data.response);
    } catch (err) {
      console.log(err);
    }
  }

  async function goToTranItemDetail() {
    getSalesDetail();
    navigate(`/transaction/tranitemdetail/${id}`);
  }

  async function addWishlist() {
    try {
      const res = await axios.post(`/api/wishlist/add/${id}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getWishlist() {
    try {
      const res = await axios.get(
        `/api/wishlist/${walletAddress}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        },
        {
          params: {
            page: 0,
            size: 9,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteWishlist() {
    try {
      const res = await axios.delete(`/api/wishlist/${id}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card id={id} className="w-full w-[27rem] shadow-lg mb-12">
      <CardHeader floated={false} color="blue-gray">
        <img
          src={item.image}
          alt="ui/ux review check"
          onClick={goToTranItemDetail}
          className="w-full h-[21rem]"
        />
        <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
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
            className="w-6 h-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <Typography
            variant="h5"
            color="blue-gray"
            className="text-2xl font-larg"
            onClick={() => {
              getSalesDetail();
              goToTranItemDetail();
            }}
          >
            {item.title}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-medium font-semibold"
          >
            <FaEthereum />
            {item.price} ETH
          </Typography>
        </div>
        <Typography color="gray">{item.species}</Typography>
        <Typography color="gray">by {item.nickname}</Typography>
      </CardBody>
      <CardFooter className="pt-1">
        <Button
          className="flex justify-center gap-2"
          size="lg"
          fullWidth={true}
          onClick={goToTranItemDetail}
        >
          <BiDetail className="w-5 h-5" />
          상세보기
        </Button>
      </CardFooter>
    </Card>
  );
}
