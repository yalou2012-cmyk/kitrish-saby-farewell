import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];

const isRootExport = process.env.ROOT_EXPORT === "true";

const basePath =
  !isRootExport &&
  process.env.GITHUB_ACTIONS === "true" &&
  repositoryName
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
