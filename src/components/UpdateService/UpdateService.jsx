import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import contractorService from "../../utils/contractorService";
import servicesService from "../../utils/servicesService";

export default function UpdateService(){
    const { serviceId} = useParams();
    const [category, setCategory] = useState();    
    const [subCategory, setSubCategory] = useState();
    const [serviceDescription, setServiceDescription] =useState()
    const [labourCharge, setLabourCharge] = useState();
    const [serviceTime, setServiceTime] = useState();
    const [contractor_id, setContractor_id] = useState()
    const [shouldRedirect, setShouldRedirect] =useState(false);


    useEffect(()=>{
        async function getServiceDataToUpdateState(){
            const apiData = await servicesService.getOneService(serviceId);
            console.log(apiData)
            setCategory(apiData[0].category);
            setSubCategory(apiData[0].subCategory);
            setServiceDescription(apiData[0].serviceDescription);
            setLabourCharge(apiData[0].labourCharge);
            setServiceTime(apiData[0].serviceTime);
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

    function findCategory(){
        return getCategoryOptions().categories;
    }

    function findSubCategory(){
        return getCategoryOptions().subCategories[0][category];
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

    async function handleUpdate(e){
        e.preventDefault();
        const serviceMappedObject = {
            serviceId: serviceId,
            category: category,
            subCategory: subCategory,
            serviceDescription: serviceDescription,
            labourCharge: labourCharge,
            serviceTime: serviceTime,
        }
        await servicesService.updateService(serviceMappedObject);
        setShouldRedirect(shouldRedirect + 1)
    }

    async function handleUpdate(e){
        e.preventDefault();
        await servicesService.updateService();
        setShouldRedirect(shouldRedirect + 1)
    }

    return (
            <div>
                <h1>Update Service</h1>
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
                    <Link to='/'><button className="btn btn-default" disabled={isFormInvalid()}>Cancel</button></Link>
                    </div>
                </div>
                </form>
            </div>
        );

}