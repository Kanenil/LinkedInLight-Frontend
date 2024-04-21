import * as yup from "yup";
import {useFormik} from "formik";
import React, {useEffect} from "react";
import RecommendedProfileService from "../../../../services/recommendedProfileService";
import EditModalForm from "../../forms/EditModalForm";
import {APP_ENV} from "../../../../env";
import defaultImage from "../../../../assets/default-image.jpg";
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup";
import {useQueryClient} from "@tanstack/react-query";

const GiveRecommendationSchema = yup.object({
    content: yup.string().required('Content is required')
});

const initValues = {
    content: "",
    fullName: "",
    firstName: "",
    image: "",
    headline: ""
};

const GiveRecommendation = ({onClose, onSave, onChange, id}) => {
    const queryClient = useQueryClient();

    const onSubmitFormik = async (values) => {
        RecommendedProfileService
            .giveRecommendation(values.content, id)
            .then(() => {
                queryClient.invalidateQueries(['pendingRecommendations', 'givenRecommendations', 'receivedRecommendations']);
                onSave();
            })
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: GiveRecommendationSchema,
        onSubmit: onSubmitFormik,
    });

    const {values, errors, touched, handleSubmit, handleChange, setValues} = formik;

    useEffect(() => {
        if (id) {
            RecommendedProfileService
                .recommendationById(id)
                .then(({data: recommendation}) => {
                    if(!recommendation)
                        return onClose();

                    if(recommendation.status !== 'Pending')
                        return onClose();

                    const {requester: {firstName, lastName, image, headline}} = recommendation;

                    setValues(prev => ({
                        ...prev,
                        fullName: `${firstName} ${lastName}`,
                        firstName,
                        image,
                        headline
                    }))
                })
        }
    }, [id])

    return (
        <EditModalForm
            saveTitle="Send"
            header={`Write a recommendation for ${values.fullName}`}
            withBorder={false}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <h3 className="mt-2 font-jost text-[#2D2A33] font-light text-sm">Required fields are marked with *</h3>

            <div className="mt-3 flex flex-col">
                <h1 className="font-jost font-light text-[#2D2A33] text-lg">This recommendation will be shown in {values.firstName}'s profile</h1>

                <div
                    className="flex flex-row gap-3 mt-3"
                >
                    <div
                        className="overflow-hidden h-10 w-10 my-auto bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]">
                        <img className="object-contain"
                             src={values.image ? APP_ENV.UPLOADS_URL + "/" + values.image : defaultImage}
                             alt="image"/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h1 className="font-jost font-medium">{values.fullName}</h1>

                        <h3 className="font-jost text-sm">{values.headline}</h3>
                    </div>
                </div>
            </div>

            <ModalTextareaFormGroup
                title="Add recommendation *"
                name="content"
                className="pb-[5px] px-1 gap-[5px] mt-4 flex flex-col"
                onChange={(e) => {
                    handleChange(e);
                    onChange();
                }}
                value={values.content}
                rows={4}
            />
            {touched.content && errors.content &&
                <p className="mt-2 text-[#9E0F20] text-xs">This field is required</p>}
        </EditModalForm>
    )
}
export default GiveRecommendation;