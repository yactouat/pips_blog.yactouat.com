import { ReactNode, useReducer } from "react";

import appDataReducer from "./app-data-reducer";
import AppDataContext from "./app-data-context";
import BlogArticlesAppData from "@/lib/interfaces/business/blog-articles-app-data";

const AppDataProvider = ({
  appData,
  children,
}: {
  appData: BlogArticlesAppData;
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(appDataReducer, {
    data: appData,
  });

  const setAppData = async (data: BlogArticlesAppData): Promise<void> => {
    dispatch({
      type: "SET_APP_DATA",
      payload: {
        data,
      },
    });
  };

  return (
    <AppDataContext.Provider
      value={{
        setAppData,
        data: state.data,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;
