import EditModalForm from "../../forms/EditModalForm";
import React, {useEffect, useState} from "react";
import ModalInputFormGroup from "../../forms/ModalInputFormGroup";
import useForm from "../../../../hooks/useForm";
import AddButton from "../../../../elements/buttons/AddButton";
import {Link} from "react-router-dom";
import AdditionalProfileService from "../../../../services/additionalProfileService";
import {authService} from "../../../../services/authService";
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup";
import {COMPANIES_STORE} from "../../../../constants/stores";
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup";

const EditIntro = ({onClose, onSave, onChange}) => {
    const initialValues = {
        options: {
            country: [],
            city: []
        },
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
        handleChangeSelect,
        onSubmit,
        setErrors,
        setValues,
        errors,
        isSubmitted,
        setOptions,
        options
    } = useForm(initialValues, onChange);

    useEffect(() => {
        authService.countries().then(({data}) => {
            setOptions(prev => ({
                ...prev,
                country: data.map(val => {
                    return {
                        label: val.name,
                        value: val.name
                    }
                })
            }))
        });

        AdditionalProfileService.getIntro().then(({data}) => {
            setValues({
                ...data
            })
            setErrors({
                firstName: false,
                lastName: false,
            })
            console.log(data)
        }).catch(() => onClose())
    }, []);

    useEffect( () => {
        if(values.country?.length > 0) {
            authService.cities(values.country).then(({data}) => {
                setOptions(prev => ({
                    ...prev,
                    city: data.map(val => {
                        return {
                            label: val.name,
                            value: val.name
                        }
                    })
                }))
            });
        }
    }, [values.country]);

    const onSaveClick = () => {
        const model = {
            id: values.id,
            firstName: values.firstName,
            lastName:  values.lastName,
            additionalName: values.additionalName || "",
            country: values.country,
            headline: values.headline || "",
            city: values.city,
            image: values.image,
            address: values.address || "",
            lastPosition: values.lastPosition || "",
            isClosed: values.isClosed,
            isHibernated: values.isHibernated
        }

        AdditionalProfileService
            .updateIntro(model)
            .then(onSave);
    }

    return (
        <EditModalForm
            onSubmit={() => onSubmit(onSaveClick)}
            onClose={onClose}
            onRemove={null}
            isEdit={false}
            header={"Edit intro"}
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
                title="Additional Name"
                name="additionalName"
                type="text"
                value={values.additionalName || ""}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
            />

            <ModalInputFormGroup
                title="Headline"
                name="headline"
                type="text"
                value={values.headline || ""}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
            />

            <ModalSelectFormGroup
                className="pt-[5px] pb-[10px] pr-[20px] gap-[5px]"
                title="Country *"
                value={values.country}
                options={options.country}
                containerWidth={665}
                placeHolder="ex: USA"
                error={isSubmitted && errors['country']}
                hasTools={false}
                clearOnSelect={false}
                onEnterSelect={false}
                onChange={(e) => handleChangeSelect(e, "country")}
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalSelectFormGroup
                className="pt-[5px] pb-[10px] pr-[20px] gap-[5px]"
                title="City *"
                value={values.city || ""}
                options={options.city}
                containerWidth={665}
                placeHolder="ex: Washington"
                error={isSubmitted && errors['city']}
                hasTools={false}
                clearOnSelect={false}
                onEnterSelect={false}
                onChange={(e) => handleChangeSelect(e, "city")}
                errorChildren={
                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                }
            />

            <ModalInputFormGroup
                title="Last Position"
                name="lastPosition"
                type="text"
                value={values.lastPosition || ""}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
            />

            <div className="flex flex-col pt-[5px] pr-[15px] pb-[10px] gap-[5px]">
                <h1 className="font-jost text-[#2D2A33] text-lg font-semibold">Contact information</h1>

                <h3 className="font-jost text-sm text-[#2D2A33] font-light">
                    Here you can add or edit your URL, email etc.
                </h3>

                <Link to='edit/contact-information' className="text-[#24459A] font-medium hover:underline">
                    Contact information
                </Link>
            </div>
        </EditModalForm>
    )
}
export default EditIntro;