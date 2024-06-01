// components/SlidingDrawer.js
'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from './SlidingDrawer.module.css';
import FollowersFollowingDrawer from './followers-following';
import Link from 'next/link';

const SlidingDrawer = ({ isOpen, onClose }) => {
  const drawerRef = useRef(null);

  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState('');

  const [isFollowDrawerOpen, setFollowDrawerOpen] = useState(false);

  const openFollowDrawer = () => setFollowDrawerOpen(true);
  const closeFollowDrawer = () => setFollowDrawerOpen(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

  }, []);

  const fetchUserData = async () => {
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

  useEffect(() => {
    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);



  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`} ref={drawerRef}>
      <div className={styles.content}>
        <div className='flex justify-end'>
          <button onClick={onClose}><img src="/images/close.png" width={16} alt="close" /></button>
        </div>
        
        <div className='editProfileLink flex justify-end'>
          <button ><Link href="/edit-profile" passHref>Edit Profile</Link></button> 
        </div>

        {userData && (
          <div className="drawerProfileDetails">          
            <div className='profile-pic-div'>
              <img className="profile-pic" src={userData.avatar || "/images/default-profile-pic.png"} alt="Post" />
              <img className="changePicIcon" src="/images/edit-profile-pic.png" alt="Change Icon" />
            </div>
            <h2>{userData.firstName} {userData.lastName}</h2>
            <p>
              @ {userData.userId}
            </p>
            <div className='followers flex gap-4'>
              <a onClick={openFollowDrawer} className='clickable flex gap-4'>
                <p>{userData.following.length} Following </p>
                <p>{userData.followers.length} Followers</p>
              </a>
              {isFollowDrawerOpen && <FollowersFollowingDrawer isOpen={isFollowDrawerOpen} onClose={closeFollowDrawer} />}
            </div>
            <div className='bio'>
              <h3>Bio</h3>
              <p>Product designer, passed out from Pearl Academy. Posting designs for all categories at AnyTru</p>
            </div>
          </div>
        )}
      </div>
      {isOpen && <div className={styles.overlay} />}
    </div>
  );
};

export default SlidingDrawer;
