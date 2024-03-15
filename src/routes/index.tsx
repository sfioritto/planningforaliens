import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div>
        <p>Hello</p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Planning for Aliens",
  meta: [
    {
      name: "description",
      content: "The personal website of Sean Fioritto",
    },
  ],
};
