import {useState} from "react";
import {objectMap} from "../utils/converters";

const useForm = (initialValues, onChangeCallback) => {
    const [options, setOptions] = useState(initialValues.options);
    const [values, setValues] = useState(initialValues.values);
    const [errors, setErrors] = useState(initialValues.errors);
    const [touched, setTouched] = useState(objectMap(initialValues.values, () => false));
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChangeSelect = (e, field, store) => {
        onChangeCallback();
        setValues({
            ...values,
            [field]: e.label || e
        });
        setTouched({
            ...touched,
            [field]: true
        })
        setErrors({
            ...errors,
            [field]: false
        });

        if (!store)
            return;

        const saveInStorage = (arr) => {
            localStorage.setItem(store, JSON.stringify(arr));
            setOptions({
                ...options,
                [field]: arr
            });
        };

        if (options[field].length === 0) {
            saveInStorage([e]);
        }

        if (
            initialValues.values[field].length > 0 &&
            initialValues.values[field].filter(
                (option) =>
                    option.label.toLowerCase() === e.label.toLowerCase()
            ).length === 0
        ) {
            saveInStorage([...initialValues.values[field], e]);
        }
    };

    const onChangeInput = (e) => {
        const {value, type, checked, name} = e.target;

        setValues({
            ...values,
            [name]: type === "checkbox" ? checked : value
        })

        setTouched({
            ...touched,
            [name]: true
        })

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: type === "checkbox" ? !checked : value.length === 0
            })
        }

        onChangeCallback();
    }

    const onSubmit = (e, callback) => {
        e.preventDefault();

        const hasErrors = Object.values(errors).some(error => error);

        if (hasErrors) {
            setIsSubmitted(true);
            return;
        }

        callback();
    }

    return {
        options,
        values,
        errors,
        isSubmitted,
        handleChangeSelect,
        onChangeInput,
        onSubmit,
        setErrors,
        setValues,
        setOptions,
        setIsSubmitted,
        touched
    };
}
export default useForm;