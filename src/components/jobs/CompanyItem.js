import defaultCompanyImage from "../../assets/default-company-image.jpg"
import { imageUrl } from "../../utils/converters"

const CompanyItem = ({ companyName, logoImg, onClick }) => {
	return (
		<button
			className='flex flex-row gap-3 items-center hover:bg-gray-50 py-1'
			type='button'
			onClick={onClick}
		>
			<div className='overflow-hidden mx-h-12 max-w-16 border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
				<img
					className='object-contain'
					src={imageUrl(logoImg, defaultCompanyImage)}
					alt=''
				/>
			</div>

			<div className='flex flex-col gap-1'>
				<h1 className='font-jost text-lg font-medium'>{companyName}</h1>
			</div>
		</button>
	)
}
export default CompanyItem
