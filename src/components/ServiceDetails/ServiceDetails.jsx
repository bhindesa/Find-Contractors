import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import contractorService from "../../utils/contractorService";
import servicesService from "../../utils/servicesService";
import styles from './ServiceDetails.module.css';
import { withRoutes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ServiceDetails(props){
    const starIconLink = <img src="https://img.icons8.com/3d-fluency/94/null/star.png" />
    const { serviceId } = useParams();
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();
    const [serviceDescription, setServiceDescription] = useState();
    const [labourCharge, setLabourCharge] = useState();
    const [serviceTime, setServiceTime] = useState();
    const [contractor_id, setContractor_id] = useState();
    const [serviceSearched, setServiceSearched] = useState('Intial');
    const [contractor, setContractor] = useState();
    const [review, setReview] = useState();
    const [stars, setStars] = useState();
    const [starIcon, setStarIcon] = useState(starIconLink);

    useEffect(() => {
        async function fetchData(){
            console.log(serviceId);
            const serviceDataFromAPI = await  servicesService.getOneService(serviceId);
            console.log(serviceDataFromAPI)
            setServiceSearched(serviceDataFromAPI);
        }
        fetchData();  
    },[] )

    function isFormInvalid(){
        return !(
            review
            && stars
            );
    }

    function handleChange(e) {
        if(e.target.name === 'review'){
            setReview(e.target.value)
        }
        if(e.target.name === 'stars'){
            setStars(e.target.value)
        }
        
    }

    function getStarsBasedOnRating(numberOfStar){
        let stars = [];
        for (let index = 0; index < numberOfStar ; index++) {
            stars.push(starIcon);
        }
        return stars;
    }

    function getRatingOptions(){
        const ratingOptions = [
            {
                "1" : getStarsBasedOnRating(1)
            },
            {
                "2" : getStarsBasedOnRating(2)
            },
            {
                "3" : getStarsBasedOnRating(3)
            },
            {
                "4" : getStarsBasedOnRating(4)
            },
            {
                "5" : getStarsBasedOnRating(5)
            }
        ]

        return ratingOptions;
    }

    async function handleSubmit(e){
        e.preventDefault();
        console.log(serviceId)
        // await contractorService.addReview(this.state);
    }


    return (
            <div>
                <header className="header-footer"><h1><i>Service Details</i>:</h1> </header>
                {
                    serviceSearched
                    ?     
                    <div className={styles.serviceDetailsContainer}>
                        <p>{serviceSearched.subCategory} {serviceSearched.category}{serviceId}</p>
                        <p>{serviceSearched.companyName}</p>
                        <p>
                            {   
                                stars 
                                ?
                                getStarsBasedOnRating(stars).map((star, idx) => {
                                    return (
                                    <div className={styles.imgContainer} key={idx}> {star} </div>)
                                })
                                : 'Stars not available'
                            }
                        </p>
                        <p>{serviceSearched.companyRegisterYear}</p>
                        <p>{serviceSearched.serviceDescription}</p>
                    </div>
                    : 'Data not fetched'

                }
            
                <h1><i>Reviews</i>:</h1>           
                <form className={styles.serviceReviewsContainer} onSubmit={handleSubmit} >
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="serviceTime">Review : </label>
                        <input type="text" className="form-control" placeholder="Enter Service Time(Hours)" value={review} name="review" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <label htmlFor="category">Rating for this service: </label>
                            <select name="stars" value={stars} onChange={handleChange}>
                                    <option value="">Select an option</option>
                                {   
                                    getRatingOptions() 
                                    ?
                                    getRatingOptions().map((numberOfStar, idx) => {
                                        console.log(numberOfStar[`${idx + 1}`])
                                        return (
                                            <option key={idx} value={`${idx + 1}`}> {`${idx + 1}`} </option>)
                                    })
                                    : 'Stars not available'
                                }
                            </select>
                            <div>
                                <p>
                                    {   
                                        stars 
                                        ?
                                        getStarsBasedOnRating(stars).map((star, idx) => {
                                            return (
                                            <div className={styles.imgContainer} key={idx}> {star} </div>)
                                        })
                                        : 'Stars not available'
                                    }
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                        <button className="btn btn-default" disabled={isFormInvalid()}>Add Review</button>&nbsp;&nbsp;
                        <Link to='/'>Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
    );
}


export default ServiceDetails;