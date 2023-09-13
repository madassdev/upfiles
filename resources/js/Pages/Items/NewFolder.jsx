import { AppContext } from "@/context/AppContext";
import { FileActionsContext } from "@/context/FileActionsContext";
import React, { useContext, useState } from "react";
import { BsFolder2 } from "react-icons/bs";
import { FcFolder } from "react-icons/fc";

function NewFolder({ item }) {
    const { createFolder } = useContext(FileActionsContext);
    const [folderName, setFolderName] = useState("New Folder");
    function handleChange(e) {
        setFolderName(e.target.value);
        if (e.key === "Enter") {
            createFolder(e.target.value, item);
        }
    }
    return (
        <div
            className={` transition-all ease-in-out duration-300 cursor-pointer p-5 text-blue-500 flex flex-col items-center space-y-2 rounded ${""}`}
        >
            <FcFolder className="text-4xl" />
            <input
                value={folderName}
                autoFocus={true}
                className="text-gray-600 text-xs w-full p-1 bg-transparent border rounded border-gray-400"
                onChange={handleChange}
                onKeyDown={handleChange}
                onFocus={(e) => e.target.select()}
            />
        </div>
    );
}

export default NewFolder;
