import axios from 'axios';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  IconButton
} from '@material-tailwind/react';

export function Sales() {
  // 판매 내역
  async function salesList() {
    try {
      const response = await axios.get(`/api/myPage/salesList`);
      console.log('성공', response);
    } catch (error) {
      console.log('실패', error);
    }
  }

  return (
    <div className="App">
      <p>판매이력</p>
      <div className="flex w-[1200px] items-start gap-[32px] relative flex-wrap">
        <div className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
          {/* 카드 넣기 */}
          <Card className="w-full max-w-[20rem] shadow-lg">
            <CardHeader floated={false} color="blue-gray">
              <img src="fox.png" alt="ui/ux review check" />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardFooter className="pt-3 pb-3">
              <Button className="text-sm" size="sm" fullWidth={true}>
                여우
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
          {/* <div className="inline-flex flex-col items-start relative flex-[0_0_auto]"> */}
          {/* 카드 넣기 */}
          <Card className="w-full max-w-[20rem] shadow-lg">
            <CardHeader floated={false} color="blue-gray">
              <img src="fox.png" alt="ui/ux review check" />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardFooter className="pt-3 pb-3">
              <Button className="text-sm" size="sm" fullWidth={true}>
                여우
              </Button>
            </CardFooter>
          </Card>
          {/* </div> */}
        </div>
        <div className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] mr-[-96.00px] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
          {/* <div className="inline-flex flex-col items-start relative flex-[0_0_auto]"> */}
          {/* 카드넣기 */}
          <Card className="w-full max-w-[20rem] shadow-lg">
            <CardHeader floated={false} color="blue-gray">
              <img src="fox.png" alt="ui/ux review check" />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardFooter className="pt-3 pb-3">
              <Button className="text-sm" size="sm" fullWidth={true}>
                여우
              </Button>
            </CardFooter>
          </Card>
          {/* <div className="top-[236px] absolute w-[340px] h-px left-0 bg-[#0000000d]" /> */}
          {/* </div> */}
        </div>
        <div className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            {/* 카드 넣기 */}
            <Card className="w-full max-w-[20rem] shadow-lg">
              <CardHeader floated={false} color="blue-gray">
                <img src="fox.png" alt="ui/ux review check" />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardFooter className="pt-3 pb-3">
                <Button className="text-sm" size="sm" fullWidth={true}>
                  여우
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            {/* 카드 넣기 */}
            <Card className="w-full max-w-[20rem] shadow-lg">
              <CardHeader floated={false} color="blue-gray">
                <img src="fox.png" alt="ui/ux review check" />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardFooter className="pt-3 pb-3">
                <Button className="text-sm" size="sm" fullWidth={true}>
                  여우
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            {/* 카드 넣기 */}
            <Card className="w-full max-w-[20rem] shadow-lg">
              <CardHeader floated={false} color="blue-gray">
                <img src="fox.png" alt="ui/ux review check" />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardFooter className="pt-3 pb-3">
                <Button className="text-sm" size="sm" fullWidth={true}>
                  여우
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
