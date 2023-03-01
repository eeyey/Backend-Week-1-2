function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

function isValidInt(value) {
  if (!isString(value) && !isNumber(value)) return false;

  const reg = /^(-|\d)[\d]{0,}$/;
  if (!reg.test(value) || !reg.test(value)) return false;

  return true;
}

module.exports = {
  isNumber,
  isString,
  isValidInt,
};
