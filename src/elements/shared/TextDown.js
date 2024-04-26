import React, { useEffect, useRef, useState } from "react"
import ChevronDownIcon from "../icons/ChevronDownIcon"
import useComponentVisible from "../../hooks/useComponentVisible"
import useOverflow from "../../hooks/useOverflow"
import ConditionalWrapper from "./ConditionalWrapper"
import Show from "./Show"
import useMobileDetector from "../../hooks/useMobileDetector"

const TextDown = ({
	placeHolder,
	value = null,
	options,
	clearOnSelect = true,
	isAbsolute = false,
	onEnterSelect = true,
	className = "",
	containerSizing = "py-[5px] px-2.5",
	containerClass = "rounded-[4px] border-[0.5px] border-[#B4BFDD]",
	onChange,
	error = false,
	hasTools = true,
	searchAble = true,
	containerHeightMax = 100,
	containerWidth = 272,
	item = null,
	searchFunc = null,
}) => {
	const { ref, isComponentVisible, setIsComponentVisible } =
		useComponentVisible(false)
	const [selectedValue, setSelectedValue] = useState()
	const [searchValue, setSearchValue] = useState("")
	const { isOverflow, containerRef, contentRef } = useOverflow()
	const searchRef = useRef()
	const inputRef = useRef()
	const { isMobile } = useMobileDetector()

	useEffect(() => {
		setSelectedValue(value ? { value, label: value } : null)
		setSearchValue(value || "")
	}, [value])

	useEffect(() => {
		if (!placeHolder) setSearchValue("")
		if (isComponentVisible && searchRef.current) {
			searchRef.current?.focus()
		}
	}, [isComponentVisible])

	const handleInputClick = e => {
		setIsComponentVisible(val => !val)
	}

	const getDisplay = () => {
		if (!selectedValue || selectedValue.length === 0) {
			return searchValue || placeHolder
		}
		return selectedValue.label
	}

	const onItemClick = option => {
		setSelectedValue(option)
		setIsComponentVisible(false)
		onChange(option)

		if (clearOnSelect) setSearchValue("")
	}

	const onSearch = e => {
		setSearchValue(e.target.value)
	}

	const getOptions = () => {
		if (!searchValue || !searchAble) {
			return options
		}

		return item
			? options.filter(searchFunc(searchValue.toLowerCase()))
			: options.filter(
					option =>
						option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0,
			  )
	}

	const handleKeyDown = event => {
		if (event.keyCode === 13 && onEnterSelect && searchValue.length > 0) {
			onItemClick({ label: searchValue, value: searchValue })
		}
	}

	const onBlur = e => {
		if (!ref.current.contains(e.relatedTarget) && onEnterSelect) {
			onItemClick(searchValue ? { label: searchValue, value: searchValue } : "")
		}
	}

	return (
		<div ref={ref} className={`relative ${className}`}>
			<ConditionalWrapper
				condition={
					(!isComponentVisible &&
						(!!searchValue || !!selectedValue || !!placeHolder)) ||
					!searchAble
				}
			>
				<div
					ref={inputRef}
					onClick={handleInputClick}
					className={`flex flex-row items-center w-full ${containerClass} ${containerSizing} ${
						error ? "border-[#9E0F20]" : ""
					}`}
				>
					<div className='font-jost text-sm text-[#7D88A4] cursor-pointer'>
						{getDisplay()}
					</div>

					<ConditionalWrapper condition={hasTools}>
						<ChevronDownIcon className='ml-auto w-3 fill-[#7D7D7D]' />
					</ConditionalWrapper>
				</div>
			</ConditionalWrapper>

			<div
				ref={inputRef}
				onClick={e => e.stopPropagation()}
				className={`flex flex-row items-center w-full overflow-hidden ${containerClass} ${
					error ? "border-[#9E0F20]" : ""
				} ${
					(isComponentVisible && searchAble) ||
					(!isComponentVisible &&
						!searchValue &&
						!placeHolder &&
						!selectedValue &&
						searchAble)
						? ""
						: "hidden"
				}`}
			>
				<input
					onClick={e => {
						e.stopPropagation()
						setIsComponentVisible(true)
					}}
					onChange={onSearch}
					onKeyDown={handleKeyDown}
					onBlur={onBlur}
					value={searchValue}
					ref={searchRef}
					className={`test w-full border-0 font-jost text-sm text-[#7D88A4] focus:border-[#24459A] focus:bg-[#F5F8FF] ${containerSizing}`}
				/>

				<ConditionalWrapper condition={hasTools}>
					<ChevronDownIcon
						onClick={handleInputClick}
						className='ml-auto w-3 mr-5 fill-[#7D7D7D]'
					/>
				</ConditionalWrapper>
			</div>

			<div
				id='container'
				ref={containerRef}
				className={`${
					isAbsolute ? "absolute z-50" : ""
				} bg-white mt-2 overflow-x-hidden overflow-y-scroll md:overflow-y-${
					isOverflow ? "scroll" : "hidden"
				} ${isComponentVisible && getOptions().length > 0 ? "" : "hidden"}`}
				style={{
					boxShadow: "0px 1px 6px 0px #00000040",
					maxHeight: `${containerHeightMax}px`,
					width: `${isMobile ? 310 : containerWidth}px`,
				}}
			>
				<div className='flex flex-col py-[5px] px-[20px]' ref={contentRef}>
					{getOptions().map((option, index) => (
						<Show key={`${option.id || option.value}-${index}`}>
							<Show.When isTrue={!!item}>
								{item &&
									React.cloneElement(item, {
										onClick: () => onItemClick(option),
										...option,
									})}
							</Show.When>

							<Show.Else>
								<button
									onClick={() => onItemClick(option)}
									type='button'
									className='cursor-pointer text-start active:font-medium py-1 px-2.5 font-jost text-[#2D2A33] font-sm font-light'
								>
									{option.label}
								</button>
							</Show.Else>
						</Show>
					))}
				</div>
			</div>
		</div>
	)
}
export default TextDown
