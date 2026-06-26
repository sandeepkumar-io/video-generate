import {BlogArticlePage} from "@/components/marketing/blog-article-page";
import {buildBlogMetadata, getBlogPost} from "@/lib/blog";

const post = getBlogPost("best-photo-animation-effects");

export const metadata = post ? buildBlogMetadata(post) : {};

export default function Page() {
  return <BlogArticlePage slug="best-photo-animation-effects" />;
}
