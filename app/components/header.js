'use client'
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation'
import Logo from "./logo";
import SearchPage from "./search-page";
import SlidingDrawer from '../components/SlidingDrawer';
import { Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import { Button } from '@mui/material';

const Header = () => {

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const router = useRouter();
  const hideHeaderPaths = ['/']; // Add paths where you want to hide the header

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

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Change this to the appropriate route
  };

  return (
    <>
      <div className={`header-container ${hideHeaderPaths.includes(router.pathname) ? 'hidden' : ''}`}>
            <div className="mainHeaderRow">
              <Logo />     

              <div>
                <div className="search_bar" > 
                {/* onClick={toggleSearch} */}
                  <input type="text"
                      id="inputId"
                      placeholder="What are you looking for today?"
                      // value={inputValue ?? ""} onChange={handleChange}
                      // onKeyDown={handleKeyPress}
                      className="bg-[transparent] outline-none border-none w-full py-3 pl-2 pr-3" />
                  <div className="searchIconWrapper"><img src="/images/search.png" alt="Search" /></div>
                </div>     
                {isSearchOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      {/* <span className="close" onClick={toggleSearch}>&times;</span> */}
                      <SearchPage />
                    </div>
                  </div>
                )}
              </div>

              <button className="post-button">
                <Link href="/create-post" passHref className="flex items-center">
                  <img src="/images/post-plus.png" alt="Post" />
                  <span>Post</span>
                </Link>
              </button>

              <div className="secondaryMenuIcons">
                <a href="/homepage"><img src="/images/account.png" alt="Home" /></a>
                <Dropdown>
                  <DropdownTrigger>
                    <button>
                        <img src="/images/messages.png" alt="Messages" />
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu className="dropdownWrapper" aria-label="Static Actions">
                    <DropdownItem key="new">This feature is not available at the moment.</DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Dropdown>
                  <DropdownTrigger>
                    <button>
                      <img src="/images/notification.png" alt="Notification" />
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu className="dropdownWrapper" aria-label="Static Actions">
                    <DropdownItem className='dropdownHighlight'><span className='flex gap-4'><img src="/images/notification.png" alt="Notification" /> Notifications (0)</span></DropdownItem>
                    <DropdownSection showDivider>  
                      <DropdownItem className='noNotification'>
                          No new notifications 
                          at the moment
                        </DropdownItem>
                      </DropdownSection>
                  </DropdownMenu>
                </Dropdown>

                <Dropdown>
                  <DropdownTrigger>
                    <button>
                      <img src="/images/settings.png" alt="Settings" />
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu className="dropdownWrapper" aria-label="Static Actions">
                    <DropdownItem key="new"><Link href="/help">Help</Link></DropdownItem>
                    <DropdownItem key="copy"><Link href="https://discord.com/Discord">Discord</Link></DropdownItem>
                    <DropdownItem key="edit"><Link href="/help">FAQs</Link></DropdownItem>
                    {userData && (
                    <DropdownItem key="delete" className="text-danger" color="danger" onClick={handleSignOut}>
                      Sign Out
                    </DropdownItem> )}
                  </DropdownMenu>
                </Dropdown>
                {userData && (
                <div className='headerProfileIcon'>
                  <button onClick={openDrawer}><img src={userData.avatar || "/images/default-profile-pic.png"} alt="Profile" /></button>
                  <SlidingDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
                </div>
                )}
              </div>

            </div>

            <div className="navMenuLinks">
              <ul>
              <li>
          <Link href="/homepage" className={router.pathname === '/homepage' ? styles.active : ''}>
            All Categories
          </Link>
        </li>
        <li>
          <Link href="/homepage/furniture" className={router.pathname === '/homepage/furniture' ? styles.active : ''}>
            Furniture
          </Link>
        </li>
        <li>
          <Link href="/homepage/home-decor" className={router.pathname === '/homepage/home-decor' ? styles.active : ''}>
            Home Decor
          </Link>
        </li>
        <li>
          <Link href="/homepage/graphics" className={router.pathname === '/homepage/graphics' ? styles.active : ''}>
            Graphics
          </Link>
        </li>
        <li>
          <Link href="/homepage/clothing" className={router.pathname === '/homepage/clothing' ? styles.active : ''}>
            Clothing
          </Link>
        </li>
        <li>
          <Link href="/homepage/accessories" className={router.pathname === '/homepage/accessories' ? styles.active : ''}>
            Accessories
          </Link>
        </li>
        <li>
          <Link href="/homepage/events" className={router.pathname === '/homepage/events' ? styles.active : ''}>
            Events
          </Link>
        </li>
        <li>
          <Link href="/homepage/others" className={router.pathname === '/homepage/others' ? styles.active : ''}>
            Others
          </Link>
        </li> 
                     </ul>
            </div>
      </div>
    </>
  );
};

export default Header;