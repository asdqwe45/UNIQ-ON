import axios from "axios";
import "./card.css";
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
import { useEffect, useState } from "react";
import { NftModal } from "../../components/Collections/NftModal";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

export function LikeNft() {
  const [likeNftList, setLikeNftList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedNft, setSelectedNft] = useState({
    id: "",
    image: "",
    name: "",
    age: "",
    nickname: "",
    feature: ""
  });

  const clickNft = (nft) => {
    setSelectedNft({
      id: nft.nftId,
      name: nft.name,
      image: nft.image,
      age: nft.age,
      nickname: nft.ownerNickname,
      feature: nft.feature
    });
    setIsModalOpen(true);
  };
  useEffect(() => {
    async function likeCollecList() {
      try {
        const response = await axios.get(`/api/myPage/like-nft-list`, {
          params: {
            page: page,
            size: 4
          }
        });
        if (response.status === 200) {
            setLikeNftList(response.data.response.content);
            console.log("내가 좋아요 한 NFT 리스트 : ", response.data.response.content);
        } 
      } catch (error) {
        console.log("실패", error);
      }
    }
    likeCollecList();
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
      {likeNftList.length > 0 &&(
        <Button onClick={handleNextPage}><MdArrowForward className="w-6 h-6"></MdArrowForward></Button>
        )}
        </div>
      <div className="flex w-[1400px] items-start gap-[40px] relative flex-wrap m-auto">
        {likeNftList.map((nft, index) => (
          <div className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
              <Card key={index} className="w-full max-w-[20rem] shadow-lg">
                <CardHeader floated={false} color="blue-gray">
                  <img src={nft.image} alt="ui/ux review check" />
                  <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                </CardHeader>
                <CardFooter className="pt-3 pb-3">
                  <Button className="text-sm" size="sm" fullWidth={true} onClick={() => { clickNft(nft); }}>
                    {nft.name}
                  </Button>
                </CardFooter>
              </Card>
          </div>
        ))}
      </div>
      <NftModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedNft={selectedNft}></NftModal>
    </div>
  );
}
