import { useState } from "react"
import settingsService from "../../../../../services/settingsService"

const getData = async () => {
	let currentVal
	let values
	try {
		currentVal = await settingsService.activeStatusVisibility()
		values = await settingsService.activeStatusVisibilityValues()
	} catch (error) {
		console.log(error)
	}
	return {
		currentVal,
		values,
	}
}

const { currentVal, values } = await getData()

const ManageActivityStatus = () => {
	const [selectedOption, setSelectedOption] = useState(currentVal.data)
	const selectOption = async val => {
		setSelectedOption(val)
		await settingsService.updateActiveStatusVisibility(val)
	}
	return (
		<div className='w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6'>
			<div className='font-bold text-xl'>Manage activity status</div>
			<div className='my-3'>People able to see activity status</div>
			{values.data.map(item => {
				return (
					<div key={"key-" + item} className='mt-10 flex items-center'>
						<input
							onClick={() => selectOption(item)}
							checked={selectedOption === item}
							type='radio'
							className='inline-block'
						/>
						<div
							className={`inline-block mx-3 ${
								selectedOption === item ? "text-black" : "text-gray-400"
							}`}
						>
							{item}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default ManageActivityStatus
