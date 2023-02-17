import { useState } from 'react';
// import { findWeatherForecast} from '../../utils/api_calls';
import styles from './Home.module.css'
import ListAllService from '../ListAllServices/ListAllServices';

export default function Home(props){
    const daysToSearchWeather = 1

    let APIData = ''
    let [initialLoader, setInitialLoader] = useState(1);
    let [city, setCity] = useState('Toronto');
    let [currentWeatherData, setCurrentWeatherData] = useState();
    let [locationData, setLocationData] = useState();

    let weatherAPIObjectKeys = currentWeatherData ? Object.keys(currentWeatherData) : null;


    async function handleSubmit(event){
        if(event){
            event.preventDefault();
        }
        // APIData = await findWeatherForecast(city, daysToSearchWeather);
        setCurrentWeatherData(APIData.current);
        setLocationData(APIData.location)
        // console.log(APIData)

    }

    // function displayLoaderUI(visibility){
    //     return <LoaderUI active={visibility}/>
    // }

    function handleOnLoad(cb){
        if(initialLoader === 1){
            cb()
            setInitialLoader(initialLoader + 1)
        }
    }

    function displayWeatherData(){
        return (
                <div className={styles.homeInfoContainer}>
                    <h1><i>{locationData.name} Weather</i></h1>
                    
                    <div className={styles.homeWeatherConditions}>   
                        {
                            weatherAPIObjectKeys 
                            ? (weatherAPIObjectKeys.slice(2, 13).map((key,idx )=> 
                                {
                                   return (
                                    key !== 'condition' &&
                                    <div key={idx}>{key}: {currentWeatherData[key]}</div>
                                   )
                                }
                            )) 
                            : ''
                        
                        }
                    </div>
                    <div className={styles.homeWeatherDetails}>   
                        {
                            weatherAPIObjectKeys 
                            ? (weatherAPIObjectKeys.slice(13, 23).map(key => 
                                <div>{key}: {key === 'condition' ? '' : currentWeatherData[key]}</div>
                                
                            )) 
                            : ''
                        
                        }
                    </div>
                    <h6 className={styles.homeWeatherLastUpdated}><i>Last Updated : {currentWeatherData.last_updated}</i></h6>

                </div>
               
            
        )
    }

    function handleChange(event){
        setCity(event.target.value)
    }

    return (
        <div className={styles.homeContainer} onLoad={handleOnLoad(handleSubmit)}>
            <form className={styles.homeInputFieldForm} onSubmit={handleSubmit}>
              <input type="text" placeholder="Enter city name to find weather " value={city} name="cityAstronomy" onChange={handleChange}/>
              <button type="submit" >Search Weather</button>
            </form>
            <hr />
           <ListAllService />
        </div>
    )
}