import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AboutUs = () => {
  const [aboutData, setAboutData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5002/api/about')
      .then(response => setAboutData(response.data))
      .catch(error => console.error('Error fetching about data:', error));
  }, []);

  return (
    <div>
      <h1>About Me: Derrick Song</h1>
      <p>{aboutData.description}</p>
      {aboutData.photoUrl && <img src={aboutData.photoUrl} alt="About Us" style={{ width: '300px', height: 'auto' }} />}
      <p>Contact me at: <a href="mailto:DerrickSonghaoyuan@gmail.com">DerrickSonghaoyuan@gmail.com</a></p>
    </div>
  );
};

export default AboutUs;
