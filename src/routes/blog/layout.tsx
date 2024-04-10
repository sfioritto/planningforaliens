import { component$, Slot } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { HomeLink, Link } from "~/components/Link";

export default component$(() => {
  const { title, frontmatter } = useDocumentHead();
  const { url } = useLocation();

  return (
    <>
      {url.pathname === '/blog/' ? <HomeLink /> : <Link href="/blog/">⃪ All Articles</Link>}
      <article class="pt-8">
        <h1>{title}</h1>
        <p class="text-slate-500">
          {frontmatter.published ? <span>Published: {frontmatter.published}</span> : null}
          {frontmatter.updated ? <span class="pl-2">(Updated: {frontmatter.updated})</span> : null}
        </p>
        <Slot />
      </article>
    </>
  );
});