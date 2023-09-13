import React from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";

import { useEffect } from "react";

export function Transaction() {

  const URL = "http://localhost:8080"

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

  function registerSales() {
      
      axios
        .post(URL + "/api/sales/register",
        {
          price: 1000,
          content: "test",
          title: "test",
          species: "test",
          creatureName: "test",
        }
        )
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }

  function updateSales() {
        
        axios
          .put(URL + "/api/sales/update/1",
          {
            price: 1000,
          }
          )
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
      }

  function deleteSales() {
        
        axios
          .delete(URL + "/api/sales/delete/1")
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
      }

  function serachSales() {
        
        axios
          .get(URL + "/api/sales/search/word=1")
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
      }

  function detailSales() {
          
          axios
            .get(URL + "/api/sales/detail/1")
            .then((res) => {
              console.log(res.data)
            })
            .catch((err) => {
              console.log(err);
            });
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