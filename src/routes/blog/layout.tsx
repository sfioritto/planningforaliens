import { component$, Slot } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import { Date } from "~/components/Date";
import { Link } from "~/components/Link";

export default component$(() => {
  const { title, frontmatter } = useDocumentHead();
  return (
    <>
      <Link href="/">⃪ Back</Link>
      <article class="pt-8">
        <h1>{title}</h1>
        {frontmatter.published ? <p class="text-slate-500">Published: <Date>{frontmatter.published}</Date></p> : null}
        <Slot />
      </article>
    </>
  );
});