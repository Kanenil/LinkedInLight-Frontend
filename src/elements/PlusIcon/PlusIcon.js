const PlusIcon = ({className, ...props}) => {
    return (
        <svg className={className ? className : 'fill-[#556DA9] h-2'} xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 8 9" {...props}>
            <path d="M7.30957 3.73096V5.00537H0V3.73096H7.30957ZM4.33594 0.618164V8.38184H2.98096V0.618164H4.33594Z"
            />
        </svg>
    )
}
export default PlusIcon