import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
//import MapView from "react-native-maps";
import Modal from "react-native-modal";
import Dropdown from "react-native-modal-dropdown";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome, Ionicons } from "@expo/vector-icons";

import { Font } from "expo";

import * as theme from "../theme";

import MapView, { Marker } from "react-native-maps";

//const { Marker } = MapView;
const { height, width } = Dimensions.get("screen");
const parkingsSpots = [
  {
    id: 1,
    title: "LOCATION ONE",
    price: 36,
    rating: 4.1,
    spots: 20,
    free: 25,
    coordinate: {
      latitude: 37.78735,
      longitude: -122.4334,
    },
    description: `Description about this parking lot 
    Situated in a bustling area, this parking lot provides easy access to nearby attractions and facilities. It boasts 20 well-maintained parking spots, ensuring convenience and availability for visitors.
  
    Secure with CTV`,
  },
  {
    id: 2,
    title: "LOCATION THREE",
    price: 60,
    rating: 3.4,
    spots: 25,
    free: 50,
    coordinate: {
      latitude: 37.78845,
      longitude: -122.4344,
    },
    description: `Description about this parking lot

Open year 2022
Secure with CTV`,
  },
  {
    id: 3,
    title: "LOCATION FOUR",
    price: 110,
    rating: 5.0,
    spots: 50,
    free: 75,
    coordinate: {
      latitude: 37.78615,
      longitude: -122.4314,
    },
    description: `Description about this parking lot

Open year 2023
Secure with CTV`,
  },
  {
    id: 4,
    title: "LOCATION FIVE",
    price: 160,
    rating: 4.0,
    spots: 50,
    free: 78,
    coordinate: {
      latitude: 37.78515,
      longitude: -122.435,
    },
    description: `Description about this parking lot

Open year 2020
Secure with CTV`,
  },
];
class ParkingMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: null,
      modalVisible: false, // New state variable to manage modal visibility
    };
  }

  handleProceedToPay = () => {
    const { activeModal, hours } = this.state;
    // Set the active modal details
    this.setState({ activeModal: activeModal, modalVisible: true });
  };

  state = {
    hours: {},
    active: null,
    activeModal: null,
  };

  UNSAFE_componentWillMount() {
    const { parkings } = this.props;
    const hours = {};

    parkings.map((parking) => {
      hours[parking.id] = 1;
    });

    this.setState({ hours });
  }

  handleHours = (id, value) => {
    const { hours } = this.state;
    hours[id] = value;

    this.setState({ hours });
  };

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={{ flex: 12, justifyContent: "center" }}>
          <Text style={styles.headerTitle}>
            CURRENT LOCATION San Francisco, US
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
        >
          <TouchableWithoutFeedback>
            <Text></Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  renderParking = (item) => {
    const { hours } = this.state;
    const totalPrice = item.price * hours[item.id];

    return (
      <TouchableWithoutFeedback
        key={`parking-${item.id}`}
        onPress={() => this.setState({ active: item.id })}
      >
        <View style={[styles.parking, styles.shadow]}>
          <View style={styles.hours}>
            <Text style={styles.hoursTitle}>
              {item.spots} {item.title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {this.renderHours(item.id)}
              <Text style={{ color: theme.COLORS.gray }}>hrs</Text>
            </View>
          </View>
          <View style={styles.parkingInfoContainer}>
            <View style={styles.parkingInfo}>
              <Text style={{ marginLeft: theme.SIZES.base }}>
                {" "}
                ${item.price}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buy}
              onPress={() => this.setState({ activeModal: item })}
            >
              <View style={styles.buyTotal}>
                <Text style={{ color: theme.COLORS.white }}>BOOK NOW</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderParkings = () => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.parkings}
        data={this.props.parkings}
        extraData={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => this.renderParking(item)}
      />
    );
  };

  renderHours(id) {
    const { hours } = this.state;
    const availableHours = [1, 2, 3, 4, 5, 6];

    return (
      <Dropdown
        defaultIndex={0}
        options={availableHours}
        style={styles.hoursDropdown}
        defaultValue={`0${hours[id]}:00` || "01:00"}
        dropdownStyle={styles.hoursDropdownStyle}
        onSelect={(index, value) => this.handleHours(id, value)}
        renderRow={(option) => (
          <Text style={styles.hoursDropdownOption}>{`0${option}:00`}</Text>
        )}
        renderButtonText={(option) => `0${option}:00`}
      />
    );
  }

  renderModal() {
    //const { activeModal, hours } = this.state;
    const { activeModal, hours, modalVisible } = this.state;

    if (!activeModal) return null;

    return (
      <Modal
        isVisible
        useNativeDriver
        style={styles.modalContainer}
        backdropColor={theme.COLORS.overlay}
        onBackButtonPress={() => this.setState({ activeModal: null })}
        onBackdropPress={() => this.setState({ activeModal: null })}
        onSwipeComplete={() => this.setState({ activeModal: null })}
      >
        <View style={styles.modal}>
          <View>
            <Text style={{ fontSize: theme.SIZES.font * 1.5 }}>
              {activeModal.title}
            </Text>
          </View>
          <View style={{ paddingVertical: theme.SIZES.base }}>
            <Text
              style={{
                color: theme.COLORS.gray,
                fontSize: theme.SIZES.font * 1.1,
              }}
            >
              {activeModal.description}
            </Text>
          </View>
          <View style={styles.modalInfo}>
            <View
              style={[styles.parkingIcon, { justifyContent: "flex-start" }]}
            >
              <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {" "}
                ${activeModal.price}
              </Text>
            </View>
            <View
              style={[styles.parkingIcon, { justifyContent: "flex-start" }]}
            >
              <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {" "}
                {activeModal.rating}
              </Text>
            </View>
            <View
              style={[styles.parkingIcon, { justifyContent: "flex-start" }]}
            >
              {/* <Ionicons
                name="ios-pin"
                size={theme.SIZES.icon * 1.1}
                color={theme.COLORS.gray}
              /> */}
              <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {" "}
                {activeModal.price}km
              </Text>
            </View>
            <View
              style={[styles.parkingIcon, { justifyContent: "flex-start" }]}
            >
              <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {" "}
                {activeModal.free}/{activeModal.spots}
              </Text>
            </View>
          </View>
          <View style={styles.modalHours}>
            <Text style={{ textAlign: "center", fontWeight: "500" }}>
              Choose your Booking Period:
            </Text>
            <View style={styles.modalHoursDropdown}>
              {this.renderHours(activeModal.id)}
              <Text style={{ color: theme.COLORS.gray }}>hrs</Text>
            </View>
          </View>
          <View>
            {
              <View>
                <TouchableOpacity
                  style={styles.payBtn}
                  onPress={this.handleProceedToPay}
                >
                  <Text style={styles.payText}>
                    Proceed to pay $
                    {activeModal
                      ? activeModal.price * hours[activeModal.id]
                      : 0}
                  </Text>
                </TouchableOpacity>

                <Modal style={styles.finalModal} visible={modalVisible}>
                  <View style={styles.closeModal}>
                    <TouchableOpacity
                      onPress={() => this.setState({ modalVisible: false })}
                    >
                      <Text style={styles.modalText}>FINISH</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.modalBody}>
                    <Text style={styles.modalBodyText}>
                      You are about to make a payment:
                    </Text>
                    <Text style={styles.modalBodyText}>
                      FINISH THE PAYMENT PROCESS BY PAYING{" "}
                    </Text>
                    <Text style={styles.amount}>
                      Amount: ${" "}
                      {activeModal
                        ? activeModal.price * hours[activeModal.id]
                        : 0}
                    </Text>
                  </View>
                </Modal>
              </View>
            }
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { currentPosition, parkings } = this.props;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView initialRegion={currentPosition} style={styles.map}>
          {parkings.map((parking) => (
            <Marker
              key={`marker-${parking.id}`}
              coordinate={parking.coordinate}
            >
              <TouchableWithoutFeedback
                onPress={() => this.setState({ active: parking.id })}
              >
                <View
                  style={[
                    styles.marker,
                    styles.shadow,
                    this.state.active === parking.id ? styles.active : null,
                  ]}
                >
                  <Text style={styles.markerPrice}>${parking.price}</Text>
                  <Text style={styles.markerStatus}>
                    {" "}
                    ({parking.free}/{parking.spots})
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Marker>
          ))}
        </MapView>
        {this.renderParkings()}
        {this.renderModal()}
      </View>
    );
  }
}

