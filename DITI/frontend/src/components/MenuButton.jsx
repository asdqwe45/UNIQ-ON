import React from 'react';
import { useConfigStore } from '../stores/ConfigStore';
import useUserInfoStore from '../stores/UserInfoStore';
// import { useNavigate } from 'react-router-dom';

export function MenuButton() {
    // const navigate = useNavigate();
    const setPage = useConfigStore(s=>s.setPage)
    const walletAddress = useUserInfoStore(s=>s.walletAddress)

    const issueLink = () => {
    //   navigate('/diti/issue');
        if(walletAddress){
            setPage("issue")
        }else{
            alert("DITI에 먼저 로그인 해주세요!")
        }
    };

    const checkLink = () => {
        // navigate('/diti/check');
        if(walletAddress){
            setPage("check")
        }else{
            alert("DITI에 먼저 로그인 해주세요!")
        }
    };

    return (
        <div className="flex items-center justify-center flex-col mb-10">
            {/* main card */}
            {/* <div className="bg-[#F4F5FA] p-10 rounded-xl"> */}
            <div>
                {/* headers content*/}

                <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-12  md:space-y-0 justify-center items-center mt-10">
                    <div className="bg-[#FFFBEC] rounded-xl" onClick={issueLink}>
                        <div className="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96 md:w-auto">
                            <div className="mt-3 font-semibold text-2xl m-3">DITI 인증서 발급하기</div>
                            <img className="cursor-pointer max-w-md" src={process.env.PUBLIC_URL + "/Landing/issueNew.png"} alt="issue" />
                        </div>
                    </div>

                    <div className="bg-[#F9ECFF] rounded-xl" onClick={checkLink}>
                        <div className="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96 md:w-auto max-h-full">
                            <div className="mt-3 font-semibold text-2xl m-3">DITI 인증서 조회하기</div>
                            <img className="cursor-pointer max-w-md" src={process.env.PUBLIC_URL + "/Landing/checkNew.png"} alt="check" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}