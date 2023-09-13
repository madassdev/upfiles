import React from "react";

function ManagerLayout({ children }) {
    return (
        <div>
            <div className="navbar"></div>
            <div className="fixed top-0 bottom-0 left-0 w-32 bg-blue-600 border-r border-gray-200"></div>
            <div className="fixed top-0 bottom-0 right-0 w-60 bg-white bordser-l border-gray-200"></div>
            <div className="bg-gray-100 min-h-[100vh] mr-56 ml-32 px-8">
                {children}
            </div>
        </div>
    );
}

export default ManagerLayout;
