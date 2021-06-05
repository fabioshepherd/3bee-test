import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Layout = ({ children }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const alreadySubscribed = Cookies.get('newsletterSubscribed');
    console.log('alreadySubscribed', alreadySubscribed);
    if (!alreadySubscribed) {
      setTimeout(() => {
        setShowBanner(true);
      }, 3000);
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log('handleSubmit');

    e.preventDefault();
    if (email) {
      setShowBanner(false);
      axios
        .post('/post-endpoint', {
          email: email,
        })
        .catch(function (error) {
          console.error('Fake call post');
        });

      Cookies.set('newsletterSubscribed', email, { expires: 100 });
    }
  };

  console.log(showBanner);

  return (
    <>
      {children}
      {showBanner && (
        <div className='absolute z-10 bottom-0 h-20 bg-yellow-500 w-full flex justify-center items-center'>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type='email'
                placeholder='email'
                name='email'
                className='rounded-md p-2'
                onChange={handleEmailChange}
                value={email}
              />{' '}
              <button
                className='text-sm font-light bg-gray-900 text-gray-50 rounded-md px-4 py-2'
                type='submit'>
                Iscriviti alla Newsletter
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
