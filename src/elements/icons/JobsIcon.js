const JobsIcon = ({className, ...props}) => {
    return (
        <svg className={className ? className : 'fill-[#2D2A33] h-5'} xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 21 21" {...props}>
            <path
                d="M16.3 3.83333H15.3833C15.1899 2.89284 14.6782 2.04779 13.9344 1.4406C13.1906 0.833408 12.2602 0.501212 11.3 0.5L9.63334 0.5C8.67317 0.501212 7.74277 0.833408 6.99897 1.4406C6.25516 2.04779 5.74342 2.89284 5.55001 3.83333H4.63334C3.52868 3.83466 2.46964 4.27407 1.68852 5.05518C0.90741 5.8363 0.467998 6.89534 0.466675 8L0.466675 16.3333C0.467998 17.438 0.90741 18.497 1.68852 19.2782C2.46964 20.0593 3.52868 20.4987 4.63334 20.5H16.3C17.4047 20.4987 18.4637 20.0593 19.2448 19.2782C20.0259 18.497 20.4654 17.438 20.4667 16.3333V8C20.4654 6.89534 20.0259 5.8363 19.2448 5.05518C18.4637 4.27407 17.4047 3.83466 16.3 3.83333ZM9.63334 2.16667H11.3C11.8152 2.1688 12.3172 2.33007 12.7373 2.62841C13.1573 2.92674 13.4749 3.34758 13.6467 3.83333H7.28667C7.45841 3.34758 7.77603 2.92674 8.19609 2.62841C8.61615 2.33007 9.11812 2.1688 9.63334 2.16667ZM4.63334 5.5H16.3C16.963 5.5 17.5989 5.76339 18.0678 6.23223C18.5366 6.70107 18.8 7.33696 18.8 8V10.5H2.13334V8C2.13334 7.33696 2.39673 6.70107 2.86557 6.23223C3.33442 5.76339 3.9703 5.5 4.63334 5.5ZM16.3 18.8333H4.63334C3.9703 18.8333 3.33442 18.5699 2.86557 18.1011C2.39673 17.6323 2.13334 16.9964 2.13334 16.3333V12.1667H9.63334V13C9.63334 13.221 9.72114 13.433 9.87742 13.5893C10.0337 13.7455 10.2457 13.8333 10.4667 13.8333C10.6877 13.8333 10.8996 13.7455 11.0559 13.5893C11.2122 13.433 11.3 13.221 11.3 13V12.1667H18.8V16.3333C18.8 16.9964 18.5366 17.6323 18.0678 18.1011C17.5989 18.5699 16.963 18.8333 16.3 18.8333Z"
            />
        </svg>
    )
}
export default JobsIcon;