import XMarkIcon from "../../elements/XMarkIcon/XMarkIcon";
import illustration from "../../assets/image-add-illustration.svg"
import Dropzone from "../Dropzone/Dropzone";
import React, {useRef, useState} from "react";
import ConditionalWrapper from "../../elements/ConditionalWrapper/ConditionalWrapper";
import {centerCrop, convertToPixelCrop, makeAspectCrop, ReactCrop} from "react-image-crop";
import CircularArrowIcon from "../../elements/CircularArrowIcon/CircularArrowIcon";
import PlusIcon from "../../elements/PlusIcon/PlusIcon";
import MinusIcon from "../../elements/MinusIcon/MinusIcon";
import setCanvasPreview from "../../utils/setCanvasPreview";
import {profileService} from "../../services/profileService";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const AddImage = ({onClose}) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [zoom, setZoom] = useState(1);
    const [straighten, setStraighten] = useState(0);
    const [additionalStraighten, setAdditionalStraighten] = useState(0);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                const {naturalWidth, naturalHeight} = e.currentTarget;
                if (naturalWidth < 100 || naturalHeight < 100) {
                    return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const {width, height} = e.currentTarget;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: 100,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const onSave = () => {
        setCanvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
            )
        );
        const dataUrl = previewCanvasRef.current.toDataURL();
        profileService.changeImage(dataUrl)
            .then(({data}) => {
                dispatch({
                    type: 'SET_USER',
                    current_user: data
                });
                navigator('/in');
            })
    }

    return (
        <React.Fragment>
            <div className="flex flex-col gap-2.5 py-5 px-8 w-[750px]"
                 style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
                <div className="flex flex-row pt-2.5 pb-5">
                    <h1 className="font-jost font-semibold text-[#2D2A33] text-xl">{imgSrc ? "Edit image " : "Add image"} </h1>

                    <button onClick={onClose} className="ml-auto">
                        <XMarkIcon className="fill-[#7D7D7D] h-4"/>
                    </button>
                </div>

                <ConditionalWrapper condition={!imgSrc}>
                    <Dropzone onFileSelect={onSelectFile}
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
                            <input id="upload" className="hidden" onChange={onSelectFile}
                                   accept="image/png, image/jpg, image/jpeg" type="file" multiple={false}/>
                            Upload image
                        </label>
                    </div>
                </ConditionalWrapper>
                <ConditionalWrapper condition={imgSrc}>
                    <div className="flex flex-col items-center">
                        <ReactCrop
                            crop={crop}
                            className="Crop--outline"
                            style={{outline: '2px solid #24459A'}}
                            disabled={true}
                            circularCrop
                            keepSelection
                            aspect={ASPECT_RATIO}
                            minWidth={MIN_DIMENSION}
                            onChange={() => {}}>
                            <img
                                ref={imgRef}
                                src={imgSrc}
                                alt="Upload"
                                style={{maxHeight: "50vh", transform: `rotate(${straighten}deg) rotate(${additionalStraighten}deg) scale(${zoom})`}}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                        <canvas ref={previewCanvasRef} className="hidden"/>
                    </div>

                    <div className="flex flex-row justify-end gap-2.5 pt-2.5 pb-1 px-4">
                        <button onClick={() => setAdditionalStraighten(additionalStraighten + 90)}
                            className="flex items-center justify-center border-[1px] border-[#7D88A4] rounded-full w-8 h-8">
                            <CircularArrowIcon className="fill-[#7D88A4] h-4"/>
                        </button>

                        <button onClick={() => setAdditionalStraighten(additionalStraighten - 90)}
                            className="flex items-center justify-center border-[1px] border-[#7D88A4] rounded-full w-8 h-8">
                            <CircularArrowIcon className="fill-[#7D88A4] h-4" style={{transform: "rotateY(-180deg)"}}/>
                        </button>
                    </div>

                    <div className="flex flex-row gap-2.5 py-1">
                        <div className="flex flex-col gap-2.5 p-2.5 w-full">
                            <h1 className="font-jost font-light text-black">Zoom</h1>

                            <div className="flex flex-row p-2.5 gap-2.5">
                                <button onClick={() => setZoom( zoom - 0.1 >= 1? zoom - 0.1: zoom)}>
                                    <MinusIcon className="w-5 fill-[#7D88A4]" />
                                </button>
                                <input value={zoom} min={1} step={0.1} max={3} onChange={(e) => setZoom(e.target.value)}
                                       className="w-full" type="range"/>
                                <button onClick={() => setZoom( zoom + 0.1 <= 3? zoom + 0.1: zoom)}>
                                    <PlusIcon className="h-5 fill-[#7D88A4]" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5 p-2.5 w-full">
                            <h1 className="font-jost font-light text-black">Straighten</h1>

                            <div className="flex flex-row p-2.5 gap-2.5">
                                <button onClick={() => setStraighten( straighten - 1 >= -45? straighten - 1: straighten)}>
                                    <MinusIcon className="w-5 fill-[#7D88A4]" />
                                </button>
                                <input value={straighten} min={-45} step={1} max={45}
                                       onChange={(e) => setStraighten(e.target.value)} className="w-full" type="range"/>
                                <button onClick={() => setStraighten( straighten + 1 <= 45? straighten + 1: straighten)}>
                                    <PlusIcon className="h-5 fill-[#7D88A4]" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2.5 pb-1 gap-5">
                        <label htmlFor="changeImage"
                               className="cursor-pointer font-jost py-1 px-5 rounded-full border-[1px] border-[#24459A] text-[#556DA9] text-sm">
                            <input id="changeImage" className="hidden" onChange={onSelectFile}
                                   accept="image/png image/jpg image/jpeg" type="file" multiple={false}/>
                            Change image
                        </label>

                        <button onClick={onSave}
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