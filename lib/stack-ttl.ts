import { Stack, Construct } from "@aws-cdk/core";
import { Function, Code, Runtime } from "@aws-cdk/aws-lambda";
import { Rule, Schedule } from "@aws-cdk/aws-events";
import { LambdaFunction } from "@aws-cdk/aws-events-targets";
import { PolicyStatement } from "@aws-cdk/aws-iam";

import { cronExpression } from "./utils";

interface ITTLProps {
  ttl: number;
}

const fnCode = `
import boto3
import os
import json

stack_name = os.environ['STACK_NAME']

def delete_cfn(stack_name):
    try:
        cfn = boto3.resource('cloudformation')
        stack = cfn.Stack(stack_name)
        stack.delete()
        return "SUCCESS"
    except:
        return "ERROR" 

def handler(event, context):
    print("Received event:")
    print(json.dumps(event))
    return delete_cfn(stack_name)
`;

export class TTL extends Construct {
  constructor(scope: Construct, id: string, props: ITTLProps) {
    super(scope, id);

    const stack = Stack.of(this);

    const lambdaFn = new Function(this, "ttl-lambda", {
      code: Code.fromInline(fnCode),
      runtime: Runtime.PYTHON_3_6,
      handler: "index.handler",
      environment: {
        STACK_NAME: stack.stackName,
      },
    });

    const rule = new Rule(this, "deletion-rule", {
      schedule: Schedule.expression(cronExpression(new Date(), props.ttl)),
    });

    rule.addTarget(new LambdaFunction(lambdaFn));

    // Allow CF operations
    const statement = new PolicyStatement();
    statement.addActions("cloudformation:DeleteStack");
    statement.addResources(
      `arn:aws:cloudformation:${stack.region}:${stack.account}:stack/${stack.stackName}/*`
    );

    lambdaFn.addToRolePolicy(statement);
  }
}
