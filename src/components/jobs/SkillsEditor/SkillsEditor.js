import { PlusIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

import Button from "../../../elements/buttons/Button"
import ModalSelectFormGroup from "../../shared/forms/ModalSelectFormGroup"

const SkillsEditor = ({ skills, skillsList, setSkills, buttonTitle }) => {
	const [editing, setEditing] = useState(false)

	const filteredSkills = skillsList.filter(skill => !skills.includes(skill))

	return (
		<>
			<div className='flex flex-row flex-wrap gap-4'>
				{skills.map(skill => (
					<Button
						key={skill?.value}
						variant='remove'
						className='rounded-xl'
						onClick={() => {
							setSkills(skills.filter(s => s.value !== skill.value))
						}}
					>
						{skill?.label}
					</Button>
				))}
				{!editing && (
					<Button
						onClick={() => setEditing(true)}
						variant='tertiary'
						className='rounded-xl'
					>
						<PlusIcon className='w-6 h-6' />

						{buttonTitle}
					</Button>
				)}
			</div>
			{editing && (
				<ModalSelectFormGroup
					className='w-[400px]'
					title=''
					value=''
					options={filteredSkills}
					containerWidth={400}
					placeHolder=''
					hasTools={false}
					isAbsolute={false}
					clearOnSelect={false}
					onChange={skill => {
						setEditing(false)
						setSkills([...skills, skill])
					}}
				/>
			)}
		</>
	)
}

export default SkillsEditor
