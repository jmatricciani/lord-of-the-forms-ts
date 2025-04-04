import { ComponentProps } from "react";

export const FunctionalTextField = ({
  labelText,
  inputProps,
}: {
  labelText: string;
  inputProps: ComponentProps<"input">;
}) => {
  return (
    <div className="input-wrap">
      <label>{labelText}:</label>
      <input type="text" {...inputProps} />
    </div>
  );
};
