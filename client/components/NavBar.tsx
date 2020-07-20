import React from 'react';
import Link from 'next/link';
import SignUp from '../pages/signup';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const NavBarItems = ({ myHref, link, myClassName }) => (
  <Link href={myHref}>
    <a className={myClassName}>{link}</a>
  </Link>
);
const SIGNOUT = gql`
  mutation SignOut {
    signOut
  }
`;

const NavBar = ({ loading, email }) => {
  const [signOut, { data }] = useMutation(SIGNOUT, {
    onCompleted: (data) => console.log(data),
  });
  console.log(email);
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
            myHref='/signup'
            link='Sign Up'
            myClassName='navbar-item'
          />
          <NavBarItems myHref='/user' link='User' myClassName='navbar-item' />
        </div>
        {email}
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='navbar-item'>
              <div className='buttons'>
                <a
                  className={`button is-primary ${loading ? 'is-loading' : ''}`}
                >
                  <strong>Sign up</strong>
                </a>
                <a className={`button is-primary`} onClick={() => signOut()}>
                  <strong>Sign Out</strong>
                </a>
                <NavBarItems
                  myHref='/signin'
                  link='Log In'
                  myClassName='button is-light'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
