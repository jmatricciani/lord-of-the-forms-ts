export const capitalize = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const convertPhoneInputToString = (phoneInput: string[]): string => {
  return phoneInput.join("");
};

export const convertStringToPhone = (phoneString: string): string => {
  return phoneString
    ? `${phoneString.slice(0, 2)}-${phoneString.slice(
        2,
        4
      )}-${phoneString.slice(4, 6)}-${phoneString[6]}`
    : "";
};
