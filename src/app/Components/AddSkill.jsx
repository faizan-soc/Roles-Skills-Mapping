import { useState } from "react";
import Reset from "@/Icons/Reset";

const AddSkill = ({skillType, skillSet, updateSkill, skills}) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [filter, setFilter] = useState("");
    const filteredSkills = skills.filter((skill) => skill.name.toLowerCase().includes(filter.toLowerCase()));
    return (
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
    );
};

export default AddSkill;
