import axios from 'axios'
import {Button} from "@material-tailwind/react"


export function MyPage() {
  function getuserInfo() {
    const response = axios.get(`http://localhost:8080/api/maypage/info/${1}`)
    .then((resonse) => {
      console.log(resonse)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function updateInfo() {
    const response = axios.put(`http://localhost:8080/api/mypage/info`)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function likeCollections() {
    const response = axios.post(`http://localhost:8080/api/mypage/nft/${1}`)
    .then((resonse) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function deleteCollections() {
    const response = axios.delete(`http://localhost:8080/api/mypage/nft/${1}`)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function likeCollecList() {
    const response = axios.get(`http://localhost:8080/api/mypage/nft`)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function purchaseList() {
    const resonse = axios.get(`http://localhost:8080/api/mypage/shoppingList`)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function salesList() {
    const response = axios.get(`http://localhost:8080/api/mypage/postList`)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <p>
          MyPage
        </p>
        <br></br>
        <Button className='bg-red-500' onClick={getuserInfo}>정보 조회</Button><br></br>
        <Button className='bg-orange-500' onClick={updateInfo}>정보 수정</Button><br></br>
        <Button className='bg-yellow-600' onClick={likeCollections}>좋아요 도감</Button><br></br>
        <Button className='bg-green-600' onClick={deleteCollections}>좋아요 도감 제거</Button><br></br>
        <Button className='bg-blue-600' onClick={likeCollecList}>좋아요 도감 리스트</Button><br></br>
        <Button className='bg-indigo-700' onClick={purchaseList}>구매 목록</Button><br></br>
        <Button className='bg-purple-500' sonClick={salesList}>판매 목록</Button><br></br>
      </header>
    </div>
  );
}