# ntfy-reminders

A self-hosted reminder service that sends scheduled push notifications via [ntfy](https://ntfy.sh). Reminders are stored in MongoDB and managed through a Next.js web portal — no restart needed when adding new ones.

## How it works

- The **node-server** fetches reminders from MongoDB on startup and schedules them using node-cron
- Every minute, reminders are re-fetched and rescheduled to pick up any changes
- Notifications are sent to your ntfy topic using Bearer token auth
- The **portal** is a Next.js app for viewing and adding reminders

## Project structure

```
ntfy-reminders/
├── server/        # Cron-based notification service
├── portal/        # Next.js management UI
└── docker-compose.yml
```

## Environment variables

Create a `.env` file in the project root:

```dotenv
NTFY_HOST=your.ntfy.host
NTFY_TOPIC=your-topic
NTFY_TOKEN=your_ntfy_token

MONGO_URI=mongodb://username:password@host:27017

CRON_TZ=Europe/London
```

The portal also reads `MONGO_URI` at runtime on the server side.

## Reminder document structure (MongoDB)

Reminders are stored in the `reminders` collection of the `ntfy` database:

```json
{
  "title": "Feed the rabbit!",
  "message": "She is hungry and will kill us all if not fed.",
  "cron": "0 8 * * *"
}
```

The `cron` field uses standard 5-field cron syntax (`minute hour * * day`). The portal's day/time pickers generate this automatically — supported day values are `*` (everyday), `0` (Sunday) through `6` (Saturday).

## Running with Docker Compose

```bash
docker compose up -d
```

This starts two containers:

| Container | Description | Port |
|---|---|---|
| `ntfy-reminders-server` | Cron notification service | — |
| `ntfy-reminders-portal` | Next.js management portal | 47521 |

The portal will be available at `http://localhost:47521`.

## Running locally

**server:**
```bash
cd server
npm install
node index.js
```

**portal:**
```bash
cd portal
npm install
npm run dev
```

