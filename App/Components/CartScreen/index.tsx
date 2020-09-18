import React, { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import CartClearModal from './CartClearModal';
import {styles} from './cartScreen.styles';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import { useSelector } from "react-redux";
import { RootState } from "../../Stores/reducers";
import map from 'lodash-es/map';
import property from 'lodash-es/property';

const isIos = Platform.OS === 'ios';

const CartScreenComponent: React.FC = (): JSX.Element => {

  const [borderRadius, setBorderRadius] = useState(isIos ? 8 : 4);
  const cart = useSelector((state: RootState) => state.cart);
  const items = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user.user);
  const settings = useSelector((state: RootState) => state.settings.settings);
  const lastOrder = useSelector((state: RootState) => state.order.lastOrder);
  const allItemIds = useSelector((state: RootState) =>
    map(state.menuList.items, property('id')),
  );

  return (
    <ScrollView style={styles.productMain}>
      <CartClearModal />
      {/*<SwipeListView*/}
      {/*  useFlatList*/}
      {/*  data={this.props.items}*/}
      {/*  keyExtractor={(item, index) => `${item.id}`}*/}
      {/*  onRowOpen={() => {*/}
      {/*    this.setState({borderRadius: 0});*/}
      {/*  }}*/}
      {/*  onRowClose={() => {*/}
      {/*    this.setState({borderRadius: isIos ? 8 : 4});*/}
      {/*  }}*/}
      {/*  renderItem={(rowData, rowMap, ...rest) => {*/}
      {/*    const {item} = rowData;*/}
      {/*    let missing = false;*/}
      {/*    if (missingIds.indexOf(item.item.id) !== -1) {*/}
      {/*      missing = true;*/}
      {/*    }*/}

      {/*    return (*/}
      {/*      <SwipeRow*/}
      {/*        rightOpenValue={-60}*/}
      {/*        style={[*/}
      {/*          styles.productRow,*/}
      {/*          {*/}
      {/*            borderTopRightRadius: this.state.borderRadius,*/}
      {/*            borderBottomRightRadius: this.state.borderRadius,*/}
      {/*          },*/}
      {/*        ]}*/}
      {/*        stopRightSwipe={-60}*/}
      {/*        disableRightSwipe>*/}
      {/*        <View style={styles.productContainer}>*/}
      {/*          <TouchableOpacity*/}
      {/*            onPress={() => {*/}
      {/*              this.props.deleteItem(item.id);*/}
      {/*            }}*/}
      {/*            style={styles.productBasketField}>*/}
      {/*            <Image*/}
      {/*              source={icons.icDelete}*/}
      {/*              style={styles.productBasket}*/}
      {/*            />*/}
      {/*          </TouchableOpacity>*/}
      {/*        </View>*/}
      {/*        <View>*/}
      {/*          <CartItem*/}
      {/*            cardData={item}*/}
      {/*            style={{*/}
      {/*              borderTopRightRadius: this.state.borderRadius,*/}
      {/*              borderBottomRightRadius: this.state.borderRadius,*/}
      {/*            }}*/}
      {/*            missing={missing}*/}
      {/*            editItemCount={editItemCount}*/}
      {/*            aquarium={item.item.is_aquarium}*/}
      {/*            showEdit={showEdit}*/}
      {/*          />*/}
      {/*        </View>*/}
      {/*      </SwipeRow>*/}
      {/*    );*/}
      {/*  }}*/}
      {/*/>*/}
      {/*{discountPercent && (*/}
      {/*  <View style={styles.productTotalContainer}>*/}
      {/*    <Text style={styles.productDiscount}>*/}
      {/*      Скидка {discountPercent}%*/}
      {/*    </Text>*/}
      {/*    <Text style={styles.productDiscount}>*/}
      {/*      {discountAmount} {'\u20BD'}*/}
      {/*    </Text>*/}
      {/*  </View>*/}
      {/*)}*/}
      {/*<View style={styles.productTotalContainer}>*/}
      {/*  <Text style={styles.productTotalText}>Итого</Text>*/}
      {/*  <Text style={styles.productTotalText}>*/}
      {/*    {totalWithDiscount} {'\u20BD'}*/}
      {/*  </Text>*/}
      {/*</View>*/}
      {/*<View style={styles.productDeliveryContainer}>*/}
      {/*  {this.renderProductsNotAvailable(missingIds)}*/}
      {/*  {this.renderDeliveryText()}*/}
      {/*</View>*/}
      {/*<TouchableOpacity*/}
      {/*  onPress={this.startOrder}*/}
      {/*  style={styles.productBuyWrapper}>*/}
      {/*  <Text style={styles.productBuy}>Оформить</Text>*/}
      {/*</TouchableOpacity>*/}
    </ScrollView>
  );
};

export default CartScreenComponent;
