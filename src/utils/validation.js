// utils/validation.js

export const isNotEmpty = (value) => {
  return value !== null;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isWithinLength = (value, min, max) => {
  if (!isNotEmpty(value)) return false;
  const length = value.toString().length;
  return length >= min && length <= max;
};

export const isNumber = (value) => {
  return !isNaN(value);
};

// Hàm validate chung
export const validate = (value, rules = []) => {
  for (const rule of rules) {
    if (!rule.check(value)) {
      return rule.message || "Invalid value";
    }
  }
  return true;
};
