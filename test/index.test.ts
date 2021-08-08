import { expect, countResources } from '@aws-cdk/assert';
import { App, Stack } from '@aws-cdk/core';

import { Ttl } from '../src';

test('TTL', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  new Ttl(stack, 'stack-ttl', {
    ttl: 60,
  });

  expect(stack).to(countResources('AWS::Lambda::Function', 1));
});
