import { ADD_OR_REMOVE_PADDLER, CHANGE_PADDLER, UPDATE_PADDLER_SCORES } from "./actionTypes";



  
export const changePaddler= paddlerIndex => {
    return {
    
        type: CHANGE_PADDLER,
        payload: paddlerIndex
    }
}
  
export const addOrRemovePaddlerName = remainingPaddlers => {
    
    return {
        type: ADD_OR_REMOVE_PADDLER,
        payload: remainingPaddlers
    }
}

export const updatePaddlerScores = (newPaddlerScores) => {
    return {
    
        type: UPDATE_PADDLER_SCORES,
        payload: newPaddlerScores
    }
}