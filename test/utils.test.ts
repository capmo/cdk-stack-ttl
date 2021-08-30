import { cronExpression } from '../src/utils';

test('utils', () => {
  const ts1 = new Date('2021-08-08T08:47:01.876Z');
  expect(cronExpression(ts1, 1)).toBe('cron(47 8 9 8 ? 2021)');

  const ts2 = new Date('2021-08-06T09:57:01.876Z');
  expect(cronExpression(ts2, 30)).toBe('cron(57 9 5 9 ? 2021)');
});
