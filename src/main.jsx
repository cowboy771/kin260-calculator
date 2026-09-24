import React from 'react';
import ReactDOM from 'react-dom/client';
import Kin260Calculator from './KinCalculator';

// If someone arrives here from the bio-link landing page, their birthdate
// is passed along as ?birthdate=YYYY-MM-DD so this page can jump straight
// to their result instead of showing the blank "enter your birthdate"
// screen again — KinCalculator already computes the result immediately
// whenever it's given an initialBirthDate.
const params = new URLSearchParams(window.location.search);
const birthdateFromUrl = params.get('birthdate') || undefined;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Kin260Calculator initialBirthDate={birthdateFromUrl} />
  </React.StrictMode>
);
