# Shalom Tours and Travels — Car rental platform

Full-stack car rental app: React frontend, Cloudflare Worker API (Hono), Cloudflare D1 database. Deploys entirely on Cloudflare; source lives on GitHub.

## Structure

```
car-rental/
├── frontend/   React + Vite + Tailwind (customer site + admin dashboard UI)
├── worker/     Hono API on Cloudflare Workers, reads/writes D1
└── .github/workflows/   optional CI to auto-deploy the Worker on push
```

## 1. Local development

### API (worker)
```
cd worker
npm install
npx wrangler d1 create car-rental-db
# copy the returned database_id into worker/wrangler.toml
npm run db:migrate          # applies schema.sql to your local D1
npx wrangler secret put JWT_SECRET          # any long random string
npx wrangler secret put ADMIN_SIGNUP_CODE   # a code you'll use once to create your admin account
npm run dev                 # runs at http://localhost:8787
```

### Frontend
```
cd frontend
npm install
cp .env.example .env         # VITE_API_URL=http://localhost:8787
npm run dev                  # runs at http://localhost:5173
```

**Brand & contact info:** the logo lives at `frontend/public/logo-full.jpg` (full lockup) and `frontend/public/logo-icon.jpg` (emblem, used in the navbar/footer/favicon) — swap either file to change the logo. The displayed phone number and email come from `VITE_CONTACT_PHONE` and `VITE_CONTACT_EMAIL` in `frontend/.env` (see `.env.example`); edit those and rebuild, no code changes needed.

## 2. Push to GitHub
```
cd car-rental
git init
git add .
git commit -m "Initial commit: Shalom Tours and Travels car rental app"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 3. Deploy on Cloudflare

**Database (one-time):**
```
cd worker
npx wrangler d1 create car-rental-db
# paste the database_id into wrangler.toml
npx wrangler d1 execute car-rental-db --remote --file=./schema.sql
```

**API (Worker):**
```
cd worker
npx wrangler secret put JWT_SECRET
npx wrangler secret put ADMIN_SIGNUP_CODE
npx wrangler deploy
```
Note the deployed Worker URL (e.g. `https://car-rental-api.<you>.workers.dev`).

**Frontend (Pages):**
1. In the Cloudflare dashboard: Workers & Pages → Create → Pages → Connect to Git → pick this GitHub repo.
2. Build settings: root directory `frontend`, build command `npm run build`, build output directory `dist`.
3. Add an environment variable: `VITE_API_URL` = your deployed Worker URL from above.
4. Deploy. Every future push to `main` redeploys automatically.

**Create your admin account:**
Sign up once on the live site, but call the signup API directly with your admin code so the account gets the `admin` role, e.g.:
```
curl -X POST https://<your-worker-url>/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"you@example.com","password":"choose-a-password","adminCode":"<the ADMIN_SIGNUP_CODE you set>"}'
```
Then log in at `/admin/login` on the frontend.

## 4. Optional: CI auto-deploy for the Worker
`.github/workflows/deploy.yml` redeploys the Worker whenever `worker/` changes on `main`. Add these repo secrets in GitHub (Settings → Secrets → Actions):
- `CLOUDFLARE_API_TOKEN` — a Cloudflare API token with Workers edit permission
- `CLOUDFLARE_ACCOUNT_ID` — found in the Cloudflare dashboard sidebar

Pages redeploys automatically on push once connected in step 3 — no extra CI needed for the frontend.

## Notes for v1
- Payment is mocked — booking confirms immediately, no real charge.
- Seed data in `worker/schema.sql` adds 8 sample cars so the site isn't empty on first load.
- Passwords are hashed with PBKDF2 (Web Crypto), sessions are JWTs in `localStorage`.
