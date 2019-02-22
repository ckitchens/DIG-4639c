import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    const{key}=this.props.navigation.state.params
    return (
      <ScrollView style={styles.container}>
      <Text>{key} { key==="cat1" ? "is mysterious": "is fluffy"}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});