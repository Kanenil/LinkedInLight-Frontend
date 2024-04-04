import React from 'react'
import ConfirmationModal from "../shared/modals/ConfirmationModal";
import {useQueryClient} from "@tanstack/react-query";
import {modals} from "../../constants/modals";

const EditModalPage = ({editModal, id}) => {
    const queryClient = useQueryClient();

    return (
        <React.Fragment>
            {
                modals
                    .filter(modal => modal.route.includes(editModal))
                    .map(modal =>
                        <ConfirmationModal
                            key={`modal-${modal.route[0]}`}
                            isOpen={true}
                            onSaveCallback={() => queryClient.invalidateQueries(modal.route)}
                            children={modal.children}
                            id={id}
                            isBackground={editModal === "background"}
                        />
                    )
            }
        </React.Fragment>
    )
}
export default EditModalPage;