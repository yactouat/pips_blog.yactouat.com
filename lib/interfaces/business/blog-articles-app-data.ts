import { BlogPostMetaDto } from "pips_shared/dist/dtos";
import AppData from "./app-data";

interface BlogArticlesAppData extends AppData {
  blogPostsList?: BlogPostMetaDto[];
}

export default BlogArticlesAppData;
