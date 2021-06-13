import * as moment from "moment";

// See https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html
export const cronExpression = (startDate: Date, ttl: number) => {
  const deletionTime = moment.utc(startDate).add(ttl, "m");

  const cron = `cron(${deletionTime.minute()} ${deletionTime.hour()} ${deletionTime.date()} ${
    deletionTime.month() + 1
  } ? ${deletionTime.year()})`;

  return cron;
};
