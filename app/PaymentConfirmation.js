import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PaymentConfirmation = ({ paymentDetails, onConfirmPayment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Item Name:</Text>
        <Text>{paymentDetails.itemName}</Text>

        <Text style={styles.label}>Amount:</Text>
        <Text>{`R ${paymentDetails.amount}`}</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={onConfirmPayment}>
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PaymentConfirmation;
