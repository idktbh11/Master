"use client";
import Web3, { MetaMaskProvider } from "web3";
import React, { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { CONTRACT_NFT_ABI, CONTRACT_NFT_ADDRESS, CONTRACT_MARKET_ABI, CONTRACT_MARKET_ADDRESS } from "../assets/contracts/tribes";
import Link from "next/link";
import { toast } from "react-toastify";
import Notification from "./Notification";
const Header: React.FC = () => {
	const [accounts, setAccounts] = useState<string[]>([]);
	const [user, setUser] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [provider, setProvider] = useState<any>(null);
	useEffect(() => {
		(async () => {
			try{
				const metapro = await detectEthereumProvider();
				setProvider(metapro);
			}catch(e){
				
			}
		})()

		if (provider) {
			provider.on("disconnect", () => {
				setUser("");
				localStorage.removeItem('account');
				localStorage.removeItem("balance");
			});

			provider.on("accountsChanged", (acc : string) => {
				localStorage.setItem("account", acc[0]);
				setUser(acc[0]);
			});
		}
		const userStorage = localStorage.getItem('account');
		userStorage && userStorage != "" ? setUser(userStorage) : setUser("");
	}, [user])

	const initMetaMask = async () => {
		if ((user !== '')) {
			setUser('');
			localStorage.removeItem("account");
			return;
		}
		try {
			if (provider) {
				await provider.request({ method: "eth_requestAccounts" });
				const web3 = new Web3(provider);
				const NFT_Ins = new web3.eth.Contract(CONTRACT_NFT_ABI, CONTRACT_NFT_ADDRESS);
				const MARKET_Ins = new web3.eth.Contract(CONTRACT_MARKET_ABI, CONTRACT_MARKET_ADDRESS);
				MARKET_Ins.events.allEvents().on( "data", (data) => {
					if(data.event == "Minted"){

					}
				});
				NFT_Ins.events.allEvents().on( "data", (data) => {
					if(data.event == "TokenListed"){
					}
					if(data.event == "TokenSold"){
					}
				});
				const accounts = await web3.eth.getAccounts();
				const balance = await web3.eth.getBalance(accounts[0]);
				setUser(accounts[0]);
				localStorage.setItem("account", accounts[0]);
				localStorage.setItem("balance", balance.toString());
				setAccounts(accounts);
				toast(
					<Notification
						type={"success"}
						msg={`MetaMask extension was connected`}
					/>
				);
			} else {
				setAccounts([]);
				toast(
					<Notification
						type={"fail"}
						msg={`MetaMask extension not found`}
					/>
				);
				window.open('https://metamask.io/download.html', '_blank');
			}
		} catch (error : any) {
			setAccounts([]);
			toast(
				<Notification
					type={"fail"}
					msg={`Error : ${error.message}`}
				/>
			);
			
		} finally {
			setLoading(false);
		}
	};

	return (
		<header className="flex flex-row items-center justify-center w-[100%] h-[100px] text-white px-[30px]">
			{/* <div className="text-white font-bold font-chakra text-[40px] min-[400px]:mr-[30px]">
				LOGO
			</div> */}
			<div className="w-[70%]">
				<div className="w-full block grow min-[1107px]:flex min-[1107px]:items-center min-[1107px]:w-[100%] text-white max-[1107px]:hidden">
					<div className="min-[1107px]:flex min-[1107px]:flex-row min-[1107px]:justify-between min-[1107px]:w-[100%] text-[17px]">
						<Link href="/">
							<span className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 transition-all duration-200 hover:text-yellow-300">
								Home
							</span>
						</Link>
						<span className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 transition-all duration-200 hover:text-yellow-300">
							<div className="relative flex flex-col justify-center">
								<div className="relative items-center mx-auto">
									<div
										id="bouton"
										className="relative group/bouton flex flex-row items-center"
									>
										<button className="relative text-white transition-all duration-200 hover:text-yellow-300">
											Prophecy
										</button>
										<div className="text-white">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-4 h-4 font-b group-hover/bouton:rotate-90 transition-all duration-200 hover:text-yellow-300"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="m8.25 4.5 7.5 7.5-7.5 7.5"
												/>
											</svg>
										</div>
										<div className="absolute top-full text-white origine-top opacity-0 hidden flex-col group-hover/bouton:flex group-hover/bouton:opacity-100 transition-all border-white border w-[270px] rounded-[5px] bg-header z-10">
											<ul className="text-center p-[10px] text-[15px]">
												<li>
													<a
														href="/otherPage/most"
														className=" transition-all duration-200 hover:text-yellow-300"
													>
														The Most High Chosen People
													</a>
												</li>
												<li>
													<a
														href="/otherPage/propechy"
														className=" transition-all duration-200 hover:text-yellow-300"
													>
														The 12 Tribes of Israel Prophecy
													</a>
												</li>
												<li>
													<a
														href="/otherPage/strategic"
														className=" transition-all duration-200 hover:text-yellow-300"
													>
														10 Year Strategic Plan
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</span>
						<Link href="/mintingPage">
							<span className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 transition-all duration-200 hover:text-yellow-300">
								Minting
							</span>
						</Link>
						<Link href="/#twelve">
							<span className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 transition-all duration-200 hover:text-yellow-300">
								12 Tribes Roadmap
							</span>
						</Link>
						<Link href="/#map">
							<span className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 transition-all duration-200 hover:text-yellow-300">
								Map
							</span>
						</Link>
						<Link href="masterclassPage">
							<span className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 transition-all duration-200 hover:text-yellow-300">
								Masterclass
							</span>
						</Link>
						<Link href="/explorerPage">
							<span className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 transition-all duration-200 hover:text-yellow-300">
								MarketPlace
							</span>
						</Link>
						<Link href="/#drop">
							<span className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 transition-all duration-200 hover:text-yellow-300">
								Testimonial
							</span>
						</Link>
						<Link href="/#team">
							<span className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 transition-all duration-200 hover:text-yellow-300">
								Team
							</span>
						</Link>
					</div>
				</div>
			</div>

			{/* Connect Wallet */}
			<div className="w-[150px] cursor-pointer border rounded-[5px] text-center transition-all duration-200 hover:border-yellow-300 mr-[20px]">
				<h2 className="text-[17px] transition-all duration-200 hover:text-yellow-300">
					<button onClick={initMetaMask}>
						{user !== '' && user && user != 'undefined'
							? `${user.slice(0, 7)}...${user.slice(-5)}`
							: "Connect Wallet"}
					</button>
				</h2>
			</div>

			{/* Menu Icon */}
			<div className={`block min-[1107px]:hidden text-white`}>
				<div className="relative">
					<div id="bouton" className="relative group/bouton">
						<button className="relative text-white">
							<svg
								className="fill-current h-6 w-6 text-white"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
							</svg>
						</button>
						<div className="absolute right-0 top-full text-white origine-top opacity-0 hidden flex-col group-hover/bouton:flex group-hover/bouton:opacity-100 transition-all duration-200 border border-white rounded-[5px] hover:border-yellow-300 bg-header z-10 w-[170px]">
							<ul className="text-center p-[10px]">
								<li className=" transition-all duration-200 hover:text-yellow-300">
									<Link href="/">Home</Link>
								</li>
								<li className=" transition-all duration-200 hover:text-yellow-300">
									<Link href="/#prophecy">Prophecy</Link>
								</li>
								<li className=" transition-all duration-200 hover:text-yellow-300">
									<Link href="mintingPage">Minting</Link>
								</li>
								<li className=" transition-all duration-200 hover:text-yellow-300">
									<Link href="/#twelve">12 Trables Roadmap</Link>
								</li>
								<li className=" transition-all duration-200 hover:text-yellow-300">
									<Link href="/#map">Map</Link>
								</li>
								<li className=" transition-all duration-200 hover:text-yellow-300">
									<Link href="masterclassPage">Masterclass</Link>
								</li>
								<li className=" transition-all duration-200 hover:text-yellow-300">
									<Link href={`/explorerPage`}>Explore</Link>
								</li>
								<li className=" transition-all duration-200 hover:text-yellow-300">
									<Link href="/#drop">Testimonial</Link>
								</li>
								<li className=" transition-all duration-200 hover:text-yellow-300">
									<Link href="/#team">Team</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
export default Header;
