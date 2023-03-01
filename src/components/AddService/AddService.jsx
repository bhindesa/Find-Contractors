import { Component, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import contractorService from "../../utils/contractorService";
import servicesService from "../../utils/servicesService";
function AddService() {

    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [labourCharge, setLabourCharge] = useState('');
    const [serviceTime, setServiceTime] = useState('');
    const [contractor_id, setContractor_id] = useState('');

    //UseNavigate() to help redirect
    const navigate = useNavigate(); 


    function getCategoryOptions(){
        const categories = [
            'Plumber',
            'Electrician',
            'Duct Cleaning',
            'Drywall',
            'Painting',
        ]

        const subCategories = {
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
        };

        return {
            categories: categories,
            subCategories: subCategories
        };
    }

    function findCategory(){
        return getCategoryOptions().categories;
    }

    function findSubCategory(){
        return getCategoryOptions().subCategories[category];
    }

    function handleChange(e){

        setContractor_id(contractorService.getUser()._id)
        if(e.target.name === 'category'){
            setCategory(e.target.value)
        }
        if(e.target.name === 'subCategory'){
            setSubCategory(e.target.value)
        }
        if(e.target.name === 'serviceDescription'){
            setServiceDescription(e.target.value)
        }
        if(e.target.name === 'labourCharge'){
            setLabourCharge(e.target.value)
        }
        if(e.target.name === 'serviceTime'){
            setServiceTime(e.target.value)
        }
    }

    function isFormInvalid(){
        return !(
            category 
            && subCategory
            && serviceDescription
            && labourCharge
            && serviceTime
            );
    }

    async function handleSubmit(e){
        e.preventDefault();
        const newService = {
            category: category,
            subCategory: subCategory,
            serviceDescription: serviceDescription,
            labourCharge: labourCharge,
            serviceTime: serviceTime,
            contractor_id: contractor_id
        };
        const newAddedService = await servicesService.addService(newService);
        if(newAddedService){
            navigate('/Home');
        }
    }

    return (
        <div>
            <h1>Add Service</h1>
            <form className="form-horizontal" onSubmit={handleSubmit} >
            <div className="form-group">
                <div className="col-sm-12">
                    <label htmlFor="category">Category: </label>
                    <select name="category" value={category} onChange={handleChange}>
                            <option value="">Select an option</option>
                        {   
                            findCategory().map((category, idx) => {
                                return <option key={idx} value={`${category}`}>{category}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-12">
                    <label htmlFor="category">Sub Category: </label>
                    <select name="subCategory" value={subCategory} onChange={handleChange}>
                            <option value="">Select an option</option>
                        {
                            category 
                            ? findSubCategory().map((subCategory, idx) => {
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
                <input type="text" className="form-control" placeholder="Enter Service Description" value={serviceDescription} name="serviceDescription" onChange={handleChange} />
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-12">
                <label htmlFor="labourCharge">Labour Charge ($/hr): </label>
                <input type="text" className="form-control" placeholder="Enter Labour Charge" value={labourCharge} name="labourCharge" onChange={handleChange} />
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-12">
                <label htmlFor="serviceTime">Service Time (Hours): </label>
                <input type="text" className="form-control" placeholder="Enter Service Time(Hours)" value={serviceTime} name="serviceTime" onChange={handleChange} />
                </div>
            </div>
                <div className="form-group">
                <div className="col-sm-12 text-center">
                <button className="btn btn-default" disabled={isFormInvalid()}>Add Service</button>&nbsp;&nbsp;
                <Link to='/Home'>Cancel</Link>
                </div>
            </div>
            </form>
        </div>
    );
}


export default AddService;