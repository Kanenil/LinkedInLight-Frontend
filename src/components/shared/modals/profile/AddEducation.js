import React, {useEffect} from "react";
import {getDateTime, getLongMonth} from "../../../../utils/date";
import ProfileService from "../../../../services/profileService";
import StartEndDateForm from "../../forms/StartEndDateForm";
import useForm from "../../../../hooks/useForm";
import EditModalForm from "../../forms/EditModalForm";
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup";
import ModalCheckFormGroup from "../../forms/ModalCheckFormGroup";
import ModalInputFormGroup from "../../forms/ModalInputFormGroup";
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup";
import {DEGREES_STORE, FIELD_STORE, SCHOOLS_STORE} from "../../../../constants/stores";
import {useAlertContext} from "../../../../providers/AlertProvider";


const AddEducation = ({onClose, onSave, onChange, id}) => {
    const initialValues = {
        options: {
            school: JSON.parse(localStorage.getItem(SCHOOLS_STORE) || '[]'),
            degree: JSON.parse(localStorage.getItem(DEGREES_STORE) || '[]'),
            fieldOfStudy: JSON.parse(localStorage.getItem(FIELD_STORE) || '[]')
        },
        values: {
            school: "",
            degree: "",
            fieldOfStudy: "",
            startDateYear: "",
            startDateMonth: "",
            endDateYear: "",
            endDateMonth: "",
            grade: "",
            description: "",
            currentlyStudying: false,
        },
        errors: {
            school: true,
            degree: true,
            fieldOfStudy: true,
            endDate: null,
            startDate: null
        },
    };
    const {
        options,
        values,
        errors,
        isSubmitted,
        handleChangeSelect,
        onChangeInput,
        onSubmit,
        setErrors,
        setValues,
        setIsSubmitted
    } = useForm(initialValues, onChange);
    const {success} = useAlertContext();

    useEffect(() => {
        if (id) {
            ProfileService.getEducation(id).then(({data}) => {
                const education = data;

                const startDate = new Date(education.startDate);
                const endDate = education.endDate ? new Date(education.endDate) : null;

                setValues({
                    ...education,
                    startDateMonth: getLongMonth(startDate.getMonth()),
                    startDateYear: startDate.getFullYear(),
                    endDateMonth: endDate ? getLongMonth(endDate.getMonth()) : "",
                    endDateYear: endDate ? endDate.getFullYear() : "",
                })

                setErrors({
                    school: false,
                    fieldOfStudy: false,
                    degree: false
                })
            }).catch(() => onClose())
        }
    }, [id])

    const onSaveClick = async () => {
        if (!values.startDateYear || !values.startDateMonth) {
            setErrors({
                ...errors,
                startDate: "This field is required"
            })
            setIsSubmitted(true);
            return;
        }

        const model = {
            id: id ?? 0,
            school: values.school,
            degree: values.degree,
            fieldOfStudy: values.fieldOfStudy,
            startDate: getDateTime(1, values.startDateMonth, values.startDateYear),
            endDate: getDateTime(1, values.endDateMonth, values.endDateYear),
            grade: values.grade,
            description: values.description,
            currentlyStudying: getDateTime(1, values.endDateMonth, values.endDateYear) ? values.currentlyStudying : true
        }

        if (id) {
            await ProfileService.updateEducation(model, id);
        } else {
            await ProfileService.addEducation(model);
        }

        success('Education successfully saved.', 5);
        onSave();
    }

    const onRemoveClick = async () => {
        await ProfileService.removeEducation(id);
        success('Education successfully removed.', 5);

        onSave();
    }

    return (
        <EditModalForm
            onSubmit={() => onSubmit(onSaveClick)}
            onClose={onClose}
            onRemove={onRemoveClick}
            isEdit={id ?? false}
            header={id ? "Edit education" : "Add education"}
            removeTitle="education"
        >
            <h3 className="font-jost text-[#2D2A33] text-sm">Required fields are marked with *</h3>

            <ModalSelectFormGroup
                className="pt-[5px] pb-[10px] pr-[20px] gap-[5px]"
                title="School *"
                value={values.school}
                options={options.school}
                containerWidth={665}
                placeHolder="ex: Boston University"
                error={isSubmitted && errors['school']}
                hasTools={false}
                clearOnSelect={false}
                onChange={(e) => handleChangeSelect(e, "school", SCHOOLS_STORE)}
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalSelectFormGroup
                className="pt-[5px] pb-[10px] pr-[20px] gap-[5px]"
                title="Degree *"
                value={values.degree}
                options={options.degree}
                containerWidth={665}
                placeHolder="ex: Boston University"
                error={isSubmitted && errors['degree']}
                hasTools={false}
                clearOnSelect={false}
                onChange={(e) => handleChangeSelect(e, "degree", DEGREES_STORE)}
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalSelectFormGroup
                className="pt-[5px] pb-[10px] pr-[20px] gap-[5px]"
                title="Field of study *"
                value={values.fieldOfStudy}
                options={options.fieldOfStudy}
                containerWidth={665}
                placeHolder="ex: Business"
                error={isSubmitted && errors['fieldOfStudy']}
                hasTools={false}
                clearOnSelect={false}
                onChange={(e) => handleChangeSelect(e, "fieldOfStudy", FIELD_STORE)}
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <StartEndDateForm
                values={values}
                setValues={setValues}
                setErrors={setErrors}
                errors={errors}
                onChange={onChange}
                isEndDateDisabled={values.currentlyStudying}
            />

            <ModalCheckFormGroup
                className="pb-[10px] pr-[20px] gap-[5px]"
                name="currentlyStudying"
                onChange={onChangeInput}
                value={values.currentlyStudying}
                title="I am currently studying at this school"
            />

            <ModalInputFormGroup
                title="Grade"
                name="grade"
                type="text"
                value={values.grade}
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
        </EditModalForm>
    )
}
export default AddEducation;