import React, { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassPhoneInput } from "./ClassComponents/ClassPhoneInput";
import { IUserData, PhoneInputState } from "../types";
import {
  isCityValid,
  isEmailValid,
  isFormValid,
  isNameValid,
  isPhoneValid,
} from "../utils/validations";
import {
  cityErrorMessage,
  emailErrorMessage,
  firstNameErrorMessage,
  lastNameErrorMessage,
  phoneNumberErrorMessage,
} from "../utils/Constants";
import { ClassTextField } from "./ClassComponents/ClassTextField";
import { convertPhoneInputToString } from "../utils/transformations";

export class ClassForm extends Component<IUserData> {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: ["", "", "", ""] as PhoneInputState,
    isSubmitted: false,
  };

  handlePhoneState = (phoneInputState: PhoneInputState) => {
    this.setState({
      phone: [...phoneInputState],
    });
  };

  render() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.setState({ isSubmitted: true });
          if (
            isFormValid(
              this.state.firstName,
              this.state.lastName,
              this.state.email,
              this.state.city,
              this.state.phone
            )
          ) {
            this.props.handleUserData({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              city: this.state.city,
              phone: convertPhoneInputToString(this.state.phone),
            });
            this.setState({
              firstName: "",
              lastName: "",
              email: "",
              city: "",
              phone: ["", "", "", ""] as PhoneInputState,
              isSubmitted: false,
            });
          } else {
            alert("Bad Input");
          }
        }}
      >
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassTextField
          labelText={"First Name"}
          placeholder={"Bilbo"}
          value={this.state.firstName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ firstName: event.target.value });
          }}
        />
        <ErrorMessage
          message={firstNameErrorMessage}
          show={!isNameValid(this.state.firstName) && this.state.isSubmitted}
        />

        {/* last name input */}
        <ClassTextField
          labelText={"Last Name"}
          placeholder={"Baggins"}
          value={this.state.lastName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ lastName: event.target.value });
          }}
        />
        <ErrorMessage
          message={lastNameErrorMessage}
          show={!isNameValid(this.state.lastName) && this.state.isSubmitted}
        />

        {/* Email Input */}
        <ClassTextField
          labelText={"Email"}
          placeholder={"bilbo-baggins@adventurehobbits.net"}
          value={this.state.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ email: event.target.value });
          }}
        />
        <ErrorMessage
          message={emailErrorMessage}
          show={!isEmailValid(this.state.email) && this.state.isSubmitted}
        />

        {/* City Input */}
        <ClassTextField
          labelText={"City"}
          placeholder={"Hobbiton"}
          value={this.state.city}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ city: event.target.value });
          }}
        />
        <ErrorMessage
          message={cityErrorMessage}
          show={!isCityValid(this.state.city) && this.state.isSubmitted}
        />

        <ClassPhoneInput
          phoneInputState={this.state.phone}
          setPhoneInputState={this.handlePhoneState}
        />
        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={!isPhoneValid(this.state.phone) && this.state.isSubmitted}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
