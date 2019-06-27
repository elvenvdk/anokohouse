import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { partnersData, partnersTitle } from '../../componentData';

import { getPartners } from '../../actions/partnerActions';
import './Partners.scss';

class Partners extends Component {
  componentDidMount() {
    this.props.getPartners();
  }

  render() {
    const { partners } = this.props.partners;
    return (
      <div className='Partners'>
        <div className='Partners__Header'>
          <h4>PARTNERS</h4>
          <div>{partnersTitle}</div>
        </div>

        <div className='Partners__Container'>
          {partnersData.length > 0 ? (
            partnersData.map((partner, idx) => (
              <div key={idx} className='Partners__Container-Item'>
                <img
                  src={partner.image}
                  alt=''
                  className='Partners__Container-Item-Image'
                />
                <h5>{partner.title}</h5>
                <p>{partner.about}</p>
                <div className='Partners__Container-Item-Tags'>
                  {partner.tags.map((tag, idx) => (
                    <p key={idx} className='Partners__Container-Item-Tags-Text'>
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No Partners Yet...</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  partners: state.partnerReducer
});

export default connect(
  mapStateToProps,
  { getPartners }
)(Partners);
