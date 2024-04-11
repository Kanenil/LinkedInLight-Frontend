import {XMarkIcon} from "@heroicons/react/24/outline";
import {forwardRef} from "react";
import AddButton from "../../../../elements/buttons/AddButton";

const options = [
    {
        title: 'Залучайте кращих фахівців',
        description: 'Пошук і найм кваліфікованих кандидатів для вашого бізнесу'
    },
    {
        title: 'Продайте свої послуги',
        description: 'Розкажіть про свій бізнес та пропонуйте свої послуги'
    },
    {
        title: 'Розмістіть вакансію безкоштовно',
        description: 'Представте вашу вакансію широкому колу кандидатів'
    },
    {
        title: 'Розмістіть рекламу',
        description: 'Привертайте увагу клієнтів за допомогою реклами на нашому сайті'
    },
    {
        title: 'Навчайтеся та розвивайтеся',
        description: 'Отримуйте доступ до корисних матеріалів та курсів для професійного зростання'
    }
]

const StartCompany = forwardRef(({setIsComponentVisible}, ref) => {
    return (
        <div className="flex flex-col gap-2.5 px-6 py-5 w-[593px] h-[500px]"
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
                    <AddButton to='/j4y/company/new' className="border-transparent hover:border-transparent active:border-transparent active:bg-transparent">
                        Create a company
                    </AddButton>
                </div>
            </div>
        </div>
    )
})
export default StartCompany;