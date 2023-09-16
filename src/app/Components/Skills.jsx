import XMark from "@/Icons/XMark";

import { skills } from "@/skills";
import AddSkill from "./AddSkill";

const Skills = ({ skillType, skillSet, updateSkill, transferSkill }) => {

    return (
        <div className="my-1 pl-5">
            <h1
                className={
                    `text-lg font-bold capitalize ` +
                    (skillType === "relevant" ? "text-green-800" : "") +
                    (skillType === "suggested" ? "text-blue-800" : "") +
                    (skillType === "optional" ? "text-yellow-800" : "")
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
                            (skillType === "relevant" ? "text-green-800 border-green-800 bg-green-50" : "") +
                            (skillType === "suggested" ? "text-blue-800 border-blue-800 bg-blue-50" : "") +
                            (skillType === "optional" ? "text-yellow-800 border-yellow-800 bg-yellow-50" : "")
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

                <AddSkill skillType={skillType} skillSet={skillSet} updateSkill={updateSkill} skills={skills}/>
            </div>
        </div>
    );
};

export default Skills;
