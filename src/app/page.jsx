"use client";

import { useState, useEffect } from "react";
import { roles } from "@/roles";

import Skills from "./Components/Skills";

const page = () => {
    const [role, setRole] = useState();
    const [map, setMap] = useState({});
    const [skillSet, setSkillSet] = useState(map[role?.id]);
    const [rolesToDisplay, setRolesToDisplay] = useState(roles);

    useEffect(() => {
        setSkillSet(map[role?.id]);
    }, [role]);

    useEffect(() => {
        fetch("/api/roles-skills-mapping")
            .then((res) => res.json())
            .then((data) => {
                setMap(data);
            });
    }, []);

    const updateSkill = (skillId, skillType, action) => {
        fetch("/api/roles-skills-mapping", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                role_id: role?.id,
                skill_set:
                    action === "remove"
                        ? { ...skillSet, [skillType]: skillSet[skillType].filter((id) => id !== skillId) }
                        : { ...skillSet, [skillType]: [...skillSet[skillType], skillId] },
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMap(data);
                setSkillSet({
                    ...skillSet,
                    [skillType]:
                        action === "remove"
                            ? skillSet[skillType].filter((id) => id !== skillId)
                            : [...skillSet[skillType], skillId],
                });
            });
    };

    return (
        <div className="w-10/12 mx-auto my-10 p-8 border rounded-md flex flex-col gap-y-5">
            <div className="flex flex-row items-center gap-x-8 mb-5">
                <h1 className="text-2xl font-bold">Role:</h1>
                <input
                    type="text"
                    placeholder="Keyword Search"
                    className="p-2 border rounded-md"
                    onChange={(e) =>
                        setRolesToDisplay(
                            roles.filter((role) => role?.title.toLowerCase().includes(e.target.value.toLowerCase()))
                        )
                    }
                />
                <select
                    className="p-2 border rounded-md w-72"
                    onChange={(e) => setRole(roles.find((role) => role?.id === e.target.value))}
                >
                    <option value="" selected disabled>
                        Select Role
                    </option>
                    {rolesToDisplay.map((role) => (
                        <option key={role?.id} value={role?.id}>
                            {role?.title}
                        </option>
                    ))}
                </select>
            </div>

            {skillSet &&
                Object.keys(skillSet).map((skillType) => (
                    <Skills key={skillType} skillType={skillType} skillSet={skillSet} updateSkill={updateSkill} />
                ))}
        </div>
    );
};

export default page;
