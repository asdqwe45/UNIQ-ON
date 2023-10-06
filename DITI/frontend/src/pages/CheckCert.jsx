import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Typography, CardFooter } from "@material-tailwind/react";
import useUserInfoStore from '../stores/UserInfoStore.js'
import axios from "axios"
import { Buffer } from 'buffer';

export function CheckCert() {
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
            const infos = decodedJwts.map(payload => {
                const info = {
                    ...payload.vc.credentialSubject.data,
                    exp: payload.exp,
                    nbf: payload.nbf,
                    walletAddress: payload.sub.split(":").pop()
                }
                return info
            });
            setDecodedJwts(infos);

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
        <div>
            {/* 신분증 종류에 따라서 여러 개 올 수 있음! 우리 프로젝트는 주민등록증만 만들어놓기는 했지만 개념상으로는 그럼 참고해주세욥 */}
            {/* <div className='m-10'>DID 인증서 리스트 조회</div> */}

            <div className='max-w-xl m-3 mx-auto border-4 border-solid border-while'>
                <div className='m-10'>
                    {VcList && VcList.length > 0 ? (
                        VcList.map((vc, index) => (
                            <div key={index}>
                                <Card className="w-100">
                                <Typography className="mt-3 font-semibold">
                                    DITI 인증서
                                </Typography>
                                <CardHeader floated={false} className="flex h-50" style={{ backgroundColor: '#333' }}s>
                                <lord-icon
                                    src="https://cdn.lordicon.com/cqgtrhpg.json"
                                    trigger="hover"
                                    colors="outline:#131432,primary:#606874,secondary:#4bb3fd,tertiary:#ebe6ef"
                                    style={{ width: "180px", height: "180px", left:"12px" }}>
                                </lord-icon>
                                <lord-icon
                                    src="https://cdn.lordicon.com/dykrlspk.json"
                                    trigger="hover"
                                    colors="outline:#121331,primary:#4bb3fd,secondary:#ebe6ef"
                                    style={{ width: "160px", height: "160px", top: "10px", right:"-15px" }}>
                                </lord-icon>
                                </CardHeader>
                                <CardBody className="text-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    신분증 : {decodedJwts[index].idName}
                                </Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    이름 : {decodedJwts[index].name}
                                </Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    고유번호 : {decodedJwts[index].pin}
                                </Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    성별 : {decodedJwts[index].gender}
                                </Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    생년월일 : {decodedJwts[index].birth}
                                </Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    발급일자 : {new Date(decodedJwts[index].nbf * 1000).toLocaleString()}
                                </Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    만료일자 : {new Date(decodedJwts[index].exp * 1000).toLocaleString()}
                                </Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    지갑주소 : {decodedJwts[index].walletAddress}
                                </Typography>
                                </CardBody>
                                <Button
                                    className="m-3 text-md h-30 bg-gradient-to-r to-green-300 from-[#438fff]"
                                    onClick={() => renewVC(vc.type)}
                                >
                                    전자 신분증 갱신
                                </Button>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <div>
                            <div>발급받은 인증서가 없습니다</div>
                            <img src={process.env.PUBLIC_URL + "/noData.jpg"} alt="DITI" />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}