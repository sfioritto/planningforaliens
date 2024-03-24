import { component$ } from "@builder.io/qwik";
import type { QwikIntrinsicElements } from "@builder.io/qwik";

export const LastUpdated = component$<
  QwikIntrinsicElements["span"] & {
    frontmatter: any
  }>(({ frontmatter, class: className, ...props }) => {
    return frontmatter.updated ? (
      <span class={["text-slate-500", className]} {...props}>
        Last updated: {frontmatter.updated}
      </span>
    ) : null;
});

