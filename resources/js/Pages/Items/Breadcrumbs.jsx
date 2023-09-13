import { Link } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import { BiCaretRight } from "react-icons/bi";

function Breadcrumbs({ parents, item }) {
    const [links, setLinks] = useState([]);
    useEffect(() => {
        if (parents.length > 2) {
            const linksItems = [parents[0], parents[1], null];
            console.log(linksItems);
            setLinks(linksItems);
        } else {
            setLinks(parents);
        }
    }, [parents]);
    return (
        <div className="flex items-center space-x-1 text-xs">
            <Link href={route("items.index")} className="p-1 text-blue-600">
                Home
            </Link>

            <BiCaretRight className="text-gray-600" />
            {links.map((link, i) => (
                <div className="flex space-x-1 items-center" key={i}>
                    {link ? (
                        <div key={link.id}>
                            <Link
                                key={link.id}
                                href={route("items.show", {
                                    item: link.reference,
                                })}
                                className="p-1 text-blue-600"
                            >
                                {link.name}
                            </Link>
                        </div>
                    ) : (
                        <span className="px-4">...</span>
                    )}
                    <BiCaretRight className="text-gray-600" />
                </div>
            ))}
            <div className="p-1 text-gray-500">{item.name}</div>
        </div>
    );
}

export default Breadcrumbs;
