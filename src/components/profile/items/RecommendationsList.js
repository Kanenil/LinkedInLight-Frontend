import React, { useState } from "react"
import Show from "../../../elements/shared/Show"
import classNames from "classnames"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import RecommendationItem from "./RecommendationItem"
import { useTranslation } from "react-i18next"

const NavButton = ({ children, isActive, onClick }) => {
	return (
		<button
			className={classNames(
				"border-b-[1px] font-jost text-lg w-[105px] md:w-[150px] py-1.5 text-[#585359]",
				{
					"border-b-[#24459A] font-semibold": isActive,
					"border-b-[#24459A]/50": !isActive,
				},
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

const RecommendationsList = ({ data: array }) => {
	const { t } = useTranslation()

	const statuses = t("recommendationsSection.statuses", { returnObjects: true })

	const [selected, setSelected] = useState(statuses[0].data)

	return (
		<>
			<div className='flex flex-row mt-4'>
				{statuses.map(({ data, title }) => (
					<ConditionalWrapper
						key={data}
						condition={
							data !== "pendingRecommendations" ||
							(data === "pendingRecommendations" && array[data].length > 0)
						}
					>
						<NavButton
							onClick={() => setSelected(data)}
							isActive={selected === data}
						>
							{title}
						</NavButton>
					</ConditionalWrapper>
				))}
			</div>

			<div className='mt-5 flex flex-col gap-3'>
				<Show>
					{statuses.map(({ data }) => (
						<Show.When
							key={`recommended-section-${data}`}
							isTrue={selected === data}
						>
							<div className='flex flex-col gap-5'>
								{array[data].map(recommendation => (
									<RecommendationItem
										key={`${data}-recommendation-${recommendation.id}`}
										{...recommendation}
									/>
								))}
							</div>
						</Show.When>
					))}
				</Show>
			</div>
		</>
	)
}
export default RecommendationsList
