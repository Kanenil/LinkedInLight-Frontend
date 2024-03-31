import useForm from "../../../../hooks/useForm";
import React, {useEffect} from "react";
import {getDateTime, getLongMonth} from "../../../../utils/date";
import {recommendedProfileService} from "../../../../services/recommendedProfileService";
import ModalCheckFormGroup from "../../forms/ModalCheckFormGroup";
import StartEndDateForm from "../../forms/StartEndDateForm";
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup";
import ModalInputFormGroup from "../../forms/ModalInputFormGroup";
import EditModalForm from "../../forms/EditModalForm";

const AddProject = ({onClose, onSave, onChange, id}) => {
    const initialValues = {
        options: {},
        values: {
            name: '',
            description: '',
            associatedWith: '',
            startDateYear: '',
            startDateMonth: '',
            endDateYear: '',
            endDateMonth: '',
            currentlyWorking: false,
            projectContributors: []
        },
        errors: {
            name: true,
            endDate: null,
            startDate: null,
        },
    };
    const {
        values,
        errors,
        isSubmitted,
        onChangeInput,
        onSubmit,
        setErrors,
        setValues,
        setIsSubmitted
    } = useForm(initialValues, onChange);

    useEffect(() => {
        if (id) {
            recommendedProfileService.getProject(id).then(({data}) => {
                const startDate = new Date(data.startDate);
                const endDate = data.endDate ? new Date(data.endDate) : null;

                setValues({
                    ...data,
                    startDateMonth: getLongMonth(startDate.getMonth()),
                    startDateYear: startDate.getFullYear(),
                    endDateMonth: endDate ? getLongMonth(endDate.getMonth()) : "",
                    endDateYear: endDate ? endDate.getFullYear() : "",
                })

                setErrors({
                    name: false
                })
            }).catch(() => onClose())
        }
    }, [id])

    const onSaveClick = async () => {
        let savedErrors = {
            startDate: !values.startDateYear || !values.startDateMonth? "This field is required": null,
            endDate: (!values.endDateYear || !values.endDateMonth) && !values.currentlyWorking? "This field is required": null
        }

        if(Object.values(savedErrors).some(error => error)) {
            setErrors({
                ...errors,
                ...savedErrors
            })
            setIsSubmitted(true);
            return;
        }

        const model = {
            id: id ?? 0,
            name: values.name,
            associatedWith: values.associatedWith,
            startDate: getDateTime(1, values.startDateMonth, values.startDateYear),
            endDate: getDateTime(1, values.endDateMonth, values.endDateYear),
            currentlyWorking: getDateTime(1, values.endDateMonth, values.endDateYear) ? values.currentlyWorking : true,
            description: values.description,
            applicationUserId: '',
            projectContributors: []
        }

        if (id) {
            await recommendedProfileService.updateProject(model, id);
        } else {
            await recommendedProfileService.addProject(model);
        }

        onSave();
    }

    const onRemoveClick = async () => {
        await recommendedProfileService.removeProject(id);

        onSave();
    }

    return (
        <EditModalForm
            onSubmit={() => onSubmit(onSaveClick)}
            onClose={onClose}
            onRemove={onRemoveClick}
            isEdit={id ?? false}
            header={id ? "Edit project" : "Add project"}
            removeTitle="project"
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
                title="Associated with"
                name="associatedWith"
                type="text"
                value={values.associatedWith}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
            />

            <ModalTextareaFormGroup
                title="Description"
                name="description"
                className="pb-[10px] pr-[20px] gap-[5px]"
                onChange={onChangeInput}
                value={values.description}
                rows={7}
            />

            <ModalCheckFormGroup
                className="pb-[10px] pr-[20px] gap-[5px]"
                name="currentlyWorking"
                onChange={onChangeInput}
                value={values.currentlyWorking}
                title="I am currently working on this project"
            />

            <StartEndDateForm
                values={values}
                setValues={setValues}
                setErrors={setErrors}
                errors={errors}
                onChange={onChange}
                endTitle="End date"
                isEndDateDisabled={values.currentlyWorking}
            />
        </EditModalForm>
    )
}
export default AddProject;