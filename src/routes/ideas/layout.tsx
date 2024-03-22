import { component$, Slot } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Link, HomeLink } from "~/components/Link";

export default component$(() => {
  const { url } = useLocation();
  return (
    <>
      {url.pathname === '/ideas/' ? <HomeLink /> : <Link class="block pb-8" href="/ideas/">⃪ About These Notes</Link>}
      <Slot />
    </>
  )
});

