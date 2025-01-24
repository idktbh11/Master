"use client";
import React, { useEffect, useState } from "react";
import { mintNow } from "@/assets/utils/contract";
const SaleComponent: React.FC = () => {
    const [user, setUser] = useState<string>("");
    const [balance, setBalance] = useState<number>(0.0);
    const [shortUser, setShortUser] = useState<string>("");
    const [process, setProcess] = useState<boolean>(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            let storeUser = localStorage.getItem('account') ?? "";
            setUser(storeUser);
            let priceBigInt = localStorage.getItem('balance') ?? 0.0;
            let price = priceBigInt ? parseFloat(priceBigInt.toString()) / Math.pow(10, 18) : 0.0;
            setBalance(Math.round(price * 100000) / 100000);
            setShortUser(storeUser ? `${storeUser.slice(0, 7)}...${storeUser.slice(-5)}` : "");
        }
    }, [process])
    const mintFunc = async () => {
        setProcess(true);
        await mintNow();
        setProcess(false);
    }
    return (
        <section id="mintNow" className="text-center pb-[100px] box-border w-[100%] text-white">
            <div className="px-[40px]">
                <h2 className="text-[50px] font-chakra font-bold">
                    <span className="text-yellow-300 inline-block">12 TRIBES</span> PRE SALE
                </h2>
                <p className="mb-[20px] text-[16px]">The Prophecy Revealed</p>
                <div className="flex flex-wrap justify-center items-center mt-[70px]">
                    <div className="p-[50px] grow basis-[405px] bg-gray-3636 rounded-[20px] border-[2px] border-gray-3636">
                        <p className="mb-[20px] font-chakra text-[35px] font-bold tracking-[1px]">Presale Mint</p>
                        <p className="mb-[20px] font-chakra tracking-0">NFT minted</p>
                        <div className="mt-[30px] mx-0 mb-[50px] box-border">
                            <div className="flex justify-between items-center box-border">
                                <p className="font-chakra text-[16px] font-bold">Balance : <span className="text-yellow-500">{balance} </span> ETH</p>
                                <p className="font-chakra text-[16px] font-bold">{user && user != '' ? shortUser : `Wallet not connected`}</p>
                            </div>
                            <span className="block my-[40px] border-t-[1px] border-gray-3636"></span>
                            <div className="flex justify-between items-center box-border">
                                <p className="font-chakra text-[16px] font-bold">Amount</p>
                                <div className="flex gap-[10px] items-center justify-center text-center">
                                    <span className="text-[20px] cursor-pointer">-</span>
                                    <input type="text" value="1" disabled className="text-center w-[70%] border-none rounded-[15px] bg-white text-black font-bold h-[50px] text-[16px] mx-[15px]" />
                                    <span className="text-[20px] cursor-pointer">+</span>
                                </div>
                                <button className="text-[14px] bg-white rounded-[10px] p-[10px] text-black font-bold cursor-pointer">Max</button>
                            </div>
                            <span className="block my-[40px] border-t-[1px] border-gray-3636"></span>
                        </div>
                        <div className="flex justify-center items-center">
                            {process ?
                                <div className="inline-block m-auto mt-10 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                        Loading...
                                    </span>
                                </div>
                                : (
                                    <div className='w-[80%] h-[40px] flex justify-center items-center cursor-pointer box-border bg-black border-[3px] border-yellow-400 rounded-[10px] shadow-[10px_10px_15px_rgba(250,212,0,0.6)] transition-all duration-300 ease-linear hover:shadow-[0_0_0_rgba(0,0,0,0)]'>
                                        <div className="flex pl-10 pr-10 w-[100%] justify-center">
                                            <a onClick={mintFunc} className='font-chakra font-bold p-2'>Mint</a>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                    <div className='grow basis-[350px] flex flex-col items-center'>
                        <img className='w-[60%] z-[2]' alt="" src="/img/nft/judah-gold.gif" />
                        <img className='w-[50%] mt-[-130px] z-[1]' alt="" src="/img/12TribesGems3.gif" />
                    </div>
                </div>
                <div className="mt-[150px] mb-[50px] w-[100%] flex min-[850px]:flex-row max-[850px]:flex-col justify-center gap-[50px] box-border">
                    <div className="p-[50px] grow border-[2px] relative border-gray-3636 rounded-[20px]">
                        <img alt="" src="/img/icon1.png" className="mt-[-90px] absolute left-[55px] w-[25%] box-border" />
                        <div className="font-chakra text-[35px] font-bold">144</div>
                        <p>NFT Membership Cards</p>
                    </div>
                    <div className="p-[50px] grow border-[2px] relative border-gray-3636 rounded-[20px]">
                        <img alt="" src="/img/icon2.png" className="mt-[-90px] absolute left-[55px] w-[25%] box-border" />
                        <div className="font-chakra text-[35px] font-bold">1.032 ETH</div>
                        <p>Price per NFT</p>
                    </div>
                    <div className="p-[50px] grow border-[2px] relative border-gray-3636 rounded-[20px]">
                        <img alt="" src="/img/icon3.png" className="mt-[-90px] absolute left-[55px] w-[25%] box-border" />
                        <div className="font-chakra text-[35px] font-bold">144</div>
                        <p>Exclusive Members</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SaleComponent;