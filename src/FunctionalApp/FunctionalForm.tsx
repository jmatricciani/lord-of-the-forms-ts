import React, { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalPhoneInput } from "./FunctionalComponents/FunctionalPhoneInput";
import { PhoneInputState, UserInformation } from "../types";
import {
  cityErrorMessage,
  emailErrorMessage,
  firstNameErrorMessage,
  lastNameErrorMessage,
  phoneNumberErrorMessage,
} from "../utils/Constants";
import {
  isCityValid,
  isEmailValid,
  isFormValid,
  isNameValid,
  isPhoneValid,
} from "../utils/validations";
import { FunctionalTextField } from "./FunctionalComponents/FunctionalTextField";
import { convertPhoneInputToString } from "../utils/transformations";

//Thought this function to be clever and useful, but doesn't apply to phone or submitted state
//Also does not work with the class based states
const resetForm = (
  setters: React.Dispatch<React.SetStateAction<string>>[]
): void => {
  setters.forEach((setter) => {
    setter("");
  });
};

export function FunctionalForm({
  handleUserData,
}: {
  handleUserData: (userData: UserInformation) => void;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>([
    "",
    "",
    "",
    "",
  ]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setIsSubmitted(true);
        if (
          isFormValid(
            firstNameInput,
            lastNameInput,
            emailInput,
            cityInput,
            phoneInput
          )
        ) {
          handleUserData({
            firstName: firstNameInput,
            lastName: lastNameInput,
            email: emailInput,
            city: cityInput,
            phone: convertPhoneInputToString(phoneInput),
          });
          resetForm([
            setFirstNameInput,
            setLastNameInput,
            setEmailInput,
            setCityInput,
          ]);
          setPhoneInput(["", "", "", ""]);
          setIsSubmitted(false);
        } else {
          alert("Bad Input");
        }
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextField
        labelText={"First Name"}
        inputProps={{
          placeholder: "Bilbo",
          value: firstNameInput,
          onChange: (event) => {
            setFirstNameInput(event.target.value);
          },
        }}
      />
      <ErrorMessage
        message={firstNameErrorMessage}
        show={!isNameValid(firstNameInput) && isSubmitted}
      />

      {/* last name input */}
      <FunctionalTextField
        labelText={"Last Name"}
        inputProps={{
          placeholder: "Baggins",
          value: lastNameInput,
          onChange: (event) => {
            setLastNameInput(event.target.value);
          },
        }}
      />
      <ErrorMessage
        message={lastNameErrorMessage}
        show={!isNameValid(lastNameInput) && isSubmitted}
      />

      {/* Email Input */}
      <FunctionalTextField
        labelText={"Email"}
        inputProps={{
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: emailInput,
          onChange: (event) => {
            setEmailInput(event?.target.value);
          },
        }}
      />
      <ErrorMessage
        message={emailErrorMessage}
        show={!isEmailValid(emailInput) && isSubmitted}
      />

      {/* City Input */}
      <FunctionalTextField
        labelText={"City"}
        inputProps={{
          placeholder: "Hobbiton",
          value: cityInput,
          onChange: (event) => {
            setCityInput(event.target.value);
          },
          list: "cities",
        }}
      />
      <ErrorMessage
        message={cityErrorMessage}
        show={!isCityValid(cityInput) && isSubmitted}
      />

      <FunctionalPhoneInput
        phoneInputState={phoneInput}
        setPhoneInputState={setPhoneInput}
      />

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={!isPhoneValid(phoneInput) && isSubmitted}
      />

      <input type="submit" value="Submit" />
    </form>
  );
}
