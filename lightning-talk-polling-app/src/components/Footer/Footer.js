import React from 'react';
import cssClass from './Footer.css'

const footer = () => (
    <footer className={`${cssClass["footer-bottom-stick"]} "page-footer font-small deep-orange darken-1"`}>
        <div className="footer-copyright py-3 text-center">
            © 2018 Copyright Wiredcraft Full-stack Developer test
        </div>
    </footer>
);

export default footer;