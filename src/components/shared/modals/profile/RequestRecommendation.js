import XMarkIcon from "../../../../elements/icons/XMarkIcon";
import React, {useEffect, useState} from "react";
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup";
import useForm from "../../../../hooks/useForm";
import ConnectionService from "../../../../services/connectionService";
import {APP_ENV} from "../../../../env";
import defaultImage from "../../../../assets/default-image.jpg";
import {ButtonVariant1} from "../../../../elements/buttons/Button";
import Show from "../../../../elements/shared/Show";
import ModalInputFormGroup from "../../forms/ModalInputFormGroup";
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup";
import {useQuery} from "@tanstack/react-query";
import ProfileService from "../../../../services/profileService";

const UserItem = ({user, onClick}) => {
    return (
        <div
            className={`flex flex-row gap-3 ${onClick?'hover:bg-gray-50 cursor-pointer':''}`}
            onClick={onClick}
        >
            <div
                className="overflow-hidden h-10 w-10 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]">
                <img className="object-contain"
                     src={user?.image ? APP_ENV.UPLOADS_URL + "/" + user?.image : defaultImage}
                     alt="image"/>
            </div>

            <div className="flex flex-col gap-1">
                <h1 className="font-jost font-medium">{user.firstName} {user.lastName}</h1>

                <h3>{user.lastPosition}</h3>
            </div>
        </div>
    )
}

const RequestRecommendation = ({onClose, onChange}) => {
    const initialValues = {
        options: {
            connection: []
        },
        values: {
            connection: {},
            relationship: '',
            positionAtTheTime: '',
            message: ''
        },
        errors: {
            connection: true,
            relationship: true,
            positionAtTheTime: true
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
    const [step, setStep] = useState(1);

    useEffect(() => {
        ConnectionService.getConnections().then(({data}) => {
            setOptions({
                connection: data
            })
        })
    }, [])

    const stringifyUser = (data) => {
        const {user} = data;

        return user ? `${user.firstName} ${user.lastName}` : '';
    }

    const onNext = () => {
        if(step === 1)
            return setStep(2);

        const model = {
            id: 0,
            positionAtTheTime: values.positionAtTheTime,
            relationship: values.positionAtTheTime,
            content: "",
            senderId: values.connection.user.id,
            requestMessage: values.message,
        }

        console.log(model)
    }

    return (
        <div className="flex flex-col gap-2 px-7 py-5 w-[750px]"
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <div className="flex flex-row py-2.5 border-b-[1px] border-b-[#24459A]">
                <h1 className="font-jost font-semibold text-[#2D2A33] text-xl">Request recommendation</h1>

                <button onClick={onClose} className="ml-auto">
                    <XMarkIcon className="fill-[#7D7D7D] h-4"/>
                </button>
            </div>

            <h3 className="mt-4 font-jost text-[#2D2A33] font-light text-sm">Required fields are marked with *</h3>

            <Show>
                <Show.When isTrue={step === 1}>
                    <div className="mt-4 flex flex-col">
                        <h1 className="font-jost font-light text-[#2D2A33] text-lg">Who can write for you recommendation?</h1>

                        <ModalSelectFormGroup
                            className="mt-4 pt-[5px] pb-[10px] pr-[20px] gap-[5px]"
                            title="Search connection *"
                            value={stringifyUser(values.connection)}
                            options={options.connection}
                            containerWidth={665}
                            placeHolder=""
                            error={isSubmitted && errors['connection']}
                            hasTools={false}
                            clearOnSelect={false}
                            onChange={(e) => {
                                setValues(prev => ({
                                    ...prev,
                                    positionAtTheTime: e.user.lastPosition || ''
                                }))
                                handleChangeSelect(e, "connection")
                            }}
                            item={<UserItem/>}
                            searchFunc={(search) => (el) => {
                                return el.user.firstName.toLowerCase().indexOf(search) >= 0 ||
                                    el.user.lastName.toLowerCase().indexOf(search) >= 0
                            }}
                            errorChildren={
                                <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                            }
                        />
                    </div>
                </Show.When>

                <Show.Else>
                    <div className="mt-4 flex flex-col">
                        <UserItem user={values.connection.user}/>

                        <h1 className="font-jost text-lg font-light mt-4">From where you know <strong className="font-semibold">{stringifyUser(values.connection)}</strong>?</h1>

                        <ModalInputFormGroup
                            title="Relationship *"
                            name="relationship"
                            type="text"
                            value={values.relationship}
                            onChange={onChangeInput}
                            className="mt-4 pb-[10px] pr-[20px] gap-[5px]"
                        />

                        <ModalInputFormGroup
                            title="Position at the time *"
                            name="positionAtTheTime"
                            type="text"
                            value={values.positionAtTheTime}
                            onChange={onChangeInput}
                            className="pb-[10px] pr-[20px] gap-[5px]"
                        />

                        <ModalTextareaFormGroup
                            title="Message"
                            name="message"
                            className="pb-[10px] pr-[20px] gap-[5px]"
                            onChange={onChangeInput}
                            value={values.message}
                            rows={3}
                        />
                    </div>
                </Show.Else>
            </Show>

            <div className="flex flex-row mt-4">
                <h1 className="font-jost text-lg">Step {step}</h1>

                <ButtonVariant1 onClick={onNext} className="ml-auto">
                    {step === 1 ? 'Continue' : 'Send'}
                </ButtonVariant1>
            </div>
        </div>
    )
}
export default RequestRecommendation;