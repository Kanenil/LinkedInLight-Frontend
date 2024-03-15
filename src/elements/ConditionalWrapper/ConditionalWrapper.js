const ConditionalWrapper = ({ condition, children }) => {
    return condition ? children : null;
};

export default ConditionalWrapper;