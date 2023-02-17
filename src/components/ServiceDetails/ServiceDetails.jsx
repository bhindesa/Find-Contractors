import { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import contractorService from "../../utils/contractorService";
import servicesService from "../../utils/servicesService";
import styles from './ServiceDetails.module.css';
import { withRoutes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ServiceDetails(props){
    const { serviceId } = useParams();
    console.log(serviceId)

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         category: 'Plumber',
    //         subCategory: 'Abc',
    //         serviceDescription: 'Hello',
    //         labourCharge: '',
    //         serviceTime: '',
    //         contractor_id: '',
    //         contractor: '',
    //         review: '',
    //         stars: 3,
    //         starIcon: ''
    //     }
    // }

    // const { match } = this.props;


    // function handleChange(e) {
    //     this.setState({[e.target.name]: e.target.value})
    // }

    // async useEffect(){
    //     const { params } = this.props.route;
    //     const { serviceId } = params;
    //     // const { match } = this.props;
    //     // const serviceId = route.params.serviceId;
    //     console.log(serviceId);
    //     const starIcon = <img src="https://img.icons8.com/3d-fluency/94/null/star.png" />;
    //     this.setState({
    //         starIcon: starIcon
    //     });
    //     // const serviceSearched = await servicesService.getOneService('63ef243c1fd38398931fe140')
    // } 

    // isFormInvalid(){
    //     return !(
    //         this.state.review
    //         && this.state.stars
    //         );
    // }

    // getStarsBasedOnRating(numberOfStar){
    //     const starIcon = this.state.starIcon;
    //     let stars = [];
    //     for (let index = 0; index < numberOfStar ; index++) {
    //         stars.push(starIcon);
    //     }
    //     return stars;
    // }

    // getRatingOptions(){
    //     const ratingOptions = [
    //         {
    //             "1" : this.getStarsBasedOnRating(1)
    //         },
    //         {
    //             "2" : this.getStarsBasedOnRating(2)
    //         },
    //         {
    //             "3" : this.getStarsBasedOnRating(3)
    //         },
    //         {
    //             "4" : this.getStarsBasedOnRating(4)
    //         },
    //         {
    //             "5" : this.getStarsBasedOnRating(5)
    //         }
    //     ]

    //     return ratingOptions;
    // }

    // handleSubmit = async(e) =>{
    //     e.preventDefault();
    //     console.log(this.state)
    //     // await contractorService.addReview(this.state);
    // }


    return (
            <div>
                <header className="header-footer"><h1><i>Service Details</i>:</h1> </header>
                <div className={styles.serviceDetailsContainer}>
                    <p>{this.state.subCategory} ({this.state.category}) {serviceId}</p>
                    {/* <p>{this.state.contractor.companyName}</p> */}
                    <p>
                        {   
                            this.state.stars 
                            ?
                            this.getStarsBasedOnRating(this.state.stars).map((star, idx) => {
                                return (
                                <div className={styles.imgContainer} key={idx}> {star} </div>)
                            })
                            : 'Stars not available'
                        }
                    </p>
                    {/* <p>{this.state.contractor.companyRegisterYear}</p> */}
                    <p>{this.state.serviceDescription}</p>
                </div>
                <h1><i>Reviews</i>:</h1>           
                <form className={styles.serviceReviewsContainer} onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="serviceTime">Service Time (Hours): </label>
                        <input type="text" className="form-control" placeholder="Enter Service Time(Hours)" value={this.state.review} name="review" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <label htmlFor="category">Rating for this service: </label>
                            <select name="stars" value={this.state.stars} onChange={this.handleChange}>
                                    <option value="">Select an option</option>
                                {   
                                    this.getRatingOptions() 
                                    ?
                                    this.getRatingOptions().map((numberOfStar, idx) => {
                                        return <option key={idx} value={`${Object.keys(numberOfStar)[idx + 1]}`}>{numberOfStar[idx + 1]}</option>
                                    })
                                    : 'Stars not available'
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                        <button className="btn btn-default" disabled={this.isFormInvalid()}>Add Review</button>&nbsp;&nbsp;
                        <Link to='/'>Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
    );
}


export default ServiceDetails;