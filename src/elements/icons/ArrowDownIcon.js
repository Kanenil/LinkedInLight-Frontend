const ArrowDownIcon = ({className, ...props}) => {
    return (
        <svg className={className ? className : "fill-white"} viewBox="0 0 18 8"
             xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M17.7188 0.5H15.961C15.8415 0.5 15.729 0.53418 15.6586 0.590234L9.00005 5.94414L2.34146 0.590234C2.27115 0.53418 2.15865 0.5 2.03912 0.5H0.281303C0.128959 0.5 0.0398964 0.601172 0.128959 0.673633L8.39302 7.31953C8.69302 7.56016 9.30709 7.56016 9.60474 7.31953L17.8688 0.673633C17.9602 0.601172 17.8711 0.5 17.7188 0.5Z"
            />
        </svg>
    );
};
export default ArrowDownIcon;
