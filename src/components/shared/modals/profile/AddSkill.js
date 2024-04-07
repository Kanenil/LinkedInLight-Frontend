import useForm from "../../../../hooks/useForm";
import React, {useEffect, useState} from "react";
import ProfileService from "../../../../services/profileService";
import EditModalForm from "../../forms/EditModalForm";
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup";
import ModalCheckFormGroup from "../../forms/ModalCheckFormGroup";

const AddSkill = ({onClose, onSave, onChange, id}) => {
    const [isDisabled, seIsDisabled] = useState({isMainSkill: ''});
    const initialValues = {
        options: {
            skills: []
        },
        values: {
            name: "",
            isMainSkill: false
        },
        errors: {
            name: true
        },
    };
    const {
        options,
        values,
        errors,
        onSubmit,
        handleChangeSelect,
        onChangeInput,
        setValues,
        setOptions,
        isSubmitted,
        setErrors
    } = useForm(initialValues, onChange);

    const getSkill = (id, mapped) => {
        ProfileService.getSkills()
            .then(({data}) => {
                let condition = opt => opt
                let model = {}

                if(id) {
                    const skill = data.find(val => val.id === +id);

                    model = {
                        name: skill.skill.name,
                        id: skill.skillId,
                        modelId: skill.id,
                        isMainSkill: skill.isMainSkill,
                        applicationUserId: skill.applicationUserId,
                    }

                    setErrors({name: false})

                    condition = opt => opt.label !== skill.skill.name
                }

                setValues(prev => ({
                    ...prev,
                    ...model,
                    userSkills: data.map(v => v.skill.name)
                }))

                setOptions(prev => ({
                    ...prev,
                    skills: [
                        ...mapped
                            .filter(opt => !data.map(v => v.skill.name).includes(opt.label))
                            .filter(condition)
                    ]
                }))

            })
    }

    useEffect(() => {
        ProfileService
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

                getSkill(id, mapped);
            })
    }, [])

    const onChangeSelect = (e) => {
        handleChangeSelect(e, "name");

        setValues(prev => ({
            ...prev,
            id: e.value
        }))

        setOptions(prev => ({
            ...prev,
            skills: [
                ...values.allSkills
                    .filter(opt => opt.label !== e.label)
                    .filter(opt => !values.userSkills.includes(opt.label))
            ]
        }))

        onChange();
    }

    const onRemoveClick = async () => {
        await ProfileService.removeSkill(id);

        onSave();
    }

    const onSaveClick = async () => {
        try {
            if(id) {
                console.log(values)
                await ProfileService.updateSkill({
                    id: id,
                    isMainSkill: values.isMainSkill,
                    skill: {
                        id: values.id,
                        name: values.name
                    },
                    skillId: values.id,
                    applicationUserId: values.applicationUserId
                }, id)
            } else {
                await ProfileService.addSkill({
                    name: values.name,
                    id: values.id
                }, values.isMainSkill);
            }
        } catch (err) {
            if(err.response.data === "You can only have 5 main skills.") {
                seIsDisabled({isMainSkill: err.response.data})
                setValues(prev => ({...prev, isMainSkill: false}))
            }
            return;
        }

        onSave();
    }

    return (
        <EditModalForm
            onSubmit={() => onSubmit(onSaveClick)}
            onClose={onClose}
            onRemove={onRemoveClick}
            isEdit={id ?? false}
            header={id?"Edit skill":"Add skill"}
        >
            <h3 className="font-jost text-[#2D2A33] text-sm">Required fields are marked with *</h3>

            <ModalSelectFormGroup
                className="pt-[5px] pb-[10px] pr-[20px] gap-[5px]"
                title="Skill *"
                value={values.name}
                options={options.skills}
                containerWidth={665}
                placeHolder=""
                error={isSubmitted && errors['name']}
                hasTools={false}
                clearOnSelect={false}
                onChange={onChangeSelect}
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalCheckFormGroup
                className="pb-[10px] pr-[20px] gap-[5px]"
                name="isMainSkill"
                onChange={onChangeInput}
                error={isDisabled.isMainSkill}
                value={values.isMainSkill}
                disabled={isDisabled.isMainSkill}
                title="Is it your main skill?"
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">{isDisabled.isMainSkill}</h3>
                }
            />
        </EditModalForm>
    )
}
export default AddSkill;