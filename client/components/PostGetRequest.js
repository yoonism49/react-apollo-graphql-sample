import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import uuid from 'uuid';
class PostGetRequest extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {item: '',stringInput:'',result:'GET'};
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
  handleSelectChange(event) {
    console.log('result'+event.target.value);
    this.setState({
      result: event.target.value
    })
  }
  render() {
    
    return (

      <Mutation
    mutation={gql`
      mutation URLRequest($URL: String!,$POSTGET: String!){
        URLRequest(URL: $URL, POSTGET:$POSTGET) 
        {
          URL,
          POSTGET
        }
      }
    `}
  >
    {(URLRequest, {data,loading, error }) => {
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
          URLRequest({ variables: {
            URL:this.state.URL, POSTGET:this.state.result
          }}).then(()=>{console.log('data'+data)});
           if(!loading)
            this.setState({reserved:true, item:data});
          return 'dsfdasf';
        }}>
        <br/>
          <br/>
          
          
          <div > 
          URL:   
          <input 
          type='text' 
          ref='URL'
          name='URL' 
          onChange={this.onChange.bind(this)} 
          value={this.state.URL}
         
          />
          <br/>
          HTTP GET / POST:    
          <select onClick={this.handleSelectChange.bind(this)}>
          <option value="GET">GET</option>
          <option value="HTTP">POST</option>
          </select>
          </div>
          <br/>
          <br/>
          <input type='submit' value='Submit'
          style={{display:this.state.reserved?'none':'block'}} />
          <div style={{display:this.state.reserved?'none':'block', marginTop:'20px'}}>
          Example GET : https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo</div>
          <div style={{display:this.state.reserved?'block':'none', marginTop:'20px'}}>
          Result is : {name!=undefined?name.URLRequest.URL:''}</div>
        </form>
      );
    }}
  </Mutation>
    );
  }
}  
export default PostGetRequest;