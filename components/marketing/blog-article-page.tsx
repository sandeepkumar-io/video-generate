import Link from "next/link";
import {notFound} from "next/navigation";
import Script from "next/script";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {articleSchema, blogPosts, getBlogPost} from "@/lib/blog";

export function BlogArticlePage({slug}: {slug: string}) {
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug);

  return (
    <>
      <Script id={`${post.slug}-article-schema`} type="application/ld+json">
        {JSON.stringify(articleSchema(post))}
      </Script>
      <article className="py-16">
        <div className="container max-w-3xl">
          <Button asChild variant="ghost" className="-ml-4 mb-8">
            <Link href="/blog">
              <ArrowLeft />
              Back to blog
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            {post.publishedAt} · {post.readingTime}
          </p>
          <h1 className="mt-3 text-balance text-4xl font-bold tracking-normal">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{post.description}</p>
          <div className="mt-10 space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold tracking-normal">{section.heading}</h2>
                <p className="mt-4 leading-8 text-muted-foreground">{section.body}</p>
              </section>
            ))}
          </div>
          <div className="mt-12 rounded-lg border bg-muted/35 p-6">
            <h2 className="text-xl font-semibold">Create your own video</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Use the free generator to upload one image, preview the animation, and render an MP4.
            </p>
            <Button asChild className="mt-5">
              <Link href="/free-image-to-video#create">
                Open generator
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </article>
      <section className="border-t bg-muted/25 py-12">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-semibold">More guides</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {relatedPosts.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-lg border bg-card p-5 hover:border-primary/50">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
