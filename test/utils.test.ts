import { cronExpression } from '../src/utils';

test('utils', () => {
  const today = new Date('2021-08-08T08:47:01.876Z');
  expect(cronExpression(today, 3600)).toBe('cron(47 20 10 8 ? 2021)');
});
