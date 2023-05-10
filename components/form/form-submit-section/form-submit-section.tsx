import Button from "@/components/button/button";
import FormSubmitSectionProps from "./FormSubmitSectionProps";
import styles from "./form-submit-section.module.css";

const FormSubmitSection = ({
  children,
  submitText,
}: FormSubmitSectionProps) => {
  return (
    <section className={`flex ${styles.submitSpaceBetween} mb-4`}>
      <Button submit={true} text={submitText} />
      {children}
    </section>
  );
};

export default FormSubmitSection;
