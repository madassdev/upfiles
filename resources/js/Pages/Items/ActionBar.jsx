import { AppContext } from "@/context/AppContext";
import { FileActionsContext } from "@/context/FileActionsContext";
import React, { useContext } from "react";
import {
    BiChevronLeft,
    BiChevronRight,
    BiDownload,
    BiRename,
    BiTrash,
    BiXCircle,
} from "react-icons/bi";
import { BsScissors } from "react-icons/bs";
import {
    MdContentCopy,
    MdContentPaste,
    MdDriveFolderUpload,
} from "react-icons/md";

function ActionBar() {
    const { selectedItems, deselectItems, renameItem, appItem } =
        useContext(AppContext);
    const { copySelected, clipboard, pasteClipboard, deleteSelected } =
        useContext(FileActionsContext);

    function back() {
        history.back();
        return false;
    }
    return (
        <div className="text-lg text-gray-600 my-1 actions-container flex-1">
            <div className="h-8 rounded-full bg-gray-100 flex space-x-4 items-center">
                <div className="flex items-center space-x-2  px-4 h-full bg-whsite shasdow rounded-xl min-w-32">
                   <span className="p-1 hover:bg-gray-200/50 rounded-lg">

                    <BiChevronLeft
                        className={`cursor-pointer text-2xl text-blue-600`}
                        onClick={back}
                    />
                   </span>
                   
                    <span className="text-xs">{appItem.name}</span>
                </div>

                {/* <div className="">
                    {selectedItems.length ? (
                        <span className="flex items-center space-x-2">
                            <BiXCircle
                                className="cursor-pointer"
                                onClick={deselectItems}
                            />
                            <span className="text-sm">
                                {selectedItems.length} selected
                            </span>
                        </span>
                    ) : null}
                </div> */}

                <div className="space-x-2 px-2 bg-whitse  shasdow rounded-xl h-full flex items-center flex-1 justify-end">
                    <div
                        className={`p-2 hover:bg-gray-200 text-blue-900 rounded-xl cursor-pointer ${
                            !selectedItems.length && "opacity-30"
                        }`}
                        onClick={deleteSelected}
                    >
                        <BiTrash />
                    </div>
                    <div
                        className={`p-2 hover:bg-gray-200 text-blue-900 rounded-xl cursor-pointer ${
                            !selectedItems.length && "opacity-30"
                        }`}
                        onClick={null}
                    >
                        <BiDownload />
                    </div>
                    <div
                        className={`p-2 hover:bg-gray-200 text-blue-900 rounded-xl cursor-pointer ${
                            !selectedItems.length && "opacity-30"
                        }`}
                        onClick={() => copySelected("cut")}
                    >
                        <BsScissors />
                    </div>
                    <div
                        className={`p-2 hover:bg-gray-200 text-blue-900 rounded-xl cursor-pointer ${
                            !selectedItems.length && "opacity-30"
                        }`}
                        onClick={() => copySelected("copy")}
                    >
                        <MdContentCopy />
                    </div>
                    <div
                        className={`p-2 hover:bg-gray-200 text-blue-900 rounded-xl cursor-pointer ${
                            selectedItems.length != 1 && "opacity-30"
                        }`}
                        onClick={renameItem}
                    >
                        <BiRename />
                    </div>

                    <div
                        className={`p-2 hover:bg-gray-200 text-blue-900 rounded-xl cursor-pointer ${
                            !clipboard.length && "opacity-30"
                        }`}
                        onClick={pasteClipboard}
                    >
                        <MdContentPaste />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActionBar;
