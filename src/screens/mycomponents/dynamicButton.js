import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { updatePaddlerScores } from '../../actions';
import { getScoresState } from '../../selectors';
import { styles } from '../../styles';

const DynamicButtonPresentation = React.memo((props) => {
  const oneSidedMoves = ['Loop', 'Back Loop'];
  const _handleMove = (paddler, run, move, direction, type) => () => {
    const newScores = { ...props.paddlerScores };

    const newField = !newScores[paddler][run][move][direction][type];
    newScores[paddler][run][move][direction][type] = newField;
    if (newScores[paddler][run][move][direction].huge) {
      newScores[paddler][run][move][direction].air = true;
    }
    if (newScores[paddler][run][move][direction].superClean) {
      newScores[paddler][run][move][direction].clean = true;
    }
    props.updateScore(newScores);
  };

  const thisMove = props.paddlerScores[props.paddler][props.run][props.move.Move];
  if (
    thisMove[
      props.direction
    ].scored == false
  ) {
    const buttonName = oneSidedMoves.indexOf(props.move.Move) > -1
      ? props.move.Move
      : `${props.move.Move} ${props.direction}`;
    return (
      <Button
        onPress={_handleMove(
          props.paddler,
          props.run,
          props.move.Move,
          props.direction,
          'scored',
        )}
        title={buttonName}
        buttonStyle={styles.noMove}
      />
    );
  }
  const buttonName = (props.move.Move == ('Loop') || props.move.Move == ('Back Loop')) ? props.move.Move : `${props.move.Move} ${props.direction}`;
  return (
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
      <View style={{ width: '100%' }}>
        <Button
          onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, 'scored')}
          title={buttonName}
          buttonStyle={styles.moveScored}
        />
      </View>
      <View style={{ width: '50%' }}>
        <Button
          onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, 'clean')}
          title="C"
          disabled={!props.move.Clean}
          buttonStyle={thisMove[props.direction].clean ? styles.bonusScored : styles.noBonus}
        />
      </View>
      <View style={{ width: '50%' }}>
        <Button
          onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, 'superClean')}
          title="SC"
          disabled={!props.move.SuperClean}
          buttonStyle={thisMove[props.direction].superClean ? styles.bonusScored : styles.noBonus}
        />
      </View>
      <View style={{ width: '25%' }}>
        <Button
          onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, 'air')}
          title="A"
          disabled={!props.move.Air}
          buttonStyle={thisMove[props.direction].air ? styles.bonusScored : styles.noBonus}
        />
      </View>
      <View style={{ width: '40%' }}>
        <Button
          onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, 'huge')}
          title="H"
          disabled={!props.move.Huge}
          buttonStyle={thisMove[props.direction].huge ? styles.bonusScored : styles.noBonus}
        />
      </View>
      <View style={{ width: '35%' }}>
        <Button
          onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, 'link')}
          title="L"
          disabled={!props.move.Link}
          buttonStyle={thisMove[props.direction].link ? styles.bonusScored : styles.noBonus}
        />
      </View>
    </View>
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

export const DynamicButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DynamicButtonPresentation);