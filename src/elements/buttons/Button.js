const ButtonVariant1 = ({children, className, ...props}) => {
    return (
        <button
            className={`bg-[#24459A] rounded-full py-1.5 px-6 font-jost text-white text-sm hover:bg-[#112861] transition duration-500 ease-in-out ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export {ButtonVariant1}