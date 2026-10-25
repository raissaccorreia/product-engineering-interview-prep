# Diagnostic 1: work item tracker

Time limit: 25 minutes, with a maximum of 30 minutes. Start the timer when your React environment is ready; setup time is separate. Use React and TypeScript. Styling is not assessed.

Build a small work item tracker. Use these initial items:

| ID | Title | Completed |
| --- | --- | --- |
| w1 | Review checkout copy | No |
| w2 | Fix navigation label | Yes |
| w3 | Check empty state | No |

## Requirements

1. Display each item's title, completion checkbox, and a button to select it. Checking a completion checkbox must not select the item. Use stable item identities.
2. Provide a controlled text field and a form to add an item. Trim leading and trailing whitespace. A blank title must not create an item. A successful submission adds an incomplete item with a unique ID and clears the input. Duplicate titles are allowed. Submitting must not reload the page.
3. Provide an `All`, `Open`, and `Completed` filter. Default to `All`. Display only matching items and show `No matching items` when the filtered list is empty.
4. Always display the number of open items and the total number of items across the entire collection, regardless of the active filter.
5. Display a details area for the selected item, including its current title and completion status. Initially show `No item selected`. Selection must remain valid when the item is hidden by a filter, and its details must reflect later completion changes.
6. Adding an item must preserve the current filter and selection. Update React state without mutating existing arrays or objects.

## Acceptance examples

- Initially, the tracker shows three items and reports two open out of three total.
- With `Open` selected, the initial completed item is hidden. The totals still describe all three items.
- Submitting only whitespace creates no item. Submitting `  Review form  ` creates an open item titled `Review form`.
- Selecting `w1`, switching to `Completed`, and then returning to `All` preserves the selection throughout.
- Completing the selected item updates both its details and the counts. An item may disappear from the visible list when its completion changes under an active filter.

## Submission

Implement in `app/src/App.tsx`. The isolated React environment and run instructions are in [app/README.md](app/README.md). You may split small components if useful. You may compile, run, and consult API documentation. Do not use generated solutions. Report any documentation or outside help you used.

Before requesting review, explain your decisions in English and include:

- Your actual elapsed time.
- What you completed and any known incomplete behavior.
- At least three checks you performed, with expected and observed results. If you did not execute the component, state that clearly.

Stop at 30 minutes and submit the attempt as it stands. The reference solution and feedback will be added after submission.
