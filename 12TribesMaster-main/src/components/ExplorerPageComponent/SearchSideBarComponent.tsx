import React, { useEffect, useState } from "react";

interface searchSideBarProps {
    listFilter: any
}

export interface filterProps {
    name: string,
    view: boolean,
    data:
    {
        title: string,
        checked: boolean
    }[]
}

let filterAttribute: filterProps[] = [
    {
        name: "STONE",
        view: false,
        data: [
            { title: "AMETHYST", checked: false },
            { title: "JASPER", checked: false },
            { title: "ONYX", checked: false },
            { title: "AGATE", checked: false },
            { title: "EMERALD", checked: false },
            { title: "CARBUNCLE", checked: false },
            { title: "BERYL", checked: false },
            { title: "LIGURE", checked: false },
            { title: "SARDIUS", checked: false },
            { title: "TOPAZ", checked: false },
            { title: "DIAMOND", checked: false }
        ]
    },
    {
        name: "BEARD",
        view: false,
        data: [
            { title: "WITHOUT BEARD", checked: false },
            { title: "WITH BEARD", checked: false }
        ]
    },
    {
        name: "HAIR",
        view: false,
        data: [
            { title: "WITH HAIR", checked: false },
            { title: "WITHOUT HAIR", checked: false }
        ]
    },
    {
        name: "GARMENT",
        view: false,
        data: [
            { title: "RED", checked: false },
            { title: "SILVER", checked: false },
            { title: "ORANGE", checked: false },
            { title: "BLUE", checked: false },
            { title: "PURPLE", checked: false },
            { title: "BLACK", checked: false },
            { title: "WHITE", checked: false },
            { title: "CREAM", checked: false },
            { title: "YELLOW", checked: false },
            { title: "DARK BLUE", checked: false }
        ]
    },
    {
        name: "SANDAL COLOR",
        view: false,
        data: [
            { title: "RED", checked: false },
            { title: "SILVER", checked: false },
            { title: "ORANGE", checked: false },
            { title: "BLUE", checked: false },
            { title: "PURPLE", checked: false },
            { title: "BLACK", checked: false },
            { title: "WHITE", checked: false },
            { title: "CREAM", checked: false },
            { title: "YELLOW", checked: false },
            { title: "DARK BLUE", checked: false }
        ]
    },
    {
        name: "MOTHER NAME",
        view: false,
        data: [
            { title: "ZILPAH", checked: false },
            { title: "RACHEL", checked: false },
            { title: "LEAH", checked: false },
            { title: "BILHAH", checked: false }
        ]
    },
    {
        name: "AMERICAN GIVEN NAME ",
        view: false,
        data: [
            { title: "Panama/Columbia", checked: false },
            { title: "Dominicans", checked: false },
            { title: "Seminole/Indians", checked: false },
            { title: "Hawaiians/Samoans", checked: false },
            { title: "Cubans", checked: false },
            { title: "Haitians", checked: false },
            { title: "Negros", checked: false },
            { title: "Mexicans", checked: false },
            { title: "North American Indians", checked: false },
            { title: "Puerto Ricans", checked: false },
            { title: "Jamaica/W Indies", checked: false },
            { title: "Brazil/Argentina", checked: false }
        ]
    },
    {
        name: "ORDER BORN",
        view: false,
        data: [
            { title: "1st Born", checked: false },
            { title: "2nd Born", checked: false },
            { title: "3rd Born", checked: false },
            { title: "4th Born", checked: false },
            { title: "5th Born", checked: false },
            { title: "6th Born", checked: false },
            { title: "7th Born", checked: false },
            { title: "8th Born", checked: false },
            { title: "9th Born", checked: false },
            { title: "10th Born", checked: false },
            { title: "11th Born", checked: false },
            { title: "12th Born", checked: false }
        ]
    },

];
const SearchSideBarComponent: React.FC<searchSideBarProps> = ({ listFilter }) => {
    const [refresh, setRefresh] = useState<boolean>(false);
    useEffect(() => {
        const filteredData = filterAttribute.map(category => {
            const filteredItems = category.data.filter(item => item.checked);
            return { ...category, data: filteredItems };
        }).filter(category => category.data.length > 0);
        listFilter(filteredData);
    }, [refresh]);
    return (
        <div className="w-[100%] pt-[20px] pl-[20px] pr-[20px] relative box-border border-2 rounded-[5px] border-gray-666 transition-all duration-300 hover:border-yellow-300">
            {
                filterAttribute.map((attribute: filterProps, id: number) => {
                    return <div key={id}>
                        <div onClick={() => {
                            const setView = !attribute.view;
                            setRefresh(!refresh);
                            attribute.view = setView;
                        }} className="w-[100%] box-border border-lg flex cursor-pointer rounded-[1px] p-2 border-gray-100 justify-between"><div>{attribute.name}</div>
                            {/* {attribute.view ? <div>-</div> : <div>+</div>} */}
                            <div className="text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className={`-4 h-4 font-b ${attribute.view ? "rotate-90" : ""} transition-all duration-200 hover:text-yellow-300`}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </div>
                        </div>
                        {attribute.view &&
                            <div className="w-[100%] box-border border-[1px] border-gray-500 border-opacity-45 rounded-sm">
                                {attribute.data.map((item: any, index: number) => {
                                    return (<label key={index} className="flex cursor-pointer justify-between m-2">
                                        <span className="text-yellow-300 text-sm">{item.title}</span>
                                        <input
                                            type="checkbox"
                                            className="form-checkbox bg-transparent h-4 w-4"
                                            checked={item.checked}
                                            onChange={() => {
                                                item.checked = !item.checked;
                                                setRefresh(!refresh);
                                            }}
                                        />
                                    </label>)
                                })}
                            </div>
                        }
                    </div>
                })
            }
        </div>
    )
}

export default SearchSideBarComponent;