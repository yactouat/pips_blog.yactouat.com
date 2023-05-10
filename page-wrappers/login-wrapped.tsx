import axios from "axios";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import AppDataContext from "@/app-state/app-data/app-data-context";
import AppSection from "@/components/app-section/app-section";
import Button from "@/components/button/button";
import FormField from "@/components/form/form-field/form-field";
import FormLabel from "@/components/form/form-label/form-label";
import FormPasswordConstraints from "@/components/form/form-password-constraints";
import FormWarningMessage from "@/components/form/form-warning-message/form-warning-message";
import GoToAuth from "@/components/go-to-auth/go-to-auth";
import Hr from "@/components/hr";
import MainLayout from "@/components/main-layout/main-layout";
import { persistUserCredentials } from "@/lib/functions/localStorage";
import { TOKENS_API_ENDPOINT } from "@/lib/constants/conf_constants";
import UserProfileContext from "@/app-state/user-profile/user-profile-context";
import FormWrapper from "@/components/form/form-wrapper/form-wrapper";
import FormInput from "@/components/form/form-input/form-input";
import FormSubmitSection from "@/components/form/form-submit-section/form-submit-section";
import FormPassword from "@/components/form/form-password/form-password";

const LoginWrapped = () => {
  const router = useRouter();

  const { autoSignIn, userProfile } = useContext(UserProfileContext);
  const { data: appData } = useContext(AppDataContext);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [password, setPassword] = useState("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "current-password":
        setPassword(value);
        break;
    }
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${TOKENS_API_ENDPOINT}`, {
        email,
        password,
      })
      .then((res) => {
        console.info("LOGIN RESPONSE", res);
        persistUserCredentials(res.data.data.token, res.data.data.userId);
        router.push("/");
      })
      .catch((error) => {
        console.error("LOGIN ERROR", error);
        setLoading(false);
        setLoginError(true);
      });
  };

  // auto sign in on page load
  useEffect(() => {
    autoSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout themeColor={appData!.themeColor} page="login">
      <Head>
        <title>{appData!.title} | Login</title>
      </Head>
      <AppSection id="login" title={""}>
        {loading && <FormWarningMessage contents="logging you in..." />}
        {!loading && !userProfile && (
          <>
            <FormWrapper
              handleSubmit={handleSubmit}
              submitBtnText="Login"
              title="Login"
            >
              {loginError && (
                <FormWarningMessage contents={`invalid credentials`} />
              )}
              <FormField>
                <FormLabel htmlFor="email" text="email" />
                <FormInput
                  autocomplete="email"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  required
                  type="email"
                  value={email}
                />
              </FormField>

              <FormPassword
                autocomplete="current-password"
                id={"current-password"}
                name={"current-password"}
                onChange={handleInputChange}
                value={password}
              />
            </FormWrapper>
            <Hr />
            <div className="flex flex-col items-center">
              <GoToAuth
                message="you don't have an account"
                page="signup"
                theme={appData!.theme}
              />
              <GoToAuth
                message="forgot your password"
                page="password-reset"
                theme={appData!.theme}
              />
            </div>
          </>
        )}
        {!loading && userProfile && (
          <FormWarningMessage contents="you are already logged in" />
        )}
      </AppSection>
    </MainLayout>
  );
};

export default LoginWrapped;
