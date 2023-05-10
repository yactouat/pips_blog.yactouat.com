import FormMicroCopy from "./form-microcopy/form-microcopy";

const FormPasswordConstraints = () => {
  return (
    <FormMicroCopy
      id="password-constraints"
      text="(password not shown for security reasons - password should be 8 characters or longer, and should contain at least 1 number, 1 uppercase letter and 1 lowercase letter)"
    />
  );
};

export default FormPasswordConstraints;
