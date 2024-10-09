
import React, { useState, useEffect } from 'react';
import Variable from "../Variable/Variable"
import './Temperatures.css'

function Temperatures() {

    const [celsius, setCelsius] = useState(25)
    const [fahrenheit, setFahrenheit] = useState(77)
    const [kelvin, setKelvin] = useState(298.15)

    // ฟังก์ชันแปลงอุณหภูมิ
    const celsiusToKelvin = (c) => c + 273.15;
    const celsiusToFahrenheit = (c) => (c * 9) / 5 + 32;
    const fahrenheitToCelsius = (f) => ((f - 32) * 5) / 9;
    const kelvinToCelsius = (k) => k - 273.15;

    // celsius เปลี่ยน จะอัปเดต fahrenheit และ kelvin
    useEffect(() => {
        setFahrenheit(celsiusToFahrenheit(celsius));
        setKelvin(celsiusToKelvin(celsius));
    }, [celsius]);

    //fahrenheit เปลี่ยน จะอัปเดต celsius และ kelvin
    useEffect(() => {
        const newCelsius = fahrenheitToCelsius(fahrenheit);
        setCelsius(newCelsius);
        setKelvin(celsiusToKelvin(newCelsius))

    }, [fahrenheit]);

    //kelvin เปลี่ยน จะอัปเดต celsius และ fahrenheit
    useEffect(() => {
        const newCelsius = kelvinToCelsius(kelvin);
        setCelsius(newCelsius);
        setFahrenheit(celsiusToFahrenheit(newCelsius))

    }, [kelvin]);

    
    return ( 
        <div className='temperatures-container'>
            <h3 className='temperatures-title'>TEMPERATURES</h3>
            <h3 className='temperatures-display'>
                <span className='badge bg-primary'>{celsius.toFixed(2)} °C</span> 
                <span className='badge bg-primary'>{fahrenheit.toFixed(2)} °F</span> 
                <span className='badge bg-primary'>{kelvin.toFixed(2)}  °k</span> 
            </h3>
        <div className='temperatures-variable'>
            <Variable name = {'Celsius'} value = {celsius} setValue = {setCelsius}/>
            <Variable name = {'Fahrenheit'} value = {fahrenheit} setValue = {setFahrenheit}/>
            <Variable type = {'int'} name = {'Kelvin'} value = {kelvin} setValue = {setKelvin}/>
        </div>
        </div>
     );
}

export default Temperatures;