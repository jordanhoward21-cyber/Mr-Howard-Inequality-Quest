# Mr. Howard's Inequality Quest — V3

## New recommended improvements
- Shared classroom-ready architecture.
- Optional Google Sheets backend.
- Each student gets a session ID so repeated updates overwrite one row instead of creating a new row every answer.
- Teacher data now includes:
  - Student display name
  - Class code
  - Score
  - Current level
  - Accuracy
  - Attempts
  - Correct answers
  - Best streak
  - Coins
  - Completion/game-over status
- Local mode still works without any account or server.
- Student names are display names only; do not collect sensitive student information.

## Turn on shared classroom scoring
1. Create a Google Sheet for your class.
2. Extensions → Apps Script.
3. Replace the default code with `Code.gs`.
4. Deploy → New deployment → Web app.
5. Execute as: Me.
6. Who has access: Anyone with the link.
7. Copy the `/exec` URL.
8. Open `index.html` in a text editor.
9. Find:
   `const CLOUD_ENDPOINT = "";`
10. Replace the blank string with your `/exec` URL.
11. Optionally set:
   `const CLASS_CODE = "ALG1-2026";`
12. Upload the edited `index.html` to GitHub Pages.

## Recommended privacy setup
Use student first names, initials, or teacher-created display names. Do not collect grades, email addresses, phone numbers, birth dates, or other sensitive student data in the game.

## GitHub Pages
Upload `index.html`, then Settings → Pages → Deploy from branch → main → `/root`.

## Teacher dashboard
The in-game Teacher Dashboard shows locally imported/exported results. The Google Sheet becomes the shared live source when the endpoint is connected.
