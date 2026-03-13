---
name: journal
description: Developer journal that captures learnings and reasoning as work happens — why decisions were made, what was learned from dead ends, and the thinking behind design choices. Activates during non-trivial work, design discussions, and brainstorming.
user-invocable: false
---

# Developer Journal

You maintain a developer journal that captures **why** things happen, not just what. The most valuable thing in this journal is reasoning and learnings — the stuff that normally evaporates between sessions.

This runs in the background — you don't ask the user for permission to journal, you just do it.

## The core principle: Why > What

The journal is NOT a changelog. Don't just record "we refactored the auth module." Record:
- **Why** we refactored it (the old design couldn't handle X)
- **What we learned** along the way (turns out Y doesn't work because of Z)
- **What we considered** and rejected (we almost did A but realized B)

If you find yourself writing a journal entry that's just "did X, then did Y, then did Z" — stop. That's a git log. Ask yourself: what did we *learn*? Why did we make *these* choices?

## When you don't know the "why"

**Ask the user.** This is critical. After executing a plan or completing a chunk of work, if you don't have the reasoning behind decisions, ask. For example:

- "We just finished restructuring the store layer — what was the main motivation? Was it the performance issue you mentioned earlier, or something else?"
- "We tried three approaches for the caching layer before landing on this one. What made you want to tackle caching in the first place?"

Don't ask about every little thing. Apply an **interestingness threshold**: ask about decisions that were non-obvious, where alternatives existed, or where someone reading the journal later would wonder "but why?"

## Journal location

All journal pages live in `docs/journal/`. Each effort gets its own file.

## When to start a new journal page

Start a new page when:
- The user begins discussing or planning a non-trivial effort
- Design decisions are being debated or brainstormed
- There's no active journal page for the current effort
- The user explicitly starts a new effort

Do NOT journal for:
- Simple questions or explanations unrelated to active development
- Trivial one-line fixes
- Reading/exploring code without intent to change it

## File naming

Files are named: `YYYY-MM-DD-short-slug.md` (e.g., `2026-03-10-auth-timeout-fix.md`)

If continuing work from a previous session, reuse the existing file — don't create a new one. Read `docs/journal/` at the start of a session to find any active efforts.

## Page format

```markdown
# [Short title of the effort]

**Status:** active | shipped | abandoned
**Started:** YYYY-MM-DD
**Shipped:** YYYY-MM-DD (when applicable)
**Commit:** abc1234 (short hash of the final commit, added at ship time)

## Goal

What we're trying to accomplish and **why** — what problem does this solve? What motivated this work?

## Log

### [Timestamp or short label]

What was learned, what decisions were made and why.
Focus on reasoning and insights, not play-by-play of actions taken.

## Learnings

Things we discovered that would be valuable to know in the future:
- What surprised us
- Constraints we discovered
- Patterns that worked or didn't
- Things that were harder/easier than expected and why

## Dead ends

Approaches that were tried and abandoned. For each:
- What was the approach
- Why it seemed promising
- What we learned from trying it (the actual lesson, not just "it didn't work")

## Solution

(Filled in when the effort ships)
What we did, why this approach won over the alternatives, and what makes it work.
```

## When to write

Update the journal at these moments:
- **During design discussion** — capture options considered, tradeoffs debated, and the reasoning behind decisions made
- **When something is learned** — a new constraint discovered, a surprising behavior found, an assumption proven wrong
- **After a dead end** — what we tried, why it didn't work, what we learned from it
- **When switching approaches** — why we're pivoting, what the new approach offers
- **After executing a plan** — step back and capture the why behind the work. If you don't know the why, ask the user
- **When something non-obvious works** — why does this solution work when others didn't?
- **At the end of a session** — summarize where things stand and any open questions

**Interestingness threshold:** Not everything goes in the journal. A routine file rename doesn't need an entry. But if we spent 20 minutes debugging why a test was flaky and discovered it was a timing issue with Durable Object alarms — that's a learning worth capturing. When in doubt: would someone reading this journal 3 months from now find this entry useful? If yes, write it.

## The commit strategy

The journal commit always rides on top of HEAD. Here's the protocol:

**Never amend or reset a commit that has already been pushed to the remote.** Amending rewrites the commit hash, which diverges local history from the remote and forces a force-push. Before amending or resetting, check whether HEAD has been pushed — if it has, make a new commit instead.

### Creating the initial journal commit

1. Create/edit the journal file in `docs/journal/`
2. `git add docs/journal/`
3. `git commit -m "journal: [short description of effort]"`

### Updating the journal (most common)

1. Edit the journal file
2. `git add docs/journal/`
3. `git commit --amend --no-edit`

This amends the existing journal commit — no new commits, working tree stays clean.

### When the user makes a real commit

Before committing the user's actual work:

1. Soft-reset the journal commit: `git reset --soft HEAD~1`
2. Unstage journal files: `git restore --staged docs/journal/`
3. Make the user's commit (stage their files, commit)
4. Re-stage and re-commit the journal: `git add docs/journal/ && git commit -m "journal: [same description]"`

This slots the real commit underneath and puts the journal back on top.

**Important:** The `/commit` and `/atomic-commits` commands don't know about this protocol. When the user invokes those, you need to handle the journal commit shuffle yourself before and after.

### When the effort ships

When the user says the work is done, or it's clear the effort has concluded:

1. Update the journal page: set status to `shipped`, fill in the Solution section
2. Add the `Commit:` field — run `git rev-parse --short HEAD` (or the relevant commit if the work landed earlier) and add it to the metadata. This gives a direct pointer from the journal entry to the code.
3. The journal commit becomes a real commit — stop amending it, it's now part of history

### When the effort is abandoned

1. Update the journal page: set status to `abandoned`, note why
2. The journal commit becomes a real commit — same as shipping, it's now permanent

## Resuming across sessions

At the start of any session where you'll be doing non-trivial work:

1. Check `docs/journal/` for files with `Status: active`
2. If one exists and relates to the current work, read it to get context
3. Check if HEAD commit message starts with `journal:` — if so, you can continue amending it
4. If HEAD is not a journal commit (user may have done other work), create a new journal commit on top

## Tone

Write like a developer's notebook — informal, direct, focused on insights and reasoning. Think "TIL" posts and lab notebooks, not formal documentation.
