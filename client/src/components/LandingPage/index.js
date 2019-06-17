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

  renderAboutText = () => {
    return AnokohouseText.aboutText.map((text, idx) => {
      return (
        <p key={idx} className='Section__About-Text'>
          {text.aboutText}
        </p>
      );
    });
  };

  renderBenefitsText = () => {
    return AnokohouseText.benefitsText.map((text, idx) => (
      <div key={idx} className='Section__Benefits-Text-List-Container-Items'>
        <h3>{text.Title}</h3>
        <p>{text.Text}</p>
      </div>
    ));
  };

  render() {
    return (
      <div className='Landing'>
        <div className='Landing--Container'>
          <Section sectionClassName='Header'>
            <NavBar />
            <div className='Landing__Header-Image' />
            <button
              className='Landing__Top-Link-Btn'
              type='button'
              value='CURIOUS ABOUT ANOKOHOUSE?'
            >
              CURIOUS ABOUT ANOKOHOUSE?
            </button>
          </Section>

          <Section
            sectionClassName='About'
            sectionId='About'
            title={AnokohouseText.aboutTitle}
          >
            {this.renderAboutText()}
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
          <Section
            sectionClassName='Core-Values'
            sectionId='Core-Values'
            title={AnokohouseText.coreValuesTitle.toUpperCase()}
          >
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
          <Section
            sectionClassName='Benefits'
            sectionId='Benefits'
            title={AnokohouseText.benefitsTitle}
          >
            <p className='Section__Benefits-Title-Text'>
              {AnokohouseText.benefitsTitleText}
            </p>
            <div className='Section__Benefits-Text-List-Container'>
              {this.renderBenefitsText()}
            </div>
          </Section>
        </div>
      </div>
    );
  }
}

export default LandingPage;
