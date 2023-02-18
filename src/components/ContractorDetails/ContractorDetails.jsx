import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import servicesService from "../../utils/servicesService";
import styles from './ContractorDetails.module.css';
import { useParams } from 'react-router-dom';

function ServiceDetails(props){
    const starIconLink = <img src="https://img.icons8.com/3d-fluency/94/null/star.png" />
    const { contractorId } = useParams();
    const currentLoggedInUser = props.checkWhoLoggedIn();
    const navigate = useNavigate();
    const [contractorSearched, setContractorSearched] = useState();
    // const [contractor, setContractor] = useState();
    const [customer, setCustomer] = useState();
    const [review, setReview] = useState();
    const [stars, setStars] = useState();
    const [starIcon, setStarIcon] = useState(starIconLink);
    // const keyList = Object.keys(contractorSearched);

    useEffect(() => {
        async function fetchData(){
            // const ifLoggedInUser = props.checkWhoLoggedIn();
            if(currentLoggedInUser.typeOfUser === 'customer'){
                console.log(currentLoggedInUser.customerData)
                setCustomer(currentLoggedInUser.customerData);
            } 
            else if(ifLoggedInUser.typeOfUser === 'contractor'){
                // setContractor(ifLoggedInUser.customerData)
                console.log('YOU ARE NOT ALLOWED TO ADD REVIEWS TO SERVICES')
            }
            console.log(contractorId);
            const serviceDataFromAPI = await  servicesService.getOneService(contractorId);
            console.log(serviceDataFromAPI)
            setContractorSearched(serviceDataFromAPI);
        }
        fetchData();  
    },[contractorId] );

    async function handleSubmit(e){
        e.preventDefault();
        console.log(contractorId);
        const reviewData = {
            service_id : contractorId,
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

    function generateContractorReviewList(){
        const listOfReview = [];
        if(contractorSearched === true){
            for (let index = 0; index < contractorSearched.reviews.length; index++) {
                const reviewsListObject = {
                    firstname : contractorSearched.customer_ids[index].firstname,
                    lasttname : contractorSearched.customer_ids[index].lastname,
                    review: contractorSearched.reviews[index],
                    stars: contractorSearched.stars[index]
                };
                listOfReview.push((<div key={index} className={styles.reviewList}>
                    <p> {reviewsListObject.firstname} {reviewsListObject.lasttname} </p>
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
            <div>
                <header className="header-footer"><h1><i>Service Details</i>:</h1> </header>
                {
                    (contractorSearched) === true
                    ?     
                    <div className={styles.serviceDetailsContainer}>
                        <p>{contractorSearched.subCategory} {contractorSearched.category}{contractorId}</p>
                        <p>{contractorSearched.companyName}</p>
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
                        <p>{contractorSearched.companyRegisterYear}</p>
                        <p>{contractorSearched.serviceDescription}</p>
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
                
                {
                    (contractorSearched) === true
                    ? 
                    <div className={styles.reviewListContainer}>
                        {generateContractorReviewList()}
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