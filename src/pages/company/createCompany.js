import React, {useEffect} from "react";
import {ArrowLeftIcon} from "@heroicons/react/24/solid";
import {useNavigate} from "react-router";
import {Helmet} from "react-helmet-async";
import {AddButtonVariant2, AddButtonVariant3} from "../../elements/buttons/AddButton";
import ModalInputFormGroup from "../../components/shared/forms/ModalInputFormGroup";
import useForm from "../../hooks/useForm";
import {APP_ENV} from "../../env";
import {slugify} from "../../utils/converters";
import CompanyService from "../../services/companyService";
import ModalSelectFormGroup from "../../components/shared/forms/ModalSelectFormGroup";
import ModalCheckFormGroup from "../../components/shared/forms/ModalCheckFormGroup";
import {ArrowDownTrayIcon, XMarkIcon} from "@heroicons/react/24/outline";
import Dropzone from "../../components/shared/Dropzone";
import Show from "../../elements/shared/Show";
import {readFile} from "../../utils/cropImage";
import {useAlertContext} from "../../providers/AlertProvider";

const CreateCompany = () => {
    const navigator = useNavigate();
    const {success} = useAlertContext();

    const initialValues = {
        options: {
            industry: [],
            organizationType: [],
            organizationSize: []
        },
        values: {
            companyName: '',
            linkedinUrl: '',
            industry: '',
            organizationType: '',
            organizationSize: '',
            websiteUrl: '',
            logo: '',
            tagline: '',
            terms: false
        },
        errors: {
            companyName: true,
            linkedinUrl: true,
            industry: true,
            organizationType: true,
            organizationSize: true,
            terms: true
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
        setOptions,
        touched,
        setIsSubmitted
    } = useForm(initialValues, () => {
    });

    useEffect(() => {
        CompanyService.getIndustries().then(({data}) => {
            setOptions(prev => ({
                ...prev,
                industry: data.map(val => ({value: val.id, label: val.name}))
            }))
        })
        CompanyService.getTypes().then(({data}) => {
            setOptions(prev => ({
                ...prev,
                organizationType: data.map(val => ({value: val, label: val}))
            }))
        })
        CompanyService.getSizes().then(({data}) => {
            setOptions(prev => ({
                ...prev,
                organizationSize: data.map(val => ({value: val, label: val}))
            }))
        })
    }, [])

    const onFileSelect = async (e) => {
        let imageDataUrl = null;

        if (e.target) {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            imageDataUrl = await readFile(file);
        } else {
            imageDataUrl = await readFile(e);
        }

        const img = new Image();
        img.src = imageDataUrl;
        img.onload = () => {
            setErrors(prev => ({
                ...prev,
                logo: ''
            }))

            // if (img.height > 150) {
            //     setErrors(prev => ({
            //         ...prev,
            //         logo: 'Image higher than 150px!'
            //     }))
            //     return;
            // }

            setValues(prev => ({
                ...prev,
                logo: imageDataUrl
            }))
        };
    }

    const handleSubmit = () => {
        if (!values.terms)
            return setErrors(prev => ({
                ...prev,
                terms: true
            }))

        const model = {
            id: 0,
            companyName: values.companyName,
            linkedinUrl: values.linkedinUrl,
            websiteUrl: values.websiteUrl,
            organizationSize: values.organizationSize,
            organizationType: values.organizationType,
            logoImg: values.logo,
            tagline: values.tagline,
            applicationUserId: "",
            industryId: options.industry.find(val => val.label === values.industry).value
        }

        CompanyService
            .create(model)
            .then(() => {
                navigator(-1);
                success("Company successfully created", 5);
            })
            .catch(err => {
                setIsSubmitted(true);
                if(err.response.data === "This URL already exists")
                    setErrors(prev => ({
                        ...prev,
                        linkedinUrl: "This URL already exists"
                    }))
            })
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>New company</title>
            </Helmet>
            <main className='flex-grow bg-[#E7E7E7]'>
                <section className="bg-white">
                    <div className="flex flex-col gap-3 py-2.5 ml-4 md:mx-auto md:w-[1170px]">
                        <button onClick={() => navigator(-1)}
                                className="flex flex-row items-center gap-5 w-fit hover:underline">
                            <ArrowLeftIcon className="text-[#24459A] w-7 h-7"/>

                            <span className="font-jost font-medium text-2xl">Back</span>
                        </button>

                        <h3 className="font-jost text-[#2D2A33] text-lg">Let’s get started with a few details about your
                            company</h3>
                    </div>
                </section>

                <section className="flex flex-col mx-auto md:container lg:w-[1170px] mt-7 mb-16">
                    <h3 className="text-[#2D2A33] font-jost font-light text-sm">Required fields marked as *</h3>

                    <div className="flex flex-col md:flex-row mt-1.5">
                        <form onSubmit={(e) => onSubmit(e, handleSubmit)}
                              className="w-full md:w-7/12 flex flex-col gap-2.5 p-4 rounded-lg bg-white">
                            <ModalInputFormGroup
                                title="Company name *"
                                name="companyName"
                                type="text"
                                value={values.companyName}
                                onChange={(e) => {
                                    onChangeInput(e);
                                    if (!touched.linkedinUrl) {
                                        setValues(prev => ({
                                            ...prev,
                                            linkedinUrl: slugify(e.target.value)
                                        }))
                                        setErrors(prev => ({
                                            ...prev,
                                            linkedinUrl: e.target.value.length === 0
                                        }))
                                    }
                                }}
                                placeholder="Enter name of your company"
                                className="gap-[5px]"
                                error={isSubmitted && errors.companyName}
                                errorChildren={
                                    <p className="mt-2 text-[#9E0F20] text-xs">This field is required</p>
                                }
                            />

                            <ModalInputFormGroup
                                title={APP_ENV.FRONTEND_URL + '/j4y/company/'}
                                name="linkedinUrl"
                                type="text"
                                value={values.linkedinUrl}
                                onChange={onChangeInput}
                                placeholder="Add URL"
                                className="gap-[5px]"
                                error={isSubmitted && !!errors.linkedinUrl}
                                errorChildren={
                                    <p className="mt-2 text-[#9E0F20] text-xs">{typeof errors.linkedinUrl == 'string'?errors.linkedinUrl:"This field is required"}</p>
                                }
                            />

                            <ModalSelectFormGroup
                                className="gap-[5px]"
                                title="Industry *"
                                value={values.industry}
                                options={options.industry}
                                containerWidth={300}
                                containerHeightMax={200}
                                placeHolder="ex: Software Development"
                                error={isSubmitted && errors['industry']}
                                hasTools={false}
                                onEnterSelect={false}
                                isAbsolute={true}
                                clearOnSelect={false}
                                onChange={(e) => handleChangeSelect(e, "industry")}
                                errorChildren={
                                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                                }
                            />

                            <ModalSelectFormGroup
                                className="gap-[5px]"
                                title="Organization type *"
                                value={values.organizationType}
                                options={options.organizationType}
                                containerWidth={300}
                                containerHeightMax={200}
                                placeHolder="Select from the list"
                                error={isSubmitted && errors['organizationType']}
                                hasTools={false}
                                onEnterSelect={false}
                                isAbsolute={true}
                                clearOnSelect={false}
                                onChange={(e) => handleChangeSelect(e, "organizationType")}
                                errorChildren={
                                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                                }
                            />

                            <ModalSelectFormGroup
                                className="gap-[5px]"
                                title="Organization size *"
                                value={values.organizationSize}
                                options={options.organizationSize}
                                containerWidth={300}
                                containerHeightMax={200}
                                placeHolder="Select from the list"
                                error={isSubmitted && errors['organizationSize']}
                                hasTools={false}
                                onEnterSelect={false}
                                isAbsolute={true}
                                clearOnSelect={false}
                                onChange={(e) => handleChangeSelect(e, "organizationSize")}
                                errorChildren={
                                    <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                                }
                            />

                            <ModalInputFormGroup
                                title="Website"
                                name="websiteUrl"
                                type="url"
                                value={values.websiteUrl}
                                onChange={onChangeInput}
                                placeholder="http:// or https://"
                                className="gap-[5px]"
                            />

                            <Show>
                                <Show.When isTrue={!!values.logo}>
                                    <div>
                                        <h1 className="font-jost text-[#2D2A33]">Logo</h1>

                                        <div
                                            className="flex flex-row rounded-lg border-dashed border-[1px] border-[#24459A] bg-[#F0F1F3] py-5">
                                            <div className="flex items-center max-w-[150px] max-h-[150px]">
                                                <img className="object-contain" src={values.logo}/>
                                            </div>

                                            <button type="button"
                                                    onClick={() => setValues(prev => ({...prev, logo: ''}))}
                                                    className="ml-auto mb-auto mr-4 hover:text-gray-600">
                                                <XMarkIcon className="w-6 h-6"/>
                                            </button>
                                        </div>
                                    </div>
                                </Show.When>

                                <Show.Else>
                                    <label htmlFor="logo">
                                        <h1 className="font-jost text-[#2D2A33]">Logo</h1>
                                        <input id="logo" onChange={onFileSelect} className="hidden" type="file"
                                               accept="image/jpeg, image/jpg, image/png"/>

                                        <Dropzone onFileSelect={onFileSelect}
                                                  className="flex flex-col rounded-lg justify-center items-center border-dashed border-[1px] border-[#24459A] bg-[#F0F1F3] py-5">
                                            <div className="flex flex-row items-center gap-3">
                                                <ArrowDownTrayIcon className="w-6 h-6 text-[#24459A]"/>

                                                <span className="text-[#2D2A33] font-jost text-lg">Upload logo</span>
                                            </div>

                                            <h3 className="font-extralight font-jost mt-2.5">Upload the file to
                                                preview</h3>

                                        </Dropzone>
                                        {errors.logo && <h3 className="mt-2 text-[#9E0F20] text-xs">{errors.logo}</h3>}
                                    </label>
                                </Show.Else>
                            </Show>

                            <ModalInputFormGroup
                                title="Tagline"
                                name="tagline"
                                type="text"
                                value={values.tagline}
                                onChange={onChangeInput}
                                placeholder=""
                                className="gap-[5px]"
                            />

                            <ModalCheckFormGroup
                                className="gap-[5px]"
                                name="terms"
                                onChange={onChangeInput}
                                value={values.terms}
                                error={isSubmitted && errors.terms}
                                errorChildren={
                                    <h3 className="mt-2 text-[#9E0F20] text-xs">This is required</h3>
                                }
                                title="I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this page."
                            />

                            <div className="ml-auto pt-4 pb-1">
                                <AddButtonVariant3 type="submit">
                                    Create company
                                </AddButtonVariant3>
                            </div>
                        </form>

                        <div
                            className="w-full md:w-5/12 mt-6 md:mt-0 md:ml-6 flex flex-col h-fit rounded-lg overflow-hidden border-[1px] border-[#B4BFDD]">
                            <div className="border-b-[1px] border-b-[#24459A] px-5 py-3.5 bg-white">
                                <h3 className="text-lg text-[#2D2A33] font-jost font-semibold">Preview</h3>
                            </div>

                            <div className="px-5 pt-5 pb-6 bg-[#F0F1F3]">
                                <div
                                    className="flex flex-col gap-2.5 p-5 border-[1px] border-[#E7E7E7] bg-white rounded-xl">

                                    <Show>
                                        <Show.When isTrue={!!values.logo}>
                                            <div className="flex items-center max-w-[150px] max-h-[150px]">
                                                <img className="object-contain" src={values.logo}/>
                                            </div>
                                        </Show.When>

                                        <Show.Else>
                                            <div
                                                className="flex items-center justify-center w-[80px] h-[80px] bg-[#F0F1F3]">
                                                <h3 className="text-[#2D2A33] font-semibold font-jost">logo</h3>
                                            </div>
                                        </Show.Else>
                                    </Show>

                                    <div className="flex flex-col gap-1.5 font-jost text-[#2D2A33]">
                                        <h1 className="font-semibold text-lg">{values.companyName.length > 0 ? values.companyName : "Company name"}</h1>

                                        <h2 className="font-light break-words text-wrap">{values.tagline.length > 0 ? values.tagline : "Tagline"}</h2>

                                        <h1 className="text-[#BBBBBB] font-light">{values.industry.length > 0 ? values.industry : "Industry"}</h1>
                                    </div>

                                    <div>
                                        <AddButtonVariant2 className="text-sm px-4" iconClass="w-4 h-4">
                                            Follow
                                        </AddButtonVariant2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </React.Fragment>
    )
}
export default CreateCompany;