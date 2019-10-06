import { INCREMENT_SCORE } from "./actionTypes";

export const incrementScore = score => {
    return {
    
        type: INCREMENT_SCORE,
        payload: score + 1
    }
}
  