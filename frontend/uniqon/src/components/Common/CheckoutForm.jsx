import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  LockClosedIcon,
} from "@heroicons/react/24/solid";

import { LoginButton } from "../Auth/LoginButton"
import { SignUpButton } from "../Auth/SignUpButton";


export function CheckoutForm() {


  useEffect(() => {
    handleDataFromChild();
  }, []);

  const [type, setType] = React.useState("card");

  const handleDataFromChild = (data) => {
    setType(data);
  };

  return (
    <Card className="w-full max-w-[24rem]">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
      >
        <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
          <img src="heedong2.png" className="h-16 w-16" />
        </div>
        <Typography variant="h4" color="white">
          Welcome to UNIQON
        </Typography>
      </CardHeader>
      <CardBody>
        <Tabs value={type} className="overflow-visible">
          <TabsHeader className="relative z-0 ">
            <Tab className="font-bold" value="card" onClick={() => setType("card")}>
              로그인
            </Tab>
            <Tab className="font-bold" value="paypal" onClick={() => setType("paypal")}>
              회원가입
            </Tab>
          </TabsHeader>
          <TabsBody
            className="!overflow-x-hidden "
            animate={{
              initial: {
                x: type === "card" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "card" ? 400 : -400,
              },
            }}
          >
            <TabPanel value="card" className="p-0">
              <form className="mt-8 flex flex-col gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className=" font-medium"
                  >
                    UNIQON에서는 METAMASK로 로그인합니다.
                    
                  </Typography>
                  
                </div>

                <div className="mt-2">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className=" font-semibold"
                  >
                    
                    그전에 먼저 DITI로 신원인증을 해야 합니다.
                  </Typography>
                  
                </div>
                <LoginButton onDataFromChild={handleDataFromChild}/>

                <Typography
                  variant="small"
                  color="gray"
                  className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                >
                  <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Your Private Key is
                  secure and encrypted
                </Typography>
              </form>
            </TabPanel>
            <TabPanel value="paypal" className="p-0">
              <form className="mt-8 flex flex-col gap-4">
                <SignUpButton onDataFromChild={handleDataFromChild}/>
                <Typography
                  variant="small"
                  color="gray"
                  className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                >
                  <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Your Private Key is
                  secure and encrypted
                </Typography>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}