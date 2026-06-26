import {BlogArticlePage} from "@/components/marketing/blog-article-page";
import {buildBlogMetadata, getBlogPost} from "@/lib/blog";

const post = getBlogPost("how-to-convert-image-to-video-for-free");

export const metadata = post ? buildBlogMetadata(post) : {};

export default function Page() {
  return <BlogArticlePage slug="how-to-convert-image-to-video-for-free" />;
}
