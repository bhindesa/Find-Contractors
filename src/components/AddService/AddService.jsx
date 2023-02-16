import { Component, useState } from "react";

class AddService extends Component{

    constructor(props){
        super(props);
        this.state = {
            category: '',
            subCategory: '',
            serviceDescription: '',
            labourCharge: '',
            serviceTime: '',

        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
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

    handleSubmit(e){
        e.preventDefault();
    }


    render(){

        return (
            <div>
                <header className="header-footer">Sign Up</header>
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                <div className="form-group">
                    <div className="col-sm-12">
                    <label htmlFor="category">Email: </label>
                    <input type="email" className="form-control" placeholder="Email" value={this.state.category} name="category" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                    <label htmlFor="subCategory">Sub Category: </label>
                    <input type="password" className="form-control" placeholder="Sub Category" value={this.state.subCategory} name="subCategory" onChange={this.handleChange} />
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
                    <label htmlFor="labourCharge">Labour Charge: </label>
                    <input type="text" className="form-control" placeholder="Enter Labour Charge" value={this.state.labourCharge} name="labourCharge" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                    <label htmlFor="serviceTime">Service Time(Hours): </label>
                    <input type="text" className="form-control" placeholder="Enter Service Time(Hours)" value={this.state.serviceTime} name="labourCharge" onChange={this.handleChange} />
                    </div>
                </div>
                 <div className="form-group">
                    <div className="col-sm-12 text-center">
                    <button className="btn btn-default" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
                    <Link to='/'>Cancel</Link>
                    </div>
                </div>
                </form>
            </div>
        );
    }
}


export default AddService;