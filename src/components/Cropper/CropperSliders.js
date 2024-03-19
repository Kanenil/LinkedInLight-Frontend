import {useImageCropContext} from "../../providers/ImageCropProvider";
import MinusIcon from "../../elements/MinusIcon/MinusIcon";
import PlusIcon from "../../elements/PlusIcon/PlusIcon";
import React from "react";

export const ZoomSlider = () => {
    const { zoom, setZoom, handleZoomIn, handleZoomOut, max_zoom, min_zoom, zoom_step } =
        useImageCropContext();

    return (
        <div className="flex flex-col gap-2.5 p-2.5 w-full">
            <h1 className="font-jost font-light text-black">Zoom</h1>

            <div className="flex flex-row p-2.5 gap-2.5">
                <button onClick={handleZoomOut}>
                    <MinusIcon className="w-5 fill-[#7D88A4]" />
                </button>
                <input
                    type="range"
                    className="w-full"
                    name="volju"
                    min={min_zoom}
                    max={max_zoom}
                    step={zoom_step}
                    value={zoom}
                    onChange={e => {
                        setZoom(Number(e.target.value));
                    }}
                />
                <button onClick={handleZoomIn}>
                    <PlusIcon className="h-5 fill-[#7D88A4]" />
                </button>
            </div>
        </div>
    );
};

export const RotationSlider = () => {
    const {
        rotation,
        setRotation,
        max_rotation,
        min_rotation,
        rotation_step,
        handleRotateAntiCw,
        handleRotateCw
    } = useImageCropContext();

    return (
        <div className="flex flex-col gap-2.5 p-2.5 w-full">
            <h1 className="font-jost font-light text-black">Straighten</h1>

            <div className="flex flex-row p-2.5 gap-2.5">
                <button onClick={handleRotateAntiCw}>
                    <MinusIcon className="w-5 fill-[#7D88A4]" />
                </button>
                <input
                    type="range"
                    name="volju"
                    min={min_rotation}
                    max={max_rotation}
                    step={rotation_step}
                    value={rotation}
                    className="w-full"
                    onChange={e => {
                        setRotation(Number(e.target.value));
                    }}
                />
                <button onClick={handleRotateCw}>
                    <PlusIcon className="h-5 fill-[#7D88A4]" />
                </button>
            </div>
        </div>
    );
};