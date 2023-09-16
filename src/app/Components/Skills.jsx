import XMark from "@/Icons/XMark";
import Reset from "@/Icons/Reset";

import { skills } from "@/skills";
import { useState } from "react";

const Skills = ({ skillType, skillSet, updateSkill, transferSkill }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [filter, setFilter] = useState("");
    const filteredSkills = skills.filter((skill) => skill.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="my-1 pl-5">
            <h1
                className={
                    `text-lg font-bold capitalize ` +
                    (skillType === "relevant" ? "text-green-900" : "") +
                    (skillType === "suggested" ? "text-blue-900" : "") +
                    (skillType === "optional" ? "text-yellow-900" : "")
                }
            >
                {skillType} Skills
            </h1>
            <div
                className="flex flex-row gap-x-3 mt-2 flex-wrap justify-start items-center"
                onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add("border-2", "border-dashed", "border-gray-500");
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("border-2", "border-dashed", "border-gray-500");
                }}
                onDrop={async (e) => {
                    e.preventDefault();
                    const [skillId, sourceSkillType] = e.dataTransfer.getData("skill").split(",");
                    transferSkill(skillId, sourceSkillType, skillType);
                    e.currentTarget.classList.remove("border-2", "border-dashed", "border-gray-500");
                }}
            >
                {skillSet[skillType].map((skillId) => (
                    <span
                        key={skillId}
                        className={
                            `flex flex-row items-center justify-start rounded-full px-3 py-1 text-sm font-semibold border mr-2 cursor-grab active:cursor-grabbing ` +
                            (skillType === "relevant" ? "text-green-900 border-green-900 bg-green-200/50" : "") +
                            (skillType === "suggested" ? "text-blue-900 border-blue-900 bg-blue-200/50" : "") +
                            (skillType === "optional" ? "text-yellow-900 border-yellow-900 bg-yellow-200/50" : "")
                        }
                        draggable
                        onDragStart={(e) => {
                            e.dataTransfer.setData("skill", [skillId, skillType]);
                        }}
                    >
                        {skills.find((skillSet) => skillSet.id == skillId)?.name}
                        <span
                            onClick={() => {
                                updateSkill(skillId, skillType, "remove");
                            }}
                        >
                            <XMark classes={"w-4 h-4 font-bold ml-2 cursor-pointer"} />
                        </span>
                    </span>
                ))}

                {/* Custom Dropdown with filter */}
                <div
                    className={"w-64 " + (showDropDown ? "relative" : "")}
                    onFocus={() => {
                        setShowDropDown(true);
                    }}
                    onBlur={() => setShowDropDown(false)}
                >
                    <div
                        className={
                            "flex flex-row justify-between items-center border-2 rounded pr-3 " +
                            (skillType === "relevant" ? "border-green-900" : "") +
                            (skillType === "suggested" ? "border-blue-900" : "") +
                            (skillType === "optional" ? "border-yellow-900" : "")
                        }
                    >
                        <input
                            type="text"
                            className={"px-2 py-0.5 rounded-md focus:outline-none"}
                            placeholder="Add Skill..."
                            onChange={(e) => setFilter(e.target.value)}
                            value={filter}
                        />
                        {filter && (
                            <span
                                className="cursor-pointer "
                                onClick={() => {
                                    setFilter("");
                                }}
                            >
                                <Reset classes={"w-4 h-4 text-neutral-500"} />
                            </span>
                        )}
                    </div>
                    {showDropDown && (
                        <ul className="absolute backdrop-blur-lg shadow-xl border  max-h-[400px] w-full overflow-scroll">
                            {filteredSkills.map((skill) => (
                                <li
                                    key={skill.id}
                                    className={
                                        `relative z-100 text-neutral-700 px-4 py-2 truncate` +
                                        (Object.values(skillSet).flat().includes(skill.id)
                                            ? " opacity-50 cursor-not-allowed"
                                            : "  hover:bg-neutral-200/60 hover:translate-x-0.5  cursor-pointer")
                                    }
                                    title={skill.name}
                                    onMouseDown={(e) => {
                                        e.stopPropagation();
                                        if (Object.values(skillSet).flat().includes(skill.id)) return;
                                        updateSkill(skill.id, skillType, "add");
                                        setFilter("");
                                    }}
                                    disabled={Object.values(skillSet).flat().includes(skill.id)}
                                >
                                    {skill.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Skills;
