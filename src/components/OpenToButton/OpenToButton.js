import useComponentVisible from "../../hooks/componentVisible";
import {Link} from "react-router-dom";

const OpenToButton = () => {
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

    return (
        <div ref={ref} className="relative">
            <button onClick={() => setIsComponentVisible((val) => !val)}
                    className="bg-[#24459A] rounded-full py-1.5 px-6 font-jost text-white text-sm hover:bg-[#112861]">
                Open to
            </button>
            {
                isComponentVisible &&
                <div className="absolute flex flex-col gap-1 bg-white left-0 rounded-r-lg rounded-b-lg top-10 py-2 z-20"
                     style={{boxShadow: "0px 1px 6px 0px #00000040"}}>
                    <Link to="/in" className="py-1 px-5 w-[240px] font-roboto text-[#2D2A33] hover:bg-gray-500/10">
                        <h1 className="font-medium text-sm">Finding a new work</h1>

                        <h3 className="font-light font-jost text-sm">Show recruiters and others that you're open to work</h3>
                    </Link>

                    <Link to="/in" className="py-1 px-5 w-[240px] font-roboto text-[#2D2A33] hover:bg-gray-500/10">
                        <h1 className="font-medium text-sm">Hiring</h1>

                        <h3 className="font-light font-jost text-sm">Share that you're hiring and attract qualified candidates</h3>
                    </Link>

                    <Link to="/in" className="py-1 px-5 w-[240px] font-roboto text-[#2D2A33] hover:bg-gray-500/10">
                        <h1 className="font-medium text-sm">Providing services</h1>

                        <h3 className="font-light font-jost text-sm">Showcase services you offer so new client can discover you</h3>
                    </Link>
                </div>
            }
        </div>
    )
}
export default OpenToButton;