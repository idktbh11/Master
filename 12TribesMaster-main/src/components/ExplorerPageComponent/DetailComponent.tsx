
import React, { useState, useEffect, useRef } from "react";
import Modal from "../Modal";
import { CONTRACT_NFT_ADDRESS } from "@/assets/contracts/tribes";
import { buyNow , setNFTList, withdrawMarket } from "@/assets/utils/contract";
import {  } from "@/assets/utils/contract";
export interface DetailProps {
    setDetailFlag: any,
    owner: string,
    token_id: string,
    price: string,
    description: string,
    image: string,
    listed : boolean,
    seller : string,
}

const DetailComponent: React.FC<DetailProps> = ({ setDetailFlag,listed, seller, owner, token_id, price, description, image }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isListModalOpen, setIsListModalOpen] = useState<boolean>(false);
    const [currentUSD, setCurrentUSD] = useState<number>(0.0);
    const [totalPrice, setTotalPrice] = useState<number>(0.0);
    const [settingPrice, setSettingPrice] = useState<number>(0.0);
    const [quantity, setQuantity] = useState<number>(1);
    const [setPriceEth, setSetPriceEth] = useState<number>(0.0);
    const [process, setProcess] = useState<boolean>(false);
    const quantityRef = useRef<HTMLInputElement>(null);
    const openModal = () => setIsModalOpen(true);
    const openListModal = () => setIsListModalOpen(true);
    const shortOwner = `${owner.slice(0, 7)}...${owner.slice(-5)}`; 
    const shortSeller = `${seller.slice(0, 7)}...${seller.slice(-5)}`; 
    
    const closeModal = () => setIsModalOpen(false);
    const closeListModal = () => setIsListModalOpen(false);
    
    useEffect(() => {
        getUSD();
    }, []);
    const getUSD = async () => {
        const nowUSD = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"); 
        const usdObj = await nowUSD.json();
        setCurrentUSD(usdObj.ethereum.usd);
        setTotalPrice(parseFloat(price) * 1);
    }
    const quantityChange = () => {
        if (quantityRef.current) {
            const value = quantityRef.current.value;
            const parseValue = value ? parseInt(value) : 0;
            setQuantity(parseValue);
            setTotalPrice(parseFloat(price) * parseValue);
        }
    }
    const processToPay = async () => {
        setProcess(true);
        await buyNow(token_id);
        setProcess(false);
        closeModal();
    }

    const withdraw = () => {
        withdrawMarket(token_id);
    }

    const setList = async () => {
        setProcess(true);
        await setNFTList(token_id, setPriceEth);
        setProcess(false);
        closeListModal();
    }

    const backEvent = () => {
        setDetailFlag(false);
    }
    return (
        <div className="block  max-w-[1600px]">
            <div className="w-[100%] pl-[10%] cursor-pointer">
                <svg onClick={backEvent} className="h-8 w-8 text-white-500 hover:text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <polyline points="12 8 8 12 12 16" />  <line x1="16" y1="12" x2="8" y2="12" /></svg>
            </div>
            <div className="w-screen flex flex-col lg:flex-row p-[10%] pt-[20px] max-w-[1600px]">
                <div className="lg:w-[45%] w-[100%] box box-border bg-black rounded-lg border-2 border-green-600">
                    <img className="transition-all duration-[0.5s] ease-linear" src={image} alt="" />
                </div>
                <div className="lg:w-[55%] sm:w-[100%] pt-5 text-xl m-5">
                    <div className="flex flex-col w-[100%]">
                    Descroption :
                        <div className="mt-1 m1-3 h-10 overflow-hidden hover:overflow-y-auto">
                             {description}
                        </div>
                        <div className="mt-1 w-[100%] flex overflow-hidden hover:overflow-y-auto justify-between">
                            <div>Contract Address : </div> 
                            <div data-tooltip-target="tooltip-default" data-tooltip-trigger="hover">{`${CONTRACT_NFT_ADDRESS.slice(0, 7)}...${CONTRACT_NFT_ADDRESS.slice(-5)}`}</div>
                            <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                {CONTRACT_NFT_ADDRESS}
                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                        <div className="mt-1 w-[100%] flex overflow-hidden hover:overflow-y-auto justify-between">
                            <div>Token Id :</div><div> {token_id} </div>
                        </div>
                        <div className="mt-1 w-[100%] flex overflow-hidden hover:overflow-y-auto justify-between">
                            <div>Token Standard</div><div>ERC-721</div>
                        </div>
                        <div className="h-10 mt-2 cursor-pointer" >
                            <a href={`/ownerPage/${seller}`} target='_blank'>Seller : {shortSeller} {seller === localStorage.getItem('account') ? `(YOU)` : "" }</a>
                        </div>
                        <div className="top-0 bottom left-0 box box-border border border-[#42E8E0] w-[100%]bg-gradient-to-b from-[#BC2CD80F] to-[#00DC9F4D]">
                            <div className="flex h-20 box box-border border-b w-[100%] justify-between bg-gradient-to-r from-[#544bb128] to-[#e4cb5128]">
                                <div className="w-[25%] text-center m-auto">Price Listing</div>
                            </div>
                            <div className="flex h-16 box box-border border-b w-[100%] justify-between">
                                <div className="w-[25%] text-center m-auto">Price(ETH)</div>
                                <div className="w-[25%] text-center m-auto">USD</div>
                                <div className="w-[25%] text-center"></div>
                            </div>
                            <div className="flex h-16 w-[100%] box box-border border-b justify-between">
                                <div className="w-[25%] text-center m-auto"> {price} ETH</div>
                                <div className="w-[25%] text-center m-auto"> {Math.round(parseFloat(price) * currentUSD *1000)/1000} $</div>
                                <div className="w-[25%] text-center">
                                    {localStorage.getItem('account') === owner ? (
                                        listed ? (
                                            <button className="bg-[#43E3E091] w-full h-full hover:shadow-[#2AF6FF]">Listed</button>
                                        ):
                                        (
                                            <button onClick={openListModal} className="bg-[#43E3E091] w-full h-full hover:shadow-[#2AF6FF]">List</button>
                                        )
                                    ) : (
                                        listed ? (
                                            <button onClick={openModal} className="bg-[#43E3E091] w-full h-full hover:shadow-[#2AF6FF]">Buy Now</button>
                                        ):
                                        (
                                            <button className="bg-[#43E3E091] w-full h-full hover:shadow-[#2AF6FF]">Not Listed</button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <h2 className="text-2xl font-bold mb-4">Buy Now</h2>
                        <div className="flex">
                            <img className="transition-all w-30 h-40 duration-[0.5s] ease-linear" src={image} alt="" />
                            <h3 className=" ml-2 mr-2 h-36 pt-10 overflow-hidden hover:overflow-y-auto">{description}</h3>
                        </div>
                        <div className="flex pl-10 pr-10 w-[100%] justify-between">
                            <div>Price for 1 NFT : </div><div>{price} ETH </div>
                        </div>
                        <div className="flex pl-10 pr-10 w-[100%] justify-between">
                            <div>Quantity : </div>
                            <div>
                                <input className="bg-transparent w-24 text-right" type="text" onChange={quantityChange} ref={quantityRef} value={quantity} readOnly />
                            </div>
                        </div>
                        <div className="flex pl-10 pr-10 w-[100%] justify-between">
                            <div>Total to Pay : </div><div>{totalPrice} ETH</div><div>{Math.round(totalPrice * currentUSD *1000)/1000} $ </div>
                        </div>
                        <div className="flex pl-10 pr-10 w-[100%] justify-center">
                            {process ?
                                <div className="inline-block m-auto mt-10 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                        Loading...
                                    </span>
                                </div> 
                            : <button onClick={processToPay} className="w-[100%] mt-[10px] h-10 bg-transparent border-2 rounded-[5px] border-gray-666 transition-all duration-300 hover:border-yellow-300" >Process to Payment</button>}
                        </div>
                    </Modal>

                    <Modal isOpen={isListModalOpen} onClose={closeListModal}>
                        <h2 className="text-2xl font-bold mb-4">List</h2>
                        <div className="flex">
                            <img className="transition-all w-30 h-40 duration-[0.5s] ease-linear" src={image} alt="" />
                            <h3 className=" ml-2 mr-2 h-36 pt-10 overflow-hidden hover:overflow-y-auto">{description}</h3>
                        </div>
                        <div className="flex pl-10 pr-10 w-[100%] justify-between">
                            <div>Price for 1 NFT(ETH) : </div>
                            <div>
                                <input 
                                    className="bg-transparent w-24 text-right" 
                                    type="text" 
                                    onChange={(e) => {
                                        const inputValue : string = e.target.value;
                                        setSetPriceEth(parseFloat(inputValue));
                                        setSettingPrice(Math.round(parseFloat(inputValue) * currentUSD *1000)/1000) 
                                    }}  />
                            </div>
                        </div>
                        <div className="flex pl-10 pr-10 w-[100%] justify-between">
                            <div>Price USD : </div><div>$ {settingPrice}</div>
                        </div>
                        <div className="flex pl-10 pr-10 w-[100%] justify-center">
                            {process ?
                                <div className="inline-block m-auto mt-10 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                        Loading...
                                    </span>
                                </div> 
                            : <button onClick={setList} className="w-[100%] mt-[10px] h-10 bg-transparent border-2 rounded-[5px] border-gray-666 transition-all duration-300 hover:border-yellow-300" >List</button>}
                        </div>
                        
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default DetailComponent;