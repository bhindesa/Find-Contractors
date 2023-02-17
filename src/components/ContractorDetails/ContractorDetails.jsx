import { Component } from "react";
import { Link } from "react-router-dom";
import contractorService from "../../utils/contractorService";
import servicesService from "../../utils/servicesService";
class ContractorDetails extends Component{

    constructor(props){
        super(props);
        this.state = {
            review: '',
            stars: '',
            starIcon: ''
        }
    }


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        // this.setState({
        //    contractor_id: contractorService.getUser()._id
        // })
    }

    async componentDidMount(){
        const starIcon = 'https://icons8.com/icon/XBMnwwJYQvfN/star'; 
        this.setState({
            starIcon : starIcon
        });
    } 

    isFormInvalid(){
        return !(
            this.state.review
            && this.state.stars
            );
    }

    getStarsBasedOnRating(numberOfStar){
        const starIcon = this.state.starIcon;
        let stars = [];
        for (let index = 0; index < numberOfStar ; index++) {
            stars.push(starIcon);
        }
        return stars;
    }

    getRatingOptions(){
        const ratingOptions = [
            {
                "1" : this.getStarsBasedOnRating(1)
            },
            {
                "2" : this.getStarsBasedOnRating(2)
            },
            {
                "3" : this.getStarsBasedOnRating(3)
            },
            {
                "4" : this.getStarsBasedOnRating(4)
            },
            {
                "5" : this.getStarsBasedOnRating(5)
            }
        ]

        return ratingOptions;
    }

    handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(this.state)
        // await contractorService.addReview(this.state);
    }


    render(){

        return (
            <div>
                <header className="header-footer">Sign Up</header>
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                <div className="form-group">
                    {/* <div className="col-sm-12">
                        <label htmlFor="category">Category: </label>
                        <select name="category" value={this.state.category} onChange={this.handleChange}>
                                <option value="">Select an option</option>
                            {   
                                this.findCategory().map((category, idx) => {
                                    return <option key={idx} value={`${category}`}>{category}</option>
                                })
                            }
                        </select>
                    </div> */}
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                    <label htmlFor="serviceTime">Service Time (Hours): </label>
                    <input type="text" className="form-control" placeholder="Enter Service Time(Hours)" value={this.state.review} name="review" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                    <label htmlFor="category">Category: </label>
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
}


export default ContractorDetails;