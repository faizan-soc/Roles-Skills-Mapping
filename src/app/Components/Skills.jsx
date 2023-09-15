import XMark from "@/Icons/XMark";
import { skills } from "@/skills";
import { useState, useRef } from "react";

const Skills = ({ skillType, skillSet, updateSkill }) => {
    const colorScheme = {
        relevant: "green",
        suggested: "blue",
        optional: "yellow",
    };
    const [showDropDown, setShowDropDown] = useState(false);
    const [filter, setFilter] = useState("");
    const filteredSkills = skills.filter((skill) => skill.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="my-1 pl-5">
            <h1 className={`text-lg font-bold capitalize text-${colorScheme[skillType]}-900`}>{skillType} Skills</h1>
            <div className="flex flex-row gap-x-3 mt-2 flex-wrap justify-start items-center">
                {skillSet[skillType].map((skillId) => (
                    <span
                        key={skillId}
                        className={`flex flex-row items-center justify-start rounded-full px-3 py-1 text-sm font-semibold border mr-2 bg-${colorScheme[skillType]}-200/50 text-${colorScheme[skillType]}-900 border-${colorScheme[skillType]}-900`}
                    >
                        {skills.find((skillSet) => skillSet.id == skillId).name}
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
                    <input
                        type="text"
                        className={"border py-1 px-4 w-full rounded-md"}
                        placeholder="Add Skill..."
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                    />
                    {filter && (
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
