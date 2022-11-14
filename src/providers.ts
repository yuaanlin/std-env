// Reference: https://github.com/watson/ci-info/blob/v3.2.0/vendors.json

export type ProviderName =
  "" | "appveyor" | "azure_pipelines" | "azure_static" | "appcircle" | "bamboo" |
  "bitbucket" | "bitrise" | "buddy" | "buildkite" | "circle" | "cirrus" | "cloudflare_pages" |
  "codebuild" | "codefresh" | "drone" | "drone" | "dsari" | "github_actions" |
  "gitlab" | "gocd" | "layerci" | "hudson" | "jenkins" | "magnum" |
  "netlify" | "nevercode" | "render" | "sail" | "semaphore" |
  "screwdriver" | "shippable" | "solano" | "strider" | "teamcity" | "travis" |
  "vercel" | "appcenter" | "codesandbox" | "stackblitz" | "stormkit" | "cleavr"

type InternalProvider = [providerName: Uppercase<ProviderName>, envName?: string, meta?: Record<string, any>]

const providers: InternalProvider[] = [
  ["APPVEYOR"],
  ["AZURE_PIPELINES", "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],
  ["AZURE_STATIC", "INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],
  ["APPCIRCLE", "AC_APPCIRCLE"],
  ["BAMBOO", "bamboo_planKey"],
  ["BITBUCKET", "BITBUCKET_COMMIT"],
  ["BITRISE", "BITRISE_IO"],
  ["BUDDY", "BUDDY_WORKSPACE_ID"],
  ["BUILDKITE"],
  ["CIRCLE", "CIRCLECI"],
  ["CIRRUS", "CIRRUS_CI"],
  ["CLOUDFLARE_PAGES", "CF_PAGES", { ci: true }],
  ["CODEBUILD", "CODEBUILD_BUILD_ARN"],
  ["CODEFRESH", "CF_BUILD_ID"],
  ["DRONE"],
  ["DRONE", "DRONE_BUILD_EVENT"],
  ["DSARI"],
  ["GITHUB_ACTIONS"],
  ["GITLAB", "GITLAB_CI"],
  ["GITLAB", "CI_MERGE_REQUEST_ID"],
  ["GOCD", "GO_PIPELINE_LABEL"],
  ["LAYERCI"],
  ["HUDSON", "HUDSON_URL"],
  ["JENKINS", "JENKINS_URL"],
  ["MAGNUM"],
  ["NETLIFY"],
  ["NETLIFY", "NETLIFY_LOCAL", { ci: false }],
  ["NEVERCODE"],
  ["RENDER"],
  ["SAIL", "SAILCI"],
  ["SEMAPHORE"],
  ["SCREWDRIVER"],
  ["SHIPPABLE"],
  ["SOLANO", "TDDIUM"],
  ["STRIDER"],
  ["TEAMCITY", "TEAMCITY_VERSION"],
  ["TRAVIS"],
  ["VERCEL", "NOW_BUILDER"],
  ["APPCENTER", "APPCENTER_BUILD_ID"],
  ["CODESANDBOX", "CODESANDBOX_SSE", { ci: false }],
  ["STACKBLITZ"],
  ["STORMKIT"],
  ["CLEAVR"]
];

export type ProviderInfo = { name: ProviderName, [meta: string]: any }

export function detectProvider (env: Record<string, string | undefined>): ProviderInfo {
  // Based on env
  for (const provider of providers) {
    const envName = provider[1] || provider[0];
    if (env[envName]) {
      return {
        name: provider[0].toLowerCase(),
        ...provider[2] as any
      };
    }
  }

  // Stackblitz / Webcontainer
  if (env.SHELL && env.SHELL === "/bin/jsh") {
    return {
      name: "stackblitz",
      ci: false
    };
  }

  return {
    name: "",
    ci: false
  };
}
