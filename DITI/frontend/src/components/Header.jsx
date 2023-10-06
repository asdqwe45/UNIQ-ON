import { Navbar, Typography } from "@material-tailwind/react";
import useUserInfoStore from "../stores/UserInfoStore";
import { useConfigStore } from "../stores/ConfigStore";
import { LoginButton } from "./LoginButton";

export function Header() {
    const { page, setPage } = useConfigStore()
    const { walletAddress, setUserInfo } = useUserInfoStore()
    return (
        <Navbar className="mx-auto py-3 px-6 shadow-none" >
            <div className={
                "container flex items-center text-black"
            }
            >
                <div className={
                    "mx-2 py-1 font-bold text-4xl cursor-default flex items-center justify-center"
                    // + " transition-all duration-1000 "
                    // + (walletAddress ? " flex-grow-0 " : " flex-grow ")
                }>
                    <img className=" cursor-pointer h-20"
                        onClick={() => { setPage("landing") }}
                        src={process.env.PUBLIC_URL + "/diti2.png"} alt="DITI" />
                    {/* <Typography
                        className={
                            "mx-2 py-1 font-bold text-4xl cursor-default"
                        }
                    >
                        DITI
                    </Typography> */}
                </div>

                <div className={
                    " flex flex-grow "
                    // + " transition-all duration-1000 overflow-hidden flex-nowrap w-0 "
                    // + (walletAddress ? " flex-grow " : " flex-grow-0 ")
                }
                >
                    <div className="flex mx-3 mt-3">
                        <Typography
                            // variant="large"
                            as="button"
                            className={
                                "py-1 px-3 font-semibold text-lg hover:scale-125 rounded whitespace-nowrap transition "
                                + (page === "issue" ? " underline " : "")
                            }
                            onClick={() => { setPage("issue") }}

                        >
                            발급
                        </Typography>
                        <Typography
                            // variant="large"
                            as="button"
                            className={
                                "py-1 px-3 font-semibold text-lg hover:scale-125 rounded whitespace-nowrap transition "
                                + (page === "check" ? " underline " : "")
                            }
                            onClick={() => { setPage("check") }}

                        >
                            조회
                        </Typography>
                    </div>
                    <div className="flex flex-grow justify-end">
                        <Typography
                            as="button"
                            className={
                                "mx-2 px-4 py-2 font-normal text-lg bg-blue-400 rounded-full transition-all ease-in-out max-w-sm w-28 hover:flex-grow duration-1000 overflow-hidden overflow-ellipsis text-white "
                                + (walletAddress ? "" : " hidden ")
                            }
                        >
                            {walletAddress}
                        </Typography>
                        <Typography
                            as="button"
                            className={
                                "mx-2 px-4 py-2 font-normal text-lg border-2 border-gray-500 rounded-full hover:bg-red-400 hover:text-white"
                                + (walletAddress ? "" : " hidden ")
                            }
                            onClick={() => { setUserInfo(null, null); setPage("landing"); }}
                        >
                            로그아웃
                        </Typography>
                        <LoginButton className={(walletAddress ? " hidden " : " ")} />
                    </div>
                </div>
            </div>
        </Navbar>
    )
}