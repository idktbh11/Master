"use client";

import GalleryItem from "./GalleryItemComponent";
import { itemProps } from "./GalleryContainerComponent";
interface GalleryContainerProps {
    galleryitems : itemProps[],
    setDetailView: any,
    width : string,
}

const GalleryComponent: React.FC<GalleryContainerProps> = ({ galleryitems, setDetailView, width}) => {
    return (
        <section id="gallery" className="pt-[35px] relative  box-border w-[100%] py-[20px]">
            <div className="box-border w-[100%] pl-[30px] pr-[40px]">
                <ul className="overflow-y-auto flex min-[650px]:flex-row min-[650px]:flex-wrap max-[650px]:flex-col list-none dropbox">
                    {galleryitems && galleryitems.map((item, index) => (
                        <GalleryItem setDetailView={setDetailView} sw={width} key={index} price={item.price} seller = {item.seller} listed={item.listed} image={item.image} token_id={item.token_id} description={item.description} owner={item.owner} />
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default GalleryComponent;