/*const isEmpty = value =>
{
    value === {} ||
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value.length === 0)) ||
    (typeof value === 'string' && value.trim().length === 0)
};*/
const isAdmin = obj => {
  if (obj.role === "admin") {
    return true;
  } else {
    return false;
  }
};
export default isAdmin;
