# VISTRA – Agent Guide

Clinic management system: public landing + staff portal + patient portal.
Backend: FastAPI + Supabase (no ORM). Frontend: React 19 + Vite + Tailwind + React Query.

## Repo layout
- `backend/app/main.py` – FastAPI entry, version `2.2.0`, registers 6 routers. No factory.
- `backend/app/routes/` – `health.py`, `auth.py`, `staff.py`, `patient.py`, `appointment.py`, `dental.py`
- `backend/app/services/` – business logic (`staff.py`, `patient.py`, `appointment.py`, `dental.py`, `auth/staff.py`, `auth/user.py`)
- `backend/app/repositories/` – PostgREST queries (`*_repositories.py`)
- `backend/app/schemas/` – Pydantic validation; `response_dto/reponses.py` (note typo)
- `backend/app/models/` – EMPTY, do not use. Validation lives in schemas.
- `backend/app/config/settings.py`, `security.py` – env + auth
- `backend/app/database/database_client.py` – global `supabase`, per-request `get_supabase_for_user`, `supabase_admin`
- `backend/app/enums/`, `backend/app/utils/` – `email_utils.py`, `supabase_query_builder.py`, `validator/common.py`
- `backend/tests/` – manual debug scripts only, require live creds. No pytest.
- `postman/postman/collections/VISTRA API Tests/` – automated API tests (Postman). `Auth/` + `Staff/` have requests with `pm.test()` assertions; `Appointments/`, `Dental/`, `Medical/`, `Patients/` are placeholder folders. Env: `postman/postman/environments/VISTRA local-1.environment.yaml` (`base_url`, `user_id`, `access_token`, `refresh_token`). Spec mirror: `postman/postman/specs/VISTRA_API_TESTS/VISTRA_API_TESTS.yaml`.
- `frontend/src/main.jsx` → `App.jsx` → `routes/AppRoutes.tsx`
- `frontend/src/api/` – `axios_client.ts` (active), `client.ts` (deprecated), `*.api.ts`, `schema/*`, `errors.ts`
- `frontend/src/config/ApiConfig.ts`, `RoutePaths.ts` – single source for URLs/routes
- `frontend/src/hooks/`, `context/`, `repository/`, `pages/{public,admin,patient}/`, `components/`, `layouts/`, `utils/`
- `frontend/demo/test.js` – scratch, unused.
- `docs/README.md` – Vite template + run instructions only.

## Run
Backend (`backend/`):
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload  # http://localhost:8000, docs at /docs
```
Frontend (`frontend/`):
```bash
npm install
npm run dev   # vite, default http://localhost:5173
npm run build # vite build
npm run lint  # eslint . (only .js/.jsx covered)
```

## Env (never commit values)
Backend `backend/.env`: `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_PRIVILEGE_KEY`, `LOCAL_FRONTEND_URL`, `PROD_FRONTEND_URL`, `IS_PROD=false`. Self-hosted testing: `SELFHOSTED_SUPABASE_URL`, `SELFHOSTED_SUPABASE_KEY`, toggle with `USE_SELFHOSTED_SUPABASE=true` (default `false` = cloud). Active backend resolves via `Config.supabase_url()/supabase_key()` (`config/settings.py`), validated per mode.
Frontend `frontend/.env`: `VITE_LOCAL_API_URL` (`http://127.0.0.1:8000`), `VITE_PROD_API_URL`, `VITE_IS_PROD=false`. Code also reads `VITE_SKIP_AUTH` (currently missing).

## Backend conventions
- Add endpoint: router in `routes/<domain>.py` (prefix e.g. `/patients`, `Depends(get_current_user)` if protected) → function in `services/<domain>.py` → query in `repositories/<domain>_repositories.py`. Reuse `PaginatedResponse` / `Response` from `schemas/response_dto/reponses.py`.
- DB: Supabase only. Use `get_supabase_for_user` dependency for RLS; `supabase_admin` only for auth admin (`services/auth/user.py`). Tables are UPPERCASE: `PATIENT`, `PATIENT_PROFILE`, `STAFF`, `APPOINTMENT`, `DENTAL_VISIT`, `ODONTOGRAM`, view `patient_summary`.
- Auth: Supabase Auth. Staff email convention `@ucc.com` via `utils/email_utils.py` (`add_ucc_domain`, `staff_id_format`). `security.py:get_current_user` validates Bearer via `supabase.auth.get_user()`. Roles in `app_metadata.role`.
- Follow `backend/versioning plan` for version bumps: breaking=X.0.0, feature=0.X.0, fix=0.0.X. Live `main.py` has no `/api/v1` prefix – do not add versioning without migrating frontend `ApiConfig.ts`.
- Known bug: `schemas/patient.py` references `confirm_birthday`/`confirm_age` but does not import them – fix import from `utils/validator/common.py` before touching patient validation.

## Frontend conventions
- Imports use alias `/@/`: `import X from "/@/config/RoutePaths"`. Defined in `frontend/vite.config.js` + `tsconfig.json`.
- API: use `api/axios_client.ts:apiClient<T>()`, endpoints from `config/ApiConfig.ts:API_ENDPOINTS`. Do not use `api/client.ts` or direct `supabase-js` (orphaned dep).
- Server state: React Query hooks in `hooks/` (`usePatientQuery`, `AppointmentQuery`, `DentalQuery`, `UseLogin`). Pagination via `context/CreatePaginatedContext.tsx`. Forms via `react-hook-form + zod` (`api/schema/*`). View mappers in `repository/*Model.ts`.
- Routing: edit `config/RoutePaths.ts` + `routes/AppRoutes.tsx` together. Guards: `routes/ProtectedRoute.jsx` (staff, active), `components/ProtectedPatientRoute.jsx` (currently `skipAuth=true` debug bypass – do not ship; real check + `/patient/login` route still missing).
- Styling: Tailwind-first (`tailwind.config.js` tokens: `primary #14b8a6`, `background #f8fafc`). `index.css` is 3 lines; `App.css` is dead. MUI/Emotion installed but prefer Tailwind.
- Mixed `.jsx/.tsx` allowed (`allowJs:true`). Keep new code `.tsx`/`.ts`.

## Verification
- Backend: `uvicorn app.main:app --reload`, check `/docs` and `GET /api/health`.
- Automated API tests are Postman, not pytest: open `postman/postman/collections/VISTRA API Tests/` in Postman with env `VISTRA local` (`base_url=http://localhost:8000`), run Collection Runner in order. Coverage (43 requests): `Health` check; `Auth` login (chains `access_token` + `refresh_token`), invalid login, refresh, invalid refresh; `Staff` get-by-id (200 + shape, 401 no token, 404 no ID), create (chains `created_staff_id`), 422, 401, delete + deleted-check; `Patients` create (unique id via `beforeRequest`, chains `patient_id`), 422, 401, duplicate 409, list, profiles, by-id, not-found, summary, delete + deleted-check (runs last); `Appointments` full CRUD chain (captures `appointment_id`, ends with delete + 404 check), 422, 401; `Dental` create (captures `dental_visit_id`), 422, list, by-id, 404, 401, delete + deleted-check; `Medical` list, delete-not-found 404, 401. Create/update/delete tests accumulate real rows in Supabase on each run. When adding/changing endpoints, add/extend requests + `pm.test()` scripts there, not `backend/tests/`.
- Frontend: `npm run dev`, `npm run build` must pass. `npm run lint` only checks JS – also run `npx tsc --noEmit` for TS changes.
- Cross-check: backend route prefix must match `API_ENDPOINTS`; frontend `VITE_*_API_URL` must match running backend port.
