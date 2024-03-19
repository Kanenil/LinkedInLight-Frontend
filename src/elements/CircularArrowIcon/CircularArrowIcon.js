const CircularArrowIcon = ({className, style, ...props}) => {
    return (
        <svg className={className ? className : 'fill-[#7D88A4] h-8'} style={style} xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 15 14" {...props}>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M7.14244 0.571568C5.13101 0.571568 3.49244 1.53371 2.56601 2.45943C1.6353 3.39014 0.713867 4.99443 0.713867 7.00014C0.713867 9.01157 1.67601 10.6501 2.60172 11.5766C3.53244 12.5073 5.13672 13.4287 7.14244 13.4287C7.33188 13.4287 7.51356 13.3535 7.64751 13.2195C7.78147 13.0855 7.85672 12.9039 7.85672 12.7144C7.85672 12.525 7.78147 12.3433 7.64751 12.2093C7.51356 12.0754 7.33188 12.0001 7.14244 12.0001C5.57672 12.0001 4.32101 11.2759 3.61172 10.5666C2.89744 9.85228 2.14244 8.55943 2.14244 7.00014C2.14244 5.43443 2.86672 4.17871 3.57601 3.46943C4.2903 2.75514 5.58315 2.00014 7.14244 2.00014C8.70815 2.00014 9.96387 2.72443 10.6732 3.43371C11.2567 4.01728 11.8667 4.98585 12.071 6.17157L11.5174 5.72871C11.4447 5.66658 11.3602 5.6197 11.2689 5.59086C11.1777 5.56201 11.0816 5.55179 10.9864 5.56079C10.8911 5.5698 10.7986 5.59785 10.7144 5.64328C10.6302 5.68871 10.556 5.7506 10.4962 5.82526C10.4364 5.89993 10.3921 5.98585 10.3662 6.07793C10.3402 6.17002 10.333 6.26638 10.3449 6.36131C10.3569 6.45624 10.3878 6.54779 10.4359 6.63053C10.4839 6.71328 10.5481 6.78553 10.6246 6.843L12.4103 8.27157C12.5475 8.38149 12.7204 8.43695 12.896 8.42733C13.0715 8.41771 13.2374 8.34368 13.3617 8.21943L14.7903 6.79085C14.9204 6.65614 14.9924 6.47571 14.9908 6.28842C14.9891 6.10114 14.914 5.92199 14.7816 5.78956C14.6492 5.65712 14.47 5.582 14.2827 5.58037C14.0954 5.57875 13.915 5.65074 13.7803 5.78085L13.5003 6.06014C13.2624 4.48014 12.4603 3.20085 11.6832 2.42371C10.7524 1.493 9.14815 0.571568 7.14244 0.571568Z"
            />
        </svg>
    )
}
export default CircularArrowIcon;