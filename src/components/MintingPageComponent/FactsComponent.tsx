"use client"
import React, { useState } from "react";

const FactsComponent: React.FC = () => {
    const [viewElement1, setViewElement1] = useState<boolean>(false);
    const [viewElement2, setViewElement2] = useState<boolean>(false);
    const [viewElement3, setViewElement3] = useState<boolean>(false);
    const [viewElement4, setViewElement4] = useState<boolean>(false);
    const [viewElement5, setViewElement5] = useState<boolean>(false);
    return (
        <section className="mt-[150px] text-white box-border w-[100%] p-[40px]">
            <div className="box-border w-[100%] mx-auto mb-[20px]">
                <span>FAQ</span>
                <h2 className="text-[50px] font-bold font-chakra">GET THE <span className="text-yellow-300">FACTS</span></h2>
                <div className="mt-[70px] box-border flex flex-col">
                    <button onClick={() => setViewElement1(!viewElement1)} className={`bg-transparent w-[100%] px-[20px] py-[35px] border-none text-left outline-none text-[20px] transition-all duration-200 font-chakra font-bold ${viewElement1  ? "after:content-['-']" : "after:content-['+']" } after:text-white after:font-bold after:text-[25px] after:float-right`}>
                        Can I purchase the Master class without the NFT?
                    </button>
                    {viewElement1 &&
                        <div className="panel">
                            <p className="subtext">No</p>
                        </div>
                    }

                    <span className="border-gray-3636 border-t-[1px] block"></span>
                    <button onClick={() => setViewElement2(!viewElement2)} className={`bg-transparent w-[100%] px-[20px] py-[35px] border-none text-left outline-none text-[20px] transition-all duration-200 font-chakra font-bold ${viewElement2  ? "after:content-['-']" : "after:content-['+']" } after:text-white after:font-bold after:text-[25px] after:float-right`}>
                        Any guarantees?
                    </button>
                    {viewElement2 &&
                        <div className="panel">
                            <p className="subtext">Yes, the principles and methods taught in this master class if you implement them will change your family and your life for the better for generations to come. </p>
                        </div>
                    }

                    <span className="border-gray-3636 border-t-[1px] block"></span>
                    <button onClick={() => setViewElement3(!viewElement3)} className={`bg-transparent w-[100%] px-[20px] py-[35px] border-none text-left outline-none text-[20px] transition-all duration-200 font-chakra font-bold  ${viewElement3  ? "after:content-['-']" : "after:content-['+']" } after:text-white after:font-bold after:text-[25px] after:float-right`}>
                        Can I get a refund?
                    </button>
                    {viewElement3 && 
                        <div className="panel">
                            <p className="subtext">No, unfortunately, all transactions are on the blockchain, no chargebacks on the blockchain.</p>
                        </div>
                    }

                    <span className="border-gray-3636 border-t-[1px] block"></span>
                    <button onClick={() => setViewElement4(!viewElement4)} className={`g-transparent w-[100%] px-[20px] py-[35px] border-none text-left outline-none text-[20px] transition-all duration-200 font-chakra font-bold  ${viewElement4  ? "after:content-['-']" : "after:content-['+']" } after:text-white after:font-bold after:text-[25px] after:float-right`}>
                        What if I have questions about a subject or topic?
                    </button>
                    {viewElement4 && 
                        <div className="panel">
                            <p className="subtext">We have a private Facebook where all questions and answers can be addressed. </p>
                        </div>
                    }

                    <span className="border-gray-3636 border-t-[1px] block"></span>
                    <button onClick={() => setViewElement5(!viewElement5)} className={`bg-transparent w-[100%] px-[20px] py-[35px] border-none text-left outline-none text-[20px] transition-all duration-200 font-chakra font-bold  ${viewElement5  ? "after:content-['-']" : "after:content-['+']" } after:text-white after:font-bold after:text-[25px] after:float-right`}>
                        Are these live classes, do I have to take off work to participate?
                    </button>
                    {viewElement5 &&
                        <div className="panel">
                            <p className="subtext">No, all lessons are recorded, you can watch and learn anytime</p>
                        </div>
                    }
                    <span className="border-gray-3636 border-t-[1px] block"></span>
                </div>
            </div>
        </section>
    );
}

export default FactsComponent;