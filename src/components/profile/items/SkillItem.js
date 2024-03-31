import PencilButton from "../../../elements/buttons/PencilButton";

const SkillItem = ({editPath, skill}) => {
    return (
        <div className="flex flex-row items-start justify-start gap-[20px] isolate">
            <h1 className="w-20 h-26 font-jost font-normal text-lg leading-26 text-gray-800 flex-none">{skill.name}</h1>

            <PencilButton to={editPath}/>
        </div>
    )
}
export default SkillItem;