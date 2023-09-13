import React from "react";
import { GiEmptyHourglass } from "react-icons/gi";
import { FcOpenedFolder } from "react-icons/fc";

function Nodata({ text }) {
    return (
        <div className="bg-whsite w-full flex flex-col space-y-2  items-center justify-center">
            {/* <img src="/images/nodata.png" className="w-[80px] md:w-[120px]" /> */}
            <div className="text-xl text-primary/20">
                <FcOpenedFolder />
            </div>
            <p className="text-gray-400 text-sm">{text || "No files here"}</p>
        </div>
    );
}

export default Nodata;
