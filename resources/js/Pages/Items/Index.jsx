import { AppContext } from "@/context/AppContext";
import ManagerLayout from "@/Layouts/ManagerLayout";
import { Inertia } from "@inertiajs/inertia";
import React, { useContext, useEffect } from "react";
import { BsFolder } from "react-icons/bs";
import GridContainer from "./GridContainer";
import ItemThumb from "./ItemThumb";
import Nodata from "./Nodata";
import ActionBar from "./ActionBar";

function Index({ items }) {
    const { appItems, setAppItems, creatingNewFolder } =
        useContext(AppContext);
    useEffect(() => {
        const itemsData = items.map((item) => {
            return { ...item, active: false };
        });
        setAppItems(itemsData);
    }, [items]);

    return (
        <ManagerLayout>
            {/* <ActionBar/> */}
            <div className="space-y-12">
                <div className="grid  grid-cols-3 gap-12">
                    <div className="p-3 bg-white rounded-2xl shadow space-y-4">
                        <p>Quota 1</p>
                        <div className="h-1 w-full relative bg-blue-600/10 rounded">
                            <div className="absolute inset-0 w-[70%]  bg-blue-600  rounded"></div>
                        </div>
                    </div>
                </div>

                <div className="p-5  bg-whsite rounded-xl">
                    <GridContainer
                        showBreadcrumbs={false}
                        appItems={appItems}
                    />
                </div>
            </div>
        </ManagerLayout>
    );
}

export default Index;
