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

export function TxHisModal({ isOpen, onClose, selectedTxHis }) {
  return (
    <Dialog size="sm" open={isOpen} className="bg-transparent shadow-none">
      <Card className="mx-auto w-full  max-w-[48rem]">
        <CardHeader
          variant="gradient"
          color="green"
          className="grid mb-4 h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            거래내역
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-wrap gap-4 justify-center">
          <div className="flex justify-center">
            <img
              src={selectedTxHis.nftImage}
              alt={selectedTxHis.nftName}
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
              fontSize: "20px",
              // marginLeft: "200px",
              // maxHeight: "300px",
              overflowY: "auto"
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
              <p>- 구매자: {selectedTxHis.seller}</p>
            </div>
            <div
              style={{
                color: "black",
                display: "flex",
                marginLeft: "20px",
                alignItems: "center"
              }}
            >
              <p>- 판매자: {selectedTxHis.seller}</p>
            </div>
            <div
              style={{
                color: "black",
                display: "flex",
                marginLeft: "20px",
                alignItems: "center"
              }}
            >
              <p>- 트랜잭션 해시: {selectedTxHis.txHash}</p>
            </div>
            <div
              style={{
                color: "black",
                display: "flex",
                marginLeft: "20px",
                alignItems: "center"
              }}
            >
              <p>- 거래시간: {selectedTxHis.transactedAt}</p>
            </div>
            <div
              style={{
                color: "black",
                display: "flex",
                marginLeft: "20px",
                alignItems: "center"
              }}
            >
              <p>- NFT 이름: {selectedTxHis.nftName}</p>
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

    // <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
    //   {/* <div className="modal-bg fixed top-0 left-0 w-full h-full bg-black opacity-50" /> */}
    //   <div
    //     className="modal-content bg-white p-4 rounded-lg shadow-md"
    //     style={{ maxWidth: "30rem" }}
    //   >
    //     {/* <h2 className="text-xl font-semibold">{selectedNft.nickname}</h2> */}
    //     <div style={{ textAlign: "center" }}>
    //       <img
    //         src={selectedNft.image}
    //         alt={selectedNft.nickname}
    //         className="my-4 w-96 mb-4"
    //         style={{ maxWidth: "60%", display: "inline-block" }}
    //       />
    //     </div>

    //     <hr className="border-t border-gray-300 my-4"></hr>
    //     {/* 여기에 카드에 관한 추가 정보를 표시하세요 */}
    // <div
    //   style={{
    //     color: "black",
    //     display: "flex",
    //     alignItems: "center",
    //     marginLeft: "20px"
    //   }}
    // >
    //   <TiMediaRecord style={{ marginRight: "0.5rem" }}></TiMediaRecord>
    //   <h3>소유주: {selectedNft.nickname}</h3>
    // </div>
    // <div
    //   style={{
    //     color: "black",
    //     display: "flex",
    //     alignItems: "center",
    //     marginLeft: "20px"
    //   }}
    // >
    //   <TiMediaRecord style={{ marginRight: "0.5rem" }}></TiMediaRecord>
    //   <p>동물 이름: {selectedNft.name}</p>
    // </div>
    // <div
    //   style={{
    //     color: "black",
    //     display: "flex",
    //     alignItems: "center",
    //     marginLeft: "20px"
    //   }}
    // >
    //   <TiMediaRecord style={{ marginRight: "0.5rem" }}></TiMediaRecord>
    //   <p>나이: {selectedNft.age}</p>
    // </div>
    // <div
    //   style={{
    //     color: "black",
    //     display: "flex",
    //     alignItems: "center",
    //     marginLeft: "20px"
    //   }}
    // >
    //   <TiMediaRecord style={{ marginRight: "0.5rem" }}></TiMediaRecord>
    //   <p>특징: {selectedNft.feature}</p>
    // </div>
    // <hr className="border-t border-gray-300 my-4"></hr>

    //     <div className="mt-4 ml-64">
    //       <Button
    //         onClick={onClose}
    //         variant="outlined"
    //         color="red"
    //         // className="mt-4 text-blue-500 hover:underline"
    //       >
    //         닫기
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
}

export function MidModal({ isOpen, onClose, selectedCard, goToNft }) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      {/* <div className="modal-bg fixed top-0 left-0 w-full h-full bg-black opacity-50" /> */}
      <div
        className="modal-content bg-white p-4 rounded-lg shadow-md"
        style={{
          transform: "translate(-310px, -130px)",
          maxWidth: "20rem",
          maxHeight: "80vh",
          margin: "0 auto"
        }}
      >
        {/* <h2 className="text-xl font-semibold">{selectedNft.nickname}</h2> */}
        {/* <img src={selectedCard.image} alt={selectedCard.nickname} className="my-4 max-w-full mb-4" /> */}
        {/* 여기에 카드에 관한 추가 정보를 표시하세요 */}
        <div style={{ backgroundColor: "purple", padding: "65px" }}>
          <div style={{ color: "black" }}>
            <p>특징: {selectedCard.feature}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
