import React from 'react';

class App extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {
         data: '',
         num: '',
         email: ''
      };
      this.updateState = this.updateState.bind(this);
      this.handleclick = this.handleclick.bind(this);
     //this.saveState = this.saveState.bind(this);
   };
   updateState(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
      this.setState({[name]: value});
   }
   handleclick(e) {
     console.log(this.state.data)
     alert('your input is: ' + this.state.data);
     e.preventDefault();

   }
   //saveState()
   render() {
      return (
        <form onsubmit = {this.handleclick}>
           <label> 
             Name:
            <input name = "data" type = "text" value = {this.state.data} 
               onChange = {this.updateState} />
               </label>
               <br />
               <label> 
             Phone No. :
             <input name = "num" type = "number" value = {this.state.num} 
               onChange = {this.updateState} />
               </label>
               <br />
               <label> 
              Email ID:
             <input name = "email" type = "text" value = {this.state.email} 
               onChange = {this.updateState} />
               </label>
               
           <input type="submit" value="Submit" />
            </form>

      );
   }
}
export default App;