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

function slugify(str) {
    return String(str)
        .normalize('NFKD') // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
}

function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function (result, key) {
        result[key] = mapFn(object[key])
        return result
    }, {})
}

async function asyncFilter(arr, cb){
    const filtered = [];

    for (const element of arr) {
        const needAdd = await cb(element);

        if (needAdd) {
            filtered.push(element);
        }
    }

    return filtered;
}

export {imageUrlToBase64, slugify, objectMap, asyncFilter}