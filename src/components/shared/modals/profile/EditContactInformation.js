import useForm from "../../../../hooks/useForm";
import React, {useEffect} from "react";
import AdditionalProfileService from "../../../../services/additionalProfileService";
import ModalInputFormGroup from "../../forms/ModalInputFormGroup";
import AddButton from "../../../../elements/buttons/AddButton";
import {Link} from "react-router-dom";
import EditModalForm from "../../forms/EditModalForm";
import {APP_ENV} from "../../../../env";
import {getDateTime, getLongMonth, getMonths, getYears} from "../../../../utils/date";
import FormSelector from "../../forms/FormSelector";
import moment from "moment";

const EditContactInformation = ({onClose, onSave, onChange}) => {
    const initialValues = {
        options: {},
        values: {
            firstName: "",
            lastName: "",
            address: "",
            phone: "",
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
    } = useForm(initialValues, onChange);

    const months = getMonths();
    const years = getYears(moment().add(-17, "years").toDate());
    const days = Array.from({length: 31}, (_, i) => i + 1);

    useEffect(() => {
        AdditionalProfileService.getIntro().then(({data}) => {
            console.log(data)
            const birthday = new Date(data.birthday);
            setValues({
                ...data,
                phone: data.phoneNumbers[0] ?? "",
                address: data.address || "",
                birthdayDay: birthday.getDay(),
                birthdayMonth: getLongMonth(birthday.getMonth()),
                birthdayYear: birthday.getFullYear(),
            })
            setErrors({
                phone: false,
                address: false,
            })
        }).catch(() => onClose())
    }, [])

    const onSaveClick = async () => {
        const model = {
            address: values.address,
            phoneNumber: values.phone,
            birthday: getDateTime(values.birthdayDay, values.birthdayMonth, values.birthdayYear)
        }

        AdditionalProfileService
            .updateContactInformation(model)
            .then(onSave);
        onSave();
    }

    return (
        <EditModalForm
            onSubmit={() => onSubmit(onSaveClick)}
            onClose={onClose}
            onRemove={null}
            isEdit={false}
            withBorder={false}
            header="Edit contact information"
        >
            <div className="flex flex-col gap-2 mt-2.5">
                <h1 className="font-jost font-light text-lg">URL</h1>

                <Link onClick={onClose} to={`${APP_ENV.FRONTEND_URL}/j4y/${values.profileUrl}`} className="text-[#24459A] font-medium hover:underline">
                    {`${APP_ENV.FRONTEND_URL}/j4y/${values.profileUrl}`}
                </Link>
            </div>

            <div className="flex flex-col gap-2 mt-2.5">
                <h1 className="font-jost font-light text-lg">Email</h1>

                <Link to={`email:${values.email}`} className="text-[#24459A] font-medium hover:underline">
                    {values.email}
                </Link>
            </div>

            <ModalInputFormGroup
                title="Address"
                name="address"
                type="text"
                value={values.address}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px] mt-5"
            />

            <ModalInputFormGroup
                title="Phone number"
                name="phone"
                type="text"
                value={values.phone}
                onChange={onChangeInput}
                className="pb-[10px] pr-[20px] gap-[5px]"
            />

            <div className="pb-[10px] pr-[20px] gap-[5px]">
                <h1 className="font-jost text-[#2D2A33]">Birthday</h1>

                <div className="flex flex-row gap-5">
                    <FormSelector
                        name="birthdayDay"
                        title="Day"
                        value={values.birthdayDay}
                        handleChange={e => {
                            setValues({
                                ...values,
                                birthdayDay: e.target.value
                            })

                            onChange();
                        }}
                        margin="w-full"
                        options={days}
                    />
                    <FormSelector
                        name="birthdayMonth"
                        title="Month"
                        value={values.birthdayMonth}
                        handleChange={e => {
                            setValues({
                                ...values,
                                birthdayMonth: e.target.value
                            })

                            onChange();
                        }}
                        margin="w-full"
                        options={months}
                    />

                    <FormSelector
                        name="birthdayYear"
                        title="Year"
                        value={values.birthdayYear}
                        handleChange={e => {
                            setValues({
                                ...values,
                                birthdayYear: e.target.value
                            })

                            onChange();
                        }}
                        margin="w-full"
                        options={years}
                    />
                </div>
            </div>

            <AddButton onClick={() => {}}>
                Add website
            </AddButton>
        </EditModalForm>
    )
}

export default EditContactInformation;