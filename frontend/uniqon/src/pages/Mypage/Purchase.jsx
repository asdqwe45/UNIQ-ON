import axios from "axios";
import { useEffect, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { TxHisModal } from "../../components/MyPage/TxHisModal";

export function Purchase() {
  // 구매 내역
  const [purchaseList, setpurchaseList] = useState([]);
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTxHis, setSelectedTxHis] = useState({
    seller:"",
            buyer:"",
            txHash:"",
            transactedAt:"",
            nftId:"",
            nftName:"",
            nftImage:""
  });

  const clickTxHis = (purchase) => {
    setSelectedTxHis({
      seller:purchase.seller,
            buyer:purchase.buyer,
            txHash:purchase.txHash,
            transactedAt:purchase.transactedAt,
            nftId:purchase.nftId,
            nftName:purchase.nftName,
            nftImage:purchase.nftImage
    });
    setIsModalOpen(true);
  };



  useEffect(() => {
    async function purchaseList() {
      try {
        const response = await axios.get(`/api/myPage/boughtList`, {
          params: {
            page: page,
            size: 4,
          },
        });
        if (response.status === 200) {
          console.log(response);
          setpurchaseList(response.data.response.content);
        }
      } catch (error) {
        console.log("실패", error);
      }
    }
    purchaseList();
  }, [page]);

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="App">
      <div className="mb-4">
      {page > 0 && <Button onClick={handlePreviousPage}><MdArrowBack className="w-6 h-6"></MdArrowBack></Button>}
      {purchaseList.length > 0 && (
        <Button onClick={handleNextPage}><MdArrowForward className="w-6 h-6"></MdArrowForward></Button>
        )}
        </div>
      <div className="flex w-[1400px] items-start gap-[40px] relative flex-wrap m-auto">
        {purchaseList.map((purchase, index) => (
          <div
            key={index}
            className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]"
          >
            <Card className="w-full max-w-[20rem] shadow-lg">
              <CardHeader floated={false} color="blue-gray">
                <img src={purchase.nftImage} alt="ui/ux review check" />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardFooter className="pt-3 pb-3">
                <h3>판매자 : {purchase.seller}</h3>
                <Button className="text-sm" size="sm" fullWidth={true} onClick={() => { clickTxHis(purchase); }}>
                  {purchase.nftName}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      {selectedTxHis && (
        <TxHisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedTxHis={selectedTxHis}></TxHisModal>
      )}
    </div>
  );
}
