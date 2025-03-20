import { ChangeEventHandler } from "react";

export type UserInformation = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
};

export type PhoneInputState = [string, string, string, string];

export type State = { userInformation: UserInformation | null };

export interface ITextField {
  labelText: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler;
}

export interface IPhoneInput {
  phoneInputState: PhoneInputState;
  setPhoneInputState: (phoneInputState: PhoneInputState) => void;
}

export interface IUserData {
  handleUserData: (userData: UserInformation) => void;
}
