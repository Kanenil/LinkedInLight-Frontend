import React from 'react';

const Dropzone = ({children, onFileSelect, className, ...props}) => {
    const onDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const onDragEnter = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const onDragLeave = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const onDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const files = e.dataTransfer.files;

        if (files.length > 1)
            return;

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        for (const file of files) {
            if (!allowedTypes.includes(file.type)) {
                console.log('Wrong type:', file.type);
                return;
            }
        }

        onFileSelect(files[0]);

        return false;
    };

    return (
        <div className={className} onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave}
             onDrop={onDrop} {...props}>
            {children}
        </div>
    )
}
export default Dropzone;