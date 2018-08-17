import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import uuid from 'uuid';
class ReverseString extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {item: '',stringInput:'',reversed: false};
  }

  handleSubmit(e) {
    e.preventDefault();
    //this.props.onFormSubmit(this.state.name);
    this.setState({name: ''});
    React.findDOMNode(this.refs.name).focus();
    return;
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    
    return (

      <Mutation
    mutation={gql`
      mutation ReverseMutations($stringInput: String!){
        ReverseMutations(stringInput: $stringInput) 
        {
          stringInput
        }
      }
    `}
  >
    {(ReverseMutations, {data,loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      console.log('data'+data);
      let name="";
      if(!loading){
        name=data;
      }
      
      
      return (
        
        <form  onSubmit={e => {
          e.preventDefault();
          console.log('onSubmit');
          ReverseMutations({ variables: {
            stringInput:this.state.stringInput
          }}).then(()=>{console.log('data'+data)});
          if(!loading)
            this.setState({reserved:true, item:data});
          return 'dsfdasf';
        }}>
        <br/>
          <br/>
          
          String To Reverse :    <input 
          type='text' 
          ref='stringInput'
          name='stringInput' 
          onChange={this.onChange.bind(this)} 
          value={this.state.stringInput}
           
          />
          <input type='submit' value='Reserve'
          />
          <div style={{display:this.state.reserved?'block':'none', marginTop:'20px'}}>
          Reversed String is : {name!=undefined?name.ReverseMutations.stringInput:''}</div>
        </form>
      );
    }}
  </Mutation>
    );
  }
}  
export default ReverseString;