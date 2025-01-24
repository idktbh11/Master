const OwnerBackComponent = () => {
    return(
        <div className="block">
            <div className="w-[100%] pl-[10%] cursor-pointer">
                <svg onClick={() => window.close()} className="h-8 w-8 text-white-500 hover:text-yellow-300"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <polyline points="12 8 8 12 12 16" />  <line x1="16" y1="12" x2="8" y2="12" /></svg>
            </div>
        </div>
    )
}
export default OwnerBackComponent;