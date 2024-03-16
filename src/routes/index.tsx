import { component$, Slot } from "@builder.io/qwik";
import { Date } from "~/components/Date";
import { Link } from "~/components/Link";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { QwikIntrinsicElements } from "@builder.io/qwik";

const ListItem = component$<QwikIntrinsicElements["li"]>(({ class: className, ...props }) => {
  return (
    <li
      class={[
        "pb-4",
        className,
      ]}
      {...props}
    >
      <Slot />
    </li>
  );
});

export default component$(() => {
  return (
    <>
      <div class="p-8">
        <h2 class="font-semibold pb-4">Articles I've written over the years</h2>
        <ul>
          <ListItem>
            <Link href="/blog/clean-modular-code-is-overrated">Clean Modular Code is Overrated</Link> &mdash; <Date>1/7/2014</Date>
          </ListItem>
          <ListItem>
            <Link href="/blog/evolution-of-a-landing-page">Evolution of a Landing Page</Link> &mdash; <Date>6/2/2013</Date>
          </ListItem>
          <ListItem>
            <Link href="/blog/falcon-heavy">The Falcon Heavy Launch with Isaac</Link> &mdash; <Date>3/24/2016</Date>
          </ListItem>
          <ListItem>
            <Link href="/blog/github-ghost-towns-1">GitHub Ghost Towns: Part One</Link> &mdash; <Date>1/15/2015</Date>
          </ListItem>
          <ListItem>
            <Link href="/blog/github-ghost-towns-2">GitHub Ghost Towns: Part Two</Link> &mdash; <Date>1/27/2015</Date>
          </ListItem>
          <ListItem>
            <Link href="/blog/github-ghost-towns-3">GitHub Ghost Towns: Part Three</Link> &mdash; <Date>2/10/2015</Date>
          </ListItem>
          <ListItem>
            <Link href="/blog/how-the-new-mac-pro-site-works">How the New Mac Pro Site Works</Link> &mdash; <Date>12/20/2013</Date>
          </ListItem>
          <ListItem>
            <Link href="/blog/sketching-with-css">Sketching with CSS</Link> &mdash; <Date>7/1/2013</Date>
          </ListItem>
          <ListItem>
            <Link href="/blog/what-i-learned">What I learned this year</Link> &mdash; <Date>3/24/2016</Date>
          </ListItem>
          <ListItem>
            <Link href="/blog/why-javascript-development-is-crazy">Why JavaScript Development is Crazy</Link> &mdash; <Date>1/7/2014</Date>
          </ListItem>
        </ul>
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
