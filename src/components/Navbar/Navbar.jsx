import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import styles from './Navbar.module.css';

export default function Navbar(props){
    return (
        <div className={styles.navbarContainer}>
            <Banner />
            <div>
                {
                    props.loggedInCustomerFirstname 
                    ? <h4>{`Welcome (${props.loggedInCustomerFirstname  }) `}</h4>
                    :''
                }
                {
                    props.loggedInContractorFirstname
                    ? <h4>{`Welcome (${props.loggedInContractorFirstname}) `}</h4>
                    :''
                }
            </div>
            {
                props.navLinks.map(link => {
                    return (
                        (link.showAuth 
                        && 
                        <Link to={link.label} key={link.label}> {link.label} </Link>)
                    )
                })
            }
            
            
        </div>
    )
}