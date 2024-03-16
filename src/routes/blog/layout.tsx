import { component$, Slot } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import { Date } from "~/components/Date";

export default component$(() => {
  const { title, frontmatter } = useDocumentHead();
  return (
    <div class="p-8">
      <a href="/" class="text-blue-600 hover:underline visited:text-purple-700">⃪ Back</a>
      <article class="pt-8 prose max-w-prose">
        <h1>{title}</h1>
        {frontmatter.published ? <p class="text-slate-500">Published: <Date>{frontmatter.published}</Date></p> : null}
        <Slot />
      </article>
    </div>
  );
});