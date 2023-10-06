import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { useCollectionsStore } from "../../stores/CollectionsStore";
import { useEffect, useState } from "react";
import { TopNavBar } from "../../components/Common/TopNavBar";

export function MainCollections() {
  const navigate = useNavigate();
  const {
    setMainCollecId,
    setMainCollecType,
    setMainCollecImg,
    mainType,
    setMainType
  } = useCollectionsStore();

  const [mainCardsData, setMainCardsData] = useState([]);

  useEffect(() => {
    async function mainList() {
      try {
        const response = await axios.get(`/api/collections/list/main`, {
          // params: {
          //   page: currentPage,
          //   size: pageSize
          // }
        });
        console.log("success", response);

        setMainCardsData(response.data.response.content);
        setMainType(response.data.response.content.map((item) => item.type));
        console.log("mainType", mainType);
      } catch (e) {
        console.log("failed", e);
      }
    }
    mainList();
  }, []);

  const goToMiddle = () => {
    navigate("/midcollections");
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-row justify-center w-full bg-white">
          <div className="bg-white w-[1440px] h-[1024px] relative">
            <TopNavBar></TopNavBar>

            <br></br>
            <div className="flex mt-60 -mx-4 flex-wrap h-[52px]">
              {mainCardsData.map((card, index) => (
                <div key={index} className="w-1/4 mb-[430px] px-4 relative">
                  <div className="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2  rounded-2xl bg-teal-100"></div>

                  <div className="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2  space-y-6 rounded-2xl bg-teal-50 p-6 transition duration-300 hover:rotate-6">
                    <div className="flex justify-end=">
                      <div className="h-5 w-5 rounded-full bg-white"></div>
                    </div>

                    <div
                      onClick={() => {
                        setMainCollecId(card.id);
                        setMainCollecType(card.type);
                        setMainCollecImg(card.image);
                        goToMiddle();
                      }}
                      className="flex justify-center"
                    >
                      <img
                        src={card.image}
                        alt="ui/ux review check"
                        className="h-64 -mt-2 aspect-square "
                      />
                    </div>

                    <footer className="flex justify-center">
                      <Button
                        variant="filled"
                        className="w-28 bg-[#00A990] -mt-4 justify-center flex items-baseline gap-2 rounded-lg px-4 py-2.5 text-xl font-bold text-white hover:bg-[#80B6AB]"
                        onClick={() => {
                          setMainCollecId(card.id);
                          setMainCollecType(card.type);
                          setMainCollecImg(card.image);
                          goToMiddle();
                        }}
                      >
                        {card.type}
                      </Button>
                    </footer>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
