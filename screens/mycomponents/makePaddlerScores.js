import _ from 'lodash';

moveListArray = Object.values(
  require("../../data/moves_lists/move_list.json")
).flat()
export const initialScoresheet = () => {
const initialMoves = moveListArray.map(item => {
        const scoresObject = {
            id: item.Move,
            left: {
                scored: false,
                air: false,
                huge: false,
                clean: false,
                superClean: false,
                link: false
            },
            right: {
                scored: false,
                air: false,
                huge: false,
                clean: false,
                superClean: false,
                link: false
            }
        };
        if (item.Move == "Trophy 1" || item.Move == "Trophy 2" || item.Move == "Trophy 3") {

            return ([scoresObject])
        } else {
            return (scoresObject)
        }
  });

    return initialMoves.reduce((obj, item) => {
        if (Array.isArray(item)) {
            obj[item[0].id] = item;
            return obj;
        } else {
            obj[item.id] = item;
            return obj;
        }
  }, {});
};

