import React from 'react';
import {View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../Stores/reducers';
import {styles} from './ItemCard.styles';

type PropsTypes = {
  labelIds: number[];
};

const ItemLabels = (props: PropsTypes): JSX.Element => {
  const {labelIds} = props;
  const labels = useSelector((state: RootState) => {
    const labelsList = state.labels.labels;
    if (Object.keys(labelsList).length > 0) {
      return labelIds.map((lid) => labelsList[lid]).filter((l) => !!l);
    } else {
      return [];
    }
  });
  return (
    <View style={styles.itemIconsWrap}>
      {labels.map((l, index) => {
        return (
          <Image
            key={l.id}
            style={[styles.itemIcons, {zIndex: 1 + labelIds.length - index}]}
            source={{uri: l.icon}}
          />
        );
      })}
    </View>
  );
};

export default ItemLabels;
