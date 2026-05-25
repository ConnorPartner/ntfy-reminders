# ntfy-reminders

A Node.js service that sends scheduled push notifications via [ntfy](https://ntfy.sh). Reminders are stored in MongoDB and automatically picked up every minute — no restart needed when adding new ones.

## How it works

- On startup, reminders are fetched from MongoDB and scheduled using node-cron
- Every minute, reminders are re-fetched and rescheduled to pick up any changes
- Notifications are sent to your ntfy topic using Bearer token auth

## Environment variables

Create a `.env` file in the project root:

```dotenv
NTFY_HOST=your.ntfy.host
NTFY_TOPIC=your-topic
NTFY_TOKEN=your_ntfy_token

MONGO_URI=mongodb://username:password@host:27017

CRON_TZ=Europe/London
```

## Reminder document structure (MongoDB)

Reminders are stored in the `reminders` collection of the `ntfy` database:

```json
{
  "title": "Feed the rabbit!",
  "message": "She is hungry and will kill us all if not fed.",
  "cron": "0 8 * * *"
}
```

The `cron` field uses standard cron syntax. node-cron also supports a 6-field format with seconds as the first field (e.g. `*/5 * * * * *` for every 5 seconds).

## Running locally

```bash
npm install
node index.js
```

## Running with Docker

```bash
docker build -t ntfy-reminders .
docker run --env-file .env ntfy-reminders
```

Or add it to your `docker-compose.yml`:

```yaml
ntfy-reminders:
  image: ntfy-reminders
  restart: always
  environment:
    TZ: Europe/London
  env_file:
    - .env
```
