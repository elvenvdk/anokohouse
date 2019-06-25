import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPartners } from '../../actions/partnerActions';

class Partners extends Component {
  componentDidMount() {
    this.props.getPartners();
  }

  render() {
    const { partners } = this.props;
    return (
      <div className='Partners'>
        <div className='Partners__Container'>
          {partners.length > 0 ? (
            partners.map((partner, idx) => (
              <div key={idx} className='Partners__Container-Item'>
                {partner.first_name} {partner.last_name}
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
