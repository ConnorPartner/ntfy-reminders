export function convertToCron({ day, hour, minute }: { day: string; hour: string; minute: string }) {
  const cronDays: { [key: string]: string } = {
    'Everyday': '*',
    'Mondays': '1',
    'Tuesdays': '2',
    'Wednesdays': '3',
    'Thursdays': '4',
    'Fridays': '5',
    'Saturdays': '6',
    'Sundays': '0',
  }

  return `${minute} ${hour} * * ${cronDays[day]}`;
}

export function convertFromCron(cron: string) {
  const [minute, hour, , , day] = cron.split(' ');
  const cronDays: { [key: string]: string } = {
    '*': 'Everyday',
    '1': 'Mondays',
    '2': 'Tuesdays',
    '3': 'Wednesdays',
    '4': 'Thursdays',
    '5': 'Fridays',
    '6': 'Saturdays',
    '0': 'Sundays',
  }

  return { day: cronDays[day], hour, minute };
}

export function cronToString(cron: string) {
  const { day, hour, minute } = convertFromCron(cron);
  return `${day} at ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
}