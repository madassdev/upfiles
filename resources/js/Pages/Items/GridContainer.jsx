import React, { useContext } from "react";
import ItemThumb from "./ItemThumb";
import NewFolder from "./NewFolder";
import Nodata from "./Nodata";
import Breadcrumbs from "./Breadcrumbs";
import { FileActionsContext } from "@/context/FileActionsContext";
import { AppContext } from "@/context/AppContext";
import { BiPlus } from "react-icons/bi";
import ActionBar from "./ActionBar";

function GridContainer({ parents, item, showBreadcrumbs = true }) {
    const { appItems } = useContext(AppContext);
    const { creatingNewFolder, setCreatingNewFolder } =
        useContext(FileActionsContext);
    return (
        <div className="mins-h-[50vh] py-2 space-y-2">
            <div className="w-full flex items-center justify-between p-2 rounded-xl bg-grsay-900">
                <ActionBar/>
                {/* <div className="flex-1">
                    {showBreadcrumbs ? (
                        <Breadcrumbs parents={parents} item={item} />
                    ) : null}
                </div> */}
                {creatingNewFolder ? (
                    <button className="p-2 px-4 bg-blue-200 text-white text-xs">
                        New
                    </button>
                ) : (
                    <button
                        onClick={() => setCreatingNewFolder(item)}
                        className="p-2 px-4 space-x-2  bg-whitse-500 shasdow rounded-2xl text-blue-500 flex  items-center"
                    >
                        <BiPlus />
                        <span>New</span>
                    </button>
                )}
            </div>
            {appItems?.length || creatingNewFolder ? (
                <div className="grid grid-cols-5 gap-6 items-container">
                    {appItems.map((appItem) => (
                        <ItemThumb item={appItem} key={appItem.id} />
                    ))}
                    {creatingNewFolder ? (
                        <NewFolder item={creatingNewFolder} />
                    ) : null}
                </div>
            ) : (
                <div className="p-8 w-full h-full grid place-content-center">
                    <Nodata />
                </div>
            )}
        </div>
    );
}

export default GridContainer;
