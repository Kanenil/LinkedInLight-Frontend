import useComponentVisible from "../../hooks/useComponentVisible";
import {Link} from "react-router-dom";
import ConditionalWrapper from "../shared/ConditionalWrapper";

const OpenToButton = () => {
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

    const statuses = [
        {title: 'Finding a new work', description: 'Show recruiters and others that you\'re open to work', to: '/in'},
        {title: 'Hiring', description: 'Share that you\'re hiring and attract qualified candidates', to: '/in'},
        {
            title: 'Providing services',
            description: 'Showcase services you offer so new client can discover you',
            to: '/in'
        },
    ]

    const ChoiceItem = ({title, description, to}) => {
        return (
            <Link to={to} className="py-1 px-5 w-[240px] font-roboto text-[#2D2A33] hover:bg-gray-500/10">
                <h1 className="font-medium text-sm">{title}</h1>
                <h3 className="font-light font-jost text-sm">{description}</h3>
            </Link>
        )
    }

    return (
        <div ref={ref} className="relative">
            <button onClick={() => setIsComponentVisible((val) => !val)}
                    className="bg-[#24459A] rounded-full py-1.5 px-6 font-jost text-white text-sm hover:bg-[#112861]">
                Open to
            </button>
            <ConditionalWrapper condition={isComponentVisible}>
                <div className="absolute flex flex-col gap-1 bg-white left-0 rounded-r-lg rounded-b-lg top-10 py-2 z-20"
                     style={{boxShadow: "0px 1px 6px 0px #00000040"}}>
                    {statuses.map((status, index) =>
                        <ChoiceItem key={`OpenToStatus-${index}`} {...status}/>
                    )}
                </div>
            </ConditionalWrapper>
        </div>
    )
}
export default OpenToButton;