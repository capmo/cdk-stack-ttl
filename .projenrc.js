const { AwsCdkConstructLibrary, NodePackageManager } = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'Sebastian Schlecht',
  authorAddress: 'mail@sebastian-schlecht.de',
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: 'cdk-stack-ttl',
  packageManager: NodePackageManager.NPM,
  repositoryUrl: 'git@github.com:sebastian-schlecht/cdk-stack-ttl.git',

  // cdkDependencies: undefined,        /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */
  // cdkTestDependencies: undefined,    /* AWS CDK modules required for testing. */
  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
});
project.synth();