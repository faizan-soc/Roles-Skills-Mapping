"use client";

import { useState, useEffect } from "react";
import { roles } from "@/roles";
import { skills } from "@/skills";
import { map } from "@/mapping";

import Skills from "./Components/Skills";

const page = () => {
    const [role, setRole] = useState(roles[0]);
    const [skillSet, setSkillSet] = useState(map[role?.id]);

    useEffect(() => {
        setSkillSet(map[role?.id]);
    }, [role]);

    const removeSkill = (skillId, skillType) => {
        setSkillSet({
            ...skillSet,
            [skillType]: skillSet[skillType].filter((id) => id !== skillId),
        });
    };

    const addSkill = (skillId, skillType) => {
        setSkillSet({
            ...skillSet,
            [skillType]: [...skillSet[skillType], skillId],
        });
    };

    return (
        <div className="w-10/12 mx-auto my-10 p-5 border rounded-md flex flex-col gap-y-5">
            <div className="flex flex-row items-center gap-x-8 mb-5">
                <h1 className="text-2xl font-bold">Role:</h1>
                <select
                    className="p-2 border rounded-md"
                    onChange={(e) => setRole(roles.find((role) => role.id === e.target.value))}
                >
                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.title}
                        </option>
                    ))}
                </select>
            </div>

            {Object.keys(skillSet).map((skillType) => (
                <Skills
                    key={skillType}
                    skillType={skillType}
                    skillSet={skillSet}
                    removeSkill={removeSkill}
                    addSkill={addSkill}
                    // skills={skills}
                />
            ))}
        </div>
    );
};

export default page;
