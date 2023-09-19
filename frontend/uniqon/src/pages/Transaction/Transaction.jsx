import React from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { useTransactionStore } from "../../stores/TransactionStore";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { SalesCard } from "../../components/Common/SalesCard";

import { useEffect, useState } from "react";

export function Transaction() {
  const nftImg = React.useRef(null);
  

  const URL = "http://localhost:5000"


  async function getSales() {
        
    try{

      const res = await axios.get(URL + "/api/sales/post");
            console.log(res.data)

        } catch(err) {
          console.log(err)
        }
      }

  async function registerSales() {

      try {
        const data = {
          price: 1000,
          content: "test",
          title: "test",
          species: "test",
          creatureName: "test",
        };

        const formData = new FormData()
        formData.append("data", new Blob([JSON.stringify(data)], {type: "application/json"}))
        formData.append("file", nftImg.current.files[0])

        const res = await axios.post(URL + "/api/sales/register", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',  
            },

            file: nftImg.current.files[0],
        });
        console.log(res.data)
        
      } catch (err) {
        console.log(err);
      }
    }

  async function updateSales() {

        try {
        const data = {
            price: 1000,
          };

          const formData = new FormData()
          formData.append("data", new Blob([JSON.stringify(data)], {type: "application/json"}))
          formData.append("file", nftImg.current.files[0])

          const res = await axios.put(URL + "/api/sales/update/1", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',  
              },
              file: nftImg.current.files[0],
          });
            console.log(res.data)

        } catch(err) {
          console.log(err)
        }
      }

  async function deleteSales() {

        try {
          const res = await axios.delete(URL + "/api/sales/delete/1");
            console.log(res.data)

        } catch(err) {
          console.log(err)
        }
      }

  async function serachSales() {

        try {
          const res = await axios.get(URL + "/api/sales/search/word=1");
            console.log(res.data)

        } catch(err) {
          console.log(err)
        }
      }

  async function detailSales() {
          
    try {
            const res = await axios.get(URL + "/api/sales/detail/1");
              console.log(res.data)

          } catch(err) {
            console.log(err)
          }
        }
        

  

  return (
    <div className="App">
      
      
      <header className="App-header">
      <div className="bg-white flex flex-row justify-center w-full">
        <div className="bg-white w-[1440px] h-[1024px] relative">
          <TopNavBar />
          <p>
            Transaction
          </p>
          <br></br>

          <SalesCard />

        <SalesCard />

        <Button color="teal" onClick={getSales}>판매글 조회</Button>
        <br></br>
        <Button color="yellow" onClick={registerSales}>판매 등록</Button>
        <br></br>
        <Button color="blue" onClick={updateSales}>판매 수정</Button>
        <br></br>
        <Button color="cyan" onClick={deleteSales}>판매 삭제</Button>
        <br></br>
        <Button color="red" onClick={serachSales}>판매 검색</Button>
        <br></br>
        <Button color="indigo" onClick={detailSales}>판매 상세</Button>
        </div>
        </div>
      </header>
    </div>
  );
}