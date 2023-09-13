import { AppContext } from "@/context/AppContext";
import useEscape from "@/hooks/useEscape";
import React, { useContext } from "react";
import { BiX } from "react-icons/bi";
import './modal.css';

function Modal() {
    const { modal, closeModal } = useContext(AppContext);
    useEscape(() => {
        if (!modal.noClose) {
            closeModal();
        }
    }, [modal]);
    function handleClose() {
        if (modal.reloadOnClose === true) {
            window.location.reload();
            closeModal()
        } else {
            closeModal();
        }
    }
    return (
        <>
            {modal.show && (
                <div className="modal__container">
                    <div
                        className={`md:w-2/3 max-w-[600px] rounded-2xl relative
                    flex flex-col my-16 mx-8 md:mx-auto ${modal.transparent ? "bg-transparent" : "bg-[#161615]"}`}
                    >
                        <div className="p-3">{modal.content}</div>
                        {modal.noClose ? (
                            <></>
                        ) : (
                            <div
                                className="absolute flex items-center justify-center w-8 h-8 rounded-full shadow bg-[#161615] -top-12 right-2 cursor-pointer"
                                onClick={handleClose}
                            >
                                <BiX />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
