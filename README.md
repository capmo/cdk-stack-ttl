# 💥 CDK Stack TTL 💥

This package contains a CDK construct that can be imported in order to automatically delete the stack after a certain timeframe (TTL). Inspired by [this blog post from AWS](https://aws.amazon.com/blogs/infrastructure-and-automation/scheduling-automatic-deletion-of-aws-cloudformation-stacks/). Built with [projen](https://github.com/projen/projen).

## When to use

Why would I want my stack to self-destruct after a while? There is plenty of reasons. The most common one is to deliver temporary infrastructure - for example during feature or branch deployments. With this package, you can create dynamic stacks as part of your CI pipeline, which have a short lifetime. Your team can work on the stack (do QA, ...) and after a set timeframe, it self-destructs. If the stack receives updates (for example it's still being worked on), then the TTL will reset upon every update.

## Usage

```typescript
import { App, Stack, StackProps } from "@aws-cdk/core";
import { Ttl } from "cdk-stack-ttl";

export class MyStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    new Ttl(this, "stack-ttl", { ttl: 10 });
  }
}
```

The construct will deploy a Lambda function, as well as an event-rule which triggers after `ttl` minutes (calculated from the time of deployment). In case the stack is re-deployed, the TTL starts anew since the trigger time is computed during runtime of the CDK code.

In order to deploy the stack, it's important to provide a [Cloudformation Service Role](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html) that executes the deletion. Otherwise, the stack cannot delete itself.

```bash
cdk deploy --role-arn <service-role>
```

whereas `<service-role>` needs to provide a trust relationship toward Cloudformation itself, such as:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudformation.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Details on service roles can be found [here](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html).
