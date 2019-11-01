/*const isEmpty = value =>
{
    value === {} ||
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value.length === 0)) ||
    (typeof value === 'string' && value.trim().length === 0)
};*/
const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
export default isEmpty;
