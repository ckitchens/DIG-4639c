import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  AsyncStorage,
  Button
} from 'react-native';

export default class CountDownTimer extends React.Component {

  state = {
    time: 5,
    interval: null,
    paused: true,
  }

  play = () => {
      this.setState({paused: false}, this.startTimer)
  }

  pause = () => {
    this.setState({ paused: true })
  }

  startTimer = () => {
    const interval = setInterval(() => {
      this.updateTime()
   }, 1000);
   this.setState({interval})
  }

  resetTimer = () => {
      clearInterval(this.state.interval)
      this.setState({paused: true, time: 30, interval: null})
  }

  updateTime = () => {
    if (!this.state.paused) {
      if(this.state.time===0){
        this.props.done("Done")
        clearInterval(this.state.interval)
        this.setState({interval:null})
      }else{
         this.setState({time: this.state.time - 1 })
       }
    } else {
      clearInterval(this.state.interval)
    }
  }

  render() {
    return (
      <View>
            <Text style={{fontSize: 50}}>{this.state.time}</Text>
            <Button
                onPress={() => this.state.paused ? this.play(): this.pause()}
                title={this.state.paused ? 'Play' : 'Pause'}
            />
            <Button
                onPress={() => this.resetTimer()}
                title="Reset"
            />
      </View>
    );
  }
}
CountDownTimer.defaultProps={done:message => console.log(message)}
