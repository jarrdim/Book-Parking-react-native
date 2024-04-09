// App.js or your entry point file
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ParkingMap from "./index"; // Assuming this is your initial screen
import PaymentConfirmation from "./PaymentConfirmation";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={ParkingMap} />
        <Stack.Screen
          name="PaymentConfirmation"
          component={PaymentConfirmation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
