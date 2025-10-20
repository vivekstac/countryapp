import React from 'react';
import LinkedIn from "../assets/img/linkedIn.svg";
import FaceBook from "../assets/img/facebook.svg";
import Twitter from "../assets/img/twitter.svg";
import Youtube from "../assets/img/youtube.svg";

function CopyRights() {
    return (
        <div className='copyright-container'>
            <div className="social-icons">
                <img src={FaceBook} alt="facebook" />
                <img src={Twitter} alt="Twitter" />
                <img src={LinkedIn} alt="LinkedIn" />
                <img src={Youtube} alt="youtube" />
            </div>
            <p className='cp-rights-txt'>Exmaple@gmail.com</p>
            <p className='cp-rights-txt'>Copyright &copy; 2025 Name. All rights reserved.</p>
        </div>
    )
}

export default CopyRights;