import { Template } from '@aws-cdk/assertions';
import { App, Stack } from '@aws-cdk/core';

import { Ttl } from '../src';

test('TTL', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  new Ttl(stack, 'stack-ttl', {
    ttl: 60,
  });

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::Lambda::Function', 1);
});
