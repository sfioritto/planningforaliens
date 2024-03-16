import { component$, Slot } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const { title, frontmatter } = useDocumentHead();
  return (
    <>
      <article class="prose max-w-prose p-8">
        <h1>{title}</h1>
        {frontmatter.published ? <p class="text-slate-500">Published: {frontmatter.published}</p> : null}
        <Slot />
      </article>
    </>
  );
});