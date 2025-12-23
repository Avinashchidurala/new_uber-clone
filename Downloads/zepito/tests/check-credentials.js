require('dotenv').config();

const publishable = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const databaseUrl = process.env.DATABASE_URL;

function isPlaceholder(value) {
  if (!value) return true;
  return /your_|replace_|example|changeme/i.test(value);
}

let ok = true;

if (!publishable) {
  console.error('✖ EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is missing.');
  ok = false;
} else if (isPlaceholder(publishable)) {
  console.warn('⚠ EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY looks like a placeholder.');
}

if (!databaseUrl) {
  console.error('✖ DATABASE_URL is missing.');
  ok = false;
} else if (!/^postgres(?:ql)?:\/\//i.test(databaseUrl)) {
  console.warn('⚠ DATABASE_URL does not look like a Postgres URL.');
} else if (isPlaceholder(databaseUrl)) {
  console.warn('⚠ DATABASE_URL looks like a placeholder.');
}

if (ok) {
  console.log('✔ Env variables look present. For a full credentials test, run integration tests against your remote services.');
  process.exit(0);
} else {
  process.exit(1);
}