# Antora Chattopadhyay, portfolio

A plain static site: HTML, one CSS file, one small JS file. No build step, no dependencies.
Fonts are bundled, so nothing loads from a third party.

## Put it on GitHub Pages

Your resume links to `antora-c.github.io/Portfolio`, so use a repo named **Portfolio**.

1. On GitHub, create a new **public** repository named `Portfolio` under the `antora-c` account.
2. Upload the *contents* of this folder to the repo root (so `index.html` sits at the top level, not inside another folder).
   - Easiest: on the repo page choose **Add file > Upload files**, drag everything in (include the hidden `.nojekyll` file), and commit.
   - Or with git:
     ```
     git init
     git add .
     git commit -m "Portfolio site"
     git branch -M main
     git remote add origin https://github.com/antora-c/Portfolio.git
     git push -u origin main
     ```
3. In the repo go to **Settings > Pages**. Under **Build and deployment** set Source to **Deploy from a branch**, Branch to `main`, folder `/ (root)`, then Save.
4. Wait a minute or two. The site appears at **https://antora-c.github.io/Portfolio/**

If you ever want it at the shorter `https://antora-c.github.io/`, name the repo `antora-c.github.io` instead. Every link in the site is relative, so it works either way.

## Structure

```
index.html                 home: hero, work, about, product ownership, contact
patient-workspace.html     case 01
billing-dashboard.html     case 02
spry-verify.html           case 03
websites.html              case 04
404.html                   shown for broken links
assets/
  css/style.css            all styling
  js/main.js               nav, chapter menu, pins, zoom, two small demos
  img/                     product screens (click any screen on the site to zoom)
  fonts/                   Space Grotesk, DM Sans, JetBrains Mono (woff2)
  Antora-Chattopadhyay-Portfolio.pdf   the PDF behind the "Download PDF" buttons
```

## Editing

- **Text:** open the page in any editor and change the words. Each section is a `<section class="sec" id="...">`.
- **Swap a screen:** replace the file in `assets/img/` with the same name. If the aspect ratio changes, update the `width` and `height` attributes on that `<img>`.
- **Move a numbered pin on an annotated screen:** edit the `style="left:..%;top:..%"` on the matching `<button class="pin">`.
- **Update the PDF:** replace `assets/Antora-Chattopadhyay-Portfolio.pdf` with a new file of the same name.
- **Preview locally:** run `python3 -m http.server 8000` in this folder and open http://localhost:8000
