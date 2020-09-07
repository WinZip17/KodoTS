import React from "react";
import { ScrollView } from "react-native";
import { styles } from "./cartScreen.styles";


const CartScreenComponent: React.FC = (): JSX.Element => {


  return (
    <ScrollView style={styles.productMain}>
      {/*<CartClearModal />*/}
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
  )
}

export default CartScreenComponent
