"use client";

import { useState, useEffect } from "react";

import Skills from "./Skills";

const Role = (props) => {
    const { map, setMap } = props;
    const [role, setRole] = useState(props?.role);
    const [skillSet, setSkillSet] = useState(map[role?.id]);

    useEffect(() => {
        setRole(props.role);
        setSkillSet(map[role?.id]);
    }, [props, role]);

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
        <div className="w-10/12 mx-auto shadow px-8 pb-2 border rounded-md flex flex-col gap-y-2">
            {role && <h1 className="text-2xl font-bold text-center my-2 border-b py-4">{role.title}</h1>}
            {skillSet ? (
                Object.keys(skillSet).map((skillType) => (
                    <Skills key={skillType} skillType={skillType} skillSet={skillSet} updateSkill={updateSkill} />
                ))
                ) : (
                    <div className="text-lg font-bold text-center">Loading...</div>
                )}

        </div>
    );
};

export default Role;
