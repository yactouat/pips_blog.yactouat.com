import { BlogPostDto } from "pips_shared/dist/dtos";
import AppData from "./app-data";

interface BlogArticleAppData extends AppData {
  blogPost?: string;
  blogPostData: BlogPostDto;
}

export default BlogArticleAppData;
