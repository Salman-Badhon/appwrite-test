# NextJS Starter

# Resources:

- [Server Component Stories](https://storybook.js.org/blog/storybook-react-server-components/): This link details how to make stories for server side components.

## UI Library

We will be relying on `shadcn` components to **avoid rewriting component logic**. Please go through the instruction of adding a `shadcn` component.

## Add new components

Please use this convention to add new shadcn components:

```bash
pnpm run add-comp
```

Select the components you want to add with `SPACE` and press `ENTER`.

This custom script will run `prettier:fix` after it adds the component.

## Shadcn Component Modifications

We should avoid modifying shad-cn components directly. We can create our own `custom` components using shad-cn component and apply restyling as needed. We don't want to lose the functionality that shad-cn has already implemented.

**This should be done carefully. We should not alter `shad-cn`'s logic implementation.**

# Developer Note

## Tailwind Class Conflict

If a Tailwind class doesn’t appear in the browser (e.g., `cn("leading-[2] text-[4rem]")` omits `leading-[2]`), it’s likely due to `tailwind-merge` resolving class conflicts. Check class order, inspect in dev tools, or adjust the `conflictingClassGroups` if needed.

## Package.json Override Setting

The `override` setting in our package.json makes sure that all dependencies and child dependencies use the same version of the specified packages.