import React, { ReactNode, useEffect , useState} from "react"
import TextSkeleton from "../TextSkeleton";
import ImageSkeleton from "../ImageSkeleton";
import { useSwiperSlide } from "swiper/react";

interface GalleryItemProps {
    setDetailView: any,
    sw: string,
    image: string;
    owner: string,
    token_id: string,
    price: string,
    description: string,
    listed: boolean,
    seller : string,
}

const GalleryItem: React.FC<GalleryItemProps> = ({ listed,  setDetailView, sw, image, seller, owner, token_id, price , description}) => {
    const truncatedText = seller.substring(0, 6) + ' ... ' + seller.substring(seller.length - 5, seller.length);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        console.log(sw);
        
    }, [sw]);
    const viewDetail = (token_id: string) => {
        setDetailView(token_id);
    }
    const handleImageLoad = () => {
        setIsLoading(false);
    }
    return (
        <li className={`w-[${sw}%] min-[780px]:w-[33%] min-[540px]:w-[50%] max-[540px]:w-[100%] cursor-pointer pl-[20px] pr-[10px] mb-[20px] box-border`}>
            <div onClick={() => viewDetail(token_id)} className="w-[100%] relative box-border border-2 rounded-[5px] border-gray-666 transition-all duration-300 hover:border-yellow-300 bg-gradient-to-b from-[#00DC9F4D] to-[#BC2CD80F]">
                <div className="relative overflow-hidden z-[5px] box-border m-10 border-2 border-[#ABFAFF4D]">
                    {isLoading ? (<ImageSkeleton />) : (<img onLoad={handleImageLoad} className="transition-all duration-[0.5s] hover:scale-[1.15] ease-linear hover:rotate-[-5deg]" src={image} alt="" />)}
                </div>
                <div className="text-center pt-[22px] pb-[21px] px-[20px] relative z-5 box-border">
                    <h3 className="text-[18px] font-chakra m-0 p-0">
                        {
                            isLoading ? (
                                <>
                                    <TextSkeleton />
                                    <TextSkeleton />
                                    <TextSkeleton />
                                </>
                            ):
                            (
                                <>
                                    <div className="w-[100%] text-[Kanit] text-center">
                                        {truncatedText}
                                    </div>
                                    <div className="w-[100%] text-center overflow-hidden hover:overflow-y-auto h-16">
                                        {description}
                                    </div>
                                </>
                            )
                        }
                    </h3>
                </div>
            </div>
        </li>
    )
}

export default GalleryItem;