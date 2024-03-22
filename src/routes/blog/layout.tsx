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
        {frontmatter.published ? <p class="text-slate-500">Published: {frontmatter.published}</p> : null}
        <Slot />
      </article>
    </>
  );
});