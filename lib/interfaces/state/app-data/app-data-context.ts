import BlogArticlesAppData from "../../business/blog-articles-app-data";

interface AppDataContext {
  setAppData: (data: BlogArticlesAppData) => Promise<void>;
  data: BlogArticlesAppData | null;
}

export default AppDataContext;
