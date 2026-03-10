# ADR 0001: Adopt React Native Paper as Standard Component Library

**Date:** 2026-03-09
**Status:** Accepted

---

## Context

The FreestyleApp is a React Native / Expo application for scoring kayak freestyle competitions. As the codebase has grown, UI components have been built with a mix of approaches:

- Plain React Native `View`, `Text`, and `TextInput` components styled with inline `StyleSheet` objects
- `Button` from `react-native-elements` (already a dependency, but partially adopted)
- Grid layouts from `react-native-easy-grid`

This inconsistency increases maintenance overhead, makes the visual language harder to keep coherent, and means new contributors face a steeper learning curve. A single, well-maintained component library should be chosen and used consistently so that:

1. Components look and behave consistently across screens.
2. Future development benefits from a shared, documented API.
3. The maintenance burden of hand-crafting common UI patterns is reduced.

Our priorities (as stated in the issue) are:

- **Stability and low maintenance overhead**
- **Looks good** — Material Design is preferred if no significant additional overhead is introduced.

---

## Options Considered

### 1. React Native Paper

- **Repository:** https://callstack.github.io/react-native-paper / https://github.com/callstack/react-native-paper
- **Implements:** Material Design 3 (MD3)
- **Pros:**
  - Implements the widely recognised Material Design language — polished, professional, and immediately familiar to users
  - Actively maintained by Callstack, a prominent React Native consultancy
  - Rich component catalogue: `Button`, `TextInput`, `HelperText`, `Card`, `FAB`, `Dialog`, and more
  - Strong TypeScript support
  - Works with Expo out of the box; compatible with `@expo/vector-icons`
  - `PaperProvider` enables global theming with MD3 colour tokens
- **Cons:**
  - Imposes Material Design styling; some customisation needed for non-MD colours (managed through `buttonColor`/`textColor` props)
  - Requires replacing existing `react-native-elements` usages (low cost given partial adoption)
- **Assessment:** Best fit. Material Design preference is satisfied with no meaningful extra maintenance overhead compared to other mature options.

### 2. React Native Elements (previously in use)

- **Repository:** https://reactnativeelements.com / https://github.com/react-native-elements/react-native-elements
- **Version in use:** `react-native-elements` v3 (stable); `@rneui/themed` v4 is the continuation
- **Pros:**
  - Already installed and partially used (`Button`)
  - Lightweight; does not impose a design language
  - Simple API, low friction
- **Cons:**
  - No Material Design; visual output is plain/generic
  - v3 API is showing its age; v4 (`@rneui/themed`) is the modern successor but is a separate package
  - Given our Material Design preference, this is an inferior choice
- **Assessment:** Rejected. Does not satisfy the Material Design preference.

### 3. NativeBase / Gluestack UI

- **Repository:** https://gluestack.io (NativeBase has been rebranded to Gluestack UI)
- **Pros:**
  - Comprehensive component set
  - Supports both React Native and web
- **Cons:**
  - Underwent a significant rebrand and API break (NativeBase → Gluestack), raising maintenance risk
  - More complex setup (provider tree, token-based theming, Babel plugin)
- **Assessment:** Rejected. The instability history and setup complexity conflict with our "low maintenance" priority.

### 4. Tamagui

- **Repository:** https://tamagui.dev
- **Pros:**
  - Very performant (compile-time optimisation)
  - Universal (web + native)
  - Modern API with design-token theming
- **Cons:**
  - Relatively new; smaller community
  - Significant configuration overhead (Babel/Metro plugins required)
  - Does not implement Material Design natively
- **Assessment:** Rejected. Highest migration risk; does not provide Material Design.

---

## Decision

**We adopt React Native Paper (`react-native-paper` v5) as the standard UI component library.**

Rationale:

1. It implements Material Design 3, satisfying the team's design preference.
2. It is actively maintained by a reputable team with a stable API.
3. The migration cost from `react-native-elements` is low (button API and provider swap).
4. `PaperProvider` at the root enables consistent theming and future customisation via MD3 colour tokens.
5. The `Button` component accepts explicit `buttonColor` and `textColor` props, preserving the app's colour-coded state indicators (e.g. red = scored, dark blue = bonus scored) that encode meaningful domain information.
6. The `TextInput` component (with `HelperText`) replaces hand-crafted `TextInput` + `StyleSheet` patterns with a richer, accessible API.

As part of this decision:

- `react-native-elements` is removed from the project.
- `react-native-easy-grid` Grid/Row/Col layout usage is replaced with standard React Native `View` flexbox layouts.
- A `paperButtonProps` helper in `src/styles.ts` provides `{ mode, buttonColor, textColor, style }` prop objects for each semantic button type, keeping per-component code concise and centralising colour constants.
- All `Button` components across the codebase are migrated to `react-native-paper`'s `Button`.
- Both `TextInput` form fields (add paddler, add category) are migrated to `react-native-paper`'s `TextInput` with `HelperText` for validation feedback.
- The app is wrapped with `PaperProvider` in `App.tsx`.

---

## Consequences

- New contributors should default to components from `react-native-paper` before writing bespoke styled primitives.
- If a required component is not available in the library, it should be documented as an exception.
- Future theming improvements (brand colours, dark mode) should be implemented through the MD3 theme passed to `PaperProvider` rather than through inline style overrides.
