import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './ContractorDetails.module.css';
import { useParams } from 'react-router-dom';
import contractorService from "../../utils/contractorService";

function ContractorDetails(props){
    const starIconLink = <img src="https://img.icons8.com/3d-fluency/94/null/star.png" />
    const { contractorId } = useParams();
    const currentLoggedInUser = props.checkWhoLoggedIn();
    const [contractorSearched, setContractorSearched] = useState();
    const [contractor, setContractor] = useState();
    const [customer, setCustomer] = useState();
    const [review, setReview] = useState();
    const [stars, setStars] = useState();
    const [services, setServices] = useState();
    const [starsContractorAverage, setStarsContractorAverage] = useState();
    const [starsContractorServiceList, setStarsContractorServiceList] = useState();
    const [starsContractorRiviewList, setStarsContractorRiviewList] = useState();
    const [starIcon, setStarIcon] = useState(starIconLink);
    const [submitClicked, setSubmitClicked] = useState(0);

    useEffect(() => {
        async function fetchData(){
            if(currentLoggedInUser.typeOfUser === 'customer'){
                console.log(currentLoggedInUser.customerData)
                setCustomer(currentLoggedInUser.customerData);
            } 
            else if(currentLoggedInUser === 'contractor'){
                setContractor(currentLoggedInUser.customerData)
                console.log('YOU ARE NOT ALLOWED TO ADD REVIEWS TO SERVICES')
            }
            console.log(contractorId);
            const contractorDataFromAPI = await  contractorService.getOneContractor(contractorId);
            console.log(contractorDataFromAPI)
            setServices(contractorDataFromAPI[0].services)
            setStarsContractorRiviewList(contractorDataFromAPI[0].stars)
            setContractorSearched(contractorDataFromAPI[0]);
        }
        fetchData();  
    },[submitClicked] );

    async function handleSubmit(e){
        e.preventDefault();
        console.log(contractorId);
        const reviewData = {
            _id : contractorId,
            services: services,
            customer_ids : customer._id,
            reviews: review,
            stars: stars
        }
        await contractorService.addReview(reviewData);
        setSubmitClicked(submitClicked + 1);
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

    function generateContractorServicesList(){
        const listOfContractorServices = [];
        if(contractorSearched.reviews){
            for (let index = 0; index < contractorSearched.reviews.length; index++) {
                const serviceListObject = {
                    firstname : contractorSearched.customer_ids[index].firstname,
                    lasttname : contractorSearched.customer_ids[index].lastname,
                    reviews: contractorSearched.reviews[index],
                    stars: contractorSearched.stars[index]
                };
                listOfContractorServices.push((<div key={index} className={styles.reviewList}>
                    <p> {serviceListObject.firstname} {serviceListObject.lasttname} </p>
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
                    <p> {serviceListObject.reviews} </p>
                </div>));
                
            }
        }
        return listOfContractorServices;
    }

    function generateContractorReviewList(){
        const listOfContractorReviews = [];
        if(contractorSearched.reviews){
            for (let index = 0; index < contractorSearched.reviews.length; index++) {
                const reviewsListObject = {
                    firstname : contractorSearched.customer_ids[index].firstname,
                    lasttname : contractorSearched.customer_ids[index].lastname,
                    reviews: contractorSearched.reviews[index],
                    stars: contractorSearched.stars[index]
                };
                listOfContractorReviews.push((<div key={index} className={styles.reviewList}>
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
                    <p> {reviewsListObject.reviews} </p>
                </div>));
                
            }
        }
        return listOfContractorReviews;
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
                <header className="header-footer"><h1><i>Contractor Details</i>:</h1> </header>
                {
                    contractorSearched
                    ?     
                    <div className={styles.contractorDetailsContainer}>
                        <p>{contractorSearched.companyName} - {contractorSearched.companyLicenseNumber}</p>
                        <p>{contractorSearched.firstname}{contractorSearched.lastname}</p>
                        <p>{contractorSearched.companyRegisterYear}</p>
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
                <hr />
                <h1><i>Servies List</i>:</h1>  
                {
                    contractorSearched
                    ? 
                    <div className={styles.contractorListContainer}>
                        {generateContractorServicesList()}
                    </div>
                    : 
                    <div className={styles.contractorListContainer}>
                       "No Reviews Available"
                    </div>
                        
                    
                }

            
                <h1><i>Reviews</i>:</h1>   

                <form className={styles.contractorReviewsContainer} onSubmit={handleSubmit} >
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="serviceTime">Review : </label>
                        <input type="text" className="form-control" placeholder="Enter review for this contractor" value={review} name="review" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <label htmlFor="category">Rating for this contractor: </label>
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
                    contractorSearched
                    ? 
                    <div className={styles.contractorListContainer}>
                        {generateContractorReviewList()}
                    </div>
                    : 
                    <div className={styles.contractorListContainer}>
                       "No Reviews Available"
                    </div>
                        
                    
                }
            </div>
    );
}


export default ContractorDetails;