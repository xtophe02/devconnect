import React from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const NavBarItems = ({ myHref, link, myClassName }) => (
  <Link href={myHref}>
    <a className={myClassName}>
      <strong>{link}</strong>
    </a>
  </Link>
);
const LOGOUTUSER = gql`
  mutation LOGOUTUSER {
    logOutUser {
      success
    }
  }
`;

const NavBar = ({ loading, email }) => {
  const [logOutUser, { data }] = useMutation(LOGOUTUSER, {
    onCompleted: (data) => console.log(data),
  });
  console.log('NAVBAR FIRED');
  return (
    <nav className='navbar is-transparent'>
      <div className='navbar-brand'>
        <a className='navbar-item' href='https://bulma.io'>
          <img
            src='https://bulma.io/images/bulma-logo.png'
            alt='Bulma: a modern CSS framework based on Flexbox'
            width='112'
            height='28'
          />
        </a>
        <div
          className='navbar-burger burger'
          data-target='navbarExampleTransparentExample'
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id='navbarExampleTransparentExample' className='navbar-menu'>
        <div className='navbar-start'>
          <NavBarItems myHref='/' link='Home' myClassName='navbar-item' />
          <NavBarItems
            myHref='/current-user'
            link='Profile'
            myClassName='navbar-item'
          />
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='navbar-item'>
              <div className='buttons'>
                <NavBarItems
                  myHref='/create-user'
                  link='Create User'
                  myClassName='button is-light'
                />
                <NavBarItems
                  myHref='/login'
                  link='Log In'
                  myClassName='button is-primary'
                />
                <a className={`button is-danger`} onClick={() => logOutUser()}>
                  <strong>Sign Out</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
