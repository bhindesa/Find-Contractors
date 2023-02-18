import { useState } from 'react';
// import { findWeatherForecast} from '../../utils/api_calls';
import styles from './Home.module.css'
import ListAllService from '../ListAllServices/ListAllServices';

export default function Home(props){

    const [byCategory, setByCategory] = useState(false);
    const [bySubCategory, setBySubCategory] = useState(false);
    const [searchInput, setSearchInput] = useState();

    function handleChange(e){
        if(e.target.name){

        }
    }

    function handleCheckboxChange(e){
        if(e.target.name === 'byCategory'){
            setByCategory(!(byCategory))
        }
        else{
            setBySubCategory(!(bySubCategory))
        }
    }
    
    function isFormInvalid(){
        return !(
            byCategory 
            || bySubCategory
            
            );
          }

    function handleSubmit(){

    }

    return (
        <div className={styles.homeContainer}>

            {/* <form className={styles.homeInputFieldForm} onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter category or subcategory" value={searchInput} name="" onChange={handleChange}/>
                <button type="submit" disabled={isFormInvalid()}>Search</button>

                <div className="form-group">
                    <div className="col-sm-12">
                        <label htmlFor="isContractor">Search by Categories: </label>
                        <input type="checkbox" checked={byCategory} onChange={handleCheckboxChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <label htmlFor="isContractor">Search by Sub Categories: </label>
                        <input type="checkbox" checked={bySubCategory} onChange={handleCheckboxChange} />
                    </div>
                </div>
            </form>
            <hr /> */}
           <ListAllService />
        </div>
    )
}