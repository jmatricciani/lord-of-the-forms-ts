import { ChangeEventHandler, Component, createRef } from "react";
import { IPhoneInput, PhoneInputState } from "../../types";
import { NUMERICAL_REGEX } from "../../utils/Constants";

export class ClassPhoneInput extends Component<IPhoneInput> {
  phoneRefs = [
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
  ];

  createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      event.target.value = event.target.value.replace(NUMERICAL_REGEX, "");
      const lengths = [2, 2, 2, 1];

      if (
        event.target.value.length >= lengths[index] &&
        !(index === lengths.length - 1)
      ) {
        this.phoneRefs[index + 1].current?.focus();
      }
      if (event.target.value.length === 0 && !(index === 0)) {
        this.phoneRefs[index - 1].current?.focus();
      }
      const newState = this.props.phoneInputState.map(
        (phoneInput, phoneInputIndex) =>
          index === phoneInputIndex ? event.target.value : phoneInput
      ) as PhoneInputState;
      if (event.target.value.length <= lengths[index]) {
        this.props.setPhoneInputState(newState);
      }
    };

  render() {
    return (
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            placeholder="55"
            value={this.props.phoneInputState[0]}
            ref={this.phoneRefs[0]}
            onChange={this.createOnChangeHandler(0)}
          />
          -
          <input
            type="text"
            id="phone-input-2"
            placeholder="55"
            value={this.props.phoneInputState[1]}
            ref={this.phoneRefs[1]}
            onChange={this.createOnChangeHandler(1)}
          />
          -
          <input
            type="text"
            id="phone-input-3"
            placeholder="55"
            value={this.props.phoneInputState[2]}
            ref={this.phoneRefs[2]}
            onChange={this.createOnChangeHandler(2)}
          />
          -
          <input
            type="text"
            id="phone-input-4"
            placeholder="5"
            value={this.props.phoneInputState[3]}
            ref={this.phoneRefs[3]}
            onChange={this.createOnChangeHandler(3)}
          />
        </div>
      </div>
    );
  }
}
