# Be My Valentine 💌

A tiny, single-page Valentine web app that works on desktop and mobile browsers.  
It shows an intro, 5 fun multiple‑choice questions (all answers are “correct” with a celebratory GIF), a playful **“Will you be my Valentine?”** screen with an impossible‑to‑tap **No** button, and a final note after clicking **Yes**.

## How to run locally

1. Open the project folder: `c:\Users\USER\Desktop\project`.
2. Double‑click `index.html` to open it in your browser (Chrome/Edge/etc).
3. To test on your phone on the same Wi‑Fi:
   - Option A (easiest): Upload the folder to GitHub and use GitHub Pages (see below).
   - Option B: Run a simple static server (e.g. `npx serve .`) and open the LAN URL on your phone.

## Customizing the content

- **Texts & questions**: Edit the headings, paragraphs, and button labels directly in `index.html`.
- **Number of questions**:  
  - Each question is a `<section class="screen" data-screen="qX">` block.  
  - If you add/remove screens, update the `order` array near the top of `script.js` so it matches the sequence.
- **GIF / meme**:  
  - In `index.html`, replace the `src` inside the `#celebrate` overlay `<img>` tag with any GIF URL (e.g. from Giphy).
- **Colors & style**:  
  - Adjust colors, fonts, and spacing in `styles.css` (for example, change the `--bg-gradient` or `--primary` color variables).

The “No” button behaviour (running away + growing “Yes” button) is implemented in `script.js` — you can tweak the speed/scale by editing the `moveNoButton` function.

## Hosting on GitHub Pages

1. Create a new GitHub repository (public or private).
2. Copy everything from this folder into the repo (`index.html`, `styles.css`, `script.js`, `README.md`).
3. Commit and push your changes.
4. In the repository on GitHub:
   - Go to **Settings → Pages**.
   - Under **Source**, select `main` (or `master`) branch and the `/ (root)` folder, then save.
5. After a minute or two, GitHub will show a URL for your site (something like `https://your-username.github.io/your-repo/`).  
   Share that link with your Valentine. ❤️

## Collecting responses

GitHub Pages only serves static files — it can't run a server to save data. To
still capture each visitor's answers (with timestamp + IP address, one row
appended per person), this project sends responses to a free **Google Sheet**
through a **Google Apps Script Web App** acting as a tiny backend.

1. **Create a Google Sheet** (sheets.new). Name it whatever you like, e.g. "Valentine Responses".
2. In the sheet, go to **Extensions → Apps Script**.
3. Delete any starter code and paste in the contents of [`google-apps-script.gs`](google-apps-script.gs) from this repo.
4. Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - **Execute as**: Me.
   - **Who has access**: Anyone.
   - Click **Deploy**, and authorize the script when prompted (you'll see an "unverified app" warning — click **Advanced → Go to (project) → Allow**, this is expected since it's your own script).
5. Copy the **Web app URL** it gives you.
6. In `script.js`, find this line near the top:
   ```js
   const RESPONSES_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
   Replace the placeholder with the URL you copied.
7. Commit and push. Once deployed, every time someone clicks **Yes 💕**, a new row is appended to the sheet with:
   - Server timestamp + client timestamp
   - A random session ID (so repeat visits from the same person don't get merged)
   - Their public IP address
   - Their answers to Q1–Q4
   - How many times they tried to click "No" before giving in
   - Their browser's user agent

You can then just share the Google Sheet (or export it to CSV/Excel) with your client — no extra work needed on their end.

**Notes:**
- The IP address is fetched client-side from [ipify.org](https://www.ipify.org/) (a free, no-signup IP lookup API) and sent along with the response — Apps Script has no built-in way to read the caller's IP.
- Only a *completed* run (i.e., they clicked "Yes") is logged, since the "No" button is designed to be nearly unclickable. If someone closes the tab before finishing, nothing is saved.
- If you'd rather not use Google Sheets, the same `submitResponses()` function in `script.js` can POST to any other endpoint (Formspree, a Firebase function, your own server, etc.) — just change `RESPONSES_ENDPOINT` and adjust the payload handling accordingly.

