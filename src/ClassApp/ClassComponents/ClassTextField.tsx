import { Component } from "react";
import { ITextField } from "../../types";

export class ClassTextField extends Component<ITextField> {
  render() {
    return (
      <div className="input-wrap">
        <label>{this.props.labelText}:</label>
        <input
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
