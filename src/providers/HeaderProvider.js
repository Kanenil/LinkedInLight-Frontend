import { createContext, useContext, useRef, useState } from "react"
import useComponentVisible from "../hooks/useComponentVisible"
import { useSearchParams } from "react-router-dom"

export const HeaderContext = createContext({})

const HeaderProvider = ({ children }) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const modalRef = useRef()
	const companyRef = useRef()
	const { ref, isComponentVisible, setIsComponentVisible } =
		useComponentVisible(false, false, target => {
			if (
				!modalRef.current?.contains(target) &&
				!companyRef.current?.contains(target)
			)
				setIsComponentVisible(false)
		})
	const [search, setSearch] = useState(searchParams.get("search") ?? "")
	const [modal, setModal] = useState(null)

	const onFocus = () => {
		setModal("search")
		setIsComponentVisible(true)
	}

	return (
		<HeaderContext.Provider
			value={{
				modalRef,
				ref,
				isComponentVisible,
				setIsComponentVisible,
				search,
				setSearch: (value, newSearchParams) => {
					setSearch(value)
					searchParams.set("search", value)
					setSearchParams(newSearchParams || searchParams)
				},
				onFocus,
				setModal,
				modal,
				companyRef,
			}}
		>
			{children}
		</HeaderContext.Provider>
	)
}

export const useHeaderContext = () => useContext(HeaderContext)

export default HeaderProvider
