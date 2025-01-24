"use client";
import React, { useState, useEffect } from 'react';
import SearchButtonComponent from './SearchButtonComponent';
import SearchHeaderComponent from './SearchHeaderComponent';
import GalleryComponent from './GalleryComponent';
import SearchSideBarComponent, { filterProps } from './SearchSideBarComponent';
import DetailComponent from './DetailComponent';
import { getAllData } from '@/assets/utils/contract';
export interface itemProps {
    token_id: string,
    owner: string,
    seller : string;
    price: string,
    description: string,
    attribute : any[],
    image: string,
    listed : boolean,
}
interface galleryContainerProps {
    owner : string,
}
let allData : itemProps[] = [];
const GalleryContainerCompoent: React.FC<galleryContainerProps> = ({owner}) => {
    const [searchView, setSearchView] = useState<boolean>(false);
    const [detailFlag, setDetailFlag] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [key, setKey] = useState<string>("");
    const [selectedData, setSelectedData] = useState<itemProps>({owner : "", seller : "", listed : false, token_id : "", attribute : [],  price :"", description : "", image : ""});
    const [data, setData] = useState<itemProps[]>([]);
    const [filterData, setFilterData] = useState<filterProps[]>([]);
    useEffect(() => {
       fetchMoreData();
    }, []);
    
    useEffect(() => {
        if(!searchView)setData(allData);
    }, [searchView]);

    const fetchMoreData = async () => {
        setData([]);
        setLoading(true);
        const storage: any = localStorage.getItem("account");
        allData = await getAllData( 
            owner == storage && 
            !(!storage || storage == "" || storage == "undefined") 
            ? owner + ":true" : owner 
        );
        setData(allData);
        setLoading(false);
    };
    const setDetailView = (token_id : string) =>{
        setSelectedData(data.filter((item) => item.token_id === token_id)[0]);
        setDetailFlag(true);
    }
    const keySearch = (keyword : string) => {
        setKey(keyword);
        dataFilterFun(keyword, filterData);
    }
    const listFilter = (sub_comp_filter_list : filterProps[] ) => {
        setFilterData(sub_comp_filter_list);
        dataFilterFun(key, sub_comp_filter_list);
    }
    const dataFilterFun = (param1: string, filter : filterProps[]) => {
        setData(allData.filter(item => {
            const ownerIncludesOwner = item.owner.includes(param1);
            const exist_attr = item.attribute.map(attr_item => {
                const filterArray = filter.map(filter_item =>{
                    const sub_arry =  filter_item.data.map(data_item => {
                        // console.log(attr_item.trait_type, "<--->" ,filter_item.name , " :::" ,attr_item.value, "<-->", data_item.title);
                        return attr_item.trait_type == filter_item.name && attr_item.value == data_item.title;
                    });
                    // console.log("every ---> ", sub_arry);
                    return sub_arry.reduce((accumulator, currentValue) => accumulator || currentValue, false);
                    
                })
                // console.log('item, all filter', filterArray);
                return filterArray.reduce((accumulator, currentValue) => accumulator || currentValue, false);
            });
            // console.log("exist", exist_attr);
            return filter.length > 0 ? exist_attr.reduce((accumulator, currentValue) => accumulator || currentValue, false) && (param1 === "" ? true : ownerIncludesOwner)  : true && (param1 === "" ? true : ownerIncludesOwner);
        }));
    }
    return (
        <div className='relative flex z-2 flex-col min-h-[100vh] box-border text-white p-2 max-w-[1600px] m-auto'>
        
            {
                detailFlag ? (
                    <DetailComponent listed={selectedData.listed} setDetailFlag={setDetailFlag} seller = {selectedData.seller} owner={selectedData.owner} token_id={selectedData.token_id} image={selectedData.image} price={selectedData.price} description={selectedData.description} />
                ) :
                    (
                        <>
                            <SearchButtonComponent keySearch={keySearch} setSearchView={setSearchView} />
                            {loading &&
                                <div className="inline-block m-auto mt-10 h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                        Loading...
                                    </span>
                                </div>
                            }
                            {
                                searchView && allData.length > 0 ? (
                                    <div className="block">
                                        <div className="w-[100%] pt-[20px] min-[650px]:pl-[50px]">
                                            <SearchHeaderComponent setSearchView={setSearchView} total_count={data.length} />
                                        </div>
                                        <div className="min-[650px]:flex min-[650px]:pl-[50px]">
                                            <div className="min-[650px]:w-[25vw] max-[650px]:w-[100vw] pt-[35px] pl-[35px] pr-[35px] ">
                                                <SearchSideBarComponent listFilter={listFilter} />
                                            </div>
                                            <div className="min-[650px]:w-[75vw] max-[650px]:w-[100vw]">
                                                <GalleryComponent galleryitems={data} setDetailView={setDetailView} width="30" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-[100vw]">
                                        <GalleryComponent galleryitems={data} setDetailView={setDetailView} width="25" />
                                    </div>
                                )
                            }
                        </>
                    )
            }
        </div>
    )
}
export default GalleryContainerCompoent;