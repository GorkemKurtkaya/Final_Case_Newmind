import React from 'react';
import './Breadcrums.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Breadcrums = (props) => {
    const { product } = props;
    return (
        <div className='breadcrums'>
            HOME 
            <FontAwesomeIcon icon={faArrowRight} /> {product.category} 
            <FontAwesomeIcon icon={faArrowRight} /> {product.title}
        </div>
    );
};

export default Breadcrums;
