import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function RedirectToHome(props){
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/Home');
    }, [])
    return null;
}