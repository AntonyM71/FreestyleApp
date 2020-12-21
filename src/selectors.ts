import { createSelector } from "reselect";

const getScores = (state) => state.paddlers.paddlerScores;
export const getScoresState = createSelector(
    [getScores],
    (paddlerScores) => paddlerScores,
);
