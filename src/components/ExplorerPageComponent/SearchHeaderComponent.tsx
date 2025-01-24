interface SearchHeaderProps {
    setSearchView : any,
    total_count : number
}

const SearchHeaderComponent:React.FC<SearchHeaderProps> = ({setSearchView, total_count}) =>{
    const cancelSearch = () => {
        setSearchView(false);
    }
    return(
        <div className="transition-all duration-300 pl-[30px] pr-[50px] pt-[5px] pb-[5px] bg-transparent relative flex">
            <div className="w-[30%]">
                <svg onClick={cancelSearch} className="h-8 w-8 pl-[0px] left-[0px] text-white-500 hover:text-yellow-300"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <polyline points="12 8 8 12 12 16" />  <line x1="16" y1="12" x2="8" y2="12" /></svg>
            </div>
            <div className="w-[70%]">
                SearchResult &quot;{total_count}&quot; NFTs
            </div>
        </div>
    )
}

export default SearchHeaderComponent;