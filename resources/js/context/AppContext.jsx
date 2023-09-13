import Modal from "@/components/Modal";
import { Inertia } from "@inertiajs/inertia";
import { isArray } from "lodash";
import React, { createContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export const AppContext = createContext();
export default function AppCtx({ children }) {
    const [appItems, setAppItems] = useState([]);
    const [appItem, setAppItem] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [history, setPrevLink] = useState();
    const [nextLink, setNextLink] = useState();

    const handleContainerClick = (e) => {
        const isClickedInsideContainer = e.target.closest(".item-thumb");
        const isClickedInsideAction = e.target.closest(".actions-container");
        if (!(isClickedInsideContainer || isClickedInsideAction)) {
            deselectItems();
        }
    };

    useEffect(() => {
        document.body.addEventListener("click", handleContainerClick);
        return () => {
            document.body.removeEventListener("click", handleContainerClick);
        };
    });

    const [modal, setModal] = useState({
        show: false,
    });

    const closeModal = (val) => {
        setModal({ show: false });
        if (modal.reloadOnClose) {
            window.location.reload;
        }
    };

    function deselectItems() {
        const updatedItems = appItems.map((i) => {
            return { ...i, selected: false };
        });
        setAppItems(updatedItems);
        setSelectedItems([]);
    }

    function selectItem(item) {
        const updatedItems = appItems.map((i) => {
            return item.id == i.id
                ? { ...i, selected: true }
                : { ...i, selected: false };
        });
        setAppItems(updatedItems);
        setSelectedItems([item]);
    }

    function renameItem() {
        if (selectedItems.length != 1) {
            return;
        }
        const itemToRename = selectedItems[0];
        const updatedItems = appItems.map((i) => {
            return itemToRename.id == i.id
                ? { ...i, renaming: true }
                : { ...i, renaming: false };
        });
        setAppItems(updatedItems);
    }

    function completeRenameItem(newName, item) {
        const itemName = newName || item.name;
        const updatedItems = appItems.map((i) => {
            return item.id == i.id
                ? { ...i, renaming: false, name: itemName }
                : { ...i, renaming: false };
        });
        setAppItems(updatedItems);
        const payload = { new_name: itemName };
        Inertia.post(route("items.rename", { item: item.reference }), payload, {
            onSuccess: (page) => {
            },
        });
    }

    function selectMultipleItems(item) {
        const updatedItems = appItems.map((i) => {
            return item.id == i.id ? { ...i, selected: !i.selected } : i;
        });
        setAppItems(updatedItems);

        setSelectedItems((prevSelectedItems) => {
            const index = prevSelectedItems.findIndex((i) => i.id == item.id);
            if (index === -1) {
                // conso;
                // Item not in selectedItems, add it
                return [...prevSelectedItems, item];
            } else {
                // Item already in selectedItems, remove it
                return prevSelectedItems.filter((it) => it.id !== item.id);
            }
        });
    }

    function itemClicked(e, item) {
        if (e.ctrlKey || e.metaKey) {
            selectMultipleItems(item);
        } else {
            selectItem(item);
        }
    }

    return (
        <AppContext.Provider
            value={{
                modal,
                setModal,
                closeModal,
                appItems,
                setAppItems,
                selectItem,
                itemClicked,
                selectedItems,
                setSelectedItems,
                deselectItems,
                renameItem,
                completeRenameItem,
                appItem,
                setAppItem
            }}
        >
            <Toaster />
            {children}
            <Modal />
        </AppContext.Provider>
    );
}
