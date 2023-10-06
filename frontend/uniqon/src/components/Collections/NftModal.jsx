import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  Dialog
} from "@material-tailwind/react";
import { TiMediaRecord } from "react-icons/ti";

export function NftModal({ isOpen, onClose, selectedNft }) {
  return (
    <Dialog size="sm" open={isOpen} className="bg-transparent shadow-none">
      <Card className="mx-auto w-full  max-w-[48rem]">
        <CardHeader
          variant="gradient"
          color="green"
          className="grid mb-4 h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            NFT
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-wrap gap-4 justify-center">
          <div className="flex justify-center">
            <img
              src={selectedNft.image}
              alt={selectedNft.nickname}
              className="my-4 w-96 mb-4"
              style={{ maxWidth: "60%" }}
            />
          </div>

          <hr className="border-t border-gray-300 my-4"></hr>

          <div
            style={{
              color: "black",
              display: "flex",
              flexDirection: "column",
              fontSize: "20px"
            }}
          >
            <div
              style={{
                color: "black",
                display: "flex",
                marginLeft: "20px",
                alignItems: "center"
              }}
            >
              <p>- 소유주: {selectedNft.nickname}</p>
            </div>
            <div
              style={{
                color: "black",
                display: "flex",
                marginLeft: "20px",
                alignItems: "center"
              }}
            >
              <p>- 동물 이름: {selectedNft.name}</p>
            </div>
            <div
              style={{
                color: "black",
                display: "flex",
                marginLeft: "20px",
                alignItems: "center"
              }}
            >
              <p>- 나이: {selectedNft.age}</p>
            </div>
            <div
              style={{
                color: "black",
                display: "flex",
                marginLeft: "20px",
                alignItems: "center"
              }}
            >
              <p>- 특징: {selectedNft.feature}</p>
            </div>
          </div>
          <hr className="border-t border-gray-300 my-4"></hr>
        </CardBody>
        <CardFooter className="pt-4 flex justify-center">
          <Button variant="gradient" onClick={onClose}>
            닫기
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}

export function MidModal({ isOpen, onClose, selectedCard, goToNft }) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div
        className="modal-content bg-white p-4 rounded-lg shadow-md"
        style={{
          transform: "translate(-310px, -130px)",
          maxWidth: "20rem",
          maxHeight: "80vh",
          margin: "0 auto"
        }}
      >
        <div style={{ backgroundColor: "purple", padding: "65px" }}>
          <div style={{ color: "black" }}>
            <p>특징: {selectedCard.feature}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
