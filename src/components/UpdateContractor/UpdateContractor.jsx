import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom";
import contractorService from "../../utils/contractorService";
import servicesService from "../../utils/servicesService";
import styles from "./UpdateContractor.module.css"

export default function UpdateContractor(props){

    const { contractorId } = useParams();

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [passwordConf, setPasswordConf] = useState('');
    const [firstname, setFirstname] = useState(''); 
    const [lastname, setLastname] = useState(''); 
    const [dob, setDob] = useState(new Date()); 
    const [address, setAddress] = useState(''); 
    const [phone, setPhone] = useState(''); 
    const [companyName, setCompanyName] = useState(''); 
    const [companyLicenseNumber, setCompanyLicenseNumber] = useState('');
    const [companyRegisterYear, setCompanyRegisterYear] = useState('');    
    const [updateStatusMessage, setUpdateStatusMessage] = useState();    
    const [confirmDeleteModalDisplay, setConfirmDeleteModalDisplay] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);


    //UseNavigate() to help redirect
    const navigate = useNavigate(); 


    useEffect(()=>{

        async function getServiceDataToUpdateState(){
            const apiData = await contractorService.getOneContractor(contractorId);
            console.log(apiData)
            setEmail(apiData.email);
            setPassword(apiData.password);
            setPasswordConf(apiData.password);
            setFirstname(apiData.firstname);
            setLastname(apiData.lastname);
            setDob(apiData.dob.substr(0, 10));
            setAddress(apiData.address);
            setPhone(apiData.phone);
            setCompanyName(apiData.companyName);
            setCompanyLicenseNumber(apiData.companyLicenseNumber);
            setCompanyRegisterYear(apiData.companyRegisterYear);
        }

        getServiceDataToUpdateState();

    },[shouldRedirect]);

    function handleChange(e){
        
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
        if(e.target.name === 'passwordConf'){
            setPasswordConf(e.target.value)
        }
        if(e.target.name === 'firstname'){
            setFirstname(e.target.value)
        }
        if(e.target.name === 'lastname'){
            setLastname(e.target.value)
        }
        if(e.target.name === 'dob'){
            setDob(e.target.value)
        }
        if(e.target.name === 'address'){
            setAddress(e.target.value)
        }
        if(e.target.name === 'phone'){
            setPhone(e.target.value)
        }
        if(e.target.name === 'companyName'){
            setCompanyName(e.target.value)
        }
        if(e.target.name === 'companyLicenseNumber'){
            setCompanyLicenseNumber(e.target.value)
        }
        if(e.target.name === 'companyRegisterYear'){
            setCompanyRegisterYear(e.target.value)
        }
    }

    function isFormInvalid(){
        return !(
            email 
            && password ===  passwordConf
            && firstname
            && lastname
            && dob
            && address
            && phone
            && companyName
            && companyLicenseNumber
            && companyRegisterYear
        );
    }

    async function handleUpdate(e){
        e.preventDefault();
        const contractorUpdateObject = {
            contractor_Id: contractorId,
            email: email,
            // password: password,
            firstname: firstname,
            lastname: lastname,
            dob: dob,
            address: address,
            phone: phone,
            companyName: companyName,
            companyLicenseNumber: companyLicenseNumber,
            companyRegisterYear: companyRegisterYear
        };
        const updatedData = await contractorService.updateContractor(contractorUpdateObject);
        if(updatedData){
            setUpdateStatusMessage('Updated New Contractor Data Successfully!');
        }
    }

    async function handleDelete(e){
        e.preventDefault();
        setConfirmDeleteModalDisplay(true);
    }

    async function handleConfirmDelete(e){
        e.preventDefault();
        const contractorDeleteObject = {
            contractor_Id: contractorId,
        };
        const deletedContractor = await contractorService.deleteContractor(contractorDeleteObject);
        console.log(deletedContractor)

        if(deletedContractor){
            props.handleLogout();
        }
    }
    function handleCancelDelete(){
        setConfirmDeleteModalDisplay(false);
    }

    return (
            <div>
                <h1>Update Service</h1>
                <form className="form-horizontal" onSubmit={handleUpdate} >
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="email">Email: </label>
                        <input type="email" className="form-control" placeholder="Email" value={email} name="email" onChange={handleChange} />
                        </div>
                    </div>
                    {/* <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="password">Password: </label>
                        <input type="password" className="form-control" placeholder="Password" value={password} name="password" onChange={handleChange} /> 
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="passwordConf">Confirm Password: </label>
                        <input type="password" className="form-control" placeholder="Confirm Password" value={passwordConf} name="passwordConf" onChange={handleChange} />
                        </div>
                    </div> */}
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="firstname">Firstname: </label>
                        <input type="text" className="form-control" placeholder="First Name" value={firstname} name="firstname" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="lastname">Lastname: </label>
                        <input type="text" className="form-control" placeholder="Last Name" value={lastname} name="lastname" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="dob">Date of Birth: </label>
                        <input type="date" className="form-control" placeholder="Date of Birth" value={dob} name="dob" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="address">Address: </label>
                        <input type="text" className="form-control" placeholder="Your Address" value={address} name="address" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="phone">Phone: </label>
                        <input type="text" className="form-control" placeholder="Phone Number" value={phone} name="phone" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="companyName">Company Name: </label>
                        <input type="text" className="form-control" placeholder="Company Name" value={companyName} name="companyName" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="companyLicenseNumber">Company License Number: </label>
                        <input type="text" className="form-control" placeholder="Company Liense Number" value={companyLicenseNumber} name="companyLicenseNumber" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                        <label htmlFor="companyRegisterYear">Company Register Year: </label>
                        <input type="text" className="form-control" placeholder="Company Registered Year" value={companyRegisterYear} name="companyRegisterYear" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                        <button className="btn btn-default" disabled={isFormInvalid()}>Update Contractor</button>&nbsp;&nbsp;
                        <Link to='/Home'><button className="btn btn-default">Cancel</button></Link>
                        <button className={styles.deleteButton} onClick={handleDelete}>Delete Contractor</button>&nbsp;&nbsp;
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
                                            <p>
                                                Do you really want to delete your account! <br />
                                                <strong>This will delete all related services!</strong>
                                            </p>
                                            <button className={styles.deleteButton}> Confirm Delete Contractor</button>&nbsp;&nbsp;
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




                {/* <form className="form-horizontal" onSubmit={handleUpdate} >
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
                </div> */}
            </div>
        );

}