import XMarkIcon from "../../../../elements/icons/XMarkIcon";
import React, {useEffect} from "react";
import useOverflow from "../../../../hooks/useOverflow";
import useForm from "../../../../hooks/useForm";
import TextDown from "../../../../elements/shared/TextDown";
import Show from "../../../../elements/shared/Show";
import AddButton from "../../../../elements/buttons/AddButton";
import {ButtonVariant1, ButtonVariant2, ButtonVariant3} from "../../../../elements/buttons/Button";
import ProfileService from "../../../../services/profileService";
import {authService} from "../../../../services/authService";
import ModalRadioInput from "../../forms/ModalRadioInput";
import {useQueries} from "@tanstack/react-query";
import {useAlertContext} from "../../../../providers/AlertProvider";
import EditModalForm from "../../forms/EditModalForm";

const employmentTypes = [
    {
        value: 'fullTime',
        label: 'Full-time'
    },
    {
        value: 'partTime',
        label: 'Part-time'
    },
    {
        value: 'internship',
        label: 'Internship'
    },
    {
        value: 'contract',
        label: 'Contract'
    },
    {
        value: 'temporary',
        label: 'Temporary'
    }
]

const OpenToWork = ({onClose, onChange, onSave}) => {
    const initialValues = {
        options: {
            positions: [],
            regions: []
        },
        values: {
            isAddPosition: false,
            isAddRegion: false,
            regions: [],
            positions: [],
            allPositions: [],
            allRegions: [],
            fullTime: false,
            partTime: false,
            internship: false,
            contract: false,
            temporary: false,
            canStartImmediately: false,
            visibleForAll: false,
        },
        errors: {
            positions: true,
            regions: true,
            employmentTypes: true
        },
    };
    const {
        options,
        values,
        errors,
        setValues,
        setOptions,
        isSubmitted,
        setErrors,
        onSubmit
    } = useForm(initialValues, onChange);
    const {isOverflow, containerRef, contentRef} = useOverflow();
    const {success} = useAlertContext();

    const onRadioChange = ({target: {name, value}}) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const {positions, countries} = useQueries({
        queries: [
            {
                queryFn: () => ProfileService.getPositions(),
                queryKey: ['allPositions'],
                select: ({data}) => data,
            },
            {
                queryFn: () => authService.countries(),
                queryKey: ['allCountries'],
                select: ({data}) => data,
            }
        ],
        combine: (results) => {
            return {
                positions: results[0].data ?? [],
                countries: results[1].data ?? []
            }
        },
    })

    useEffect(() => {
        let model = {}

        if (positions.length > 0) {
            const mapped = positions.map(val => ({
                label: val.name,
                value: val.id
            }))

            setValues(prev => ({
                ...prev,
                allPositions: mapped
            }))
            model = {
                ...model,
                positions: [...mapped]
            }
        }

        if (countries.length > 0) {
            const mapped = countries.map(val => ({
                label: val.name,
                value: val.id
            }))

            setValues(prev => ({
                ...prev,
                allRegions: mapped
            }))
            model = {
                ...model,
                regions: [...mapped]
            }
        }

        setOptions(prev => ({
            ...prev,
            ...model
        }));
    }, [countries, positions])

    const handleSubmit = async () => {
        const {
            fullTime,
            partTime,
            internship,
            contract,
            temporary,
            canStartImmediately,
            visibleForAll,
            positions,
            regions
        } = values

        if (!(fullTime || partTime || internship || contract || temporary))
            return setErrors(prev => ({...prev, employmentTypes: true}))

        const model = {
            id: 0,
            canStartImmediately: canStartImmediately === 'true',
            fullTime,
            partTime,
            internship,
            contract,
            temporary,
            visibleForAll,
            applicationUserId: '',
            openToWorkPositions: positions.map(position => ({
                openToWorkId: 0,
                positionId: position.value
            })),
            openToWorkCountries: regions.map(region => ({
                openToWorkId: 0,
                countryId: region.value
            })),
            openToWorkCities: []
        }

        await ProfileService.openToWork(model)

        success('Open to work successfully saved.', 5);
        onSave();
    }

    const onChangeTypes = (name) => {
        setErrors(prev => ({...prev, employmentTypes: false}))
        setValues(prev => ({...prev, [name]: !prev[name]}))
    }

    const onRemoveItem = (item, store, all) => {
        const newArray = values[store].filter(val => val !== item);

        setValues(prev => ({
            ...prev,
            [store]: newArray
        }))

        setOptions({
            [store]: [...values[all].filter(opt => !newArray.map(val => val.label).includes(opt.label))]
        })

        onChange();
    }

    const onChangeSelect = (item, store, add) => {
        if (values[store].map(val => val.label.toLowerCase()).indexOf(item.label.toLowerCase()) === -1) {
            const newArray = [...values[store], item];

            setErrors(prev => ({...prev, [store]: false}))

            setValues(prev => ({
                ...prev,
                [store]: newArray,
                [add]: false
            }))

            setOptions(prev => ({
                ...prev,
                [store]: [...prev[store].filter(opt => !newArray.map(val => val.label).includes(opt.label))]
            }))

            onChange();
        }
    }

    return (
        <EditModalForm
            onSubmit={e => onSubmit(e, handleSubmit)}
            onClose={onClose}
            onRemove={null}
            isEdit={false}
            withBorder={false}
            header="Job preferences"
        >
            <div className="flex flex-col gap-2.5" ref={contentRef}>
                <h3 className="mt-3 font-jost text-[#2D2A33] font-light text-sm">Required fields are marked with
                    *</h3>

                <div className="flex flex-col gap-1 mt-2.5">
                    <h3 className="font-jost text-[#2D2A33]">Positions *</h3>

                    <div className="flex flex-row flex-wrap gap-2.5">
                        {
                            values.positions.map((position) => (
                                <ButtonVariant3
                                    key={`position-${position.value}`}
                                    type="button"
                                    onClick={() => onRemoveItem(position, 'positions', 'allPositions')}
                                >
                                    {position.label}
                                </ButtonVariant3>
                            ))
                        }
                    </div>

                    <Show>
                        <Show.When isTrue={values.isAddPosition}>
                            <TextDown
                                className="mt-[5px]"
                                options={options.positions}
                                error={errors.positions}
                                searchAble={true}
                                hasTools={false}
                                clearOnSelect={true}
                                onEnterSelect={false}
                                isAbsolute={true}
                                onChange={(e) => onChangeSelect(e, 'positions', 'isAddPosition')}
                            />
                        </Show.When>

                        <Show.Else>
                            <AddButton onClick={() => setValues(prev => ({...prev, isAddPosition: true}))}>
                                Add position
                            </AddButton>
                        </Show.Else>
                    </Show>

                    {errors.positions && isSubmitted &&
                        <p className="mt-2 text-[#9E0F20] text-xs">Select at least one position</p>}
                </div>

                <div className="flex flex-col gap-1 mt-2.5">
                    <h3 className="font-jost text-[#2D2A33]">Region *</h3>

                    <div className="flex flex-row gap-2.5">
                        {
                            values.regions.map((region) => (
                                <ButtonVariant3
                                    key={`region-${region.value}`}
                                    type="button"
                                    onClick={() => onRemoveItem(region, 'regions', 'allRegions')}
                                >
                                    {region.label}
                                </ButtonVariant3>
                            ))
                        }
                    </div>

                    <Show>
                        <Show.When isTrue={values.isAddRegion}>
                            <TextDown
                                className="mt-[5px]"
                                options={options.regions}
                                error={errors.regions}
                                searchAble={true}
                                hasTools={false}
                                clearOnSelect={true}
                                onEnterSelect={false}
                                isAbsolute={true}
                                onChange={(e) => onChangeSelect(e, 'regions', 'isAddRegion')}
                            />
                        </Show.When>

                        <Show.Else>
                            <AddButton onClick={() => setValues(prev => ({...prev, isAddRegion: true}))}>
                                Add region
                            </AddButton>
                        </Show.Else>
                    </Show>

                    {errors.regions && isSubmitted &&
                        <p className="mt-2 text-[#9E0F20] text-xs">Select at least one region</p>}
                </div>

                <div className="flex flex-col gap-1 mt-2.5">
                    <h3 className="font-jost text-[#2D2A33]">Start date</h3>

                    <div className="flex flex-row gap-12 mt-2">
                        <ModalRadioInput
                            onChange={onRadioChange}
                            name="canStartImmediately"
                            condition={true}
                            title="Immediately"
                            value={values.canStartImmediately}
                        />

                        <ModalRadioInput
                            onChange={onRadioChange}
                            condition={false}
                            name="canStartImmediately"
                            title="After time"
                            value={values.canStartImmediately}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1 mt-2.5">
                    <h3 className="font-jost text-[#2D2A33]">Employment types *</h3>

                    <div className="flex flex-row flex-wrap gap-3">
                        {
                            employmentTypes.map(({value, label}) => (
                                <ButtonVariant2
                                    key={`employmentType-${value}`}
                                    type="button"
                                    onClick={() => onChangeTypes(value)}
                                    active={values[value]}
                                >
                                    {label}
                                </ButtonVariant2>
                            ))
                        }
                    </div>
                    {errors.employmentTypes && isSubmitted &&
                        <p className="mt-2 text-[#9E0F20] text-xs">Select at least one employment type</p>}
                </div>

                <div className="flex flex-col gap-1 mt-2.5">
                    <h3 className="font-jost text-[#2D2A33]">Visibility (who can view you’re open to work) *</h3>

                    <div className="flex flex-col gap-4 mt-2">
                        <ModalRadioInput
                            onChange={onRadioChange}
                            name="visibleForAll"
                            condition={true}
                            title="Only recruiters"
                            value={values.visibleForAll}
                        />

                        <ModalRadioInput
                            onChange={onRadioChange}
                            condition={false}
                            name="visibleForAll"
                            title="All Job For You members"
                            value={values.visibleForAll}
                        />
                    </div>
                </div>
            </div>
        </EditModalForm>
    )
}
export default OpenToWork;