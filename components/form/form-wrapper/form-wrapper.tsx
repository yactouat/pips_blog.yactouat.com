import Button from "@/components/button/button";
import FromWrapperProps from "./FormWrapperProps";
import styles from "./form-wrapper.module.css";

const FormWrapper = ({
  children,
  handleSubmit,
  submitBtnText,
  title,
}: FromWrapperProps) => {
  return (
    <div className={`${styles.formContainer} mx-auto`}>
      <form
        {...(handleSubmit ? { onSubmit: handleSubmit } : {})}
        method="POST"
        className={`${styles.form}`}
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-slate-900 dark:text-white">
          {title}
        </h2>
        {children}
        {handleSubmit && submitBtnText && (
          <Button text={submitBtnText} submit={true} />
        )}
      </form>
    </div>
  );
};

export default FormWrapper;
