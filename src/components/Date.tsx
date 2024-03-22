import { component$, Slot } from "@builder.io/qwik";
import type { QwikIntrinsicElements } from "@builder.io/qwik";


export const Date = component$<QwikIntrinsicElements["span"]>(({ class: className, ...props }) => {
  return (
    <span
      class={[
        "text-gray-500 text-sm",
        className,
      ]}
      {...props}
    >
      <Slot />
    </span>
  );
});