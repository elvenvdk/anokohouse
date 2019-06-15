import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import {
  faUsers,
  faUmbrella,
  faInfinity
} from '@fortawesome/free-solid-svg-icons';

import NavBar from '../NavBar';
import Section from '../Section';
import { AnokohouseText } from '../../componentData';
import Makolga from '../../assets/makolga_15.jpg';
import './LandingPage.scss';

class LandingPage extends Component {
  renderCoreValues = (valuesText, className) => {
    return valuesText.map((text, idx) => (
      <div key={idx} className={`Section__Core-Values-Text-${className}`}>
        {text}
      </div>
    ));
  };
  render() {
    return (
      <div className='Landing'>
        <div className='Landing--Container'>
          <NavBar />
          <div className='Landing__Header-Image' />
          <button
            className='Landing__Top-Link-Btn'
            type='button'
            value='CURIOUS ABOUT ANOKOHOUSE?'
          >
            CURIOUS ABOUT ANOKOHOUSE?
          </button>
          <Section sectionClassName='About' sectionId='About'>
            <h3 className='Section__About-Title'>
              {AnokohouseText.aboutTitle}
            </h3>
            <p className='Section__About-Text'>{AnokohouseText.aboutText1}</p>
            <p className='Section__About-Text'>{AnokohouseText.aboutText2}</p>
            <p className='Section__About-Text'>{AnokohouseText.aboutText3}</p>
            <p className='Section__About-Text'>{AnokohouseText.aboutText4}</p>
          </Section>
          <Section sectionClassName='About-2' sectionId='About2'>
            <div className='Section__About-2-Text-Container'>
              <p className='Section__About-2-Text'>
                {AnokohouseText.picassoText}
              </p>
              <p className='Section__About-2-Name'>
                {AnokohouseText.picassoName}
              </p>
            </div>
            <div className='Section__About-2-Img-Container'>
              <img
                src={Makolga}
                alt=''
                className='Section__About-2-Img-Image'
              />
            </div>
          </Section>
          <Section sectionClassName='Core-Values' sectionId='Core-Values'>
            <h3 className='Section__Core-Values-Title'>
              {AnokohouseText.coreValuesTitle.toUpperCase()}
            </h3>
            <div className='Section__Core-Values-Text-Container'>
              <div className='Section__Core-Values-Text-Container-Love'>
                <FontAwesomeIcon
                  className='Section__Core-Values-Text-Container-Love-Icon'
                  icon={faThumbsUp}
                  size='4x'
                />
                <span className='we'>
                  We <span className='love'>Love</span>
                </span>
                {this.renderCoreValues(
                  AnokohouseText.corValuesLove,
                  'Love-Text-Item'
                )}
              </div>
              <div className='Section__Core-Values-Text-Container-Hate'>
                <FontAwesomeIcon
                  className='Section__Core-Values-Text-Container-Love-Icon'
                  icon={faThumbsDown}
                  size='4x'
                />
                <span className='we'>
                  We <span className='hate'>hate</span>
                </span>
                {this.renderCoreValues(
                  AnokohouseText.coreValuesHate,
                  'Hate-Text-Item'
                )}
              </div>
            </div>
          </Section>
        </div>
      </div>
    );
  }
}

export default LandingPage;
