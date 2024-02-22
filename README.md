# css-hooks-basic

This is a utility library for simplifying the usage of
[CSS Hooks](https://css-hooks.com), providing a basic API for styling components
without advanced conditions.

## Installation

```bash
npm install css-hooks-basic
```

## Usage

### Option 1: Global `css` function

If you prefer to avoid using advanced conditions (the `on` field) entirely, you
can convert your global `css` function to use the basic API provided by this
library:

1. Import the `basic` function in your CSS module.
2. Apply it to the `css` function produced by `createHooks`.
3. Export the resulting function as `css`.

```typescript
// src/css.ts

import { createHooks } from "@css-hooks/react";
import { basic } from "css-hooks-basic";

const { styleSheet, css: cssAdvanced } = createHooks({
  // ...configuration...
});

export { styleSheet };

export const css = basic(cssAdvanced);
```

Now, you can use the basic version of the `css` function throughout your
project, providing an easier way to define styles.

### Option 2: Case by case

Alternatively, you can choose to use the basic API on a case-by-case basis. This
allows you to mix basic and advanced styling conditions according to your needs.

In a component module, simply import `css` from your CSS module and the `basic`
function from css-hooks-basic; and then use them together to style your
component:

```tsx
// src/easy-button.tsx

import { css } from "./css";
import { basic } from "css-hooks-basic";

export const EasyLink = () => (
  <a
    href="#"
    style={basic(css)({
      color: "black",
      "&:enabled": {
        "&:hover": {
          color: "blue",
        },
        "&:active": {
          color: "red",
        },
      },
      "&:disabled": {
        color: "gray",
      },
    })}
  >
    Easy
  </a>
);
```

With this approach, you have the flexibility to choose between basic and
advanced styling conditions for different components as needed.

## Contributing

Contributions to css-hooks-basic are welcome! If you find any issues or have
suggestions for improvements, please open an issue or submit a pull request on
the GitHub repository.

## License

css-hooks-basic is licensed under the MIT License. See the LICENSE file for
details.
