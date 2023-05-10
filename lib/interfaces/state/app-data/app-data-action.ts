import BlogArticlesAppData from "../../business/blog-articles-app-data";

interface AppDataAction {
  payload?: {
    data: BlogArticlesAppData | null;
  };
  type: "SET_APP_DATA";
}

export default AppDataAction;
