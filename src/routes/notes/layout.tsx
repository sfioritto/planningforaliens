import { component$, Slot } from "@builder.io/qwik";
import { Link } from "~/components/Link";

export default component$(() => {
  return (
    <>
      <Link class="block pb-8" href="/ideas">⃪ About These Notes</Link>
      <Slot />
    </>
  )
});

