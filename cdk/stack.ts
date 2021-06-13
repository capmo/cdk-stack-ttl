import { App, Stack, Tags } from "@aws-cdk/core";
import { name, version } from "../package.json";

import { TtlStack, TTL } from "../lib/stack-ttl";

const {
  region = process.env.CDK_DEFAULT_REGION,
  account = process.env.CDK_DEFAULT_ACCOUNT,
  stage = "dev",
  environment = "dev",
} = process.env.CDK_CONTEXT_JSON
  ? JSON.parse(process.env.CDK_CONTEXT_JSON)
  : {};

export const app = new App();
export const stack = new Stack(app, `${name}`, {
  env: { region, account },
  stackName: name + (stage === "prod" ? "" : `-${stage}`),
});

// const ttl = new TtlStack(stack, "ttl-trigger", {
//   stackName: stack.stackName,
//   ttl: 5,
// });

new TTL(stack, "stack-ttl", { ttl: 10 });

export { environment, stage };

Tags.of(stack).add("service", stack.stackName);
Tags.of(stack).add("env", environment);
Tags.of(stack).add("version", version);
