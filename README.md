# Random Project Generator v2

A static, procedural project-idea generator for GitHub Pages. **No AI, no backend, no framework.**

## What's new in v2

- Data split into ES modules under `src/data/`
- Weighted compatibility scoring instead of simple random tag intersection
- 40 project types
- 30 stacks
- 245 subjects
- 76 actions
- 170 twists
- 86 constraints
- 120 optional features
- Seeded deterministic generation + shareable URLs
- Lock/reroll individual idea parts
- Daily project seed
- Saved projects in localStorage

## Run locally

Because v2 uses native ES modules, use any tiny static server instead of opening `index.html` directly as `file://`.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

1. Push the project to a GitHub repository.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save.

No build step is required.

## Project structure

```text
random-project-generator-v2/
├── index.html
├── style.css
├── .nojekyll
└── src/
    ├── app.js
    ├── generator.js
    ├── compatibility.js
    ├── rng.js
    └── data/
        ├── index.js
        ├── projectTypes.js
        ├── stacks.js
        ├── subjects.js
        ├── actions.js
        ├── twists.js
        ├── constraints.js
        ├── features.js
        ├── naming.js
        └── modes.js
```

## Extending the generator

Most additions are data-only. Add new items to files in `src/data/`, assign relevant tags, and the weighted compatibility layer will use them automatically.
