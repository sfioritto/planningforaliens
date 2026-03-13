# Pre-optimize images to fix Cloudflare Pages 404s

**Status:** shipped
**Started:** 2026-03-13
**Shipped:** 2026-03-13
**Commit:** a0f7b05

## Goal

Fix persistent image 404s on planningforaliens.com. Images were broken on the live site even though they worked locally. The root cause: `vite-imagetools` uses `sharp` under the hood, and sharp produces different binary output on macOS vs Linux. The Qwik SSG build on macOS generated HTML referencing image hashes from macOS-built sharp output, but the CF Pages CI build on Linux generated images with different hashes. The HTML pointed to files that didn't exist on the deployed site.

Multiple attempts to fix via CF Pages config (`_routes.json`, worker routing for `/assets/*`) all failed because the fundamental problem was the hash mismatch, not the routing.

## Log

### The aha moment

After several rounds of trying to fix routing (adding `/assets/*` to worker, reverting, tweaking `_routes.json`), we realized the issue was deterministic but platform-dependent. Sharp's WebP encoder produces bit-for-bit different output on macOS ARM vs Linux x86. Vite-imagetools hashes the output to generate filenames, so the same source image gets different filenames on different platforms. There's no config knob to fix this — it's baked into how the pipeline works.

### The approach: just commit the images

Instead of fighting the build pipeline, we removed `vite-imagetools` from the image workflow entirely. Pre-optimize images locally with a script, commit the WebP files to git, and reference them with plain `<img>` tags. No sharp at build time means no cross-platform mismatch.

Trade-off: larger git repo (178 WebP files). But these are optimized WebP files so they're not huge, and for a personal blog this is totally fine. The reliability gain massively outweighs the repo size cost.

### Implementation details

Created `bin/optimize-images.mjs` using sharp to generate responsive WebP variants at breakpoints (200, 400, 600, 800, 1200px) capped at source width. Quality 80. The script outputs srcset strings and dimensions for each image, which made updating the MDX files straightforward.

Updated 6 MDX files: removed all `?jsx` imports (36 total) and replaced `<ComponentName />` usage with plain `<img>` tags using `srcset`, `width`, `height`, `decoding="async"`, and `loading="lazy"`. Preserved alt text and figcaptions where they existed.

Added `/images/*` to `_routes.json` exclude list and `_headers` immutable caching — same pattern already used for `/build/*`.

## Learnings

- **Sharp is not cross-platform deterministic.** Same input, same settings, different binary output on macOS ARM vs Linux x86. This is a known characteristic of native image processing libraries — the underlying codec implementations can differ.
- **Hash-based filenames + cross-platform builds = trouble.** Any pipeline that hashes build artifacts into filenames will break if the build isn't deterministic across platforms. This isn't specific to sharp — it applies to any native code in the build chain.
- **Pre-optimizing and committing static assets is a legitimate strategy.** For a site with a bounded set of images that change rarely, committing optimized images is simpler and more reliable than optimizing at build time. The "right" solution isn't always the most automated one.
- **CF Pages `_routes.json` exclude list** is the mechanism for serving static files directly without going through the worker. Essential for any static assets you add to `public/`.

## Dead ends

### Routing /assets/* through the worker
Tried modifying `_routes.json` to let the worker handle `/assets/*` requests, thinking the issue was CF Pages not finding the files. Didn't work because the files existed — they just had different names than what the HTML referenced.

### Cache clearing / redeploying
Tried multiple clean deploys thinking it was a caching issue. Didn't help because each Linux build consistently produced the same (wrong-for-macOS-HTML) hashes.

## Solution

Pre-optimize all 37 source images into 178 responsive WebP files using a local script (`bin/optimize-images.mjs`), commit them to `public/images/`, and reference them with plain `<img srcset>` tags in MDX. No sharp runs during CI. Images are byte-for-byte identical between local and deployed because they're committed artifacts, not build outputs.
