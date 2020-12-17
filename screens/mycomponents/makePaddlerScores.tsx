
export const moveListArray: dataSourceMoveInterface[] = Object.values(
    require("../../data/moves_lists/move_list.json")
).flat() as dataSourceMoveInterface[]

export const initialScoresheet = () => {
    const initialMoves = moveListArray.map((item: dataSourceMoveInterface) => {
        const scoresObject: moveInterface = {
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

export interface dataSourceMoveInterface {
    Move: string,
    Value: number,
    "Clean": number,
    "SuperClean": number,
    "Air": number,
    "Huge": number,
    "Link": number,
    "Reverse": boolean
}

export interface moveInterface {
    id: string,
    left: {
        scored: boolean,
        air: boolean,
        huge: boolean,
        clean: boolean,
        superClean: boolean,
        link: boolean
    },
    right: {
        scored: boolean,
        air: boolean,
        huge: boolean,
        clean: boolean,
        superClean: boolean,
        link: boolean
    }
}

export interface moveSideInterface {
    scored: boolean,
    air: boolean,
    huge: boolean,
    clean: boolean,
    superClean: boolean,
    link: boolean
}