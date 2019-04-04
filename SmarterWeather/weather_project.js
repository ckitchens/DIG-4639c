import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  Image
} from "react-native";
import Button from "./Button";
import * as Expo from "expo";
import Forecast from "./Forecast";
import LocationButton from "./LocationButton";
import textStyles from "./styles/typography.js";

const STORAGE_KEY = "@SmarterWeather:zip";

import OpenWeatherMap from "./open_weather_map";

// This version uses flowers.png from local assets
//import PhotoBackdrop from "./PhotoBackdrop/local_image";

// This version pulls a specified photo from the camera roll
 import PhotoBackdrop from './PhotoBackdrop/local_image';

class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: null,
      currentTime:"",
      fahrenheit : false
    };

  }

componentWillReceiveProps(nextProps){
  const fahrenheit = nextProps.navigation.getParam("fahrenheit", true)
  this.setState({fahrenheit}, this._getCoords)
}

  _getcurrentTime = () => {
    setInterval( () => {
      const date = new Date()
      let ampm = "AM"
      let hours = date.getHours()
      const minutes = date.getMinutes()
      let seconds = date.getSeconds()
      if(hours > 12){
        hours = hours-12
        ampm = "PM"
      }
      if(seconds < 10){
        seconds = `0${seconds}`
      }
      const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`
      this.setState({currentTime})
    },1000)
  }


  checkMultiPermissions = async() => {
    const { Permissions, FileSystem } = Expo;
    console.log(FileSystem.documentDirectory);
    const { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      console.log('Hey! You heve not enabled selected permissions');
      const { newStatus, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      status = newStatus;
    }
    if(status === 'granted') {
        console.log("Granted!");
        let result = await Expo.ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
        })

        console.log(result);
          if (!result.cancelled) {
            console.log(this);
            console.log("Accepted!");
            this.setState({ newPostImage:result.uri, createPostModalVisible: true })
            FileSystem.copyAsync({from:result.uri,to:FileSystem.documentDirectory+"myimage.jpg"})
            .then(() => console.log("Moved to location"));
            try {
              await AsyncStorage.setItem('@MySuperStore:key', result.uri)
              .then(() => console.log("Saved selection to disk: " + result.uri))
              .catch(error => console.error("AsyncStorage error: " + error.message))
              .done();
              console.log("saved");
              this._retrieveData();
            } catch (error) {
              // Error saving data
            }
          }
      }

  }
  _retrieveData = async () => {
      console.log("Retrieving Data");
        try {
          const value = await AsyncStorage.getItem('@MySuperStore:key');
          if (value !== null) {
            // We have data!!
            console.log("Got data");
            console.log(value);
            this.setState({ newPostImage:value, createPostModalVisible: true })
          } else {
            console.log("No data");
          }
        } catch (error) {
          console.log(error);
          // Error retrieving data
        }
      }

  componentDidMount() {
    this._getcurrentTime()
    this._getForecastForCoords()
    AsyncStorage
      .getItem(STORAGE_KEY)
      .then(value => {
        if (value !== null) {
          this._getForecastForZip(value);
        }
      })
      .catch(error => console.error("AsyncStorage error: " + error.message))
      .done();
      this._retrieveData();
  }

  _getForecastForZip = zip => {
    // Store zip code
    AsyncStorage
      .setItem(STORAGE_KEY, zip)
      .then(() => console.log("Saved selection to disk: " + zip))
      .catch(error => console.error("AsyncStorage error: " + error.message))
      .done();

    OpenWeatherMap.fetchZipForecast(zip).then(forecast => {
      this.setState({ forecast: forecast });
    });
  };

  _getForecastForCoords = () => {
    navigator.geolocation.getCurrentPosition(
      initialPosition => {
        OpenWeatherMap.fetchLatLonForecast(initialPosition.coords.latitude, initialPosition.coords.longitude, this.state.fahrenheit)
          .then(forecast => {
          this.setState({ forecast: forecast });
        });
      },
      error => {
        alert(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    this._getForecastForZip(zip);
  };

  render() {
    let content = null;
    console.log("Rendered" + this.state.newPostImage);
    if (this.state.forecast !== null) {
      content = (
        <View style={styles.row}>
          <Forecast
            main={this.state.forecast.main}
            temp={this.state.forecast.temp}
            fahrenheit={this.state.fahrenheit}
          />
        </View>
      );
    }
    else{
      content = (
        <View style={styles.row}>
          <Text style={{color:"#FFFFFF", fontSize:30}}>Loading Weather...</Text>
        </View>
      )
    }

    return (
      <PhotoBackdrop image={this.state.newPostImage} >
        <View style={styles.overlay}>
        <View>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Settings')}>
                <Image style={{marginTop: 40, marginRight: 20, width: 30, height: 30, alignSelf: 'flex-end'}} source={{uri: 'http://cdn.onlinewebfonts.com/svg/img_316942.png'}}/>
            </TouchableHighlight>
          </View>
          <View style={styles.row}>
            <Text style={textStyles.mainText}>
              Forecast for
            </Text>

            <View style={styles.zipContainer}>
              <TextInput
                style={[textStyles.mainText, styles.zipCode]}
                onSubmitEditing={this._handleTextChange}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={{color:"#FFFFFF", fontSize:30}}> {this.state.currentTime}</Text>
          </View>

          <View style={styles.row}>
            <Button onPress={this.checkMultiPermissions} label="Choose Image"></Button>
          </View>
          {content}

        </View>
      </PhotoBackdrop>
    );
  }
}

const styles = StyleSheet.create({
  overlay: { backgroundColor: "rgba(0,0,0,0.1)" },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  zipContainer: {
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
    width: 80,
    height: textStyles.baseFontSize * 2,
    justifyContent: "flex-end"
  },
  zipCode: { flex: 1 }
});

export default WeatherProject;
