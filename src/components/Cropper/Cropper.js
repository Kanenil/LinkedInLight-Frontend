import EasyCropper from "react-easy-crop";
import {useImageCropContext} from "../../providers/ImageCropProvider";

const Cropper = ({ cropShape = "round", aspect = 1 }) => {
    const {image, zoom, setZoom, rotation, setRotation, crop, setCrop, onCropComplete} =
        useImageCropContext();

    return (
        <EasyCropper
            image={image || undefined}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            cropShape={cropShape}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            setRotation={setRotation}
            showGrid={false}
            classes={
                {containerClassName: "w-full h-[300px]", cropAreaClassName: "w-full h-full"}
            }
            style={{containerStyle: {position: "relative"}, cropAreaStyle: {border: "2px solid #24459A"}}}
        />
    )
}
export default Cropper;