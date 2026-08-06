import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "source/**",
      "docs/**",
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      ".open-next/**",
      ".wrangler/**",
      "Progress*.tsx",
      "Revision*.tsx",
      "lib*.ts",
      "components*.tsx",
      "progress*.tsx",
      "revision*.tsx",
      "spaced-repetition.ts",
      "progress-tracking.ts",
      "revision-recommendations.ts",
    ],
  },
];

export default eslintConfig;
