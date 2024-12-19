import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved. Made By Görkem Kurtkaya</p>
      </div>
      <div className='footer-social-icons' style={{paddingBottom: '10px'}}>
        <div className='footer-icons-container'>
          <a href="https://github.com/GorkemKurtkaya"><FontAwesomeIcon icon={faGithub} /></a>
        </div>
        <div className='footer-icons-container'>
          <a href="https://www.linkedin.com/in/gorkem-kurtkaya/"><FontAwesomeIcon icon={faLinkedin} /></a>
        </div>
      </div>
    </div>
  )
}

export default Footer
