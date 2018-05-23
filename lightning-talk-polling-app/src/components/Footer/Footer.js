import React from 'react';
import cssClass from './Footer.css'

const footer = () => (
    <footer className={cssClass["footer-bottom-stick"] + " page-footer font-small orange lighten-4"}>
        <div className="footer-copyright pt-2 text-center">
            © 2018 Copyright <a href="https://wiredcraft.com/" target='_blank'>Wiredcraft</a> Full-stack Developer Test
        </div>
        <div className="footer-copyright py-2 text-center">
            <a href="https://twitter.com/seekingk" target='_blank'><i className="fab fa-twitter"/></a>
            <a href="https://www.linkedin.com/in/bilal-korir/" target='_blank'><i className="fab fa-linkedin-in px-5"/></a>
            <a href="https://github.com/bilal-korir" target='_blank'><i className="fab fa-github"/></a>
        </div>
    </footer>
);

export default footer;