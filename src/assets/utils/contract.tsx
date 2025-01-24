import Web3, { eth } from "web3";
import { CONTRACT_NFT_ABI, CONTRACT_NFT_ADDRESS, CONTRACT_MARKET_ABI, CONTRACT_MARKET_ADDRESS } from "../contracts/tribes";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import { itemProps } from "@/components/ExplorerPageComponent/GalleryContainerComponent";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers }  from "ethers";
export const setNFTList = async (token_id: string, price: number) => {
    return await returnMultipleCall("SET_NFT_LIST", `${token_id}:${price}`); // :${price}
}

export const mintNow = async () => {
    await voidMultipleCall("MINT_NOW", "");
}

export const buyNow = async (token_id: string) => {
    await voidMultipleCall("BUY_NOW", token_id);
}

export const withdrawMarket = async (token_id: string) => {
    await voidMultipleCall("WITHDRAW", token_id);
}

export const getAllData = async (owner: string): Promise<itemProps[]> => {
    return await returnMultipleCall("GET_TOKENS", owner)
}

const returnMultipleCall = async (type: string, param: string): Promise<any> => {
    const account = localStorage.getItem('account');
    let result;
    let provider: any = await detectEthereumProvider();
    if (!provider) {
        provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
    }
    try {
        const web3 = new Web3(provider);
        const NFT_Ins = new web3.eth.Contract(CONTRACT_NFT_ABI, CONTRACT_NFT_ADDRESS);
        const MARKET_Ins = new web3.eth.Contract(CONTRACT_MARKET_ABI, CONTRACT_MARKET_ADDRESS);
        let gasLimit, estimatedGas, message;
        switch (type) {
            case "GET_TOKENS":
                result = [];
                let tokenArray = [];
                const total = await NFT_Ins.methods.totalSupply().call();
                for (let i = 1; i <= Number(total); i++) {
                    const owner: any = await NFT_Ins.methods.ownerOf(i).call();
                    let tokenURI: string = await NFT_Ins.methods.tokenURI(i).call();
                    let regex = /\/\d+$/;
                    tokenURI = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
                    tokenURI = tokenURI.replace(regex, "/" + i);
                    const metadataObj = await fetch(tokenURI);
                    const metadata = await metadataObj.json();
                    let priceBigInt = await NFT_Ins.methods.prices(i).call();
                    let price = priceBigInt ? parseFloat(priceBigInt.toString()) / Math.pow(10, 18) : 0.0;
                    let listing: any = await MARKET_Ins.methods.tokenIdToListing(i).call();
                    priceBigInt = listing.price;
                    const listed : boolean = listing.active;
                    const seller : string = listing.seller;
                    let priceList = priceBigInt ? parseFloat(priceBigInt.toString()) / Math.pow(10, 18) : 0.0;
                    price = Math.round(price * 1000) / 1000;
                    let tokenTransferEvents;
                    try {
                        tokenTransferEvents = await NFT_Ins.getPastEvents('allEvents', {
                            // filter: { tokenId : i },
                            fromBlock: 0,
                            toBlock: 'latest'
                        });
                    } catch (error) {
                        console.error('Error fetching token transfer events:', error);
                    }

                    if (param !== ''){
                        if(param.indexOf(":") > 0){
                            if(owner.toString() != param.split(":")[0])continue;
                        }else {
                            if(!listed)continue;
                        }
                    }
                    
                    if (param == '' && !listed) continue;
                    tokenArray.push({
                        token_id: i,
                        seller : seller,
                        price: listed ? priceList : price,
                        name: metadata.name,
                        image: metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
                        attribute: metadata.attribute,
                        owner: owner,
                        listed: listed,
                        description: metadata.discription
                    });
                }
                return tokenArray;
                message = `Successfully taken NFTs`;
                break;
            case "SET_NFT_LIST":
                if (account) {
                    result = false;
                    estimatedGas = await NFT_Ins.methods.mint().estimateGas({ from: account, value: "100000000000000000" });
                    gasLimit = Number(estimatedGas) + 10000;
                    await NFT_Ins.methods.updateListingStatus(parseInt(param.split(":")[0]), true).send({ from: account, gas: gasLimit.toString() });
                    await NFT_Ins.methods.approve(CONTRACT_MARKET_ADDRESS, parseInt(param.split(":")[0])).send({ from: account, gas: gasLimit.toString() });
                    await MARKET_Ins.methods.listToken(parseInt(param.split(":")[0]), parseInt((parseFloat(param.split(":")[1]) * Math.pow(10, 18)).toString())).send({ from: account, gas: (gasLimit + 100000).toString() });
                    result = true;
                    message = `Successfully Listed`;
                    break;
                } else {
                    window.open('https://metamask.io/download.html', '_blank');
                    toast(
                        <Notification
                            type={"fail"}
                            msg={`Please install Metamask`}
                        />
                    );
                }
            default:
                break;
        }
        toast(
            <Notification
                type={"success"}
                msg={`${message}`}
            />
        );
        return result;
    } catch (e : any) {
        toast(
            <Notification
                type={"fail"}
                msg={`Check wallet connection${e.message}`}
            />
        );
        return result;
    }
}

const voidMultipleCall = async (type: string, param: string) => {
    const account = localStorage.getItem('account');
    if (account) {
        const provider: any = await detectEthereumProvider();
        if (!provider) {
            window.open('https://metamask.io/download.html', '_blank');
            return;
        }
        try {
            const web3 = new Web3(provider);
            const NFT_Ins = new web3.eth.Contract(CONTRACT_NFT_ABI, CONTRACT_NFT_ADDRESS);
            const MARKET_Ins = new web3.eth.Contract(CONTRACT_MARKET_ABI, CONTRACT_MARKET_ADDRESS);
            let result, gasLimit, estimatedGas, message;
            switch (type) {
                case "MINT_NOW":
                    estimatedGas = await NFT_Ins.methods.mint().estimateGas({ from: account, value: "100000000000000000" });
                    gasLimit = Number(estimatedGas) + 10000;
                    result = await NFT_Ins.methods.mint().send({ from: account, gas: gasLimit.toString() });
                    message = `Successfully Minted by\n ${account}`;
                    break;
                case "BUY_NOW":
                    estimatedGas = await NFT_Ins.methods.mint().estimateGas({ from: account, value: "100000000000000000" });
                    gasLimit = Number(estimatedGas) + 10000;
                    let listing: any = await MARKET_Ins.methods.tokenIdToListing(param).call({ from: account });
                    let priceBigInt = listing.price;
                    result = await MARKET_Ins.methods.buyToken(param).send({ from: account, value: priceBigInt ? priceBigInt.toString() : "0", gas: gasLimit.toString() });
                    message = `Successfully Bought by\n ${account}`;
                    break;
                case "WITHDRAW":
                    estimatedGas = await NFT_Ins.methods.mint().estimateGas({ from: account, value: "100000000000000000" });
                    gasLimit = Number(estimatedGas) + 10000;
                    result = await MARKET_Ins.methods.withdraw().call({ from: account, gas: gasLimit.toString() });
                    message = `Successfully Withdraw by\n ${account}`;
                    break;
                default:
                    break;
            }
            toast(
                <Notification
                    type={"success"}
                    msg={`${message}`}
                />
            );
        } catch (e : any) {
            toast(
                <Notification
                    type={"fail"}
                    msg={`${e.message}`}
                />
            );
        }
    } else {
        toast(
            <Notification
                type={"fail"}
                msg={`Please connect to MetaMask extension`}
            />
        );
    }
}