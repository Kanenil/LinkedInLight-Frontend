import useForm from "../../../../hooks/useForm";
import React, {useEffect} from "react";
import {getDateTime, getLongMonth} from "../../../../utils/date";
import AdditionalProfileService from "../../../../services/additionalProfileService";
import ModalInputFormGroup from "../../forms/ModalInputFormGroup";
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup";
import ModalCheckFormGroup from "../../forms/ModalCheckFormGroup";
import StartEndDateForm from "../../forms/StartEndDateForm";
import EditModalForm from "../../forms/EditModalForm";

const AddVolunteerExperience = ({onClose, onSave, onChange, id}) => {
    const initialValues = {
        options: {},
        values: {
            organization: '',
            role: '',
            cause: '',
            startDateYear: '',
            startDateMonth: '',
            endDateYear: '',
            endDateMonth: '',
            currentlyVolunteering: false,
            description: ''
        },
        errors: {
            organization: true,
            role: true,
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
            AdditionalProfileService.getVolunteerExperience(id).then(({data}) => {
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
                    organization: false
                })
            }).catch(() => onClose())
        }
    }, [id])

    const onSaveClick = async () => {
        let savedErrors = {
            startDate: !values.startDateYear || !values.startDateMonth? "This field is required": null,
            endDate: (!values.endDateYear || !values.endDateMonth) && !values.currentlyVolunteering? "This field is required": null
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
            organization: values.organization,
            cause: values.cause,
            role: values.role,
            startDate: getDateTime(1, values.startDateMonth, values.startDateYear),
            endDate: getDateTime(1, values.endDateMonth, values.endDateYear) ?? new Date(),
            currentlyVolunteering: getDateTime(1, values.endDateMonth, values.endDateYear) ? values.currentlyVolunteering : true,
            description: values.description,
            applicationUserId: '',
        }

        if (id) {
            await AdditionalProfileService.updateVolunteerExperience(model, id);
        } else {
            await AdditionalProfileService.addVolunteerExperience(model);
        }

        onSave();
    }

    const onRemoveClick = async () => {
        await AdditionalProfileService.removeVolunteerExperience(id);

        onSave();
    }

    return (
        <EditModalForm
            onSubmit={() => onSubmit(onSaveClick)}
            onClose={onClose}
            onRemove={onRemoveClick}
            isEdit={id ?? false}
            header={id ? "Edit volunteer experience" : "Add volunteer experience"}
            removeTitle="volunteer experience"
        >
            <h3 className="font-jost text-[#2D2A33] text-sm">Required fields are marked with *</h3>

            <ModalInputFormGroup
                title="Organization *"
                name="organization"
                type="text"
                value={values.organization}
                error={errors.organization && isSubmitted}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalInputFormGroup
                title="Role *"
                name="role"
                type="text"
                value={values.role}
                error={errors.role && isSubmitted}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalInputFormGroup
                title="Cause"
                name="cause"
                type="text"
                value={values.cause}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
            />

            <ModalCheckFormGroup
                className="pb-[10px] pr-[20px] gap-[5px]"
                name="currentlyVolunteering"
                onChange={onChangeInput}
                value={values.currentlyVolunteering}
                title="I am currently volunteering in this role"
            />

            <StartEndDateForm
                values={values}
                setValues={setValues}
                setErrors={setErrors}
                errors={errors}
                onChange={onChange}
                endTitle="End date"
                isEndDateDisabled={values.currentlyVolunteering}
            />

            <ModalTextareaFormGroup
                title="Description"
                name="description"
                className="pb-[10px] pr-[20px] gap-[5px]"
                onChange={onChangeInput}
                value={values.description}
                rows={7}
            />
        </EditModalForm>
    )
}
export default AddVolunteerExperience;