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
    // const [contractor, setContractor] = useState();
    const [customer, setCustomer] = useState();
    const [review, setReview] = useState();
    const [stars, setStars] = useState();
    const [averageStarsRating, setAverageStarsRating] = useState();
    const [starIcon, setStarIcon] = useState(starIconLink);
    const [submitClicked, setSubmitClicked] = useState(0);

    useEffect(() => {
        const fetchData = async() => {
            if(currentLoggedInUser.typeOfUser === 'customer'){
                setCustomer(currentLoggedInUser.customerData);
            } 
            else if(currentLoggedInUser.typeOfUser === 'contractor'){
                // setContractor(currentLoggedInUser.customerData)
                console.log('YOU ARE NOT ALLOWED TO ADD REVIEWS TO SERVICES')
            }
            const data = await servicesService.getOneService(serviceId)
            const averageRating = findAverageStarRatingForService(data.stars);
            console.log(averageRating)
            setAverageStarsRating(averageRating);
            setServiceSearched(data);
        }
        fetchData();  
    },[submitClicked]);

    function findAverageStarRatingForService(starsList){
        if(starsList.length > 0){
            const sumOfStarRating = starsList.reduce((prev, cur) => {
                return prev + cur;
            });
            const avarageStarRatingForService = sumOfStarRating / starsList.length;
            return avarageStarRatingForService;
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        console.log(serviceId);
        const reviewData = {
            service_id : serviceId,
            customer_ids : customer._id,
            reviews: review,
            stars: stars
        }
        await servicesService.addReview(reviewData);
        setSubmitClicked(submitClicked + 1);
    }

    function isFormInvalid(){
        return !(
            review
            && stars
            && customer
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
        if(serviceSearched.reviews.length > 0){
            for (let index = 0; index < serviceSearched.reviews.length; index++) {
                // const reviewsListObject = {
                //     firstname : serviceSearched.customer_ids[index].firstname,
                //     lasttname : serviceSearched.customer_ids[index].lastname,
                //     review: serviceSearched.reviews[index],
                //     stars: serviceSearched.stars[index]
                // };
                listOfReview.push(
                    (
                        <div key={index} className={styles.reviewList}>
                            <p> {serviceSearched.customer_ids[index].firstname} - {serviceSearched.customer_ids[index].lastname} </p>
                            <p>
                                {   
                                    serviceSearched.stars[index]
                                    ?
                                    getStarsBasedOnRating(serviceSearched.stars[index]).map((star, idx) => {
                                        return (
                                            <div className={styles.imgContainer} key={idx}> {star} </div>
                                        )
                                    })
                                    : 'Stars not available'
                                }
                            </p>
                            <p> {serviceSearched.reviews[index]} </p>
                        </div>
                     )
                );
                
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
                        <div>
                            {   
                                averageStarsRating 
                                ?
                                getStarsBasedOnRating(averageStarsRating).map((star, idx) => {
                                    return (
                                    <div className={styles.imgContainer} key={idx}> {star} </div>)
                                })
                                : 'Rating not available'
                            }
                        </div>
                        <p>{serviceSearched.companyRegisterYear}</p>
                        <p>{serviceSearched.serviceDescription}</p>
                    </div>
                    : 
                    <div className={styles.serviceDetailsContainer}>
                        Data not fetched
                    </div>


                }
                {
                    customer 
                    ? 
                    ''
                    :  
                    <div className={styles.serviceUpdateContainer}>
                        <Link to={`/services/${serviceId}/update`} replace><button>Update Service</button></Link>
                    </div>
                
                }
                
                {/* <form className={styles.serviceReviewsContainer} onSubmit={handleSubmit} >
                    <div className="form-group">
                            <div className="col-sm-12 text-center">
                                <button className="btn btn-default" disabled={isFormInvalid()}>Add Review</button>&nbsp;&nbsp;
                            </div>
                    </div>
                </form> */}

                <hr />
                <h1><i>Reviews</i>:</h1>   

                <form className={styles.serviceReviewsContainer} onSubmit={handleSubmit} >
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="serviceTime">Review : </label>
                        <input type="text" className="form-control" placeholder="Enter review for this service" value={review} name="review" onChange={handleChange} />
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
                       No Reviews Available
                    </div>
                        
                    
                }
            </div>
    );
}


export default ServiceDetails;