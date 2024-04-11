import {createContext, useContext, useRef, useState} from "react";
import useComponentVisible from "../hooks/useComponentVisible";

export const HeaderContext = createContext({});

const HeaderProvider = ({children}) => {
    const modalRef = useRef();
    const companyRef = useRef();
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false, false, (target) => {
        if(!modalRef.current?.contains(target) && !companyRef.current?.contains(target))
            setIsComponentVisible(false);
    });
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(null);

    const onFocus = () => {
        setModal('search');
        setIsComponentVisible(true);
    }

    return (
        <HeaderContext.Provider
            value={{
                modalRef,
                ref,
                isComponentVisible,
                setIsComponentVisible,
                search,
                setSearch,
                onFocus,
                setModal,
                modal,
                companyRef
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
}

export const useHeaderContext = () => useContext(HeaderContext);

export default HeaderProvider;
