import React, {useState} from "react";
import ModalHeader from "../ModalHeader";
import TextDown from "../../../../elements/shared/TextDown";
import PrimaryButton from "../../../../elements/buttons/PrimaryButton";
import ConditionalWrapper from "../../../../elements/shared/ConditionalWrapper";
import {profileService} from "../../../../services/profileService";

const LANGUAGES_STORE = "SAVED-LANGUAGES"

const AddNewLanguage = ({onClose, onSave, onChange}) => {
    const initValues = JSON.parse(localStorage.getItem(LANGUAGES_STORE) || '[]');
    const proficiencyOptions = [
        { label: "Elementary proficiency", value: "Elementary" },
        { label: "Limited working proficiency", value: "Limited" },
        { label: "Professional working proficiency", value: "Professional" },
        { label: "Full professional proficiency", value: "Full" },
        { label: "Native", value: "Native" },
    ]

    const [options, setOptions] = useState(initValues);
    const [language, setLanguage] = useState("");
    const [proficiency, setProficiency] = useState("");
    const [errors, setErrors] = useState({language: true, proficiency: true});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChangeSelect = (e) => {
        onChange();
        setLanguage(e.label);
        setErrors({
            ...errors,
            language: false
        })

        const saveInStorage = (arr) => {
            localStorage.setItem(LANGUAGES_STORE, JSON.stringify(arr));
            setOptions(arr);
        }

        if(options.length === 0) {
            saveInStorage([e]);
        }

        if (initValues.length > 0 && initValues.filter(
            (option) =>
                option.label.toLowerCase() === e.label.toLowerCase()).length === 0) {
            saveInStorage([...initValues, e]);
        }
    }

    const onSaveClick = async () => {
        if(!proficiency || !language) {
            setIsSubmitted(true);
            return;
        }

        await profileService.addLanguage({proficiency, name: language});

        onSave();
    }

    return (
        <div className="flex flex-col gap-2.5 py-5 px-8 w-[750px]"
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <ModalHeader title="Add language" onClose={onClose}/>

            <h3 className="font-jost text-[#2D2A33] text-sm">Required fields are marked with *</h3>

            <div className="pt-[5px] pb-[15px] pr-[20px] gap-[5px]">
                <h1 className="font-jost text-[#2D2A33]">Language *</h1>

                <TextDown
                    className="mt-[5px]"
                    options={options}
                    containerWidth={300}
                    placeHolder=''
                    error={isSubmitted && errors['language']}
                    hasTools={false}
                    onChange={(e) => handleChangeSelect(e)}
                />
                <ConditionalWrapper condition={isSubmitted && errors['language']}>
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required. Choose the language you speak</h3>
                </ConditionalWrapper>

            </div>

            <div className="pt-[5px] pb-[15px] pr-[20px] gap-[5px]">
                <h1 className="font-jost text-[#2D2A33]">Proficiency *</h1>

                <TextDown
                    className="mt-[5px]"
                    containerHeightMax={200}
                    containerWidth={300}
                    error={isSubmitted && errors['proficiency']}
                    options={proficiencyOptions}
                    placeHolder='Select from list'
                    searchAble={false}
                    onChange={(e) => {
                        setProficiency(e.label);
                        setErrors({
                            ...errors,
                            proficiency: false
                        })
                    }}
                />
                <ConditionalWrapper condition={isSubmitted && errors['proficiency']}>
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required. Please choose your language proficiency level</h3>
                </ConditionalWrapper>
            </div>

            <div className="flex justify-end pt-2.5 pb-1 gap-5">
                <PrimaryButton onClick={onSaveClick}>
                    Save
                </PrimaryButton>
            </div>
        </div>
    )
}
export default AddNewLanguage;