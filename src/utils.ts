// See https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html
export const cronExpression = (startDate: Date, ttl: number) => {
  const deletionTime = new Date(startDate.getTime() + ttl * 1000 * 3600 * 24); // TTL is denoted in days

  const cron = `cron(${deletionTime.getUTCMinutes()} ${deletionTime.getUTCHours()} ${deletionTime.getUTCDate()} ${
    deletionTime.getUTCMonth() + 1
  } ? ${deletionTime.getUTCFullYear()})`;

  return cron;
};
