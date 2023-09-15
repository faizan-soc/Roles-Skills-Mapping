"use client";

import { useState, useEffect } from "react";
import { roles } from "@/roles";

import Role from "./Components/Role";

const page = () => {
    const [map, setMap] = useState({});
    const [rolesToDisplay, setRolesToDisplay] = useState(roles);

    useEffect(() => {
        fetch("/api/roles-skills-mapping")
            .then((res) => res.json())
            .then((data) => {
                setMap(data);
            });
    }, []);

    return (
        <div className="w-10/12 mx-auto my-10 p-8 border rounded-md flex flex-col gap-y-5">
            <div className="flex flex-row items-center gap-x-2 border rounded p-3 bg-neutral-50">
                <h1 className="font-bold text-neutral-600">Filter</h1>
                <input
                    type="text"
                    placeholder="Search roles..."
                    className="p-2 border rounded-md"
                    onChange={(e) =>
                        setRolesToDisplay(
                            roles.filter((role) => role?.title.toLowerCase().includes(e.target.value.toLowerCase()))
                        )
                    }
                />
            </div>
            {rolesToDisplay.map((role) => (
                <Role key={role?.id} role={role} map={map} setMap={setMap} />
            ))}
        </div>
    );
};

export default page;
