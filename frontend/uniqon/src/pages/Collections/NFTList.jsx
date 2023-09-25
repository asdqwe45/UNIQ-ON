import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NftModal } from '../../components/Collections/NftModal';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Input
} from '@material-tailwind/react';
import { useCollectionsStore } from '../../stores/CollectionsStore';
import { useEffect, useState } from 'react';

export function NFTList() {
  const {
    mainCollecId,
    setMainCollecId,
    midCollecId,
    setMidCollecId,
    midCollecType,
    setMidCollecType,
    midCollecImg,
    setMidCollecImg
  } = useCollectionsStore();

  const [nftData, setNftData] = useState([]);
  const [selectedNft, setSelectedNft] = useState({ id: '', image: '', name: '', age: '', nickname: '', feature: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    async function nftList() {
      try {
        const response = await axios.get(`/api/collections/list/nft/${midCollecId}`);
        console.log('success', response);

        setNftData(response.data.response.content);
      } catch (e) {
        console.log('failed', e);
      }
    }
    nftList();
  }, []);

  const clickNft = (card) => {
    console.log('selectednft', card);
    setSelectedNft({
      id: card.id,
      name: card.name,
      image: card.image,
      age: card.age,
      nickname: card.nickname,
      feature: card.feature
    });
    setIsModalOpen(true);

    // setMidCollecType(card.species);
    // setMidCollecImg(card.image);
  };

  // 검색 기능
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/collections/search`, {
        params: {
          query: searchKeyword
        }
      });
      setNftData(response.data.response.content);
      console.log('검색 결과', response.data.response.content);
    } catch (error) {
      console.log('검색 요청 실패', error);
    }
  };

  // 검색 키 다운
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>여기는 NFT를 보여주는 소분류 페이지 입니다.</p>

        <div className="relative flex w-full max-w-[24rem]">
          <Input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ color: 'white', borderColor: 'white' }}
            containerProps={{ className: 'min-w-0' }}
          ></Input>
          <Button size="sm" onClick={handleSearch} className="!absolute right-1 top-2.5 rounded">
            검색
          </Button>
        </div>

        <br></br>
        {/* 선택된 중분류 카드 보여줌 */}
        <Card className="w-full max-w-[26rem] shadow-lg">
          <CardHeader floated={false} color="blue-gray">
            <img src={midCollecImg} alt="ui/ux review check" />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            <IconButton size="sm" color="red" variant="text" className="!absolute top-4 right-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton>
          </CardHeader>
          <CardFooter className="pt-5">
            <Button className="text-lg" size="lg" fullWidth={true}>
              {midCollecType}
            </Button>
          </CardFooter>
        </Card>
        <br></br>
        {/* NFT 카드 리스트를 보여줌 */}
        <div className="flex space-x-4">
          {nftData.map((card, index) => (
            <Card onClick={() => clickNft(card)} key={index} className="w-full max-w-[26rem] shadow-lg">
              <CardHeader floated={false} color="blue-gray">
                <img src={card.image} alt="ui/ux review check" />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                <IconButton size="sm" color="red" variant="text" className="!absolute top-4 right-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </IconButton>
              </CardHeader>
              <CardFooter className="pt-5">
                <Button
                  onClick={() => {
                    clickNft(card);
                  }}
                  className="text-lg"
                  size="lg"
                  fullWidth={true}
                >
                  {card.ownerNickname}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <NftModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedNft={selectedNft}></NftModal>
      </header>
    </div>
  );
}
