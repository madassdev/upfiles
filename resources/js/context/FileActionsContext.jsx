import Modal from "@/components/Modal";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AppContext } from "./AppContext";
import { Inertia } from "@inertiajs/inertia";

export const FileActionsContext = createContext();
export default function FileActionsCtx({ children }) {
    const { appItems, setAppItems, selectedItems, deselectItems, appItem } =
        useContext(AppContext);
    const [clipboard, setClipboard] = useState([]);
    const [clipboardIntent, setClipboardIntent] = useState("copy");
    const [creatingNewFolder, setCreatingNewFolder] = useState(null);

    function createFolder(name, item) {
        if (!name) {
            setCreatingNewFolder(null);
        }
        const payload = {
            type: "folder",
            name,
            parent_id: item.id,
        };

        Inertia.post(route("items.create"), payload, {
            onSuccess: (page) => {
                setCreatingNewFolder(false);
            },
        });
    }

    function copySelected(context) {
        if (selectedItems.length) {
            // toast.success("Copied!");
            const allItems = appItems;
            const itemsToWatch = selectedItems.map((obj) => obj.id);

            if (context == "cut") {
                allItems.forEach((item) => {
                    if (itemsToWatch.includes(item.id)) {
                        console.log("includes");
                        item.is_cut = true;
                    } else {
                        item.is_cut = false;
                    }
                });
                setAppItems(allItems);
                setClipboard(selectedItems);
                deselectItems();
            } else {
                const updatedItems = allItems.map((i) => {
                    return { ...i, is_cut: false };
                });
                console.log(updatedItems);
                setAppItems(updatedItems);
                setClipboard(selectedItems);
            }
            setClipboardIntent(context ? context : "copy");
        }
    }

    function pasteClipboard() {
        console.log(clipboard);
        const selectedClipboardItems = clipboard.map((item) => ({
            ...item,
            selected: true,
        }));
        const updatedItems = [...appItems, ...selectedClipboardItems];
        console.log(clipboardIntent, updatedItems);
        setAppItems(updatedItems);
        const payload = {
            items: clipboard.map((item) => item.reference),
            destination: appItem.reference,
        };
        if (clipboardIntent == "copy") {
            Inertia.post(route("items.copy"), payload, {
                onSuccess: (page) => {
                    console.log(page);
                },
            });
        }
        if (clipboardIntent == "cut") {
            Inertia.post(route("items.move"), payload, {
                onSuccess: (page) => {
                    console.log(page);
                },
            });
        }
        setClipboard([]);
    }

    function deleteSelected() {
        if (selectedItems.length) {

            // const  selectedItems;
            console.log(selectedItems);
        }
    }

    return (
        <FileActionsContext.Provider
            value={{
                copySelected,
                clipboard,
                pasteClipboard,
                creatingNewFolder,
                setCreatingNewFolder,
                createFolder,
                deleteSelected,
            }}
        >
            {children}
        </FileActionsContext.Provider>
    );
}
