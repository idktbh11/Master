"use client";
import React, { useState, useEffect } from 'react';
import OwnerBackComponent from "./OwnerBackComponent";
import GalleryContainerCompoent, { itemProps } from '../ExplorerPageComponent/GalleryContainerComponent';

interface OwnerProps {
    owner: string
}

const OwnerComponent: React.FC<OwnerProps> = ({ owner }) => {
    const [endpix, setEndpix] = useState<string>("");
    useEffect(() => {
        const isClient = typeof window !== 'undefined';
        const storage = isClient ? localStorage.getItem('account') : null;
        setEndpix(storage && owner === storage ? `${owner}(YOU)` : owner);
    })
    return (
        <div className='relative flex z-2 flex-col min-h-[100vh] box-border text-white p-2 max-w-[1600px] m-auto'>
            <OwnerBackComponent />
            <div className="flex items-center flex-col sm:flex-row text-center justify-center w-sreen rounded-full bg-transparent">
                <img
                    className="max-[480px]:w-full max-[480px]:p-[50px] rounded-full object-cover w-[200px]"
                    src="/img/avatar.png"
                    alt="Avatar"
                />
                <div className="max-[480px]:w-full max-[480px]:p-[50px] text-2xl zIndex-2">{endpix}</div>
            </div>
            <GalleryContainerCompoent owner={owner}/>
        </div>
    )
}

export default OwnerComponent;