---
name: add-image
description: Add a new image to a blog post or page. Handles optimizing to WebP, updating the optimize-images script, and inserting the img tag into the MDX file.
argument-hint: <path-to-source-image> [mdx-file]
---

# Add Image to Post

Add a new image to a blog post or page. This handles the full pipeline: updating the optimization script, generating WebP variants, and inserting the `<img>` tag.

## Steps

1. **Identify the source image and post.** The user provides an image path. If the MDX file isn't specified, infer it from the image's directory (e.g. an image in `src/routes/blog/falcon-heavy/` belongs to `src/routes/blog/falcon-heavy/index.mdx`).

2. **Determine the slug.** The slug is the post directory name (e.g. `falcon-heavy`, `sketching-with-css`). For blog posts it's the last segment of `src/routes/blog/<slug>/`. For other pages it's the last segment of `src/routes/<slug>/`.

3. **Update `bin/optimize-images.mjs`.** Check if the slug already has an entry in the `IMAGE_SOURCES` array. If not, add one with the correct `slug`, `dir`, and `extensions` (based on the image file extension — `.jpg`, `.png`, etc.). If the slug exists but the image has a different extension than what's listed, add that extension to the `extensions` array.

4. **Run the optimization script.** Execute `npm run optimize-images` to generate WebP files in `public/images/<slug>/`.

5. **Get the image dimensions from the script output.** The script prints `srcset`, `width`, and `height` for each image. Find the entry for the new image.

6. **Insert the `<img>` tag into the MDX file.** Ask the user where in the file they want the image, or if they've indicated a location, insert it there. Use this format:

```html
<figure>
  <img decoding="async" loading="lazy"
    srcset="..."
    width="..." height="..." />
</figure>
```

If the user provides alt text or a caption, include them:

```html
<figure>
  <img decoding="async" loading="lazy" alt="description"
    srcset="..."
    width="..." height="..." />
  <figcaption>Caption text</figcaption>
</figure>
```

7. **Verify the build.** Run `npm run build` to confirm everything compiles.
