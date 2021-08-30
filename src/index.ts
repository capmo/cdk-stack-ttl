import { Rule, Schedule } from '@aws-cdk/aws-events';
import { LambdaFunction } from '@aws-cdk/aws-events-targets';
import { PolicyStatement } from '@aws-cdk/aws-iam';
import { Function, Code, Runtime } from '@aws-cdk/aws-lambda';
import { Stack, Construct, CfnOutput } from '@aws-cdk/core';

import { cronExpression } from './utils';

export interface ITtlProps {
  ttl: number; // TTL is denoted in days
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

export class Ttl extends Construct {
  constructor(scope: Construct, id: string, props: ITtlProps) {
    super(scope, id);

    const stack = Stack.of(this);

    const lambdaFn = new Function(this, 'ttl-lambda', {
      code: Code.fromInline(fnCode),
      runtime: Runtime.PYTHON_3_6,
      handler: 'index.handler',
      environment: {
        STACK_NAME: stack.stackName,
      },
    });

    const cronExpirationSchedule = Schedule.expression(cronExpression(new Date(), props.ttl));
    const rule = new Rule(this, 'deletion-rule', {
      schedule: cronExpirationSchedule,
    });

    rule.addTarget(new LambdaFunction(lambdaFn));

    // Allow CF operations
    const statement = new PolicyStatement();
    statement.addActions('cloudformation:DeleteStack');
    statement.addResources(
      `arn:aws:cloudformation:${stack.region}:${stack.account}:stack/${stack.stackName}/*`,
    );

    lambdaFn.addToRolePolicy(statement);

    new CfnOutput(stack, 'Stack TTL cron', {
      exportName: `${stack.stackName}-stack-ttl-cron`,
      value: cronExpirationSchedule.expressionString,
    });
  }
}
