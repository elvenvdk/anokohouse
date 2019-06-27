import React from 'react';

const page = ({ title, data }) => (
  <div className='Partners'>
    <div className='Partners__Header'>
      <h4>PARTNERS</h4>
      <div>{title}</div>
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

export default page;
