

const moveList = require('../../data/moves_lists/move_list.json');
    
    export const initialScoresheet = () => {
    
        const initialMoves = moveList.hole.map((item) => {
            return (
                {
                    id: item.Move,
                    left: {
                        scored: false,
                        air: false,
                        huge: false,
                        clean: false,
                        superClean: false
                    },
                    right: {
                        scored: false,
                        air: false,
                        huge: false,
                        clean: false,
                        superClean: false

                    }
                }
            );
        }
        );
    
        return initialMoves.reduce((obj, item) => {
            obj[item.id] = item
            return obj
        }, {})
    }