ParkingMap.defaultProps = {
  currentPosition: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  },
  parkings: parkingsSpots,
};

export default ParkingMap;

const styles = StyleSheet.create({
  amount: {
    fontSize: 25,
  },
  modalBody: {
    backgroundColor: theme.COLORS.white,
    position: "absolute",
    alignItems: "center",

    top: 200,
    right: 0,
    left: 0,
  },
  modalBodyText: {
    fontSize: 30,
    marginTop: 20,
    textAlign: "center",
  },
  closeModal: {
    backgroundColor: theme.COLORS.darkOrange,
    position: "absolute",
    bottom: 300,
    left: 10,
    right: 10,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },

  modalText: {
    fontSize: 25,
  },
  finalModal: {
    backgroundColor: theme.COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.white,
  },
  header: {
    flexDirection: "row",
    //justifyContent: "center",
    paddingHorizontal: theme.SIZES.base * 2,
    paddingTop: theme.SIZES.base * 0.5,
    paddingBottom: theme.SIZES.base * 1.5,
    //position:'absolute',
    // left:0,
    // bottom:0,
    // top:0,
    // right:0,
    color: theme.COLORS.black,
    backgroundColor: theme.COLORS.darkOrange,
  },
  headerTitle: {
    color: theme.COLORS.gray,
  },
  headerLocation: {
    fontSize: theme.SIZES.font,
    fontWeight: "500",
    paddingVertical: theme.SIZES.base / 3,
  },
  map: {
    flex: 3,
  },
  parkings: {
    position: "absolute",
    right: 0,
    left: 0,
    //bottom: 0,
    top: 45,
    paddingBottom: theme.SIZES.base * 2,
  },
  parking: {
    flexDirection: "row",
    backgroundColor: theme.COLORS.gray,
    borderRadius: 6,
    padding: theme.SIZES.base,
    marginHorizontal: theme.SIZES.base * 2,
    width: width - 24 * 2,
    backgroundColor: theme.COLORS.red,
    borderColor: theme.COLORS.red,
  },
  buy: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: theme.SIZES.base * 1.5,
    paddingVertical: theme.SIZES.base,
    backgroundColor: theme.COLORS.darkOrange,
    borderRadius: 6,
  },
  buyTotal: {
    flex: 2,
    justifyContent: "space-evenly",
  },
  buyTotalPrice: {
    color: theme.COLORS.white,
    fontSize: theme.SIZES.base * 2,
    fontWeight: "600",
    paddingLeft: theme.SIZES.base / 4,
  },
  buyBtn: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  marker: {
    flexDirection: "row",
    backgroundColor: theme.COLORS.white,
    borderRadius: theme.SIZES.base * 2,
    paddingVertical: 12,
    paddingHorizontal: theme.SIZES.base * 2,
    borderWidth: 1,
    borderColor: theme.COLORS.white,
  },
  markerPrice: { color: theme.COLORS.red, fontWeight: "bold" },
  markerStatus: { color: theme.COLORS.gray },
  shadow: {
    shadowColor: theme.COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  active: {
    borderColor: theme.COLORS.red,
  },
  hours: {
    flex: 1,
    flexDirection: "column",
    marginLeft: theme.SIZES.base / 2,
    justifyContent: "space-evenly",
  },
  hoursTitle: {
    fontSize: theme.SIZES.text,
    fontWeight: "500",
  },
  hoursDropdown: {
    borderRadius: theme.SIZES.base / 2,
    borderColor: theme.COLORS.overlay,
    borderWidth: 1,
    padding: theme.SIZES.base,
    marginRight: theme.SIZES.base / 2,
  },
  hoursDropdownOption: {
    padding: 5,
    fontSize: theme.SIZES.font * 0.8,
  },
  hoursDropdownStyle: {
    marginLeft: -theme.SIZES.base,
    paddingHorizontal: theme.SIZES.base / 2,
    marginVertical: -(theme.SIZES.base + 1),
  },
  parkingInfoContainer: { flex: 1.5, flexDirection: "row" },
  parkingInfo: {
    justifyContent: "space-evenly",
    marginHorizontal: theme.SIZES.base * 1.5,
  },
  parkingIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modal: {
    flexDirection: "column",
    height: height * 0.75,
    padding: theme.SIZES.base * 2,
    backgroundColor: theme.COLORS.white,
    borderTopLeftRadius: theme.SIZES.base,
    borderTopRightRadius: theme.SIZES.base,
  },
  modalInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: theme.SIZES.base,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.COLORS.overlay,
    borderBottomColor: theme.COLORS.overlay,
  },
  modalHours: {
    paddingVertical: 2,
  },
  modalHoursDropdown: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.SIZES.base,
  },
  payBtn: {
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.SIZES.base * 1.5,
    backgroundColor: theme.COLORS.red,
  },
  payText: {
    fontWeight: "600",
    fontSize: theme.SIZES.base * 1.5,
    color: theme.COLORS.white,
  },
});
