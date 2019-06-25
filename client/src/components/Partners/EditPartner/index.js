import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addPartner } from '../../../actions/partnerActions';

class EditPartner extends Component {
  render() {
    return (
      <div className='EditPartner'>
        <form className='EditPartnerForm'>
          <input type='text' className='EditPartnerForm__Image' />
          <input type='text' className='EditPartnerForm__Title' />
          <textarea
            name='EditPartnerForm'
            id='EditPartnerForm'
            cols='30'
            rows='10'
            className='EditPartnerForm__About'
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  partners: state.partnerReducer
});

export default connect(
  mapStateToProps,
  { addPartner }
)(EditPartner);
