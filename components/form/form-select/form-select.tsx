import FormSelectProps from "./FormSelectProps";
import styles from "./form-select.module.css";

const FormSelect = ({
  id,
  name,
  onChange,
  options,
  readonly,
  required,
  selected,
  value,
}: FormSelectProps) => {
  return (
    <select
      {...(onChange ? { onChange: onChange } : {})}
      {...(readonly ? { disabled: true } : {})}
      {...(required ? { required: true } : {})}
      className={styles.selectField}
      id={id}
      name={name}
      value={value}
    >
      <option value="">...</option>
      {options.map((option) => {
        if (option.value === selected)
          return (
            <option key={option.value} value={option.value} selected>
              {option.displayed}
            </option>
          );
        else
          return (
            <option key={option.value} value={option.value}>
              {option.displayed}
            </option>
          );
      })}
    </select>
  );
};

export default FormSelect;
