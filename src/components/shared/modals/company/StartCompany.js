import {XMarkIcon} from "@heroicons/react/24/outline";
import {forwardRef} from "react";
import {AddButtonVariant4} from "../../../../elements/buttons/AddButton";

const options = [
    {
        title: 'Attract top talent',
        description: 'Find and hire qualified candidates for your business'
    },
    {
        title: 'Promote your services',
        description: 'Tell people about your business and offer your services'
    },
    {
        title: 'Post a job for free',
        description: 'Present your job opening to a wide range of candidates'
    },
    {
        title: 'Place an ad',
        description: 'Attract customer attention with advertising on our website'
    },
    {
        title: 'Learn and grow',
        description: 'Get access to useful materials and courses for professional development'
    }
]

const StartCompany = forwardRef(({setIsComponentVisible}, ref) => {
    return (
        <div className="flex flex-col gap-2.5 px-6 py-5 h-[100dvh] w-screen md:w-[593px] md:h-[500px]"
             ref={ref}
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <div className="py-2.5 flex flex-row border-b-[#24459A] border-b-[0.5px]">
                <h1 className="text-[#2D2A33] text-2xl font-jost font-semibold">For business</h1>

                <button onClick={() => setIsComponentVisible(false)}
                        className="ml-auto text-[#7D7D7D] hover:text-gray-700">
                    <XMarkIcon className="w-8 h-8"/>
                </button>
            </div>

            <div className="flex flex-col pb-2.5 rounded-lg overflow-hidden">
                <div className="bg-[#F7F7F7] p-2.5">
                    <h1 className="text-[#2D2A33] font-jost font-medium text-lg">Explore more for business</h1>
                </div>

                <div className="flex flex-col border-[#F7F7F7] border-[1px] gap-1 px-2.5 py-1.5">
                    {
                        options.map((option, index) => (
                            <div key={`option-${index}`} className="flex flex-col font-jost text-[#2D2A33]">
                                <h1 className="font-medium text-lg">{option.title}</h1>

                                <h3 className="font-light text-sm">{option.description}</h3>
                            </div>
                        ))
                    }
                </div>

                <div className="border-[#F7F7F7] border-[1px] p-2.5 rounded-b-lg">
                    <AddButtonVariant4 onClick={() => setIsComponentVisible(false)} to='/j4y/company/new'>
                        Create a company
                    </AddButtonVariant4>
                </div>
            </div>
        </div>
    )
})
export default StartCompany;