import { Button, Card, CardHeader, CardBody } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { Select, Option, Input, Textarea } from "@material-tailwind/react";
import { ethers } from "ethers";
import contractAbi from "../../components/NFT/contractAbi.json";
import useUserInfoStore from "../../stores/UserInfoStore";
import { useCollectionsStore } from "../../stores/CollectionsStore";
import RingLoader from "react-spinners/RingLoader";
import { useNavigate } from "react-router-dom";
import { FaEthereum } from "react-icons/fa6";

export function NFT() {
  const nftImg = useRef();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [feature, setFeature] = useState("");
  const [selectedMain, setSelectedMain] = useState("");
  const [selectedMiddle, setSelectedMiddle] = useState("");
  const { accessToken } = useUserInfoStore();
  const { mainType } = useCollectionsStore();
  const [isExistImg, setIsExisImg] = useState("");

  const middleOptions = {
    여우: [
      {
        id: 0,
        species: "벵골 여우",
      },
      {
        id: 1,
        species: "아프간 여우",
      },
      {
        id: 2,
        species: "케이프 여우",
      },
    ],
    도마뱀: [
      {
        id: 0,
        species: "크레스티드 게코 도마뱀",
      },
      {
        id: 1,
        species: "레오파드게코 도마뱀",
      },
      {
        id: 2,
        species: "턱수염 도마뱀",
      },
    ],
    거북: [
      {
        id: 0,
        species: "쟁기 거북",
      },
      {
        id: 1,
        species: "붉은귀 거북",
      },
      {
        id: 2,
        species: "커먼 머스크 터틀",
      },
    ],
    앵무새: [
      {
        id: 0,
        species: "금강 앵무",
      },
      {
        id: 1,
        species: "모란 앵무",
      },
      {
        id: 2,
        species: "오색 앵무",
      },
    ],
    물고기: [
      {
        id: 0,
        species: "구피",
      },
      {
        id: 1,
        species: "플라워혼",
      },
      {
        id: 2,
        species: "플래티",
      },
    ],
    뱀: [
      {
        id: 0,
        species: "킹코브라",
      },
      {
        id: 1,
        species: "밀크스네이크",
      },
      {
        id: 2,
        species: "볼파이톤",
      },
    ],
    카멜레온: [
      {
        id: 0,
        species: "베일드 카멜레온",
      },
      {
        id: 1,
        species: "피그미 카멜레온",
      },
      {
        id: 2,
        species: "파슨 카멜레온",
      },
    ],
    "🌟": [
      {
        id: 0,
        species: "아펜 핀셔",
      },
    ],
  };

  const [imgBase64, setImgBase64] = useState("");
  const [aiImgUrl, setAiImgUrl] = useState("");
  const [species, setSpecies] = useState("");
  const [blob, setBlob] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState({
    imageIpfsHash: "",
    nftMetadataHash: "",
  });
  const [status, setStatus] = useState(0);
  const [hash, setHash] = useState("");
  const [tokenId, setTokenId] = useState(0);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mainChange = (selectedMain) => {
    setSelectedMain(selectedMain);
    setSpecies(selectedMain);
  };

  const middleChange = (selectedMiddle) => {
    setSelectedMiddle(selectedMiddle);
  };

  useEffect(() => {
    console.log(status);
  }, [status]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImgBase64(reader.result.split(",")[1]);
    };
    if (file) {
      setIsExisImg(URL.createObjectURL(file));
    }
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!imgBase64) {
      alert("이미지를 업로드 하세요");
      return;
    }
    if (!species) {
      alert("대분류를 선택해주세요!");
      return;
    }
    const data = {
      init_images: [imgBase64],
      species: species,
    };
    try {
      setIsLoading(true);
      setAiImgUrl("");
      const respone1 = await axios.post(
        "https://420b-121-178-98-18.ngrok-free.app/api/img2img",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );
      if (respone1.status === 200) {
        setIsLoading(false);
        const blob = new Blob([respone1.data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        setBlob(blob);
        setAiImgUrl(imageUrl);
      } else {
        console.error("요청 실패");
      }
    } catch (error) {
      console.error("서버에 생성 실패", error);
    }
  };

  const handleButtonClick = () => {
    if (nftImg.current) {
      nftImg.current.click();
    } else {
      console.log("nftImg ref is null");
    }
  };

  async function CreateNft() {
    if (
      name === "" ||
      age === "" ||
      feature === "" ||
      nftImg === null ||
      aiImgUrl === "" ||
      selectedMain === "" ||
      selectedMiddle === ""
    ) {
      alert("빈칸이 있습니다. 다시 확인해 주세요.");
    } else {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const net = new ethers.JsonRpcProvider("https://gethrpc.ssafy-blockchain.com");
      const signer = await provider.getSigner();
      const balance = await provider.getBalance(signer.getAddress());
      if (balance < ethers.parseEther("0.0006")) {
        alert("잔액이 부족합니다.");
        return;
      }
      if (isNaN(age)) {
        alert("나이는 숫자를 입력해주세요!");
        return;
      }
      var formData = new FormData();
      formData.append("file", blob);
      const json = JSON.stringify({
        name: name,
        middleClassificationName: selectedMiddle,
        feature: feature,
        age: age,
      });
      formData.append("data", new Blob([json], { type: "application/json" }));
      let ipfsResponse = {};
      try {
        const response2 = await axios.post("/api/nfts/ipfs", formData, {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "multipart/form-data",
          },
        });
        if (response2.status === 200 && response2.data.success) {
          setIpfsUrl(response2.data.response);
          ipfsResponse = response2.data.response;
        } else {
          alert("중복 닉네임입니다! 다른 닉네임을 선택해주세요!");
          return;
        }
      } catch (error) {
        console.log("IPFS 저장 실패", error);
      }

      const contractAddress = "0x303a548f56ff203d435190ea3a082b59d726ce36";
      const gasProvider = await provider.getFeeData();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer,
        gasProvider
      );

      const fee = ethers.parseEther("0.0005");
      const options = { value: fee };
      const ipfsJsonUrl = ipfsResponse.nftMetadataHash;
      const receipt = await contractInstance
        .connect(signer)
        .mintNFT(signer.address, ipfsJsonUrl, options);
      const rr = await receipt.wait();
      const txReceipt = await net.getTransactionReceipt(receipt.hash);

      setStatus(txReceipt.status);
      setHash(receipt.hash);
      setTokenId(parseInt(txReceipt.logs[1].data, 16));
      setAddress(signer.address);

      if (txReceipt.status === 1) {
        try {
          const registerData = {
            walletAddress: signer.address,
            middleClassificationName: selectedMiddle,
            txHash: receipt.hash,
            name: name,
            feature: feature,
            age: age,
            image: ipfsResponse.imageIpfsHash,
            nftMetadata: ipfsResponse.nftMetadataHash,
            tokenId: parseInt(txReceipt.logs[1].data, 16),
            contractAddress: contractAddress,
          };
          const registerFormdata = new FormData();
          registerFormdata.append(
            "data",
            new Blob([JSON.stringify(registerData)], {
              type: "application/json",
            })
          );
          const response4 = await axios.post("/api/nfts/register", registerFormdata, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });
          alert("NFT 발급이 완료 되었습니다.");
          navigate("/mypage");
        } catch (error) {
          console.log("NFT 발급 실패", error);
        }
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-row justify-center w-full bg-white">
          <div className="bg-white w-[1440px] h-[1024px] relative">
            <TopNavBar />

            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex flex-row items-center space-y-6 md:space-y-0 md:space-x-32">
                <Card className="w-[600px]">
                  <CardHeader floated={false} className="">
                    <span className="flex justify-center">
                      <div>
                        <p
                          style={{
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          이미지 업로드
                        </p>
                        <input
                          name="file"
                          type="file"
                          onChange={handleImgChange}
                          ref={nftImg}
                          accept="image/*"
                          style={{ display: "none" }}
                        />
                        <lord-icon
                          src="https://cdn.lordicon.com/qfbuijil.json"
                          onClick={handleButtonClick}
                          trigger="hover"
                          colors="outline:#121331,primary:#f24c00,secondary:#2ca58d,tertiary:#ebe6ef"
                          style={{ width: "180px", height: "180px" }}
                        />
                        {isExistImg && <p>이미지 업로드 완료!</p>}
                      </div>
                      <div>
                        <p style={{ color: "black", fontWeight: "bold" }}>AI 이미지 생성</p>
                        <button
                          className="text-2xl w-60 "
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginTop: "12px",
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/ejxwvtlg.json"
                            onClick={handleSubmit}
                            trigger="hover"
                            colors="outline:#121331,primary:#08a88a,secondary:#ebe6ef"
                            style={{ width: "150px", height: "150px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </span>
                  </CardHeader>
                  <CardBody className="text-center">
                    <span>
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      ></div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid black",
                            width: "250px",
                            height: "250px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "15px",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                            fontSize: "20px",
                          }}
                        >
                          {isExistImg ? (
                            <img src={isExistImg} alt="Upload Image"></img>
                          ) : (
                            <span>선택한 이미지가 없습니다.</span>
                          )}
                        </div>
                        <div style={{ margin: "20px" }}></div>
                        {aiImgUrl ? (
                          <img
                            id="aiImg"
                            src={aiImgUrl}
                            alt="AI 이미지"
                            style={{ width: "250px", height: "250px" }}
                          ></img>
                        ) : (
                          <div
                            style={{
                              border: "1px solid black",
                              width: "250px",
                              height: "250px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "15px",
                              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                              fontSize: "20px",
                            }}
                          >
                            {isLoading ? (
                              <RingLoader color="#36d7b7" />
                            ) : (
                              <span>AI 이미지가 없습니다.</span>
                            )}
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          className="m-5 text-3xl w-70 h-30 flex items-center justify-center"
                          onClick={CreateNft}
                          color="blue"
                        >
                          NFT 발급
                          <lord-icon
                            src="https://cdn.lordicon.com/ejxwvtlg.json"
                            trigger="hover"
                            colors="outline:#121331,primary:#08a88a,secondary:#ebe6ef"
                            style={{ width: "180px", height: "200px" }}
                          ></lord-icon>
                        </Button>
                      </div>
                      <div>
                        <div className="inline-flex">
                          발급비용 : 0.005 ETH <FaEthereum className="" />
                        </div>
                      </div>
                    </span>
                  </CardBody>
                </Card>

                <div className="flex w-96 flex-col gap-20">
                  <Select variant="standard" label="대분류" onChange={mainChange}>
                    {mainType.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                  <Select variant="standard" label="중분류" onChange={middleChange}>
                    {selectedMain &&
                      (selectedMain === "그 외"
                        ? [{ id: 0, species: "그 외" }]
                        : middleOptions[selectedMain]
                      ).map((option) => (
                        <Option key={option.id} value={option.species}>
                          {option.species}
                        </Option>
                      ))}
                  </Select>
                  <Input
                    variant="standard"
                    label="이름"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input variant="standard" label="나이" onChange={(e) => setAge(e.target.value)} />
                  <Textarea label="특징" onChange={(e) => setFeature(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
