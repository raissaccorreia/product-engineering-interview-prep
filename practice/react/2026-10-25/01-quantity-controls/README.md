# Exercise 1: quantity controls

Time limit: 20 minutes. Use the isolated React + TypeScript app documented [here](../../2026-10-22/01-work-items/app/README.md). Implement in `app/src/App.tsx`. Styling is not assessed.

Build a small inventory panel with these initial products:

| ID | Product | Quantity |
| --- | --- | ---: |
| p1 | Almonds | 4 |
| p2 | Oat milk | 0 |
| p3 | Coffee beans | 2 |

## Requirements

- Display each product name and its current quantity.
- Provide separate controls to increase or decrease each product's quantity by one.
- A quantity cannot go below zero. The decrease control for an item at zero must be disabled.
- Show the total quantity across all products. It must update when any item changes.
- Implement a parent inventory component and a reusable product row component. Keep the inventory data in React state and pass the data and required event behavior through props.
- Preserve the input data when changing one product. Repeated, rapid clicks must not lose updates.

## Acceptance examples

- Initially, the total quantity is 6.
- Decreasing `Oat milk` is unavailable at quantity 0.
- Increasing `Oat milk` twice makes its quantity 2 and the total 8.
- Decreasing `Almonds` once makes its quantity 3 and the total 7.

## Submit

Report elapsed time and explain your component and state decisions in English. Include at least three checks with expected and observed results. Say whether you used the browser and what happened. Stop at 20 minutes and submit what you have.

The attempt, review, and reference will be saved separately after submission.
