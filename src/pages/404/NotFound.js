import { Helmet } from "react-helmet-async"
import { Trans, useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import notFound from "../../assets/not-found.png"
import Button from "../../elements/buttons/Button"

const NotFound = () => {
	const { t } = useTranslation()
	const navigator = useNavigate()

	return (
		<>
			<Helmet>
				<title>{t("notFound.heading")}</title>
			</Helmet>
			<div class='flex items-center justify-center flex-grow bg-[#F7F7F7]'>
				<div className='flex flex-col justify-center items-center -mt-10 mx-4 font-jost'>
					<div className='relative'>
						<img src={notFound} alt='not-found' />
						<div className='absolute top-0 left-0 w-full h-full bg-transparent' />
					</div>

					<h1 className='text-3xl font-medium text-[#2D2A33] -mt-5'>
						{t("notFound.title")}
					</h1>
					<p className='text-lg text-center text-[#2D2A33] mt-2'>
						<Trans
							i18nKey='notFound.text'
							components={{ strong: <strong className='font-semibold' /> }}
						/>
					</p>
					<Button
						variant='primary'
						onClick={() => navigator("/j4y")}
						className='mt-8'
						rounded='full'
					>
						{t("notFound.link")}
					</Button>
				</div>
			</div>
		</>
	)
}
export default NotFound
