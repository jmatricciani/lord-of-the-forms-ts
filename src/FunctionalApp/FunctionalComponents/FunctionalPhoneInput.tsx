import { ChangeEventHandler, Dispatch, SetStateAction, useRef } from "react";
import { PhoneInputState } from "../../types";
import { NUMERICAL_REGEX } from "../../utils/Constants";

export const FunctionalPhoneInput = ({
  phoneInputState,
  setPhoneInputState,
}: {
  phoneInputState: PhoneInputState;
  setPhoneInputState: Dispatch<SetStateAction<PhoneInputState>>;
}) => {
  const phoneRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      event.target.value = event.target.value.replace(NUMERICAL_REGEX, "");
      const lengths = [2, 2, 2, 1];
      if (
        event.target.value.length >= lengths[index] &&
        !(index === lengths.length - 1)
      ) {
        phoneRefs[index + 1].current?.focus();
      }
      if (event.target.value.length === 0 && !(index === 0)) {
        phoneRefs[index - 1].current?.focus();
      }
      const newState = phoneInputState.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? event.target.value : phoneInput
      ) as PhoneInputState;
      if (event.target.value.length <= lengths[index]) {
        setPhoneInputState(newState);
      }
    };

  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        {/* Can this be converted into a component effectively? */}
        <input
          type="text"
          id="phone-input-1"
          placeholder="55"
          value={phoneInputState[0]}
          ref={phoneRefs[0]}
          onChange={createOnChangeHandler(0)}
        />
        -
        <input
          type="text"
          id="phone-input-2"
          placeholder="55"
          value={phoneInputState[1]}
          ref={phoneRefs[1]}
          onChange={createOnChangeHandler(1)}
        />
        -
        <input
          type="text"
          id="phone-input-3"
          placeholder="55"
          value={phoneInputState[2]}
          ref={phoneRefs[2]}
          onChange={createOnChangeHandler(2)}
        />
        -
        <input
          type="text"
          id="phone-input-4"
          placeholder="5"
          value={phoneInputState[3]}
          ref={phoneRefs[3]}
          onChange={createOnChangeHandler(3)}
        />
      </div>
    </div>
  );
};
