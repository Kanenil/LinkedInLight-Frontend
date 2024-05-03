import React from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"

import useAuthUser from "../../hooks/useAuthUser"
import Loader from "../../components/shared/Loader"
import LeftSection from "../../components/main/left-section"
import MainContentSection from "../../components/main/content"
import RightSection from "../../components/main/rigth-section"

const MainPage = () => {
	const { t } = useTranslation()

	const { profile, isLoading } = useAuthUser()

	if (isLoading) return <Loader />

	return (
		<React.Fragment>
			<Helmet>
				<title>{t("main.title")}</title>
			</Helmet>
			<main className='flex-grow bg-[#E7E7E7]'>
				<div className='flex flex-col md:flex-row gap-4 my-8 mx-auto w-full md:container lg:w-[1170px]'>
					<LeftSection profile={profile} />

					<MainContentSection />

					<RightSection profile={profile} />
				</div>
			</main>
		</React.Fragment>
	)
}

export default MainPage
