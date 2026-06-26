import {BlogArticlePage} from "@/components/marketing/blog-article-page";
import {buildBlogMetadata, getBlogPost} from "@/lib/blog";

const post = getBlogPost("create-instagram-reels-from-photos");

export const metadata = post ? buildBlogMetadata(post) : {};

export default function Page() {
  return <BlogArticlePage slug="create-instagram-reels-from-photos" />;
}
