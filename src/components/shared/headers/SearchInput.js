import { useTranslation } from "react-i18next"
import { useDebounceCallback } from "usehooks-ts"
import React, { useEffect } from "react"
import LoopIcon from "../../../elements/icons/LoopIcon"
import { useHeaderContext } from "../../../providers/HeaderProvider"
import { useSearchParams } from "react-router-dom"

const SearchInput = () => {
	const { ref, onFocus, setIsComponentVisible, search, setSearch, setModal } =
		useHeaderContext()
	const { t } = useTranslation()
	const [searchParams] = useSearchParams()

	const debounced = useDebounceCallback(val => {
		setIsComponentVisible(true)
		setModal("search")
		setSearch(val)
	}, 200)

	useEffect(() => {
		if (ref.current) {
			const searchValue =
				search === searchParams.get("search")
					? search
					: searchParams.get("search")
			ref.current.value = searchValue
			setSearch(searchValue, searchParams)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref, searchParams.get("search")])

	return (
		<React.Fragment>
			<div className='flex-grow md:flex-grow-0 md:ml-10 my-auto relative'>
				<input
					type='text'
					placeholder={t("header.search")}
					className='border-[1px] border-[#2D2A33] rounded-xl w-full md:w-[300px] pl-10 text-xs'
					ref={ref}
					onChange={e => debounced(e.target.value)}
					onFocus={onFocus}
				/>

				<LoopIcon className='absolute left-4 top-2.5 fill-[#2D2A33] h-3' />
			</div>
		</React.Fragment>
	)
}
export default SearchInput
