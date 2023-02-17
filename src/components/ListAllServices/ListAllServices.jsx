import { Component } from "react";
import servicesService from "../../utils/servicesService";
import { Link } from "react-router-dom";

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
            <div >
                List of Services
                {
                    this.state.services 
                    ? 
                    this.state.services.map((service, idx) => {
                        return (<div>
                            <Link key={idx} to={`/services/${service._id}`}>{service.category}</Link>
                        </div>)
                    })
                    : 'Services not available'
                }
            </div>
        )
    }
}

export default ListAllService;