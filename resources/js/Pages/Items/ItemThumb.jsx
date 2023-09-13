import { AppContext } from "@/context/AppContext";
import useVisible from "@/hooks/useVisible";
import { Inertia } from "@inertiajs/inertia";
import React, { useContext, useState } from "react";
import { BsFolder } from "react-icons/bs";
import { FcFolder } from "react-icons/fc";

function ItemThumb({ item }) {
    const { itemClicked, setSelectedItems } = useContext(AppContext);
    const { completeRenameItem } = useContext(AppContext);

    function handleDoubleClick() {
        setSelectedItems([]);
        Inertia.get(route("items.show", item));
    }

    function handleChange(e) {
        setItemNewName(e.target.value);
        if (e.key === "Enter") {
            completeRenameItem(e.target.value, item);
        }
    }

    const [itemNewName, setItemNewName] = useState(item.name);
    return (
        <div
            // ref={ref}
            onClick={(e) => itemClicked(e, item)}
            onDoubleClick={handleDoubleClick}
            className={`item-thumb transition-all ease-in-out cursor-pointer p-5 ${
                item.is_cut ? "opacity-40" : null
            }  text-blue-500 flex flex-col items-center space-y-2 rounded ${
                item.selected ? "bg-blue-200/80" : "hover:bg-gray-200/60"
            }`}
        >
            <FcFolder className="text-4xl" />
            {item.renaming ? (
                <input
                    value={itemNewName}
                    autoFocus={true}
                    className="text-gray-600 text-xs w-full p-1 bg-transparent border rounded border-gray-400"
                    onChange={handleChange}
                    onKeyDown={handleChange}
                    onFocus={(e) => e.target.select()}
                />
            ) : (
                <p className="text-gray-600 text-xs">{item.name}</p>
            )}
        </div>
    );
}

export default ItemThumb;
