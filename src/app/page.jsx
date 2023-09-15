"use client";

import { useState, useEffect } from "react";
import { roles } from "@/roles";
import { map } from "@/mapping";

import Skills from "./Components/Skills";

const page = () => {
    const [role, setRole] = useState();
    const [skillSet, setSkillSet] = useState(map[role?.id]);
    const [rolesToDisplay, setRolesToDisplay] = useState(roles);

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
                    className="p-2 border rounded-md w-40"
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

            {skillSet && Object.keys(skillSet).map((skillType) => (
                <Skills
                    key={skillType}
                    skillType={skillType}
                    skillSet={skillSet}
                    removeSkill={removeSkill}
                    addSkill={addSkill}
                />
            ))}

            <div className="flex flex-row items-center justify-end">
                <button 
                  className={"px-4 py-2 border rounded-md bg-green-500 hover:bg-green-800 text-white font-semibold" + (
                      skillSet === undefined? " opacity-50 cursor-not-allowed": " hover:cursor-pointer"
                  )}
                  onClick={() => {
                      console.log(skillSet);
                  }}
                  disabled={skillSet === undefined? true: false}
                >
                  Save
                </button>
            </div>
        </div>
    );
};

export default page;
