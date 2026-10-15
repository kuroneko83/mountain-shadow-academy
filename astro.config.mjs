// @ts-check
import { defineConfig } from "astro/config";

// GitHub Pages (project site): https://kuroneko83.github.io/mountain-shadow-academy/
const SITE = "https://kuroneko83.github.io";
const BASE_PATH = "/mountain-shadow-academy";

export default defineConfig({
  site: SITE,
  base: BASE_PATH,
});
