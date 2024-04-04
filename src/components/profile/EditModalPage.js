import React, {useEffect, useState} from 'react'
import ConfirmationModal from "../shared/modals/ConfirmationModal";
import {useQueryClient} from "@tanstack/react-query";
import {modals} from "../../constants/modals";

const EditModalPage = ({editModal, id}) => {
    const [selected, setSelected] = useState(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        setSelected(modals.find(page => page.route.includes(editModal)))
    }, [editModal])

    return (
        <React.Fragment>
            {
                selected && (
                    <ConfirmationModal
                        key={`modal-${selected.route[0]}`}
                        isOpen={true}
                        onSaveCallback={() => queryClient.invalidateQueries(selected.route)}
                        children={selected.children}
                        id={id}
                        isBackground={editModal === "background"}
                    />
                )
            }
        </React.Fragment>
    )
}
export default EditModalPage;