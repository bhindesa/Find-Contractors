import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom";
import contractorService from "../../utils/contractorService";
import servicesService from "../../utils/servicesService";
import styles from "./UpdateService.module.css"

export default function UpdateService(){
    const { serviceId } = useParams();
    const [category, setCategory] = useState();    
    const [updateStatusMessage, setUpdateStatusMessage] = useState();    
    const [confirmDeleteModalDisplay, setConfirmDeleteModalDisplay] = useState(false);    
    const [subCategory, setSubCategory] = useState();
    const [serviceDescription, setServiceDescription] =useState()
    const [labourCharge, setLabourCharge] = useState();
    const [serviceTime, setServiceTime] = useState();
    const [contractor_id, setContractor_id] = useState()
    const [shouldRedirect, setShouldRedirect] = useState(false);

    //UseNavigate() to help redirect
    const navigate = useNavigate(); 


    useEffect(()=>{
        async function getServiceDataToUpdateState(){
            const apiData = await servicesService.getOneService(serviceId);
            console.log(apiData)
            setCategory(apiData.category);
            setSubCategory(apiData.subCategory);
            setServiceDescription(apiData.serviceDescription);
            setLabourCharge(apiData.labourCharge);
            setServiceTime(apiData.serviceTime);
        }
        getServiceDataToUpdateState();
    },[shouldRedirect]);

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
            }

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
        setContractor_id(contractorService.getUser()._id);
        
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

    async function handleUpdate(e){
        e.preventDefault();
        const serviceUpdateObject = {
            service_Id: serviceId,
            category: category,
            subCategory: subCategory,
            serviceDescription: serviceDescription,
            labourCharge: labourCharge,
            serviceTime: serviceTime,
        };
        const updatedData = await servicesService.updateService(serviceUpdateObject);
        if(updatedData){
            setUpdateStatusMessage('Updated New Data Successfully!');
        }
    }

    async function handleDelete(e){
        e.preventDefault();
        setConfirmDeleteModalDisplay(true);
    }

    async function handleConfirmDelete(e){
        e.preventDefault();
        const serviceDeleteObject = {
            service_Id: serviceId
        };
        const deletedService = await servicesService.deleteService(serviceDeleteObject);
        console.log(deletedService)
        if(deletedService){
            navigate('/Home');
        }
    }
    function handleCancelDelete(){
        setConfirmDeleteModalDisplay(false);
    }

    return (
            <div>
                <h1>Update Service Details</h1>
                <form className="form-horizontal" onSubmit={handleUpdate} >
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
                            <label htmlFor="subCategory">Sub Category: </label>
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
                        <button className="btn btn-default" disabled={isFormInvalid()}>Update Service</button>&nbsp;&nbsp;
                        <Link to='/Home'><button className="btn btn-default">Cancel</button></Link>
                        <button className={styles.deleteButton} onClick={handleDelete}>Delete Service</button>&nbsp;&nbsp;

                        </div>
                    </div>
                </form>
                
                <div className={styles.deleteConfirmModal}>
                        {
                            confirmDeleteModalDisplay 
                            ?
                            <div>
                                 <form className="form-horizontal" onSubmit={handleConfirmDelete} >
                                    <div className="form-group">
                                        <div className="col-sm-12 text-center">
                                            <p>Do you really want this service to be deleted !</p>
                                            <button className={styles.deleteButton}> Confirm Delete Service</button>&nbsp;&nbsp;
                                        </div>
                                    </div>
                                </form>
                                <button className="btn btn-default" onClick={handleCancelDelete}>Cancel</button>
                            </div>
                            :
                            ''
                        }
                </div>
                
                <div className="form-group">
                        <div className="col-sm-12 text-center">
                            <p>{updateStatusMessage}</p>
                        </div>
                </div>
            </div>
        );

}