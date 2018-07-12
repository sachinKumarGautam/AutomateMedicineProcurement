import React from 'react';
  class Element extends React.Component {
    render(){
      return(
        <div>
          <span style = {{marginLeft: 10}}>{this.props.u}</span>
          <span style = {{marginLeft: 10}}>{this.props.v}</span>
          <span style = {{marginLeft: 10}}>{this.props.w}</span>
          <span style = {{marginLeft: 10}}>{this.props.x}</span>
          <span style = {{marginLeft: 10}}>{this.props.y}</span>
        </div>
      )
    }
  }

  let objectKeys

  class App extends React.Component {

    state = {content: []}

    //*************** CSV rows are stored as array of Objects ******************

    uploadFile = (event) => {
      event.preventDefault()
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (event) => {
          let csvData = event.target.result;
          let lines = csvData.split("\n").length;
          let data =  csv.parse(csvData);
          console.log(data)

          objectKeys = map(data[0], function(value, key) {             //Headings of CSV file
  					return key;
  				});

          console.log(objectKeys)
          this.setState({
            content: data
          })
        }
    }

    render() {
      return (
        <div>
          <div>
            <input type="file" name="myFile" onChange={this.uploadFile} />
          </div>
          <div>{
            this.state.content.map(function(element,i){
              return <Element key = {i} u = {element[objectKeys[0]]} v = {element[objectKeys[1]]} w = {element[objectKeys[2]]} x = {element[objectKeys[3]]} y = {element[objectKeys[4]]} />
            })
          }</div>
        </div>
      )
    }
  }

  /*ReactDOM.render(
    <App />,document.getElementById('root')
  )*/