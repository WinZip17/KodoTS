import React from 'react';
import {View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers';
import {styles} from './ItemCard.styles';

type PropsTypes = {
  labelIds: number[];
};

const ItemLabels = (props: PropsTypes): JSX.Element => {
  const {labelIds} = props;
  const labels = useSelector((state: RootState) => {
    return labelIds.map((lid) => state.labels.labels[lid]).filter((l) => !!l);
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
