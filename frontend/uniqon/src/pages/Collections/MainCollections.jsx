import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton
} from '@material-tailwind/react';
import { useCollectionsStore } from '../../stores/CollectionsStore';

export function MainCollections() {
  const navigate = useNavigate();
  const { collections, setCollections } = useCollectionsStore();

  const data = [
    {
      id: 1,
      type: 'fox',
      image: 'fox.png'
    },
    {
      id: 2,
      type: 'turtle',
      image: 'turtle.png'
    }
  ];

  const URL = 'http://localhost:5000';

  async function mainList() {
    try {
      const response = await axios.get(URL + '/api/collections/list/main');
      console.log('success: ', response);
    } catch (e) {
      console.log('failed: ', e);
    }
  }

  const goToMiddle = () => {
    navigate('/midcollections');
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>여기는 대분류 페이지 입니다.</p>
        <Button className="text-4xl w-96 h-28" onClick={goToMiddle}>
          강아지
        </Button>
        <Button className="text-4xl w-96 h-28" onClick={mainList}>
          대분류 axios 요청
        </Button>
        <div className="flex space-x-4">
          <Card className="w-full max-w-[26rem] shadow-lg">
            <CardHeader floated={false} color="blue-gray">
              <img src="fox.png" alt="ui/ux review check" />
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
                  setCollections(data[0].id);
                  goToMiddle();
                }}
                className="text-lg"
                size="lg"
                fullWidth={true}
              >
                여우
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-full max-w-[26rem] shadow-lg">
            <CardHeader floated={false} color="blue-gray">
              <img src="turtle.png" alt="ui/ux review check" />
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
                  setCollections(data[1].id);
                  goToMiddle();
                }}
                className="text-lg"
                size="lg"
                fullWidth={true}
              >
                거북이
              </Button>
            </CardFooter>
          </Card>
        </div>
      </header>
    </div>
  );
}
