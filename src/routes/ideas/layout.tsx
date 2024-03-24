import { component$, Slot } from "@builder.io/qwik";
import { useLocation, useDocumentHead } from "@builder.io/qwik-city";
import { Link, HomeLink } from "~/components/Link";
import { LastUpdated } from "~/components/LastUpdated";

export default component$(() => {
  const { url } = useLocation();
  const { frontmatter } = useDocumentHead();

  return (
    <>
      {url.pathname === '/ideas/' ? <HomeLink /> : <Link class="block pb-8" href="/ideas/">⃪ About These Notes</Link>}
      <LastUpdated class="text-sm pl-4" frontmatter={frontmatter} />

      <Slot />
    </>
  )
});

