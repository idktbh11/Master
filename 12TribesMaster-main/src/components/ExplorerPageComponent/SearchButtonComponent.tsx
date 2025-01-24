import { useRef } from "react";

interface SearchButtonProps {
    setSearchView : any,
    keySearch : any
}

const SearchButtonComponent : React.FC<SearchButtonProps> = ({setSearchView, keySearch}) => {
    const keywordRef = useRef<any>(null);
    const onFocusEvent = () => {
        setSearchView(true);
    }
    const keyPressEvent = (event:any) => {
        const keyword : any = keywordRef.current ? keywordRef.current.value : "";
        if(event.key == "Enter"){
            keySearch(keyword);
        }
    }
    return (
        <div className="w-[40vw] mx-auto">
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="h-5 w-5 text-white-300"  
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <input onFocus={onFocusEvent} 
                    onKeyDown={(e) => keyPressEvent(e)}
                    ref={keywordRef}
                    type="search" 
                    id="default-search" 
                    className="block w-full p-2 ps-10 text-sm text-white-900 border rounded-lg  focus:border-yellow-300 bg-transparent border-gray-600 placeholder-gray-400" 
                    placeholder="Search NFT..." 
                    required />
            </div>
        </div>
    );
}

export default SearchButtonComponent;