# Chatriwala

## Blog publishing

The public blog lives at `/blogs`; the private publishing dashboard is at `/admin`.
The blog works without Firebase and continues to show the existing sample articles.
After Firebase is connected, published Firestore articles appear alongside those
articles. Drafts are only visible in the admin dashboard.

### Connect Firebase

1. Create a Firebase project and register a Web app.
2. Enable **Authentication → Email/Password**, create your admin account, and
   verify its email address.
3. Create a Cloud Firestore database and enable Firebase Storage.
4. In `src/lib/firebase.js`, replace each `REPLACE_WITH_…` configuration value
   with the Firebase Web app settings, and replace `REPLACE_WITH_ADMIN_EMAIL`
   with the verified admin email address.
5. Replace the same admin email placeholder in both `firestore.rules` and
   `storage.rules`, then publish those rules in the Firebase console (or deploy
   them with the Firebase CLI).
6. Open `/admin` and sign in with that verified account.

Firebase Web app configuration is client-side configuration, not a way to
secure admin access. The Firestore and Storage rules enforce access: published
articles can be read publicly, while writes and draft access require the
verified allowlisted admin account. Never deploy with the placeholder rules or
leave test-mode Firebase rules enabled.

### Publishing features

- Create, edit, publish, and delete posts; save drafts without exposing them
  publicly.
- Upload a cover image to Firebase Storage (up to 5 MB) or provide an image URL.
- Add categories, comma-separated tags, excerpts, and optional YouTube URLs.
- Article content uses blank lines for paragraphs, `## Heading` / `### Heading`
  for headings, and `- List item` for unordered lists. A valid YouTube link is
  rendered in a privacy-enhanced embed.
- The public blog includes category filters, search across titles/descriptions/
  tags, newest/oldest sorting, related articles, reading time, and copy-link
  sharing.

Run locally with `npm run dev`. Run `npm run lint` and `npm run build` to check
the application.
