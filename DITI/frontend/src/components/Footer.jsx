import { Typography } from "@material-tailwind/react";

export function Footer() {

    return (
        <div>
            {/* <div className="flex flex-col justify-center items-center text-center">
                <div className="max-w-sm font-bold font-sans">
                    Get the most out of your mobile with the right subscription
                </div>
                <div className="font-light max-w-lg text-sm">
                    All devices come with free delivery or pickup as standard. See information on available shopping
                    options for your location.
                </div>
            </div> */}

            <hr className="my-8 border-blue-gray-50"/>
            <Typography color="blue-gray" className="text-center font-normal p-5">
                &copy; Decentralized Identity Trust Infrastructure (DITI)
            </Typography>
        </div>
    )
}