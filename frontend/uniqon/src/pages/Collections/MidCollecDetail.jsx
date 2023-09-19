import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export function MidCollecDetail() {
  const navigate = useNavigate();

  const goToNFTList = () => {
    navigate('/nftlist');
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>여기는 포메라니안을 보여주는 중분류 페이지 입니다.</p>
        <Button className="text-4xl w-96 h-28" onClick={goToNFTList}>
          NFT 둘러보기
        </Button>
      </header>
    </div>
  );
}
