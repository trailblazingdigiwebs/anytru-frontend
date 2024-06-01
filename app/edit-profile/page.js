'use client'
import React, { useEffect, useState } from 'react';
import { Switch } from "@nextui-org/switch";
import Header from '../components/header';
import FollowersFollowingDrawer from '../components/followers-following';

const EditProfile = () => {
  const [isFollowDrawerOpen, setFollowDrawerOpen] = useState(false);

  const openFollowDrawer = () => setFollowDrawerOpen(true);
  const closeFollowDrawer = () => setFollowDrawerOpen(false);
  
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

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

  return (
    <div>
      <Header />
      <div className='pageWrapper'>
        <div className='flex'>
          <div className='profile-details w-1/3'>
            {userData && (
                        <div className="profile-details-wrapper drawerProfileDetails">          
                        <div className='profile-pic-div'>
                          <img className="profile-pic" src={userData.avatar || "/images/default-profile-pic.png"} alt="Post" />
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

                        <div className="profileDetailDiv">
                            <a href="#"><p>My Orders</p></a>
                        </div>

                        <div className="profileDetailDiv">
                            <p>Switch To Creator Account</p>
                            <Switch defaultSelected aria-label="Automatic updates" />
                            <p>You can switch to Creator Account once you have achieved 50 likes on 20 posts.</p>
                        </div>

                        <div className="profileDetailDiv">
                            <p>Switch To Seller Account</p>
                            <Switch />
                        </div>

                      </div>
              
            )}
          </div>
          <div className='edit-profile-details w-2/3'>
            <form>
              <label className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <input type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="user_id"
              />

              <div className='flex gap-4'>
                <div className='w-1/2'>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input type="text"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="First Name"
                  />
                </div>

                <div className='w-1/2'>
                  <label className="block text-sm font-medium text-gray-700">
                    Second Name
                  </label>
                  <input type="text"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Second Name"
                  />
                </div>
              </div>

              <label className="block text-sm font-medium text-gray-700">
                Change Email
              </label>
              <input type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Mehrabbozorgi.business@gmail.com"
              />

              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="33062 Zboncak isle"
              />

              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="9555118077"
              />

              <div className='flex gap-4'>
                <div className='w-1/2'>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input type="text"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Mehrab"
                  />
                </div>
                <div className='w-1/2'>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input type="text"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Bozorgi"
                  />
                </div>
              </div>

              <label className="block text-sm font-medium text-gray-700">
                Change Password
              </label>
              <input type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="*********"
              />
            </form>

            <div className="flex gap-4 mt-10">
              <button className="edit-cancel-btn edit-btns">
                <span>Cancel</span>
              </button>
              <button className="edit-save-btn edit-btns">
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default EditProfile;
