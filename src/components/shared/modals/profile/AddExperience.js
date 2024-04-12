import {getDateTime, getLongMonth} from "../../../../utils/date";
import React, {useEffect} from "react";
import ProfileService from "../../../../services/profileService";
import StartEndDateForm from "../../forms/StartEndDateForm";
import useForm from "../../../../hooks/useForm";
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup";
import ModalCheckFormGroup from "../../forms/ModalCheckFormGroup";
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup";
import ModalInputFormGroup from "../../forms/ModalInputFormGroup";
import EditModalForm from "../../forms/EditModalForm";
import {COMPANIES_STORE, TITLES_STORE} from "../../../../constants/stores";

const AddExperience = ({onClose, onSave, onChange, id}) => {
    const initialValues = {
        options: {
            title: JSON.parse(localStorage.getItem(TITLES_STORE) || '[]'),
            company: [],
            industry: []
        },
        values: {
            title: '',
            company: '',
            startDateYear: '',
            startDateMonth: '',
            endDateYear: '',
            endDateMonth: '',
            description: '',
            profileHeadline: '',
            currentlyWorking: false,
            industry: '',
        },
        errors: {
            title: true,
            company: true,
            industry: true,
            endDate: null,
            startDate: null,
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
        setIsSubmitted,
        setOptions
    } = useForm(initialValues, onChange);

    useEffect(() => {
        ProfileService.getIndustries().then(({data})=>{
            setOptions(prev => ({
                ...prev,
                industry: data.map(val => ({ value: val.id, label: val.name }))
            }))
        })
        ProfileService.getCompanies().then(({data})=>{
            setOptions(prev => ({
                ...prev,
                savedCompanies: data,
                company: data.map(val => ({ value: val.id, label: val.companyName }))
            }))
        })

        if (id) {
            ProfileService.getExperience(id).then(({data}) => {
                const experience = data;

                const startDate = new Date(experience.startDate);
                const endDate = experience.endDate ? new Date(experience.endDate) : null;

                setValues({
                    ...experience,
                    startDateMonth: getLongMonth(startDate.getMonth()),
                    startDateYear: startDate.getFullYear(),
                    endDateMonth: endDate ? getLongMonth(endDate.getMonth()) : "",
                    endDateYear: endDate ? endDate.getFullYear() : "",
                    industry: experience.industry.name,
                    company: experience.company.companyName
                })

                setErrors({
                    title: false,
                    company: false,
                    industry: false
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
            title: values.title,
            company: {
                ...options.savedCompanies.find(val => val.companyName === values.company)
            },
            startDate: getDateTime(1, values.startDateMonth, values.startDateYear),
            endDate: getDateTime(1, values.endDateMonth, values.endDateYear),
            currentlyWorking: getDateTime(1, values.endDateMonth, values.endDateYear) ? values.currentlyWorking : true,
            description: values.description,
            profileHeadline: values.profileHeadline,
            industry: {
                id: options.industry.find(val => val.label === values.industry).value,
                name: values.industry
            }
        }

        if (id) {
            await ProfileService.updateExperience(model, id);
        } else {
            await ProfileService.addExperience(model);
        }

        onSave();
    }

    const onRemoveClick = async () => {
        await ProfileService.removeExperience(id);

        onSave();
    }

    return (
        <EditModalForm
            onSubmit={() => onSubmit(onSaveClick)}
            onClose={onClose}
            onRemove={onRemoveClick}
            isEdit={id ?? false}
            header={id ? "Edit experience" : "Add experience"}
            removeTitle="experience"
        >
            <h3 className="font-jost text-[#2D2A33] text-sm">Required fields are marked with *</h3>

            <ModalSelectFormGroup
                className="pt-[5px] pb-[10px] pr-[20px] gap-[5px]"
                title="Title *"
                value={values.title}
                options={options.title}
                containerWidth={665}
                placeHolder="ex: Retail Sales Manager"
                error={isSubmitted && errors['title']}
                hasTools={false}
                clearOnSelect={false}
                onChange={(e) => handleChangeSelect(e, "title", TITLES_STORE)}
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalSelectFormGroup
                className="pt-[5px] pb-[10px] pr-[20px] gap-[5px]"
                title="Company *"
                value={values.company}
                options={options.company}
                containerWidth={665}
                placeHolder="ex: Microsoft"
                error={isSubmitted && errors['company']}
                hasTools={false}
                clearOnSelect={false}
                onChange={(e) => handleChangeSelect(e, "company")}
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalSelectFormGroup
                className="pt-[5px] pb-[10px] pr-[20px] gap-[5px]"
                title="Industry *"
                value={values.industry}
                options={options.industry}
                containerWidth={665}
                placeHolder="ex: Software Development"
                error={isSubmitted && errors['industry']}
                hasTools={false}
                onEnterSelect={false}
                clearOnSelect={false}
                onChange={(e) => handleChangeSelect(e, "industry")}
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalCheckFormGroup
                className="pb-[10px] pr-[20px] gap-[5px]"
                name="currentlyWorking"
                onChange={onChangeInput}
                value={values.currentlyWorking}
                title="I am currently working in this role"
            />

            <StartEndDateForm
                values={values}
                setValues={setValues}
                setErrors={setErrors}
                errors={errors}
                onChange={onChange}
                isEndDateDisabled={values.currentlyWorking}
            />

            <ModalTextareaFormGroup
                title="Description"
                name="description"
                className="pb-[10px] pr-[20px] gap-[5px]"
                onChange={onChangeInput}
                value={values.description}
                rows={7}
            />

            <ModalInputFormGroup
                title="Profile headline"
                name="profileHeadline"
                type="text"
                value={values.profileHeadline}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
            >
                <h3 className="font-jost text-[#2D2A33] text-sm font-light">
                    Appears below your name at the top of the profile
                </h3>
            </ModalInputFormGroup>
        </EditModalForm>
    )
}
export default AddExperience;