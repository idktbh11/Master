"use client";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";

const PageHeaderComponent = () => {
    const gotoMyNFT = () => {
        const storage: any = localStorage.getItem("account");
        if (!storage || storage == "" || storage == "undefined") {
            toast(
                <Notification
                    type={"fail"}
                    msg={`Please connect Wallet`}
                />
            );
        } else {
            window.open(`/ownerPage/${storage}`, '_blank');
        }
        
    }
    return (
        <div className="ml-20 text max-w-[540px]:m-auto w-[320px]">
            Buy, Sell and Trade <br /> Your NTFs
            <div className="mt-10 flex">
                <button className="m-2 h-10 w-32 box-border rounded-lg border-2 border-gray-500 hover:border-green-400">Explore</button>
                <button onClick={gotoMyNFT} className="m-2 h-10 w-32 box-border rounded-lg border-2 border-gray-500 hover:border-green-400">My NFT</button>
            </div>
        </div>
    )
}

export default PageHeaderComponent;