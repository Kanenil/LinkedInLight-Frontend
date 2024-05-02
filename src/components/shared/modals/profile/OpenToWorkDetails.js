import XMarkIcon from "../../../../elements/icons/XMarkIcon"
import { APP_ENV } from "../../../../env"
import useUrlUser from "../../../../hooks/useUrlUser"
import Loader from "../../Loader"
import defaultImage from "../../../../assets/default-image.jpg"
import { useTranslation } from "react-i18next"

const OpenToWorkDetails = ({
	preferences,
	positions,
	countries,
	dot,
	onClose,
}) => {
	const { profile, isLoading } = useUrlUser()
	const { t } = useTranslation()

	const employmentTypes = t("profile.modal.jobPreferences.employmentTypes", {
		returnObjects: true,
	})

	const startDate = t("profile.modal.jobPreferences.startDate", {
		returnObjects: true,
	})

	return (
		<div
			className='flex flex-col gap-2 px-7 py-5 bg-white w-screen h-[100dvh] md:w-[480px] md:h-full'
			style={{ boxShadow: "0px 0px 8px 2px #00000066" }}
		>
			<div className='flex flex-row py-2.5 border-b-[1px] border-b-[#24459A]'>
				<h1 className='font-jost font-semibold text-[#2D2A33] text-2xl md:text-xl'>
					{t("profile.modal.jobPreferences.title")}
				</h1>

				<button onClick={onClose} className='ml-auto'>
					<XMarkIcon className='fill-[#7D7D7D] h-6 md:h-4' />
				</button>
			</div>

			{isLoading ? (
				<div className='h-[400px]'>
					<Loader />
				</div>
			) : (
				<>
					<div className='flex flex-row gap-4 mt-4'>
						<div className='overflow-hidden h-12 w-12 my-auto rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
							<img
								className='object-contain'
								src={
									profile.image
										? APP_ENV.UPLOADS_URL + "/" + profile.image
										: defaultImage
								}
								alt=''
							/>
						</div>

						<div className='flex flex-col gap-1'>
							<h1 className='font-jost text-lg font-medium'>
								{profile.firstName} {profile.lastName}
							</h1>

							<h3 className='font-jost text-sm'>
								{t("profile.modal.jobPreferences.lookingForJob")}
							</h3>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-4 my-4 font-jost'>
						<div className='flex flex-col gap-2'>
							<h1 className='font-medium text-[#2D2A33]'>
								{t("profile.modal.jobPreferences.plural.positions")}
							</h1>

							<div className='inline-flex flex-wrap gap-1.5'>
								{preferences.openToWorkPositions.map((position, index, arr) => (
									<div
										className='inline-flex items-center gap-1.5'
										key={`position-${position.positionId}`}
									>
										<h3 className='text-sm mr-1 font-light'>
											{
												positions.find(val => val.id === position.positionId)
													.name
											}
										</h3>
										{arr.length - 1 !== index && dot}
									</div>
								))}
							</div>
						</div>

						<div className='flex flex-col gap-2'>
							<h1 className='font-medium text-[#2D2A33]'>
								{t("profile.modal.jobPreferences.plural.regions")}
							</h1>

							<div className='inline-flex flex-wrap gap-1.5'>
								{preferences.openToWorkCountries.map((country, index, arr) => (
									<div
										className='inline-flex items-center gap-1.5'
										key={`country-${country.countryId}`}
									>
										<h3 className='text-sm mr-1 font-light'>
											{countries.find(val => val.id === country.countryId).name}
										</h3>
										{arr.length - 1 !== index && dot}
									</div>
								))}
							</div>
						</div>

						<div className='flex flex-col gap-2'>
							<h1 className='font-medium text-[#2D2A33]'>
								{t("profile.modal.jobPreferences.plural.startDate")}
							</h1>

							<div className='inline-flex flex-wrap gap-1.5'>
								<h3 className='text-sm mr-1 font-light'>
									{
										startDate.find(
											v =>
												v.condition ===
												preferences.canStartImmediately.toString(),
										)?.title
									}
								</h3>
							</div>
						</div>

						<div className='flex flex-col gap-2'>
							<h1 className='font-medium text-[#2D2A33]'>
								{t("profile.modal.jobPreferences.plural.employmentTypes")}
							</h1>

							<div className='inline-flex items-center flex-wrap gap-1.5'>
								{employmentTypes.map(
									({ value, label }, index, arr) =>
										preferences[value] && (
											<div
												className='inline-flex items-center gap-1.5'
												key={`employmentType-${value}`}
											>
												<h3 className='text-sm mr-1 font-light'>{label}</h3>
											</div>
										),
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
export default OpenToWorkDetails
