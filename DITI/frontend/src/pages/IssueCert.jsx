import React, { useState, useRef } from 'react';
import { Button } from "@material-tailwind/react";
import useUserInfoStore from '../stores/UserInfoStore';
import { useConfigStore } from '../stores/ConfigStore';
import axios from "axios"


export function IssueCert() {
    const inputFileRef = useRef(null)
    const userInfo = useUserInfoStore()
    const setPage = useConfigStore(s => s.setPage)
    const [selectedImage, setSelectedImage] = useState(null);

    async function requestVC() {
        const formData = new FormData()
        formData.append("imgFile", inputFileRef.current.files[0])

        try {
            const response = await axios.post("/diti/did/vc", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': userInfo.token,
                    'walletAddress': userInfo.walletAddress,
                },
            });
            console.log(response)

            if (response.status === 200) {
                console.log("VC발급 성공");
                alert("DITI 인증서 발급에 성공했습니다!")
                // navigate("/diti/check");
                setPage("check")
            } else {
                console.log('response : ', response);
            }


        } catch (e) {
            console.error(e)
            console.log(e.response.data);
            if (e.response.status === 400) {
                alert(e.response.data)
                return
            }
        }
    }


    return (
        <div>
            <div className="flex items-center justify-center p-3">
                <div className="w-full max-w-md p-9 bg-white rounded-lg shadow-lg">
                    <h1 className="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">신분증 파일 업로드</h1>
                    <div
                        className="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                        id="dropzone"
                    >
                      {selectedImage ? (
                            <div>
                            <img src={selectedImage} alt="Uploaded Image" className="mx-auto" />
                            </div>
                        ) : (
                        <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center space-y-2">
                            <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <span className="text-gray-600">Drag and drop your files here</span>
                            <span className="text-gray-500 text-sm">(or click to select)</span>
                        </label>
                        )}
                        <input type="file" id="fileInput" className="hidden" ref={inputFileRef} 
                         onChange={(e) => {
                            if (e.target.files.length > 0) {
                              setSelectedImage(URL.createObjectURL(e.target.files[0]));
                            } else {
                              setSelectedImage(null);
                            }
                          }}
                        />
                    </div>
                </div>
            </div>

            <Button className="text-md h-30 m-3" onClick={requestVC}>DITI 인증서 발급하기</Button>

            {/* <div className='border-while border-solid border-4 m-3 p-5'>
                <input className="text-[20px] text-center" ref={inputFileRef} type="file" name="imgFile" />
            </div> */}


        </div>
    )
}