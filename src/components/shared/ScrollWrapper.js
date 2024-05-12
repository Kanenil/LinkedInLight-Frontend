import classNames from "classnames"
import useOverflow from "../../hooks/useOverflow"

const ScrollWrapper = ({
	children,
	maxHeight = "70vh",
	className,
	...props
}) => {
	const { isOverflow, containerRef, contentRef } = useOverflow()

	return (
		<div
			ref={containerRef}
			className={classNames(
				"flex flex-col",
				isOverflow && "overflow-y-auto",
				maxHeight && `max-h-${maxHeight}`,
			)}
			{...props}
		>
			<div ref={contentRef} className={classNames(className)}>
				{children}
			</div>
		</div>
	)
}
export default ScrollWrapper
