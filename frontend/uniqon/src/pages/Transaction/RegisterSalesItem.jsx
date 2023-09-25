import React from "react";
import axios from "axios";

import { Button } from "@material-tailwind/react";

import { CheckoutForm } from "../../components/Common/CheckoutForm";

export function RegisterSalesItem() {

  const nftImg = React.useRef(null);

  async function registerSales() {

    try {
      const data = {
        price: 1000,
        content: "test",
        title: "test",
        species: "test",
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


  return (
    <>
    <span>
        <input 
            type="file"
            ref={nftImg}
            />
        <Button color="yellow" onClick={registerSales}>판매 등록</Button>
    </span>
    <CheckoutForm />
    </>
  )
}