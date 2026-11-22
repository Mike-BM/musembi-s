# Admin portal setup

The admin portal lives at **/admin**. It manages enquiries, publications (with file uploads), articles/guides, contact details and services. Everything is stored as files on a separate `portal-data` branch of this GitHub repo, so no database is needed. If storage is not configured, the public site simply shows its built-in content.

## Environment variables (set in your hosting dashboard, as secrets)

| Name | Required | Notes |
|---|---|---|
| `ADMIN_PASSWORD` | yes | 8+ characters, unique, never reuse another password |
| `ADMIN_SESSION_SECRET` | recommended | 16+ random characters; signs the login cookie |
| `ADMIN_USERNAME` | no | defaults to `admin` |
| `GITHUB_TOKEN` | yes | Fine-grained token for **this repo only**, permission *Contents: Read and write* |
| `GITHUB_REPO` | yes | `Mike-BM/musembi-s` |
| `PORTAL_BRANCH` | no | defaults to `portal-data` (created automatically) |

Redeploy after changing them.

## Notes
- Make the repo **private**: enquiries contain visitors' names, emails and phone numbers.
- Uploads are limited to 4 MB (pdf, doc(x), ppt(x), xls(x), png, jpg).
- Admin edits show on the public site within about 15 seconds.
- Login attempts are rate limited; sessions last 12 hours.
- Never share the password or token in chat or screenshots. If exposed, change it.
