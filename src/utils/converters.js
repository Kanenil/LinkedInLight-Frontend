function imageUrlToBase64(
    url,
    callback
) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.setRequestHeader("Pragma","no-cache");
    xhr.send();

    xhr.onload = ()=> {
        const reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.onloadend = () => callback(reader.result);
    }
}

export {imageUrlToBase64}