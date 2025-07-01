/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "guided-meditation",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "cloudflare",
    };
  },
  async run() {
    new sst.cloudflare.StaticSite("MyWebSite", {
      domain: "meditation.ethannc.dev",
      build: {
        command: "pnpm build",
        output: "build",
      },
    });
  },
});
