import useForm from "../../../../hooks/useForm";
import React, {useEffect} from "react";
import RecommendedProfileService from "../../../../services/recommendedProfileService";
import ModalInputFormGroup from "../../forms/ModalInputFormGroup";
import EditModalForm from "../../forms/EditModalForm";
import {useAlertContext} from "../../../../providers/AlertProvider";

const AddCourse = ({onClose, onSave, onChange, id}) => {
    const initialValues = {
        options: {},
        values: {
            name: "",
            number: "",
            associatedWith: ""
        },
        errors: {
            name: true
        },
    };
    const {
        values,
        onChangeInput,
        onSubmit,
        setErrors,
        setValues,
        errors,
        isSubmitted
    } = useForm(initialValues, onChange);
    const {success} = useAlertContext();

    useEffect(() => {
        if (id) {
            RecommendedProfileService.getCourse(id).then(({data}) => {
                setValues({
                    ...data
                })
                setErrors({
                    name: false,
                })
            }).catch(() => onClose())
        }
    }, [id])

    const onSaveClick = async () => {
        const model = {
            id: id ?? 0,
            name: values.name,
            number: values.number,
            associatedWith: values.associatedWith,
            applicationUserId: ''
        }

        if (id) {
            await RecommendedProfileService.updateCourse(model, id);
        } else {
            await RecommendedProfileService.addCourse(model);
        }

        success('Course successfully saved.', 5);
        onSave();
    }

    const onRemoveClick = async () => {
        await RecommendedProfileService.removeCourse(id);
        success('Course successfully removed.', 5);

        onSave();
    }

    return (
        <EditModalForm
            onSubmit={(e) => onSubmit(e, onSaveClick)}
            onClose={onClose}
            onRemove={onRemoveClick}
            isEdit={id ?? false}
            header={id ? "Edit course" : "Add course"}
            removeTitle="course"
        >
            <h3 className="font-jost text-[#2D2A33] text-sm">Required fields are marked with *</h3>

            <ModalInputFormGroup
                title="Name *"
                name="name"
                type="text"
                value={values.name}
                error={errors.name && isSubmitted}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalInputFormGroup
                title="Number"
                name="number"
                type="text"
                value={values.number}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
            />

            <ModalInputFormGroup
                title="Associated with"
                name="associatedWith"
                type="text"
                value={values.associatedWith}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
            />
        </EditModalForm>
    )
}
export default AddCourse;