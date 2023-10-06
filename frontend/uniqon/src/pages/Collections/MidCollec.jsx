import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCollectionsStore } from "../../stores/CollectionsStore";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { TiArrowLeftThick } from "react-icons/ti";

export function MidCollections() {
  const navigate = useNavigate();

  const { mainCollecId, setMidCollecId, setMidCollecType, setMidCollecImg } =
    useCollectionsStore();

  const [midCardsData, setMidCardsData] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    id: "",
    image: "",
    feature: ""
  });
  const splitFeature = selectedCard.feature.split("/");
  const [hoveredCards, setHoveredCards] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleHovered = (card, isHovered) => {
    if (card) {
      setSelectedCard({
        id: card.id,
        image: card.image,
        feature: card.feature
      });
      setHoveredCards((preHoveredCards) => ({
        ...preHoveredCards,
        [card.id]: isHovered
      }));
    }
  };

  useEffect(() => {
    async function middleList() {
      try {
        const response = await axios.get(
          `/api/collections/list/middle/${mainCollecId}`
        );
        console.log("success", response);

        setMidCardsData(response.data.response.content);
      } catch (e) {
        console.log("failed: ", e);
      }
    }
    middleList();
  }, [currentPage, mainCollecId]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = midCardsData.slice(startIndex, endIndex);

  const goToNFTList = () => {
    navigate("/nftlist");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-row justify-center w-full bg-white">
          <div className="bg-white w-[1440px] h-[1024px] relative">
            <TopNavBar></TopNavBar>

            <div className="flex mt-80 -mx-4 flex-wrap h-[52px]">
              {currentPageData.map((card, index) => (
                <div key={index} className="w-1/4 mb-[430px] px-4 relative">
                  <div
                    onMouseEnter={() => handleHovered(card, true)}
                    onMouseLeave={() => handleHovered(card, false)}
                  >
                    <div className="absolute left-1/2 top-1/2 h-80 w-72 -translate-x-1/2 -translate-y-1/2  rounded-2xl bg-teal-100"></div>
                    {hoveredCards[card.id] ? (
                      <div className="absolute left-1/2 top-1/2 h-80 w-72 -translate-x-1/2 -translate-y-1/2  space-y-6 rounded-2xl bg-teal-50 p-6 transition duration-300 hover:rotate-6 flex items-center justify-center">
                        <div
                          onClick={() => {
                            setMidCollecId(card.id);
                            setMidCollecType(card.species);
                            setMidCollecImg(card.image);
                            goToNFTList();
                          }}
                          className="flex justify-center"
                        >
                          <p style={{ color: "black", fontSize: "18px" }}>
                            {splitFeature.map((feature, index) => (
                              <div key={index}>
                                {index !== splitFeature.length - 1 && (
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center"
                                    }}
                                  >
                                    {index + 1}. {feature}.
                                  </span>
                                )}
                              </div>
                            ))}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute left-1/2 top-1/2 h-80 w-72 -translate-x-1/2 -translate-y-1/2  space-y-6 rounded-2xl bg-teal-50 p-6 transition duration-300 hover:rotate-6">
                        <div className="flex justify-end">
                          <div className="h-4 w-4 rounded-full bg-white"></div>
                        </div>

                        <div
                          onClick={() => {
                            setMidCollecId(card.id);
                            setMidCollecType(card.species);
                            setMidCollecImg(card.image);
                            goToNFTList();
                          }}
                          className="flex justify-center"
                        >
                          <img
                            src={card.image}
                            alt="ui/ux review check"
                            className="h-48 -mt-4 aspect-square "
                          />
                        </div>

                        <footer className="flex justify-center">
                          <Button
                            onClick={() => {
                              setMidCollecId(card.id);
                              setMidCollecType(card.species);
                              setMidCollecImg(card.image);
                              goToNFTList();
                            }}
                            variant="filled"
                            style={{ fontSize: "15px" }}
                            className="w-52 bg-[#00A990] -mt-2 justify-center flex items-baseline gap-2 rounded-lg px-4 py-2.5 text-xl font-bold text-white hover:bg-[#80B6AB]"
                          >
                            {card.species}
                          </Button>
                        </footer>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-row " style={{ marginTop: "550px" }}>
              <div style={{ marginRight: "600px" }}>
                <Button onClick={() => navigate(-1)}>
                  <TiArrowLeftThick
                    style={{ fontSize: "20px" }}
                  ></TiArrowLeftThick>
                </Button>
              </div>
              <div className="flex items-center ">
                <Pagination
                  totalPages={Math.ceil(midCardsData.length / pageSize)}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                ></Pagination>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
