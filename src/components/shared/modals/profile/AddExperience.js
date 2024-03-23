import {getDateTime, getLongMonth} from "../../../../utils/date";
import React, {useEffect, useState} from "react";
import useOverflow from "../../../../hooks/overflow";
import {profileService} from "../../../../services/profileService";
import ModalHeader from "../ModalHeader";
import TextDown from "../../../../elements/shared/TextDown";
import ConditionalWrapper from "../../../../elements/shared/ConditionalWrapper";
import PrimaryButton from "../../../../elements/buttons/PrimaryButton";
import StartEndDateForm from "../../../profile/education/StartEndDateForm";

const TITLES_STORE = "SAVED-TITLES"
const COMPANIES_STORE = "SAVED-COMPANIES"
const INDUSTRIES_STORE = "SAVED-INDUSTRIES"

const AddExperience = ({onClose, onSave, onChange, id}) => {
    const initValues = {
        title: JSON.parse(localStorage.getItem(TITLES_STORE) || '[]'),
        companyName: JSON.parse(localStorage.getItem(COMPANIES_STORE) || '[]'),
        industry: JSON.parse(localStorage.getItem(INDUSTRIES_STORE) || '[]'),
    }

    const [options, setOptions] = useState({
        title: initValues.title,
        companyName: initValues.companyName,
        industry: initValues.industry
    })
    const [values, setValues] = useState({
        title: "",
        companyName: "",
        startDateYear: "",
        startDateMonth: "",
        endDateYear: "",
        endDateMonth: "",
        description: "",
        profileHeadline: "",
        currentlyWorking: false,
        industry: ""
    })
    const [errors, setErrors] = useState({
        title: true,
        companyName: true,
        industry: true,
        endDate: null,
        startDate: null
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { isOverflow, containerRef, contentRef } = useOverflow();

    const handleChangeSelect = (e, field, store) => {
        onChange();
        setValues({
            ...values,
            [field]: e.label
        });
        setErrors({
            ...errors,
            [field]: false
        })

        const saveInStorage = (arr) => {
            localStorage.setItem(store, JSON.stringify(arr));
            setOptions({
                ...options,
                [field]: arr
            });
        }

        if (options[field].length === 0) {
            saveInStorage([e]);
        }

        if (initValues[field].length > 0 && initValues[field].filter(
            (option) =>
                option.label.toLowerCase() === e.label.toLowerCase()).length === 0) {
            saveInStorage([...initValues[field], e]);
        }
    }

    useEffect(() => {
        if (id) {
            profileService.getExperience(id).then(({data}) => {
                const experience = data;

                const startDate = new Date(experience.startDate);
                const endDate = experience.endDate?new Date(experience.endDate): null;

                setValues({
                    ...experience,
                    startDateMonth: getLongMonth(startDate.getMonth()),
                    startDateYear: startDate.getFullYear(),
                    endDateMonth: endDate?getLongMonth(endDate.getMonth()):"",
                    endDateYear: endDate?endDate.getFullYear(): "",
                    industry: experience.industry.name
                })

                setErrors({
                    title: false,
                    companyName: false,
                    industry: false
                })
            }).catch(() => onClose())
        }
    }, [id])

    const onSaveClick = async () => {
        const checkStartDate = () => {
            if(!values.startDateYear || !values.startDateMonth) {
                setErrors({
                    ...errors,
                    startDate: "This field is required"
                })
                return false;
            }
            return true;
        }

        if (errors.title || errors.companyName || errors.startDate || errors.endDate || !checkStartDate()) {
            setIsSubmitted(true);
            return;
        }

        const model = {
            id: id ?? 0,
            title: values.title,
            companyName: values.companyName,
            startDate: getDateTime(1, values.startDateMonth, values.startDateYear),
            endDate: getDateTime(1, values.endDateMonth, values.endDateYear),
            currentlyWorking: getDateTime(1, values.endDateMonth, values.endDateYear)? values.currentlyStudying: true,
            description: values.description,
            profileHeadline: values.profileHeadline,
            industry: {
                id: 0,
                name: values.industry
            }
        }

        if (id) {
            await profileService.updateExperience(model, id);
        } else {
            await profileService.addExperience(model);
        }

        onSave();
    }

    const onRemoveClick = async () => {
        await profileService.removeExperience(id);

        onSave();
    }

    return (
        <div className="flex flex-col gap-2.5 py-5 px-8 w-[750px]"
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <ModalHeader title={id ? "Edit experience" : "Add experience"} onClose={onClose}/>

            <div id="container" ref={containerRef} className={`max-h-[60vh] overflow-x-hidden overflow-y-${isOverflow ? 'scroll' : 'hidden'}`}>
                <div className="flex flex-col gap-2.5" ref={contentRef}>
                    <h3 className="font-jost text-[#2D2A33] text-sm">Required fields are marked with *</h3>

                    <div className="pt-[5px] pb-[10px] pr-[20px] gap-[5px]">
                        <h1 className="font-jost text-[#2D2A33]">Title *</h1>

                        <TextDown
                            className="mt-[5px]"
                            value={values.title}
                            options={options.title}
                            containerWidth={665}
                            placeHolder='ex: Retail Sales Manager'
                            error={isSubmitted && errors['title']}
                            hasTools={false}
                            clearOnSelect={false}
                            onChange={(e) => handleChangeSelect(e, "title", TITLES_STORE)}
                        />
                        <ConditionalWrapper condition={isSubmitted && errors['title']}>
                            <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                        </ConditionalWrapper>
                    </div>

                    <div className="pb-[10px] pr-[20px] gap-[5px]">
                        <h1 className="font-jost text-[#2D2A33]">Company name *</h1>

                        <TextDown
                            className="mt-[5px]"
                            value={values.companyName}
                            options={options.companyName}
                            containerWidth={665}
                            placeHolder="ex: Microsoft"
                            error={isSubmitted && errors['companyName']}
                            hasTools={false}
                            clearOnSelect={false}
                            onChange={(e) => handleChangeSelect(e, "companyName", COMPANIES_STORE)}
                        />
                        <ConditionalWrapper condition={isSubmitted && errors['companyName']}>
                            <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                        </ConditionalWrapper>
                    </div>

                    <div className="pb-[10px] pr-[20px] gap-[5px]">
                        <label
                            className="flex items-center cursor-pointer select-none"
                            htmlFor="currentlyWorking">
                            <div className="relative">
                                <input name="currentlyWorking"
                                       checked={values.currentlyWorking}
                                       onChange={e => {
                                           setValues({
                                               ...values,
                                               currentlyWorking: e.target.checked
                                           })
                                           onChange();
                                       }}
                                       className="hidden"
                                       type="checkbox"
                                       id="currentlyWorking"/>
                                <div
                                    className="box flex items-center justify-center w-[20px] h-[20px] rounded-sm border border-[#2D2A33] mr-2">
                                        <span className={values.currentlyWorking === false ? "opacity-0" : ""}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 className="ml-1 mb-1"
                                                 viewBox="0 0 15 16" fill="none">
                                                <path
                                                    d="M6.84173 15.9998C6.79635 15.9998 6.75147 15.9885 6.7099 15.9664C6.66833 15.9444 6.63098 15.9122 6.60018 15.8719L0.0873947 7.34121C0.0439788 7.28433 0.0151968 7.21337 0.00457124 7.137C-0.00605429 7.06063 0.00193752 6.98216 0.0275687 6.9112C0.0531998 6.84025 0.0953585 6.77988 0.148885 6.73748C0.202411 6.69509 0.264983 6.67251 0.328943 6.6725H3.46384C3.51091 6.67251 3.55743 6.68474 3.60026 6.70837C3.64309 6.73201 3.68124 6.76648 3.71213 6.80949L5.88873 9.84167C6.12396 9.2328 6.57933 8.21899 7.37841 6.98363C8.55974 5.15733 10.7571 2.47141 14.5164 0.0467428C14.5891 -0.000110954 14.6736 -0.0122714 14.7533 0.0126629C14.833 0.0375972 14.9021 0.0978135 14.947 0.181422C14.9918 0.26503 15.0091 0.365952 14.9955 0.46426C14.9818 0.562568 14.9383 0.651115 14.8733 0.712418C14.859 0.726001 13.4095 2.10818 11.7413 4.63987C10.2061 6.96965 8.16519 10.7792 7.16094 15.6973C7.1433 15.7837 7.10227 15.8604 7.04439 15.9153C6.98652 15.9702 6.91523 15.9998 6.84173 15.9998Z"
                                                    fill="#24459A"/>
                                            </svg>
                                        </span>
                                </div>
                            </div>
                            <span className="text-sm text-[#7D7D7D]">
                                I am currently working in this role
                            </span>
                        </label>
                    </div>

                    <StartEndDateForm
                        values={values}
                        setValues={setValues}
                        setErrors={setErrors}
                        errors={errors}
                        onChange={onChange}
                        isEndDateDisabled={values.currentlyWorking}
                    />

                    <div className="pt-[5px] pb-[10px] pr-[20px] gap-[5px]">
                        <h1 className="font-jost text-[#2D2A33]">Industry *</h1>

                        <TextDown
                            className="mt-[5px]"
                            value={values.industry}
                            options={options.industry}
                            containerWidth={665}
                            placeHolder='ex: Software Development'
                            error={isSubmitted && errors['industry']}
                            hasTools={false}
                            clearOnSelect={false}
                            onChange={(e) => handleChangeSelect(e, "industry", INDUSTRIES_STORE)}
                        />
                        <ConditionalWrapper condition={isSubmitted && errors['industry']}>
                            <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                        </ConditionalWrapper>
                    </div>

                    <div className="pb-[10px] pr-[20px] gap-[5px]">
                        <h1 className="font-jost text-[#2D2A33]">Description</h1>

                        <textarea
                            className="mt-[15px] resize-none w-full border-[0.5px] border-[#556DA9] rounded-lg text-sm font-jost font-light"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    description: e.target.value
                                })
                                onChange();
                            }}
                            value={values.description}
                            rows={7}
                        />
                    </div>

                    <div className="pb-[10px] pr-[20px] gap-[5px]">
                        <h1 className="font-jost text-[#2D2A33]">Profile headline</h1>

                        <input
                            value={values.profileHeadline}
                            onChange={e => {
                                setValues({
                                    ...values,
                                    profileHeadline: e.target.value
                                })
                                onChange();
                            }}
                            className="w-full rounded-[4px] border-[0.5px] border-[#556DA9] py-[5px] px-2.5 text-[#7D7D7D] text-sm"
                        />
                        <h3 className="font-jost text-[#2D2A33] text-sm font-light">Appears below your name at the top of the profile</h3>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-2.5 pb-1 gap-5 border-t-[0.5px] border-[#24459A80]">
                <ConditionalWrapper condition={id}>
                    <button onClick={onRemoveClick} className="mr-auto text-[#24459A] font-medium hover:underline">
                        Remove experience
                    </button>
                </ConditionalWrapper>

                <PrimaryButton onClick={onSaveClick}>
                    Save
                </PrimaryButton>
            </div>
        </div>
    )
}
export default AddExperience;