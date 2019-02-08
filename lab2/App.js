import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Button }
from 'react-native';

export default class App extends React.Component {
  constructor(props) {
     super(props);
     this.onPress = this.onPress.bind(this);
     this.state ={value:''};
     this.name={value:''};
     this.submit = false;
     this.test = false;
     this.onChange = this.onChange.bind(this);
   }
    onChange(event) {
       console.log(event);
       this.state={value:event};
   }
    onPress(event) {
      console.log("Pressed");
      this.submit=true;
      const test = /^[a-zA-Z\s]*$/;
      if ((test.test(this.state.value))==false){
        this.test = false;
        console.log ("Do not pass go, do not collect $200");
      }
      else{
        this.test = true;
        console.log("You get a right answer, and you get a right answer and YOU GET A RIGHT ANSWER");
      }
      event.preventDefault;
      this.name=this.state.value;
      this.setState({state:this.state});
   }
    render() {
      if(this.submit==true){
        if (this.test==false){
          return(
            <Text style={styles.error}>Name can only contain letters and spaces</Text>
          );
        }
        else if(this.test==true){
          return(
            <Text style={styles.right}>{'hi there '}{this.name}</Text>
          )
        }
      }
      else {
       return (
         <View style={styles.container}
    flexDirection="column" alignItems='stretch'>
          <View><TextInput style={styles.textInput} onChangeText={this.onChange} placeholder="Enter yo shit here"></TextInput></View>
           <TouchableOpacity style={styles.buttonStyle} onPress={this.onPress}><Text style={styles.buttonText}>Submit</Text>
           </TouchableOpacity>
            </View>
          );
         }
       };
     }
   const styles = StyleSheet.create({
      buttonText:
      {
        color:'white',
        fontSize:40,
      },
      buttonStyle:
      {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FF5733',
        height:75,
        margin:30,
      },
      textInput:
      {
        margin:30,
        height:75,
        fontSize:20,
        color:'#FFC300',
        backgroundColor:"white",
      },
      defaultText:
      {
        fontSize:20,
      },
      right:
      {
        margin:100,
        justifyContent:'center',
        alignItems: 'center',
      },
      error:
      {
        margin:100,
        justifyContent:'center',
        alignItems: 'center',
        color: 'red',

      },
      container: {
        flex: 1,
        backgroundColor: '#900C3F',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
