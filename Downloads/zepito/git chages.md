# Git changes — how I pushed this project

This file documents the exact steps I used to push the local project to GitHub so you can re-use them later.

---

## 1) Verify repository status

- Check whether the directory is a git repo and current branch:
```bash
git rev-parse --is-inside-work-tree
git branch --show-current
```
- See uncommitted changes:
```bash
git status --porcelain
```

## 2) Ensure `.gitignore` excludes secrets

- Confirm `.env` or other sensitive files are listed in `.gitignore`. Example entries:
```
.env
.env*.local
```

## 3) Create initial commit (if no commits yet)

```bash
# stage files (respecting .gitignore)
git add .
# create the initial commit
git commit -m "Initial commit"
```

Notes:
- If the repo already had commits, skip the commit step and continue with remote config.

## 4) Add remote and push to GitHub

- Add the remote you created on GitHub:
```bash
git remote add origin https://github.com/Avinashchidurala/new_uber-clone.git
```
- Ensure branch name is `main` and push:
```bash
git branch -M main
git push -u origin main
```

## 5) Verify the push

```bash
git remote -v
git branch -vv
```

Check your GitHub repository URL to confirm files appear.

## 6) If a sensitive file was accidentally committed

- If a secret was committed, remove it from history using `git filter-repo` or the BFG Repo-Cleaner. Example (requires install):
```bash
# remove a file from all history
git filter-repo --path .env --invert-paths
# then force push (be careful, rewrites history)
git push --force origin main
```
- Alternatively, rotate any leaked credentials immediately.

## 7) Helpful GH CLI shortcuts

- Create a repo and push in one command (GitHub CLI):
```bash
gh repo create new-uber-clone --public --source=. --remote=origin --push
```

---

## What I did for you

- Confirmed `.env` was not tracked (present in `.gitignore`).
- Ran `git add .` and made an initial commit.
- Added `origin` pointing to `https://github.com/Avinashchidurala/new_uber-clone.git` and pushed `main`.

---

If you'd like, I can also add a simple GitHub Actions workflow and a branch protection rule example here.