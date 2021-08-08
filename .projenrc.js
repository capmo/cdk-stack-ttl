const {
  AwsCdkConstructLibrary,
  NodePackageManager,
  ProjectType,
} = require("projen");
const project = new AwsCdkConstructLibrary({
  author: "Sebastian Schlecht",
  authorAddress: "mail@sebastian-schlecht.de",
  cdkVersion: "1.95.2",
  defaultReleaseBranch: "main",
  name: "cdk-stack-ttl",
  packageManager: NodePackageManager.NPM,
  repositoryUrl: "git@github.com:sebastian-schlecht/cdk-stack-ttl.git",

  cdkDependencies: [
    "@aws-cdk/core",
    "@aws-cdk/aws-lambda",
    "@aws-cdk/aws-events",
    "@aws-cdk/aws-events-targets",
    "@aws-cdk/aws-iam",
  ] /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */,
  cdkTestDependencies: [
    "@aws-cdk/assert",
  ] /* AWS CDK modules required for testing. */,
  deps: ["moment"] /* Runtime dependencies of this module. */,
  peerDeps: ["moment"],
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  projectType:
    ProjectType.AwsCdkConstructLibrary /* Which type of project this is (library/app). */,
  // release: undefined,                /* Add release management to this project. */
});
project.synth();
