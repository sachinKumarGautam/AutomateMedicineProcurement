import React from 'react';
import Form from './Form';
import Title from './Title';
import Weather from './Weather';

const API_KEY="dfb10069a0c6fc85dd617959dac75c03";

class App extends React.Component{
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined, 
        error: undefined
    }
    getweather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=
        ${city},${country}&appid=${API_KEY}`);
        const data=await api_call.json();
        console.log(data);
    }
    render(){
        return (
            <div>
                <Title />
                <Form getweather={this.getweather}/>
                <Weather />
            </div>
        );
    }
};
export default App;