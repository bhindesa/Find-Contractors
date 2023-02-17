import { Component } from "react";
import { Link } from "react-router-dom";
import contractorService from "../../utils/contractorService";
import servicesService from "../../utils/servicesService";
class AddService extends Component{

    constructor(props){
        super(props);
        this.state = {
            category: '',
            subCategory: '',
            serviceDescription: '',
            labourCharge: '',
            serviceTime: '',
            contractor_id: ''
        }
    }

    getCategoryOptions(){
        const categories = [
            'Plumber',
            'Electrician',
            'Duct Cleaning',
            'Drywall',
            'Painting',
        ]

        const subCategories = [
            {
                'Plumber' : [
                        'Installation of plumbing systems',
                        'Repair of plumbing systems',
                        'Water heater installation and repair',
                        'Gas line installation and repair',
                        'Sewer and drain cleaning',
                        'Fixture installation',
                        'Backflow prevention'
                ],
                'Electrician': [
                        'Electrical installation',
                        'Electrical repair',
                        'Electrical upgrades',
                        'Electrical maintenance',
                        'Lighting installation',
                        'Generator installation',
                        'Electrical safety inspections'
                ],
                'Duct Cleaning' : [
                        'Air duct cleaning',
                        'Dryer vent cleaning',
                        'HVAC system inspection',
                        'Mold and mildew removal',
                        'Ductwork repair and replacement',
                        'Air purification and filtration'
                ],
                'Drywall': [
                        'Drywall installation',
                        'Drywall finishing',
                        'Texture application',
                        'Drywall repair',
                        'Soundproofing',
                        'Fireproofing',
                        'Backflow prevention'
                ],
                'Painting' : [
                        'Painting',
                        'Surface preparation',
                        'Staining',
                        'Wallpaper installation and removal',
                        'Texture application',
                        'Exterior painting',
                        'Color consultation'
                ]
            }
        ]

        return {
            categories: categories,
            subCategories: subCategories
        };
    }

    findCategory(){
        return this.getCategoryOptions().categories;
    }

    findSubCategory(){
        return this.getCategoryOptions().subCategories[0][this.state.category];
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        this.setState({
           contractor_id: contractorService.getUser()._id
        })
    }

    isFormInvalid(){
        return !(
            this.state.category 
            && this.state.subCategory
            && this.state.serviceDescription
            && this.state.labourCharge
            && this.state.serviceTime
            );
    }

    handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(this.state)
        await servicesService.addService(this.state);
    }


    render(){

        return (
            <div>
                <header className="header-footer">Sign Up</header>
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                <div className="form-group">
                    <div className="col-sm-12">
                        <label htmlFor="category">Category: </label>
                        <select name="category" value={this.state.category} onChange={this.handleChange}>
                                <option value="">Select an option</option>
                            {   
                                this.findCategory().map((category, idx) => {
                                    return <option key={idx} value={`${category}`}>{category}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <label htmlFor="category">Category: </label>
                        <select name="subCategory" value={this.state.subCategory} onChange={this.handleChange}>
                                <option value="">Select an option</option>
                            {
                                this.state.category 
                                ? this.findSubCategory().map((subCategory, idx) => {
                                    return <option key={idx} value={`${subCategory}`}>{subCategory}</option>
                                })
                                : ''
                            }
                        </select>
                    </div>

                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                    <label htmlFor="serviceDescription">Service Description: </label>
                    <input type="text" className="form-control" placeholder="Enter Service Description" value={this.state.serviceDescription} name="serviceDescription" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                    <label htmlFor="labourCharge">Labour Charge ($/hr): </label>
                    <input type="text" className="form-control" placeholder="Enter Labour Charge" value={this.state.labourCharge} name="labourCharge" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                    <label htmlFor="serviceTime">Service Time (Hours): </label>
                    <input type="text" className="form-control" placeholder="Enter Service Time(Hours)" value={this.state.serviceTime} name="serviceTime" onChange={this.handleChange} />
                    </div>
                </div>
                 <div className="form-group">
                    <div className="col-sm-12 text-center">
                    <button className="btn btn-default" disabled={this.isFormInvalid()}>Add Service</button>&nbsp;&nbsp;
                    <Link to='/'>Cancel</Link>
                    </div>
                </div>
                </form>
            </div>
        );
    }
}


export default AddService;