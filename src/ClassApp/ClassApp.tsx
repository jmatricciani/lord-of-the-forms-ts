import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { State, UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component<Record<string, never>, State> {
  state = {
    userInformation: null,
  };

  handleUserData = (userData: UserInformation) => {
    this.setState({
      userInformation: { ...userData },
    });
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state.userInformation} />
        <ClassForm handleUserData={this.handleUserData} />
      </>
    );
  }
}
