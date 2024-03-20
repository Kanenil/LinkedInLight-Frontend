const ChevronLeftIcon = ({className, style, ...props}) => {
    return (
        <svg className={className ? className : 'fill-[#7D7D7D] h-3'} style={style} xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 14 7" {...props}>
            <path
                d="M13.8531 0H12.4715C12.3775 0 12.2891 0.0341798 12.2339 0.0902345L7.00035 5.44414L1.76684 0.0902345C1.71158 0.0341798 1.62315 0 1.52921 0H0.147604C0.0278654 0 -0.0421358 0.101172 0.0278654 0.173633L6.52324 6.81953C6.75903 7.06016 7.24167 7.06016 7.47562 6.81953L13.971 0.173633C14.0428 0.101172 13.9728 0 13.8531 0Z"
            />
        </svg>
    )
}
export default ChevronLeftIcon;