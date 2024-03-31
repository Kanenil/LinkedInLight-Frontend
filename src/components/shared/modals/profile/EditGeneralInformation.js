import XMarkIcon from "../../../../elements/icons/XMarkIcon";
import React, {useEffect} from "react";
import PlusIcon from "../../../../elements/icons/PlusIcon";
import ConditionalWrapper from "../../../../elements/shared/ConditionalWrapper";
import TextDown from "../../../../elements/shared/TextDown";
import {profileService} from "../../../../services/profileService";
import useForm from "../../../../hooks/useForm";
import EditModalForm from "../../forms/EditModalForm";

const EditGeneralInformation = ({onClose, onSave, onChange}) => {
    const initialValues = {
        options: {
            skills: []
        },
        values: {
            about: '',
            userAbout: '',
            skills: [],
            userSkills: [],
            allSkills: [],
            isAddSkill: false
        },
        errors: {
            about: false,
            skills: false,
        },
    };
    const {
        options,
        values,
        errors,
        onChangeInput,
        setValues,
        setOptions
    } = useForm(initialValues, onChange);

    useEffect(() => {
        profileService
            .getAllSkills()
            .then(({data}) => {
                const mapped = data.map(val => ({
                    label: val.name,
                    value: val.id
                }))

                setValues(prev => ({
                    ...prev,
                    allSkills: mapped
                }))
                setOptions({
                    skills: [...mapped]
                });
            })


        profileService.getAbout()
            .then(({data}) => {
                setValues(prev => ({
                    ...prev,
                    userAbout: data,
                    about: data
                }))
            })

        profileService.getMainSkills()
            .then(({data}) => {
                const mapped = data.map(val => ({
                    label: val.skill.name,
                    value: val.skill.id
                }))

                setValues(prev => ({
                    ...prev,
                    userSkills: data,
                    skills: mapped
                }))
                setOptions(prev => ({
                    skills: [...prev.skills.filter(opt => !data.map(val => val.skill.name).includes(opt.label))]
                }))
            })
    }, [])

    const onChangeSelect = (e) => {
        if(values.skills.map(skill => skill.label.toLowerCase()).indexOf(e.label.toLowerCase()) === -1) {
            const newArray = [...values.skills, e];

            setValues(prev => ({
                ...prev,
                skills: newArray,
                isAddSkill: false
            }))

            setOptions(prev => ({
                skills: [...prev.skills.filter(opt => !newArray.map(val => val.label).includes(opt.label))]
            }))

            onChange();
        }
    }

    const onRemoveItem = (skill) => {
        const newArray = values.skills.filter(val => val !== skill);

        setValues(prev => ({
            ...prev,
            skills: newArray
        }))

        setOptions({
            skills: [...values.allSkills.filter(opt => !newArray.map(val => val.label).includes(opt.label))]
        })

        onChange();
    }

    const onSaveClick = async () => {
        if(values.userAbout !== values.about)
            await profileService.editAbout(String(values.about));

        for (const skill of values.skills) {
            if(values.userSkills.filter(userSkill => userSkill.skill.name === skill.label).length === 0)
                await profileService.addSkill({
                    name: skill.label,
                    id: skill.value
                });
        }

        for (const userSkill of values.userSkills) {
            if(values.skills.filter(skill => skill.label === userSkill.skill.name).length === 0)
                await profileService.removeSkill(userSkill.id);
        }

        onSave();
    }

    return (
        <EditModalForm
            onSubmit={onSaveClick}
            onClose={onClose}
            onRemove={null}
            isEdit={false}
            header={"Edit general information"}
        >
            <div className="flex flex-col pt-[5px] pl-[20px] pr-[15px] pb-[10px] gap-2.5">
                <h1 className="font-jost font-light text-sm text-[#2D2A33]">
                    On <span className="font-medium">Job for You</span>, you can share your years of experience, choose
                    your industry and specify your skills.
                    Describe your accomplishments and previous work experience to create a complete picture of your
                    career
                </h1>

                <textarea
                    className="mt-[15px] resize-none border-[0.5px] border-[#556DA9] rounded-lg text-sm font-jost font-light"
                    placeholder="Description..."
                    name="about"
                    onChange={onChangeInput}
                    value={values.about}
                    rows={7}
                />
            </div>

            <div className="flex flex-col pt-[5px] pl-[20px] pr-[15px] pb-[10px] gap-[5px]">
                <h1 className="font-jost text-[#2D2A33] font-semibold">Skills</h1>

                <h3 className="font-jost text-sm text-[#2D2A33] font-light">
                    Show your strengths - add up to 5 key skills that you would like to be recognized for. They will
                    automatically appear in your "Skills" section on <span className="font-medium">Job for You</span>
                </h3>

                {
                    values.skills.map((val, index) =>
                        <div key={`skill-${index}`}
                             className="flex flex-row items-center gap-2.5 pl-2.5 pr-[5px]"
                        >
                            <button onClick={() => onRemoveItem(val)}>
                                <XMarkIcon className="fill-[#7D7D7D] h-3"/>
                            </button>


                            <h1 className="font-jost text-lg font-medium text-[#556DA9]">{val.label}</h1>
                        </div>
                    )
                }

                <ConditionalWrapper condition={values.isAddSkill}>
                    <TextDown
                        className="mt-[5px]"
                        options={options.skills}
                        placeHolder="Skill (ex: Project management)"
                        error={errors.skills}
                        searchAble={true}
                        hasTools={false}
                        clearOnSelect={true}
                        onChange={onChangeSelect}
                    />
                </ConditionalWrapper>
                <ConditionalWrapper condition={!values.isAddSkill && values.skills.length !== 5}>
                    <button onClick={() => setValues(prev => ({...prev, isAddSkill: true}))}
                            className="group flex flex-row gap-2.5 items-center mt-2.5 w-fit px-2.5 py-[5px] text-sm rounded-full border-[1px] border-[#7D88A4] text-[#7D88A4] hover:border-[#24459A] hover:text-[#556DA9] active:text-[#24459A] active:border-[#24459A] active:border-[1.5px]  active:bg-[#E4EAFF]">
                        <PlusIcon
                            className="fill-[#7D88A4] group-hover:fill-[#556DA9] group-active:fill-[#24459A] h-3"/>
                        Add skill
                    </button>
                </ConditionalWrapper>
                <ConditionalWrapper condition={values.skills.length === 5}>
                    <h3 className="text-[#2D2A33] font-light font-sm">You reached maximum of 5 skills</h3>
                </ConditionalWrapper>
            </div>
        </EditModalForm>
    )
}
export default EditGeneralInformation;