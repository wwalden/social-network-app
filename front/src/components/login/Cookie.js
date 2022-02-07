import React from 'react';
import Cookies from 'js-cookie';

export default function Cookie() {
  return (
    <div>
      <p>{Cookies.get('jwt')}</p>
    </div>
  )
}
