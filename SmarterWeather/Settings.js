import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  Image,
  Switch
} from "react-native"
import * as Expo from "expo"
import Button from "./Button";

class Settings extends Component {
    state = {
        timeInterval: "1",
        fahinheit: true
    }

    render() {
        return (
            <View>
                <View style={styles.row}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', width: 50}}
                        onChangeText={(timeInterval) => this.setState({ timeInterval })}
                        value={this.state.timeInterval}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={{marginRight: 10}}>Celsius</Text>
                    <Switch
                        onValueChange={(Fahinheit) => {
                            this.setState({ Fahinheit })
                        }}
                        value={this.state.Fahinheit}
                    />
                     <Text  style={{marginLeft: 10}}>Fahrenheit</Text>
                </View>
                <Button onPress={() => this.props.navigation.navigate('Home' , this.state) } label="Save Settings"></Button>
            </View>
        )
    }
}


const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
});


export default Settings
