import Search from "../modals/search/Search";
import Modal from "../modals/Modal";
import React from "react";
import {useHeaderContext} from "../../../providers/HeaderProvider";
import Show from "../../../elements/shared/Show";
import StartCompany from "../modals/company/StartCompany";
import classNames from "classnames";

const HeaderModal = () => {
    const {modalRef, ref, isComponentVisible, setIsComponentVisible, search, modal} = useHeaderContext();

    const style = {
        left: (modal === 'search'?Math.round(ref.current?.getBoundingClientRect().left): window.innerWidth - 593)
    }

    return (
        <Modal isOpen={isComponentVisible} position={classNames({
            'mt-16': modal === 'search',
            'mt-14': modal === 'company',
        })}
               style={style}
               isFixed={true}
               onClose={() => setIsComponentVisible(false)}>
            <Show>
                <Show.When isTrue={modal === 'search'}>
                    <Search ref={modalRef} search={search} setIsComponentVisible={setIsComponentVisible}/>
                </Show.When>

                <Show.Else>
                    <StartCompany ref={modalRef} setIsComponentVisible={setIsComponentVisible}/>
                </Show.Else>
            </Show>

        </Modal>
    )
}
export default HeaderModal;