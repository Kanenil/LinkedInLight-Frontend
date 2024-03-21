import React from "react";

const PrimaryButton = ({ className, onClick, children, ...props }) => {
    return (
        <button
            className={`font-jost py-[5px] px-[20px] rounded-full bg-[#24459A] hover:border-[#2D2A33] border-[1.5px] hover:border-[1.5px] text-white transition duration-300 ease-in-out text-sm ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
export default PrimaryButton;