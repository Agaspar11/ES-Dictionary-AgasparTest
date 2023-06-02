import { useState, useRef, useEffect } from 'react';
import './content_statistics.css';

export default function Statistics() {
  const [profilePic, setProfilePic] = useState(() => localStorage.getItem('profilePic') || null);
  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem('userDetails');
    return savedUserDetails ? JSON.parse(savedUserDetails) : { name: '', age: '', email: '' };
  });
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('profilePic', profilePic);
  }, [profilePic]);

  useEffect(() => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }, [userDetails]);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePic(reader.result);
    };

    reader.onabort = () => {
      setProfilePic(null);
    };

    reader.onerror = () => {
      console.error('Error occurred while reading the file.');
    };

    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const renderDetails = () => {
    if (isEditing) {
      return (
        <div className="form">
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={userDetails.age}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button type="button" className="save-button" onClick={handleToggleEdit}>
              Save
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="details">
          <div className="detail">
            <span className="label">Name:</span>
            <span>{userDetails.name}</span>
          </div>
          <div className="detail">
            <span className="label">Age:</span>
            <span>{userDetails.age}</span>
          </div>
          <div className="detail">
            <span className="label">Email:</span>
            <span>{userDetails.email}</span>
          </div>
          <div className="button-group">
            <button type="button" className="edit-button" onClick={handleToggleEdit}>
              Edit
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container_profile">
      <div className="profile-section">
        <h2>Profile Picture</h2>
        <div className="profile-picture">
          {profilePic ? (
            <div className="profile-image">
              <img src={profilePic} alt="Profile" />
              <button className="change-button" onClick={handleChooseFile}>
                Change
              </button>
            </div>
          ) : (
            <button className="choose-button" onClick={handleChooseFile}>
              Choose Profile Picture
            </button>
          )}
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePicChange}
          />
        </div>
      </div>
      <div className="user-details-section">
        <h2>User Details</h2>
        <div className="user-details">{renderDetails()}</div>
      </div>
    </div>
  );
}