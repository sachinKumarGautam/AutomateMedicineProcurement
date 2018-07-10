import React from 'react';
import ReactDOM from 'react-dom';
import CSVFileUploader from './CSVFileUploader.jsx';
// import App from './Form/App.jsx';
import registerServiceWorker from './registerServiceWorker';
   
ReactDOM.render(<CSVFileUploader/>, document.getElementById('root'));
registerServiceWorker();
