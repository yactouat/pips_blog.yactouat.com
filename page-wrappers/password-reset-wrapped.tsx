import axios from "axios";
import { FormEventHandler, useContext, useState } from "react";
import Head from "next/head";

import AppDataContext from "@/app-state/app-data/app-data-context";
import AppSection from "@/components/app-section/app-section";
import FormField from "@/components/form/form-field/form-field";
import FormInput from "@/components/form/form-input/form-input";
import FormLabel from "@/components/form/form-label/form-label";
import FormSubmitSection from "@/components/form/form-submit-section/form-submit-section";
import FormWarningMessage from "@/components/form/form-warning-message/form-warning-message";
import FormWrapper from "@/components/form/form-wrapper/form-wrapper";
import GoToAuth from "@/components/go-to-auth/go-to-auth";
import Hr from "@/components/hr";
import MainLayout from "@/components/main-layout/main-layout";
import { USERS_API_ENDPOINT } from "@/lib/constants/conf_constants";
import FormSuccessMessage from "@/components/form/form-success-message/form-success-message";

export default function PasswordResetWrapped() {
  const [loading, setLoading] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  const [email, setEmail] = useState("");

  const { data: appData } = useContext(AppDataContext);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const passwordResetCall = await axios.post(
        `${USERS_API_ENDPOINT}reset-password`,
        {
          email,
        }
      );
      console.info("RESET PASSWORD RESPONSE", passwordResetCall.data);
      setPasswordResetError(passwordResetCall.status !== 201);
      setPasswordResetSuccess(passwordResetCall.status === 201);
    } catch (error) {
      console.error("RESET PASSWORD ERROR", error);
      setPasswordResetError(true);
    }
    setLoading(false);
  };

  return (
    <MainLayout themeColor={appData!.themeColor}>
      <Head>
        <title>{appData!.title} | Password reset</title>
      </Head>
      <AppSection id="password-reset" title={""}>
        {!loading && !passwordResetSuccess && (
          <>
            <FormWrapper
              title="Reset your password"
              submitBtnText="Reset my password"
              handleSubmit={handleSubmit}
            >
              {!loading && passwordResetError && (
                <FormWarningMessage contents="could not send the request to reset your password" />
              )}
              <FormField>
                <FormLabel htmlFor="email" text="email" />
                <FormInput
                  autocomplete="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                  type="email"
                  value={email}
                />
              </FormField>
            </FormWrapper>
            <Hr />
            <div className="flex flex-col items-center">
              <GoToAuth
                message="you don't have an account yet"
                theme={appData!.theme}
                page="signup"
              />
            </div>
          </>
        )}

        {!loading && passwordResetSuccess && (
          <>
            <FormSuccessMessage
              big={true}
              contents="password reset request sent: check your email to reset your password"
            />
          </>
        )}

        {loading && (
          <FormWarningMessage contents="sending the request to reset your password..." />
        )}
      </AppSection>
    </MainLayout>
  );
}
