// components/Tabs.js
import React, { useState, useEffect } from 'react';

const FollowersTabs = ({ defaultTab, tabs }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [userData, setUserData] = useState(null);

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      fetchUserData(storedToken);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/user/', {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUserData(data);
      console.log('data fetched successfully:', data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <div>
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={tab === activeTab ? 'active' : ''}
            onClick={() => handleClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.map((tab) => (
          <div key={tab} className={tab === activeTab ? 'active' : 'hidden'}>
            {/* Content for each tab */}
            {tab === 'Followers' && <FollowersTab userData={userData} />}
            {tab === 'Following' && <FollowingTab userData={userData} />}
          </div>
        ))}
      </div>
    </div>
  );
};



const FollowersTab = ({ userData }) => {
  if (!userData) {
    return <div>Please login in to your account...</div>;
  }
    
  if (userData.followers.length === 0) {
        return <div>No followers yet.</div>;
  } 
    
  return (
    <div>
      <p>Followers Content</p>

      {userData && (
        <div>
          <h2>{userData.firstName} {userData.lastName}</h2>
        </div>
      )}
    </div>
  );
};

const FollowingTab = ({ userData })  => {
    if (!userData) {
        return <div>Please login in to your account...</div>;
   }
    
  if (userData.following.length === 0) {
        return <div>No one follows you yet.</div>;
  } 
    
  return (
    <div>
        <p>Following Content</p>

        {userData && (
            <div>
            <h2>{userData.firstName} {userData.lastName}</h2>
            </div>
        )}
    </div>
  );
};

export default FollowersTabs;
