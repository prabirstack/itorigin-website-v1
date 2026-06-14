import next from "eslint-config-next";

// `eslint-config-next` (v16+) is a native ESLint flat config array that already
// bundles `next/core-web-vitals`, `next/typescript`, and sensible global ignores.
// Spread it so project-specific overrides can be appended below if needed.
const eslintConfig = [...next];

export default eslintConfig;
