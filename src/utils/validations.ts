import {
  MIN_NAME_LENGTH,
  PHONE_INPUT_LENGTH,
  VALID_EMAIL_REGEX,
} from "./Constants";
import { PhoneInputState } from "../types";
import { allCities } from "./all-cities";
import { convertPhoneInputToString } from "./transformations";

export function isEmailValid(emailAddress: string) {
  return !!emailAddress.match(VALID_EMAIL_REGEX);
}
export function isNameValid(name: string) {
  return name.length >= MIN_NAME_LENGTH;
}

export function isCityValid(city: string) {
  return allCities
    .map((acceptedCities) => acceptedCities.toLowerCase())
    .includes(city.toLowerCase());
}

export function isPhoneValid(phone: PhoneInputState) {
  return convertPhoneInputToString(phone).length === PHONE_INPUT_LENGTH;
}

export const isFormValid = (
  firstNameInput: string,
  lastNameInput: string,
  emailInput: string,
  cityInput: string,
  phoneInput: PhoneInputState
) => {
  return (
    isNameValid(firstNameInput) &&
    isNameValid(lastNameInput) &&
    isEmailValid(emailInput) &&
    isCityValid(cityInput) &&
    isPhoneValid(phoneInput)
  );
};
