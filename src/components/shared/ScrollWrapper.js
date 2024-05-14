import classNames from "classnames"
import useOverflow from "../../hooks/useOverflow"

const ScrollWrapper = ({
	children,
	maxHeight = "70vh",
	className,
	containerClassName,
	...props
}) => {
	const { containerRef, contentRef } = useOverflow()

	return (
		<div
			ref={containerRef}
			className={classNames("flex flex-col", containerClassName)}
			{...props}
		>
			<div
				ref={contentRef}
				className={classNames(
					className,
					"overflow-y-auto",
					maxHeight && `h-[${maxHeight}]`,
				)}
			>
				{children}
			</div>
		</div>
	)
}
export default ScrollWrapper
