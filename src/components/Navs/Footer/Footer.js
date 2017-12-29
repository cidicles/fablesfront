import React, { Component } from 'react';
import './Footer.css';
import { lang } from '../../../il8n/lang';

class Footer extends Component {
  getYear() {
    return new Date().getFullYear();
  }
  render() {
    return (
      <footer>
        <div className="content">
          <div className="links">
            <ul>
              <li>
                <a href={lang.footer.placeholderHref} target="_blank" rel="noopener noreferrer">
                  {lang.footer.placeholder}
                </a>
              </li>
            </ul>
            <div className="copy">
              {`© ${ this.getYear() } ${ lang.footer.copy }`}
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
