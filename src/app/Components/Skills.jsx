import XMark from "@/Icons/XMark";
import { skills } from "@/skills";

const Skills = ({ skillType, skillSet, removeSkill, addSkill }) => {
    const colorScheme = {
        relevant: "green",
        suggested: "blue",
        optional: "yellow",
    };

    return (
        <div className="my-5 pl-5">
            <h1 className={`text-xl font-bold capitalize text-${colorScheme[skillType]}-900`}>{skillType} Skills</h1>
            <div className="flex flex-row gap-x-3 mt-3 flex-wrap justify-start">
                {skillSet[skillType].map((skillId) => (
                    <span
                        key={skillId}
                        className={`flex flex-row items-center justify-start rounded-full px-3 py-1 text-sm font-semibold border mr-2 mb-2 bg-${colorScheme[skillType]}-200 text-${colorScheme[skillType]}-900 border-${colorScheme[skillType]}-900`}
                    >
                        {skills.find((skillSet) => skillSet.id == skillId).name}
                        <span
                            onClick={() => {
                                removeSkill(skillId, skillType);
                            }}
                        >
                            <XMark classes={"w-4 h-4 font-bold ml-2 cursor-pointer"} />
                        </span>
                    </span>
                ))}
                <select
                    className={`flex flex-row items-center justify-start rounded-full px-3 py-1 text-sm font-semibold border mr-2 mb-2 w-40 text-${colorScheme[skillType]}-900 border-${colorScheme[skillType]}-900 `}
                    onChange={(e) => {
                        addSkill(e.target.value, skillType);
                        e.target.value = "";
                    }}
                >
                    <option value="" selected disabled>
                        Add More Skills
                    </option>
                    {skills.map((skill) => (
                        <option
                            key={skill.id}
                            value={skill.id}
                            disabled={Object.values(skillSet).flat().includes(skill.id)}
                        >
                            {skill.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Skills;
