import axios from "axios";
import { useEffect, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { SalesCard } from "../../components/Common/SalesCard";
import { FaEthereum } from "react-icons/fa6";
import { useNavigate } from "react-router";
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

export function MyWishList() {

  const [myWishList, setMyWishList] = useState([]);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
  async function getWishlist() {
    try {
      const res = await axios.get(`/api/wishlist`, {
        params: {
          page: page,
          size: 4, // 추후에 불러올 만큼 사이즈 설정
        },
      });
      if (res.status === 200 && res.data.success) {
        console.log("위시리스트",res.data.response.content);
        setMyWishList(res.data.response.content);
      } else if (res.data.error.status === 404) {
        setMyWishList([]);
        console.log(res);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  }
  getWishlist();
  }, [page]);
  
  const goPostDetail = (postId) => {
    navigate(`/transaction/tranitemdetail/${postId}`);
  }

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
      {myWishList.length > 0 && (
        <Button onClick={handleNextPage}><MdArrowForward className="w-6 h-6"></MdArrowForward></Button>
        )}
        </div>
      <div className="flex w-[1400px] items-start gap-[40px] relative flex-wrap m-auto">
        {myWishList.map((wish, index) => (
          // <SalesCard key={index} item={wish} id={wish.postId}></SalesCard>
          <div className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
            <div>
              {/* 카드 넣기 */}
              <Card key={index} className="w-full max-w-[20rem] shadow-lg" onClick={() => { goPostDetail(wish.postId); }}>
                <CardHeader floated={false} color="blue-gray">
                  <img src={wish.nftImage} alt="ui/ux review check" />
                  <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                </CardHeader>
                <CardFooter className="pt-3 pb-3">
                  <strong>가격 : <FaEthereum className="inline-flex"/> {wish.price} ETH</strong>
                  <Button className="text-sm" size="sm" fullWidth={true}>
                    {wish.postTitle}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
