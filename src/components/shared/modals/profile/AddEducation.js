import ModalHeader from "../ModalHeader";
import React, {useEffect, useState} from "react";
import TextDown from "../../../../elements/shared/TextDown";
import ConditionalWrapper from "../../../../elements/shared/ConditionalWrapper";
import useOverflow from "../../../../hooks/overflow";
import FormSelector from "../../forms/FormSelector";
import {getDateTime, getLongMonth, getMonths, getYears} from "../../../../utils/date";
import PrimaryButton from "../../../../elements/buttons/PrimaryButton";
import {profileService} from "../../../../services/profileService";

const SCHOOLS_STORE = "SAVED-SCHOOLS"
const DEGREES_STORE = "SAVED-DEGREES"
const FIELD_STORE = "SAVED-FIELDS"

const AddEducation = ({onClose, onSave, onChange, id}) => {
    const initValues = {
        school: JSON.parse(localStorage.getItem(SCHOOLS_STORE) || '[]'),
        degree: JSON.parse(localStorage.getItem(DEGREES_STORE) || '[]'),
        fieldOfStudy: JSON.parse(localStorage.getItem(FIELD_STORE) || '[]')
    }
    const months = getMonths();
    const years = getYears();
    const endYears = getYears(new Date(new Date().getFullYear() + 10, 1));

    const [options, setOptions] = useState({
        school: initValues.school,
        degree: initValues.degree,
        fieldOfStudy: initValues.fieldOfStudy,
    })
    const [values, setValues] = useState({
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
    })
    const [errors, setErrors] = useState({
        school: true,
        degree: true,
        fieldOfStudy: true,
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
        const startDate = getDateTime(1, values.startDateMonth, values.startDateYear)
        const endDate = getDateTime(1, values.endDateMonth, values.endDateYear)

        if(startDate && endDate && startDate > endDate) {
            setErrors(values => {
                return {
                    ...values,
                    endDate: "End date can’t be earlier than start date"
                }
            })
            return;
        }

        if(!values.endDateYear && values.endDateMonth) {
            setErrors({
                ...errors,
                endDate: "Please enter a year"
            })
        } else if (values.endDateYear && !values.endDateMonth) {
            setErrors({
                ...errors,
                endDate: "Please enter a month"
            })
        } else {
            setErrors(values => {
                return {
                    ...values,
                    endDate: null
                }
            })
        }

    }, [values.startDateYear, values.startDateMonth, values.endDateYear, values.endDateMonth])

    useEffect(() => {
        if (id) {
            profileService.getEducation().then(({data}) => {
                const education = data.filter(val => val.id === +id)?.[0];

                if (!education) {
                    onClose();
                    return;
                }

                const startDate = new Date(education.startDate);
                const endDate = education.endDate?new Date(education.endDate): null;

                setValues({
                    ...education,
                    startDateMonth: getLongMonth(startDate.getMonth()),
                    startDateYear: startDate.getFullYear(),
                    endDateMonth: endDate?getLongMonth(endDate.getMonth()):"",
                    endDateYear: endDate?endDate.getFullYear(): "",
                })

                setErrors({
                    school: false,
                    fieldOfStudy: false,
                    degree: false
                })
            })
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

        if (errors.field || errors.degree || errors.school || errors.startDate || errors.endDate || !checkStartDate()) {
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
            currentlyStudying: getDateTime(1, values.endDateMonth, values.endDateYear)? values.currentlyStudying: true
        }

        if (id) {
            await profileService.updateEducation(model, id);
        } else {
            await profileService.addEducation(model);
        }

        onSave();
    }

    const onRemoveClick = async () => {
        await profileService.removeEducation(id);

        onSave();
    }

    return (
        <div className="flex flex-col gap-2.5 py-5 px-8 w-[750px]"
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <ModalHeader title={id ? "Edit education" : "Add education"} onClose={onClose}/>

            <div id="container" ref={containerRef} className={`max-h-[60vh] overflow-x-hidden overflow-y-${isOverflow ? 'scroll' : 'hidden'}`}>
                <div className="flex flex-col gap-2.5" ref={contentRef}>
                    <h3 className="font-jost text-[#2D2A33] text-sm">Required fields are marked with *</h3>

                    <div className="pt-[5px] pb-[10px] pr-[20px] gap-[5px]">
                        <h1 className="font-jost text-[#2D2A33]">School *</h1>

                        <TextDown
                            className="mt-[5px]"
                            value={values.school}
                            options={options.school}
                            containerWidth={665}
                            placeHolder='ex: Boston University'
                            error={isSubmitted && errors['school']}
                            hasTools={false}
                            clearOnSelect={false}
                            onChange={(e) => handleChangeSelect(e, "school", SCHOOLS_STORE)}
                        />
                        <ConditionalWrapper condition={isSubmitted && errors['school']}>
                            <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                        </ConditionalWrapper>
                    </div>

                    <div className="pb-[10px] pr-[20px] gap-[5px]">
                        <h1 className="font-jost text-[#2D2A33]">Degree *</h1>

                        <TextDown
                            className="mt-[5px]"
                            value={values.degree}
                            options={options.degree}
                            containerWidth={665}
                            placeHolder="ex: Bachelor's"
                            error={isSubmitted && errors['degree']}
                            hasTools={false}
                            clearOnSelect={false}
                            onChange={(e) => handleChangeSelect(e, "degree", DEGREES_STORE)}
                        />
                        <ConditionalWrapper condition={isSubmitted && errors['degree']}>
                            <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                        </ConditionalWrapper>
                    </div>

                    <div className="pb-[10px] pr-[20px] gap-[5px]">
                        <h1 className="font-jost text-[#2D2A33]">Field of study *</h1>

                        <TextDown
                            className="mt-[5px]"
                            value={values.fieldOfStudy}
                            options={options.fieldOfStudy}
                            containerWidth={665}
                            placeHolder="ex: Business"
                            error={isSubmitted && errors['fieldOfStudy']}
                            hasTools={false}
                            clearOnSelect={false}
                            onChange={(e) => handleChangeSelect(e, "fieldOfStudy", FIELD_STORE)}
                        />
                        <ConditionalWrapper condition={isSubmitted && errors['fieldOfStudy']}>
                            <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                        </ConditionalWrapper>
                    </div>

                    <div className="pb-[10px] pr-[20px] gap-[5px]">
                        <h1 className="font-jost text-[#2D2A33]">Start date</h1>

                        <div className="flex flex-row gap-2.5 w-full">
                            <FormSelector
                                name="startDateMonth"
                                title="Month"
                                value={values.startDateMonth}
                                handleChange={e => {
                                    setValues({
                                        ...values,
                                        startDateMonth: e.target.value
                                    })

                                    setErrors({
                                        ...errors,
                                        startDate: !values.startDateYear ?"Please enter a year": null
                                    })

                                    onChange();
                                }}
                                margin="w-full"
                                options={months}
                            />

                            <FormSelector
                                name="startDateYear"
                                title="Year"
                                value={values.startDateYear}
                                handleChange={e => {
                                    setValues({
                                        ...values,
                                        startDateYear: e.target.value
                                    })

                                    setErrors({
                                        ...errors,
                                        startDate: !values.startDateMonth ?"Please enter a month": null
                                    })

                                    onChange();
                                }}
                                margin="w-full"
                                options={years}
                            />
                        </div>

                        <ConditionalWrapper condition={errors['startDate']}>
                            <h3 className="mt-2 text-[#9E0F20] text-xs">{errors['startDate']}</h3>
                        </ConditionalWrapper>
                    </div>

                    <div className="pb-[10px] pr-[20px] gap-[5px]">
                        <h1 className="font-jost text-[#2D2A33]">End date (or expected)</h1>

                        <div className="flex flex-row gap-2.5 w-full">
                            <FormSelector
                                name="endDateMonth"
                                title="Month"
                                value={values.endDateMonth}
                                handleChange={e => {
                                    setValues({
                                        ...values,
                                        endDateMonth: e.target.value
                                    })

                                    if(!values.endDateYear) {
                                        setErrors({
                                            ...errors,
                                            endDate: "Please enter a year"
                                        })
                                    }

                                    onChange();
                                }}
                                margin="w-full"
                                options={months}
                            />

                            <FormSelector
                                name="endDateYear"
                                title="Year"
                                value={values.endDateYear}
                                handleChange={e => {
                                    setValues({
                                        ...values,
                                        endDateYear: e.target.value
                                    })
                                }}
                                margin="w-full"
                                options={endYears}
                            />
                        </div>

                        <ConditionalWrapper condition={errors['endDate']}>
                            <h3 className="mt-2 text-[#9E0F20] text-xs">{errors['endDate']}</h3>
                        </ConditionalWrapper>
                    </div>

                    <div className="pb-[10px] pr-[20px] gap-[5px]">
                        <label
                            className="flex items-center cursor-pointer select-none"
                            htmlFor="currentlyStudying">
                            <div className="relative">
                                <input name="currentlyStudying"
                                       checked={values.currentlyStudying}
                                       onChange={e => {
                                           setValues({
                                               ...values,
                                               currentlyStudying: e.target.checked
                                           })
                                           onChange();
                                       }}
                                       className="hidden"
                                       type="checkbox"
                                       id="currentlyStudying"/>
                                <div
                                    className="box flex items-center justify-center w-[20px] h-[20px] rounded-sm border border-[#2D2A33] mr-2">
                                        <span className={values.currentlyStudying === false ? "opacity-0" : ""}>
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
                                I am currently studying
                            </span>
                        </label>
                    </div>

                    <div className="pb-[10px] pr-[20px] gap-[5px]">
                        <h1 className="font-jost text-[#2D2A33]">Grade</h1>

                        <input
                            value={values.grade}
                            onChange={e => {
                                setValues({
                                    ...values,
                                    grade: e.target.value
                                })
                                onChange();
                            }}
                            className="w-full rounded-[4px] border-[0.5px] border-[#556DA9] py-[5px] px-2.5 text-[#7D7D7D] text-sm"
                        />
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
                </div>
            </div>

            <div className="flex justify-end pt-2.5 pb-1 gap-5 border-t-[0.5px] border-[#24459A80]">
                <ConditionalWrapper condition={id}>
                    <button onClick={onRemoveClick} className="mr-auto text-[#24459A] font-medium hover:underline">
                        Remove education
                    </button>
                </ConditionalWrapper>

                <PrimaryButton onClick={onSaveClick}>
                    Save
                </PrimaryButton>
            </div>
        </div>
    )
}
export default AddEducation;