import { AppContext } from "@/context/AppContext";
import ManagerLayout from "@/Layouts/ManagerLayout";
import { Inertia } from "@inertiajs/inertia";
import React, { useContext, useEffect } from "react";
import GridContainer from "./GridContainer";
import ItemThumb from "./ItemThumb";
import NewFolder from "./NewFolder";
import Breadcrumbs from "./Breadcrumbs";
import ActionBar from "./ActionBar";
import { FileActionsContext } from "@/context/FileActionsContext";

function Show({ item, items, parents }) {
    const { appItems, setAppItems, setAppItem } = useContext(AppContext);
    const { creatingNewFolder, setCreatingNewFolder } =
        useContext(FileActionsContext);
    useEffect(() => {
        const itemsData = items.map((item) => {
            return { ...item, active: false };
        });
        setAppItems(itemsData);
        setAppItem(item)
    }, [items]);
    return (
        <ManagerLayout>
            {/* <ActionBar /> */}
            <div className="p-5 bg-whsite rounded-xl">
                <GridContainer
                    parents={parents}
                    item={item}
                />
            </div>
        </ManagerLayout>
    );
}

export default Show;
