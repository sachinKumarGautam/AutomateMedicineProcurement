import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props){
    super(props);
    this.state={
        selectedFile: null
    }
    this.fileselectedhandler= this.fileselectedhandler.bind(this);
    this.fileuploadhandler= this.fileuploadhandler.bind(this);
}
fileselectedhandler(event) {
    this.setState({slectedFile: event.target.files[0]});
}
fileuploadhandler(ev) {
    ev.preventDefault();
    //const fd = new FormData();
    //fd.append('invoice', this.state.selectedfile, this.state.selectedfile.name, fd);
    axios.post('https://drive.google.com/drive/folders/18tdkwhqgHwyPwlA6mtxP7V7Ij7iGvlEx')
       .then(res => {
         console.log(res);
     });
     
}
render() {
    return (
        <div className="App">
         <input type="file" onChange={this.fileselectedhandler}/>
         <button onClick={this.fileuploadhandler}>upload</button>
        </div>
    );
}
}
export default App;