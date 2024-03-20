const ChevronLeftIcon = ({className, style, ...props}) => {
    return (
        <svg className={className ? className : 'fill-[#24459A] h-8'} style={style} xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 14 24" {...props}>
            <path
                d="M13.6875 1.10118V3.29845C13.6875 3.44786 13.6234 3.58849 13.5183 3.67638L3.47974 11.9996L13.5183 20.3229C13.6234 20.4108 13.6875 20.5514 13.6875 20.7008V22.8981C13.6875 23.0885 13.4978 23.1998 13.3619 23.0885L0.900879 12.7584C0.449707 12.3834 0.449707 11.6158 0.900879 11.2438L13.3619 0.913685C13.4978 0.799427 13.6875 0.910755 13.6875 1.10118Z"
            />
        </svg>
    )
}
export default ChevronLeftIcon;