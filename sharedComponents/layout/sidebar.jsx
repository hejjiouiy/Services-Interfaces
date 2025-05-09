import React from 'react';
// Import necessary libraries and modules

// Define the component
const Sidebar = () => {
    const links = [
        { name: "Dashboard", path: "/" },
        { name: "General Services", path: "/Services" },
        { name: "Event", path: "/Events" },
        { name: "Purchase", path: "/Purchase" },
        { name: "Storage Management", path: "/warehouse" }
    ]
    return (
        <aside className="m-0 p-0 absolute top-0 left-0 w-64 h-screen  bg-main-beige text-main-green">
            <nav className="flex flex-col items-start justify-start p-4">
                <div className="flex items-center mb-4 w-full ml-4">
                    <h1 className="flex justify-between my-14 w-[80%]">
                        <span className="text-4xl flex text-center justify-center my-auto p-auto h-10 w-10 font-bold text-main-beige bg-main-green rounded-sm ">
                            S
                        </span>
                        <span className="text-4xl flex text-center justify-center my-auto p-auto h-10 w-10 font-bold text-main-beige bg-main-green rounded-sm ">
                            H
                        </span>
                        <span className="text-4xl flex text-center justify-center my-auto p-auto h-10 w-10 font-bold text-main-beige bg-main-green rounded-sm ">
                            C
                        </span>
                        <span className="text-4xl flex text-center justify-center my-auto p-auto h-10 w-10 font-bold text-main-beige bg-main-green rounded-sm ">
                            C
                        </span>

                    </h1>
                </div>
                <ul className="m-auto h-full flex flex-col ">
                    {links.map((link, index) => (
                        <li key={index} className="mb-4 hover:bg-main-green p-2 hover:rounded-sm hover:text-main-beige hover:font-bold hover: duration-300 ease-in ease-out">
                            <a href={link.path}>{link.name}</a>
                        </li>
                    ))}
                    
                </ul>
            </nav>
        </aside>
    );
};

// Export the component
export default Sidebar;