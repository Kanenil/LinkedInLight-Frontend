import SectionHeaderBlock from "./SectionHeaderBlock";

const ExperienceSection = ({ title, addButtonTitle, companies, onPencilClick, onAddClick }) => {

    const CompanyItem = ({ logo, companyName, period }) => {
        return (
            <div className="mt-2.5 py-2.5 flex flex-row gap-5">
                <div
                    className="flex justify-center items-center p-5 bg-[#EAECF3] font-bold text-[#2D2A33]">
                    { logo }
                </div>

                <div className="py-[5px] font-jost">
                    <h1 className="font-medium text-[#2D2A33]">{ companyName }</h1>

                    <h3 className="font-light text-[#556DA9] mt-2.5">{ period }</h3>
                </div>
            </div>
        )
    }

    return (
        <div className="rounded-lg bg-white py-8 px-10">
            <SectionHeaderBlock
                title={title}
                buttonTitle={addButtonTitle}
                onPencilClick={onPencilClick}
                onAddClick={onAddClick}
            />

            {companies.map((company, index) =>
                <CompanyItem key={`section${title}-${index}`} {...company} />
            )}
        </div>
    )
}
export default ExperienceSection;