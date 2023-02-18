import { Component } from "react";
import servicesService from "../../utils/servicesService";
import { Link } from "react-router-dom";
import styles from './ListAllServices.module.css'

class ListAllService extends Component{

    constructor(props){
        super(props);
        this.state = {
            services : '',
        }
    }

    async componentDidMount(){
        console.log('In ListAll React side')
        const allServices = await servicesService.getAllServices()
        this.setState({
            services: allServices
        });
    } 

    render(){
        return (
            <div className={styles.listContainer}>
                <h1>List of Services</h1>
                {
                    this.state.services 
                    ? 
                    this.state.services.map((service, idx) => {
                        console.log(service)
                        return (
                            <div className={styles.listItems}>
                                <Link key={idx} to={`/services/${service._id}`}>{service.subCategory} ({service.category})</Link>
                                <Link key={idx + 10 } to={`/contractors/${service.contractor_id._id}`}>{service.contractor_id.companyName}</Link>
                            </div>
                        )
                    })
                    : 'Services not available'
                }
            </div>
        )
    }
}

export default ListAllService;