import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import useUserInfoStore from '../stores/UserInfoStore.js'
import axios from "axios"
import { Buffer } from 'buffer';

export function CheckCertTest() {
  const [VcList, setVcList] = useState([]);
  const walletAddress = useUserInfoStore((state) => state.walletAddress)
  const [decodedJwts, setDecodedJwts] = useState([]);
  const userInfo = useUserInfoStore()

  // 조회 페이지 들어오면 vc 리스트 데이터 불러오기
  // 일회성
  useEffect(() => {
    // Jwt decode (payload 내용을 보여줘야 함)
    certList()
  }, [])
  
  function parseJwt(vcJwt) {
    return JSON.parse(
      Buffer.from(vcJwt.split('.')[1], 'base64').toString()
    );
  }
  async function certList() {
    try {
      const response = await axios.get(`/diti/vc/list/vc/${walletAddress}`, {
      headers: {
          'Authorization': userInfo.token,
          'walletAddress': userInfo.walletAddress,
        },
      })
      console.log(response)
      console.log("test:", response.data.response.content);
      setVcList(response.data.response.content)

      const decodedJwts = response.data.response.content.map(vc => parseJwt(vc.vcJwt));
      setDecodedJwts(decodedJwts);

    } catch (e) {
      console.error(e)
    }
  }
  
  async function renewVC(type) {
    try {
      const response = await axios.put("/diti/did/vc",
        {
          type: type
        },
        {
          headers: {
            'Authorization': userInfo.token,
            'walletAddress': userInfo.walletAddress,
          },
        })
      console.log(response)
      certList()
    } catch (e) {
      console.error(e.response.data)
    }
  }


  return (
    <div className="App">
      <div className="App-header">

        <div className='m-10'>발급받은 신분증 리스트 조회</div>

        <div className='border-while border-solid border-4 m-3 max-w-2xl'>
          <div className='p-20'>전자 신분증</div>
          <div>
            {VcList ? (
              VcList.map((vc, index) => (
                <div key={index}>
                  <p>발급일자</p>
                  <div className="text-xs">{vc.createDateTime}</div>
                  <p>vcJwt</p>
                  {/* <div className="text-xs">{parseJwt(vc.vcJwt)}</div> */}
                  {/* <div className="text-xs">{decodedJwts[index]}</div> */}
                  <div className="text-xs">{JSON.stringify(decodedJwts[index])}</div>
                  <p>walletAddress</p>
                  <div className="text-xs">{vc.walletAddress}</div>
                  {/* 신분증 갱신 버튼 */}
                  <Button
                    className="text-2xl w-50 h-28 m-7"
                    color="green"
                    onClick={() => renewVC(vc.type)}
                  >
                    전자 신분증 갱신
                  </Button>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}