import React, { Component } from 'react';
class NameForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {value: ''};
        this.submitted = false;
        this.viable = 3;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        this.submitted = true;
        this.name = this.state;
        const tester = /^[a-zA-Z\s]*$/;

        if((tester.test(this.state.value))==true){
          alert('Hello' + this.state.value);
          this.viable = 1;
        }
        else{
          alert('You can only use letters ');
          this.viable = 2;
        }
        event.preventDefault();
        this.setState({state: this.state });
      }

      render() {
        const statement = this.viable;
        const name = this.state.value;

        if(statement ==1){
          return(
            <p>Hello, {name}</p>
          );
        }
        else if(statement ==3){
          return(  <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          );
        }
        else if(statement ==2){
          return(
            <p style={{color:'red'}}>Please use only letters and spaces.</p>
                );
              }
            }
          }
     export default NameForm;
