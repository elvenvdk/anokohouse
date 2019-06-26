import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addPartner } from '../../../actions/partnerActions';
import './UpdatePartner.scss';

class UpdatePartner extends Component {
  state = {
    title: '',
    image: '',
    about: '',
    tags: ''
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  formSubmitHandler = event => {
    const newPartner = {
      image: this.state.image,
      title: this.state.title,
      about: this.state.about,
      tags: this.state.tags.split(', ')
    };

    this.props.addPartner(newPartner);
    this.setState({
      title: '',
      image: '',
      about: '',
      tags: ''
    });
    event.preventDefault();
  };

  render() {
    const { title, image, about, tags } = this.state;
    console.log(title, image, about, tags);
    return (
      <div className='UpdatePartner'>
        <form className='UpdatePartner-Form' onSubmit={this.formSubmitHandler}>
          <label htmlFor='image' className='UpdatePartnerForm__Image-Label'>
            Partner Image
          </label>
          <input
            name='image'
            type='file'
            accept='image/*'
            value={image}
            className='UpdatePartnerForm__Image'
            id='image'
            placeholder='Partner Image'
            onChange={event => this.inputChangeHandler(event)}
          />
          <label htmlFor='title' className='UpdatePartnerForm__Title-Label'>
            Title
          </label>
          <input
            name='title'
            type='text'
            value={title}
            className='UpdatePartnerForm__Title'
            id='title'
            placeholder='Partners name '
            onChange={event => this.inputChangeHandler(event)}
          />
          <label htmlFor='about' className='UpdatePartnerForm__Title-About'>
            About
          </label>
          <textarea
            name='about'
            type='text'
            value={about}
            id='UpdatePartnerForm'
            cols='30'
            rows='10'
            className='UpdatePartnerForm__About'
            id='about'
            placeholder='Say something about our new partner'
            onChange={event => this.inputChangeHandler(event)}
          />
          <label htmlFor='tags' className='UpdatePartnerForm__Title-Tags'>
            Tags
          </label>
          <textarea
            name='tags'
            type='text'
            value={tags}
            id=''
            cols='30'
            rows='10'
            className='UpdatePartnerForm__Tags'
            id='tags'
            placeholder='Add #tags seperated by a comma ","'
            onChange={event => this.inputChangeHandler(event)}
          />
          <button className='UpdatePartnerForm__Submitb'>Submit</button>
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
)(UpdatePartner);
