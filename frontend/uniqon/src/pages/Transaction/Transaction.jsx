import React from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";

import { useEffect } from "react";

export function Transaction() {

  // const URL = "http://localhost:8080"

  // function getSales() {
        
  //       axios
  //         .get(URL + "/api/sales/list")
  //         .then((res) => {
  //           console.log(res.data)
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }

  async function registerSales() {

      try {
        const data = {
          price: 1000,
          content: "test",
          title: "test",
          species: "test",
          creatureName: "test",
        };

        const res = await axios.post("/api/sales/register", data);
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

          const res = await axios.put("/api/sales/update/1", data);
            console.log(res.data)

        } catch(err) {
          console.log(err)
        }
      }

  async function deleteSales() {

        try {
          const res = await axios.delete("/api/sales/delete/1");
            console.log(res.data)

        } catch(err) {
          console.log(err)
        }
      }

  async function serachSales() {

        try {
          const res = await axios.get("/api/sales/search/word=1");
            console.log(res.data)

        } catch(err) {
          console.log(err)
        }
      }

  async function detailSales() {
          
    try {
            const res = await axios.get("/api/sales/detail/1");
              console.log(res.data)

          } catch(err) {
            console.log(err)
          }
        }

  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Transaction
        </p>

        {/* <Button color="gray" onClick={getSales}>getSales</Button> */}
        <br></br>
        <Button color="yellow" onClick={registerSales}>판매 등록</Button>
        <br></br>
        <Button color="blue" onClick={updateSales}>판매 수정</Button>
        <br></br>
        <Button className="bg-cyan-500" onClick={deleteSales}>판매 삭제</Button>
        <br></br>
        <Button color="red" onClick={serachSales}>판매 검색</Button>
        <br></br>
        <Button className="bg-indigo-500" onClick={detailSales}>판매 상세</Button>
      </header>
    </div>
  );
}