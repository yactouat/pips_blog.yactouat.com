import ContactFormProps from "./ContactFormProps";
import FormField from "@/components/form/form-field/form-field";
import FormInput from "@/components/form/form-input/form-input";
import FormLabel from "@/components/form/form-label/form-label";
import FormTextArea from "@/components/form/form-textarea/form-textarea";
import FormWrapper from "@/components/form/form-wrapper/form-wrapper";
import styles from "./contact-form.module.css";

const ContactForm = ({ form }: ContactFormProps) => {
  return (
    <FormWrapper
      handleSubmit={(e) => console.log("contact form submitted")}
      submitBtnText={form.submitLabel ?? "Send Message"}
      title={form.title ?? "Contact Us"}
    >
      <FormField>
        <FormLabel htmlFor="name" text="Name" />
        <FormInput type="text" id="name" name="name" required />
      </FormField>

      <FormField>
        <FormLabel htmlFor="email" text="Email" />
        <FormInput type="email" id="email" name="email" required />
      </FormField>

      <FormField>
        <FormLabel htmlFor="message" text="Message" />
        <FormTextArea
          id="message"
          name="message"
          placeholder={form.messagePlaceholder}
        />
      </FormField>
    </FormWrapper>
  );
};

export default ContactForm;
