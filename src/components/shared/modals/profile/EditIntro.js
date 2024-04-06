import ProfileService from "../../../../services/profileService";
import EditModalForm from "../../forms/EditModalForm";
import React, {useEffect} from "react";
import ModalInputFormGroup from "../../forms/ModalInputFormGroup";
import useForm from "../../../../hooks/useForm";
import AddButton from "../../../../elements/buttons/AddButton";
import {Link} from "react-router-dom";
import AdditionalProfileService from "../../../../services/additionalProfileService";

const EditIntro = ({onClose, onSave, onChange}) => {
    const initialValues = {
        options: {},
        values: {
            firstName: "",
            lastName: "",
            headline: "",
            industry: "",
        },
        errors: {
            firstName: true,
            lastName: true,
            headline: true,
            industry: true
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

    useEffect(() => {
        AdditionalProfileService.getIntro().then(({data}) => {
            setValues({
                ...data
            })
            setErrors({
                firstName: false,
                lastName: false,
            })
        }).catch(() => onClose())
    }, [])

    const onSaveClick = async () => {
        AdditionalProfileService
            .updateIntro(values)
            .then(onSave);
    }

    return (
        <EditModalForm
            onSubmit={() => onSubmit(onSaveClick)}
            onClose={onClose}
            onRemove={null}
            isEdit={false}
            header={"Edit about your self"}
        >
            <h3 className="font-jost text-[#2D2A33] text-sm">Required fields are marked with *</h3>

            <ModalInputFormGroup
                title="First name *"
                name="firstName"
                type="text"
                value={values.firstName}
                error={errors.firstName && isSubmitted}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalInputFormGroup
                title="Last name *"
                name="lastName"
                type="text"
                value={values.lastName}
                error={errors.lastName && isSubmitted}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalInputFormGroup
                title="Headline *"
                name="headline"
                type="text"
                value={values.headline || ""}
                error={errors.headline && isSubmitted}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <div className="flex flex-col pt-[5px] pr-[15px] pb-[10px] gap-[5px]">
                <h1 className="font-jost text-[#2D2A33] text-lg font-semibold">Experience</h1>

                <AddButton onClick={() => {}}>
                    Add experience
                </AddButton>

                <ModalInputFormGroup
                    title="Industry *"
                    name="industry"
                    type="text"
                    value={values.industry || ""}
                    error={errors.industry && isSubmitted}
                    onChange={onChangeInput}
                    className="pb-[10px] pr-[20px] gap-[5px] mt-3"
                    errorChildren={
                        <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                    }
                />
            </div>

            <div className="flex flex-col pt-[5px] pr-[15px] pb-[10px] gap-[5px]">
                <h1 className="font-jost text-[#2D2A33] text-lg font-semibold">Education</h1>

                <AddButton onClick={() => {}}>
                    Add education
                </AddButton>

                <ModalInputFormGroup
                    title="Country *"
                    name="country"
                    type="text"
                    value={values.country || ""}
                    error={errors.country && isSubmitted}
                    onChange={onChangeInput}
                    className="pb-[10px] pr-[20px] gap-[5px] mt-3"
                    errorChildren={
                        <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                    }
                />

                <ModalInputFormGroup
                    title="City *"
                    name="city"
                    type="text"
                    value={values.city || ""}
                    error={errors.city && isSubmitted}
                    onChange={onChangeInput}
                    className="pb-[10px] pr-[20px] gap-[5px]"
                    errorChildren={
                        <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                    }
                />
            </div>

            <div className="flex flex-col pt-[5px] pr-[15px] pb-[10px] gap-[5px]">
                <h1 className="font-jost text-[#2D2A33] text-lg font-semibold">Contact information</h1>

                <h3 className="font-jost text-sm text-[#2D2A33] font-light">
                    Here you can add or edit your URL, email etc.
                </h3>

                <Link to=' ' className="text-[#24459A] font-medium hover:underline">
                    Contact information
                </Link>
            </div>
        </EditModalForm>
    )
}
export default EditIntro;