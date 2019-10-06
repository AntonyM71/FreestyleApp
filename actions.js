import { CHANGE_PADDLER, INCREMENT_SCORE } from "./actionTypes";

export const incrementScore = score => {
    return {
    
        type: INCREMENT_SCORE,
        payload: score + 1
    }
}
  
export const changePaddler= paddlerIndex => {
    return {
    
        type: CHANGE_PADDLER,
        payload: paddlerIndex
    }
}
  