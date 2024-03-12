import AppleIcon from "../../elements/AppleIcon/AppleIcon";

const AppleButton = () => {
    return (
        <button type="button"
                className="rounded-full border-[1px] border-[#2D2A33] p-1">
            <AppleIcon className="fill-[#2D2A33] h-[16px]"/>
        </button>
    )
}
export default AppleButton;