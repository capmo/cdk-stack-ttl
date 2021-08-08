import { cronExpression } from '../src/utils';

test('utils', () => {
  const ts1 = new Date('2021-08-08T08:47:01.876Z');
  expect(cronExpression(ts1, 3600)).toBe('cron(47 20 10 8 ? 2021)');

  const ts2 = new Date('2021-08-06T09:57:01.876Z');
  expect(cronExpression(ts2, 60)).toBe('cron(57 10 6 8 ? 2021)');
});
