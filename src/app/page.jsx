"use client";

import { useState, useEffect } from "react";
// import { roles } from "@/roles";

import Role from "./Components/Role";
import Reset from "@/Icons/Reset";

const page = () => {
    const [map, setMap] = useState({});
    const [roles, setRoles] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetch("/api/roles-skills-mapping")
            .then((res) => res.json())
            .then((data) => {
                setMap(data);
            });
        
        fetch("/api/roles")
            .then((res) => res.json())
            .then((data) => {
                setRoles(data);
            }
        );
    }, []);

    return (
        <div className="w-10/12 mx-auto my-10 p-8 border rounded-md flex flex-col gap-y-5">
            <div className="flex flex-row items-center gap-x-2 border rounded p-3 bg-neutral-50">
                <h1 className="font-bold text-neutral-600">Filter</h1>
                <div className="flex flex-row justify-between items-center border rounded pr-3">
                    <input
                        type="text"
                        placeholder="Search roles..."
                        className="p-2 rounded-md focus:outline-none"
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                    />
                    <span
                        className="cursor-pointer "
                        onClick={() => {
                            setFilter("");
                        }}
                    >
                        <Reset classes={"w-4 h-4 text-neutral-500"} />
                    </span>
                </div>
            </div>
            {roles
                .filter((role) => role.title.toLowerCase().includes(filter.toLowerCase()))
                .map((role) => (
                    <Role key={role?.id} role={role} map={map} setMap={setMap} />
                ))}
        </div>
    );
};

export default page;
