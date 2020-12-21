import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { updatePaddlerScores } from '../../actions';
import { getScoresState } from '../../selectors';
import { styles } from '../../styles';

const makeScoresObject = (move) => ({
  id: move.toString(),
  left: {
    scored: false,
    air: false,
    huge: false,
    clean: false,
    superClean: false,
    link: false,
  },
  right: {
    scored: false,
    air: false,
    huge: false,
    clean: false,
    superClean: false,
    link: false,
  },
});

const TrophyDynamicButtonPresentation = React.memo((props) => {
  const _handleMove = (paddler, run, move, direction, type, key) => () => {
    const newScores = { ...props.paddlerScores };
    const newField = !newScores[paddler][run][move][key][direction][type];
    newScores[paddler][run][move][key][direction][type] = newField;
    if (type == 'huge') {
      newScores[paddler][run][move][key][direction].air = newField;
    }
    if (type == 'superClean') {
      newScores[paddler][run][move][key][direction].clean = newField;
    }

    if (newScores[paddler][run][move][(newScores[paddler][run][move]).length - 1].left.scored == true) {
      (newScores[paddler][run][move]).push(makeScoresObject(move));
    }

    props.updateScore(newScores);
  };

  const theMoves = props.paddlerScores[props.paddler][props.run][props.move.Move];
  return (
    theMoves.map((thisMove, key) => {
      if (
        thisMove[
          props.direction
        ].scored == false
      ) {
        const buttonName = props.move.Move;

        return (
          <Button
            onPress={_handleMove(
              props.paddler,
              props.run,
              props.move.Move,
              props.direction,
              'scored',
              key,
            )}
            title={buttonName}
            buttonStyle={styles.noMove}
            key={key}
          />
        );
      }
      const buttonName = props.move.Move;
      return (
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }} key={key}>
          <View style={{ width: '100%' }}>
            <Button
              onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, 'scored', key)}
              title={buttonName}
              buttonStyle={styles.moveScored}
            />
          </View>
          <View style={{ width: '50%' }}>
            <Button
              onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, 'clean', key)}
              title="Clean"
              disabled={!props.move.Clean}
              buttonStyle={thisMove[props.direction].clean ? styles.bonusScored : styles.noBonus}
            />
          </View>
          <View style={{ width: '50%' }}>
            <Button
              onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, 'superClean', key)}
              title="S Clean"
              disabled={!props.move.SuperClean}
              buttonStyle={thisMove[props.direction].superClean ? styles.bonusScored : styles.noBonus}
            />
          </View>
          <View style={{ width: '25%' }}>
            <Button
              onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, 'air', key)}
              title="Air"
              disabled={!props.move.Air}
              buttonStyle={thisMove[props.direction].air ? styles.bonusScored : styles.noBonus}
            />
          </View>
          <View style={{ width: '40%' }}>
            <Button
              onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, 'huge', key)}
              title="Huge"
              disabled={!props.move.Huge}
              buttonStyle={thisMove[props.direction].huge ? styles.bonusScored : styles.noBonus}
            />
          </View>
          <View style={{ width: '35%' }}>
            <Button
              onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, 'link', key)}
              title="Link"
              disabled={!props.move.Link}
              buttonStyle={thisMove[props.direction].link ? styles.bonusScored : styles.noBonus}
            />
          </View>
        </View>
      );
    })
  );
});

// can we make this go deeper, so that we only update a single component when we add a move?
const mapStateToProps = (state) => ({
  paddlerScores: getScoresState(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (newScores) => {
    dispatch(updatePaddlerScores(newScores));
  },
});

export const TrophyDynamicButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrophyDynamicButtonPresentation);
