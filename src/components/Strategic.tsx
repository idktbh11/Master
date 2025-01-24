import Logo from "./Logo"
import ScrollDownButton from "./ScrollDownButton"
export default function Strategic() {
    return (
        <div className="w-[100%] max-w-[1600px]">
            <section className="pt-10 w-[100%] relative flex flex-col justify-center">
                <div className="flex flex-col justify-center items-center w-[100%] py-0 px-[80px] mx-0 my-auto">
                    <Logo />
                    <h2 className="text-white font-chakra text-5xl mt-10">10 Year Strategic Plan</h2>
                    <video className="w-[100%] h-[100%]" loop autoPlay muted >
                        <source src="/video/masterclass_vid.webm" type="video/webm" />
                    </video>
                </div>
                <div className="flex flex-col justify-center items-center w-[100%] mt-32">
                    <ScrollDownButton />
                </div>
                
            </section>
            <section id="prophecy" className="w-[100%] px-[20px] pb-[20px] pt-0 mx-0 my-auto">
                <div className="text-left text-white">
                    <h3 className="text-3xl mt-5 mb-5">TEN-YEAR STRATEGIC VISION / BUSINESS MODEL FOR THE 12 TRIBES OF ISRAELITE PROJECT</h3>

                    <p className = "mt-2 mb-2">Shalom Israel, help us make the world a better place</p>
                    <p className = "mt-2 mb-2">12Tribes.io Four Core Values:</p>
                    <p className = "mt-2 mb-2">1. Keep The Most High rst in everything in your life,</p>
                    <p className="indent  ml-5 ">1. Keep his Laws, statues, and commandments.<br />
                        2. Repent daily<br />
                        3. Accept HAMASHIAC is the Messiah and only through him can we get to the father</p>
                    <p className = "mt-2 mb-2">2.) We must educate our own children & community.</p>
                    <p className = "mt-2 mb-2">3.) We must create strong Israelite businesses.</p>
                    <p className = "mt-2 mb-2">4.) We must support the Israelite businesses that we create.</p>
                    <p className = "mt-2 mb-2">By the year 2032, we want to impact the world with these 5 strategic goals:</p>
                    <p className = "mt-2 mb-2"><b>Economic Impact</b> - Create or facilitate $1 billion in new wealth for the Israelite community.</p>
                    <p className = "mt-2 mb-2"><b>Educational Impact</b> - Hire the best Israelite nancial experts to teach & publish 75 course curricula on our 7 main tracks of wealth creation. (Tracks: Small Business & Entrepreneurship, Securities Investing, Real Estate Investing,
                        Marketing & Sales, Personal Finance, and Data & Technology, Leadership & Personal Development)</p>
                    <p className = "mt-2 mb-2"><b>Community Impact</b> - Inuence 200,000+ people per year through our 100 nancial empowerment centers, 3 selfsustaining neighborhoods, 12 live events, and multiple online forums of discussion.</p>
                    <p className = "mt-2 mb-2"><b>Media Impact</b> - Create the largest independent Israelite media empire that elevates the level of Israelite nancial
                        thought and awareness through lm and editorial content.</p>
                    <p className = "mt-2 mb-2"><b>Generational Impact</b> - Train 10,000 children per year to be masters of Israelite economic empowerment.</p>
                    <p className = "mt-2 mb-2"><b>ECONOMIC IMPACT</b> - CREATE OR FACILITATE $1 BILLION IN NEW WEALTH FOR THE ISRAELITE COMMUNITY.
                        Of the ve goals mentioned, this is the one that I think is most important. If we're not building real economic power
                        for our community, then what is the purpose of the other four strategic goals? The community is our #1 asset, and
                        it will take a coordinated effort by all who are committed to reaching this $1 billion goal.</p>

                    <div className="mint-button mt-10 mb-10">
                        <a className="tf-button btn-effect only_text full" href="/mintingPage">
                            <span className="boder-fade"></span><span className="effect">Reveal Full Blueprint</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}