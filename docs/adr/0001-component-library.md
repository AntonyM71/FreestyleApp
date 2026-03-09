# ADR 0001: Adopt React Native Elements as Standard Component Library

**Date:** 2026-03-09
**Status:** Accepted

---

## Context

The FreestyleApp is a React Native / Expo application for scoring kayak freestyle competitions. As the codebase has grown, UI components have been built with a mix of approaches:

- Plain React Native `View`, `Text`, and `TextInput` components styled with inline `StyleSheet` objects
- `Button` from `react-native-elements` (already a dependency)
- Grid layouts from `react-native-easy-grid`

This inconsistency increases maintenance overhead, makes the visual language harder to keep coherent, and means new contributors face a steeper learning curve. A single, well-maintained component library should be chosen and used consistently so that:

1. Components look and behave consistently across screens.
2. Future development benefits from a shared, documented API.
3. The maintenance burden of hand-crafting common UI patterns is reduced.

Our priorities (as stated in the issue) are:

- **Stability and low maintenance overhead**
- **Looks good**

---

## Options Considered

### 1. React Native Elements (already in use)

- **Repository:** https://reactnativeelements.com / https://github.com/react-native-elements/react-native-elements
- **Version in use:** `react-native-elements` v3 (stable); `@rneui/themed` v4 is the continuation
- **Pros:**
  - Already installed and partially used (`Button`)
  - Lightweight; does not impose a design language
  - Simple API, low friction for contributors
  - Active maintenance (v4 / `@rneui/themed`)
  - Works well with Expo out of the box
- **Cons:**
  - v3 API is showing its age; v4 is the modern successor
  - Smaller component catalogue than some alternatives
- **Assessment:** Best short-term fit given zero migration cost from partial adoption.

### 2. React Native Paper

- **Repository:** https://callstack.github.io/react-native-paper
- **Pros:**
  - Implements Material Design 3; polished, well-documented
  - Actively maintained by Callstack
  - Rich component catalogue
- **Cons:**
  - Imposes Material Design styling; requires theming customisation to deviate significantly
  - Larger bundle size
  - Would require replacing all existing `react-native-elements` usages
- **Assessment:** Good option for a greenfield Material-Design app; migration cost is higher here.

### 3. NativeBase / Gluestack UI

- **Repository:** https://gluestack.io (NativeBase has been rebranded to Gluestack UI)
- **Pros:**
  - Comprehensive component set
  - Supports both React Native and web via universal components
- **Cons:**
  - Underwent a significant rebrand and API break (NativeBase → Gluestack)
  - Higher risk of future breaking changes raises maintenance concern
  - More complex setup (provider tree, token-based theming)
- **Assessment:** The recent instability and migration history makes this a poor fit against our "low maintenance" priority.

### 4. Tamagui

- **Repository:** https://tamagui.dev
- **Pros:**
  - Very performant (compile-time optimisation)
  - Universal (web + native)
  - Modern API with design-token theming
- **Cons:**
  - Relatively new; smaller community than alternatives
  - Significant configuration overhead (Babel/Metro plugins)
  - Highest migration risk for a team unfamiliar with it
- **Assessment:** Promising for the future, but the setup cost and immaturity are at odds with our "stability and low maintenance" priority.

---

## Decision

**We adopt React Native Elements (`react-native-elements` v3 / `@rneui/themed` v4) as the standard UI component library.**

Rationale:

1. It is already installed and used for `Button` components, so the adoption cost is minimal.
2. Its lightweight, un-opinionated design fits the app's existing visual language without forcing a large reskin.
3. It is stable, well-documented, and actively maintained.
4. The `Input` component directly replaces hand-crafted `TextInput` + `StyleSheet` patterns with a richer API (placeholder, error messaging, clear button).

As part of this decision:

- All `TextInput` components with hand-written inline styles are replaced with the `Input` component from `react-native-elements`.
- The app is wrapped with the `ThemeProvider` from `react-native-elements` in `App.tsx` to enable future theme customisation.
- The existing `Button` usage and its colour constants in `src/styles.ts` are preserved, as those colours encode meaningful application state (e.g. red = scored, dark blue = bonus scored) rather than arbitrary decoration.

---

## Consequences

- New contributors should default to components from `react-native-elements` before writing bespoke styled primitives.
- If a required component is not available in the library, it should be documented as an exception.
- A future ADR should evaluate upgrading from `react-native-elements` v3 to `@rneui/themed` v4 once the Expo SDK dependency graph allows it.
