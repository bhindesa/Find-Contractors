import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import contractorService from "../../utils/contractorService";
import servicesService from "../../utils/servicesService";
import styles from './ServiceDetails.module.css';
// import { withRoutes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ServiceDetails(props){
    const starIconLink = <img src="https://img.icons8.com/3d-fluency/94/null/star.png" />
    const { serviceId } = useParams();
    const currentLoggedInUser = props.checkWhoLoggedIn();
    const [serviceSearched, setServiceSearched] = useState();
    const [contractor, setContractor] = useState();
    const [customer, setCustomer] = useState();
    const [review, setReview] = useState();
    const [stars, setStars] = useState();
    const [starIcon, setStarIcon] = useState(starIconLink);

    useEffect(() => {
        const fetchData = async() => {
            if(currentLoggedInUser.typeOfUser === 'customer'){
                setCustomer(currentLoggedInUser.customerData);
            } 
            else if(currentLoggedInUser.typeOfUser === 'contractor'){
                setContractor(currentLoggedInUser.customerData)
                console.log('YOU ARE NOT ALLOWED TO ADD REVIEWS TO SERVICES')
            }
            console.log(serviceId);
            const data = await  props.getServicesFromAPI(serviceId)
            console.log(data[0])
            setServiceSearched(data[0]);
        }
        fetchData();  
    },[serviceId] );

    async function handleSubmit(e){
        e.preventDefault();
        console.log(serviceId);
        const reviewData = {
            service_id : serviceId,
            customer_ids : customer._id,
            reviews: review,
            stars: stars
        }
        // const newlyAddReview = 
        await servicesService.addReview(reviewData);
        // navigate('/Home')
    }

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

    function generateReviewList(){
        const listOfReview = [];
        if(serviceSearched){
            for (let index = 0; index < serviceSearched.reviews.length; index++) {
                const reviewsListObject = {
                    firstname : serviceSearched.customer_ids[index].firstname,
                    lasttname : serviceSearched.customer_ids[index].lastname,
                    review: serviceSearched.reviews[index],
                    stars: serviceSearched.stars[index]
                };
                listOfReview.push((<div key={index} className={styles.reviewList}>
                    <p> {reviewsListObject.firstname} - {reviewsListObject.lasttname} </p>
                    <p>
                        {   
                            stars 
                            ?
                            getStarsBasedOnRating(stars).map((star, idx) => {
                                return (
                                    <div className={styles.imgContainer} key={idx}> {star} </div>
                                )
                            })
                            : 'Stars not available'
                        }
                    </p>
                    <p> {reviewsListObject.review} </p>
                </div>));
                
            }
        }
        return listOfReview;
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

    return (
            <div className={styles.serviceDetailsContainer}>
                <header className="header-footer"><h1><i>Service Details</i>:</h1> </header>
                {
                    serviceSearched
                    ?     
                    <div >
                        <p>{serviceSearched.subCategory} - {serviceSearched.category}</p>
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
                    : 
                    <div className={styles.serviceDetailsContainer}>
                        Data not fetched
                    </div>


                }

                <hr />
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
                                        // console.log(numberOfStar[`${idx + 1}`])
                                        return (
                                            <option key={idx} value={`${idx + 1}`}> {`${idx + 1}`} </option>)
                                    })
                                    : 'Stars not available'
                                }
                            </select>
                            <div>
                                    {   
                                        stars 
                                        ?
                                        getStarsBasedOnRating(stars).map((star, idx) => {
                                            return (
                                            <div className={styles.imgContainer} key={idx}> {star} </div>)
                                        })
                                        : 'Stars not available'
                                    }
                            </div>
                        </div>

                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                        <button className="btn btn-default" disabled={isFormInvalid()}>Add Review</button>&nbsp;&nbsp;
                        <Link to='/Home'>Cancel</Link>
                        </div>
                    </div>
                </form>

                <hr />
                
                {
                    serviceSearched
                    ? 
                    <div className={styles.reviewListContainer}>
                        {generateReviewList()}
                    </div>
                    : 
                    <div className={styles.reviewListContainer}>
                       "No Reviews Available"
                    </div>
                        
                    
                }
            </div>
    );
}


export default ServiceDetails;