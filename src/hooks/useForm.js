import {useState} from "react";

const useForm = (initialValues, onChangeCallback) => {
    const [options, setOptions] = useState(initialValues.options);
    const [values, setValues] = useState(initialValues.values);
    const [errors, setErrors] = useState(initialValues.errors);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChangeSelect = (e, field, store) => {
        onChangeCallback();
        setValues({
            ...values,
            [field]: e.label
        });
        setErrors({
            ...errors,
            [field]: false
        });

        if(!store)
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
        const { value, type, checked, name } = e.target;

        setValues({
            ...values,
            [name]: type === "checkbox"? checked: value
        })

        onChangeCallback();
    }

    const onSubmit = (callback) => {
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
        setIsSubmitted
    };
}
export default useForm;