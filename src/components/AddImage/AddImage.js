import XMarkIcon from "../../elements/XMarkIcon/XMarkIcon";
import illustration from "../../assets/image-add-illustration.svg"
import Dropzone from "../Dropzone/Dropzone";
import React from "react";
import ConditionalWrapper from "../../elements/ConditionalWrapper/ConditionalWrapper";
import CircularArrowIcon from "../../elements/CircularArrowIcon/CircularArrowIcon";
import {profileService} from "../../services/profileService";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import Cropper from "../Cropper/Cropper";
import {useImageCropContext} from "../../providers/ImageCropProvider";
import {readFile} from "../../utils/cropImage";
import {RotationSlider, ZoomSlider} from "../Cropper/CropperSliders";

const AddImage = ({onClose, isBackground = false}) => {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const {image, setImage, rotation, setRotation, getProcessedImage} = useImageCropContext();

    const handleFileChange = async ({target: {files}}) => {
        const file = files && files[0];
        if (!file) return;
        const imageDataUrl = await readFile(file);
        setImage(imageDataUrl);
    };

    const handleDone = async () => {
        const avatar = await getProcessedImage();

        const reader = new FileReader();
        reader.readAsDataURL(avatar);
        reader.onloadend = () => {
            const base64data = reader.result;
            profileService.changeImage(base64data, isBackground)
                .then(({data}) => {
                    dispatch({
                        type: 'SET_USER',
                        current_user: data
                    });
                    setImage(undefined);
                    navigator('/in');
                })
        };
    };

    return (
        <React.Fragment>
            <div className="flex flex-col gap-2.5 py-5 px-8 w-[750px]"
                 style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
                <div className="flex flex-row pt-2.5 pb-5">
                    <h1 className="font-jost font-semibold text-[#2D2A33] text-xl">
                        {image ? isBackground ? "Edit background" : "Edit image " : isBackground ? "Add background" : "Add image"}
                    </h1>

                    <button onClick={onClose} className="ml-auto">
                        <XMarkIcon className="fill-[#7D7D7D] h-4"/>
                    </button>
                </div>

                <ConditionalWrapper condition={!image}>
                    <Dropzone onFileSelect={handleFileChange}
                              className="flex flex-col items-center  border-t-[0.5px] border-[#24459A80] pb-2.5">
                        <img className="w-fit h-fit" src={illustration} alt="illustration"/>

                        <h3 className="font-jost font-light text-sm py-1 text-center">
                            At <strong>Job for You</strong>, we embrace your authenticity! Take a photo or upload an
                            existing
                            one to make your profile as realistic as possible. We support your unique presentation,
                            without
                            editing or filters – here, it's all about you!
                        </h3>
                    </Dropzone>

                    <div className="flex justify-end pt-2.5 pb-1">
                        <label htmlFor="upload"
                               className="cursor-pointer font-jost py-1 px-5 rounded-full bg-[#24459A] text-white text-sm">
                            <input id="upload" className="hidden" onChange={handleFileChange}
                                   accept="image/png, image/jpg, image/jpeg" type="file" multiple={false}/>
                            Upload image
                        </label>
                    </div>
                </ConditionalWrapper>
                <ConditionalWrapper condition={image}>
                    <div className="flex flex-col items-center overflow-hidden bg-[#D9D9D9]">
                        <Cropper cropShape={isBackground ? "rect" : "round"} aspect={isBackground ? 4 : 1}/>
                    </div>

                    <div className="flex flex-row justify-end gap-2.5 pt-2.5 pb-1 px-4">
                        <button onClick={() => setRotation(rotation + 90)}
                                className="flex items-center justify-center border-[1px] border-[#7D88A4] rounded-full w-8 h-8">
                            <CircularArrowIcon className="fill-[#7D88A4] h-4"/>
                        </button>

                        <button onClick={() => setRotation(rotation - 90)}
                                className="flex items-center justify-center border-[1px] border-[#7D88A4] rounded-full w-8 h-8">
                            <CircularArrowIcon className="fill-[#7D88A4] h-4" style={{transform: "rotateY(-180deg)"}}/>
                        </button>
                    </div>

                    <div className="flex flex-row gap-2.5 py-1">
                        <ZoomSlider/>

                        <RotationSlider/>
                    </div>

                    <div className="flex justify-end pt-2.5 pb-1 gap-5">
                        <label htmlFor="changeImage"
                               className="cursor-pointer font-jost py-1 px-5 rounded-full border-[1px] border-[#24459A] text-[#556DA9] text-sm">
                            <input id="changeImage" className="hidden" onChange={handleFileChange}
                                   accept="image/png, image/jpg, image/jpeg" type="file" multiple={false}/>
                            Change image
                        </label>

                        <button onClick={handleDone}
                                className="cursor-pointer font-jost py-1 px-5 rounded-full bg-[#24459A] text-white text-sm">
                            Save image
                        </button>
                    </div>
                </ConditionalWrapper>
            </div>
        </React.Fragment>
    )
}
export default AddImage;