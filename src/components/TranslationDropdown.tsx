// "use client"

// import React, { useEffect } from 'react';

// const TranslationDropdown = () => {
//   useEffect(() => {
//     // Dynamically loading the Google Translate script
//     const loadGoogleTranslateScript = () => {
//       const script = document.createElement('script');
//       script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//       script.async = true;
//       document.body.appendChild(script);
//     };

//     // Initialize Google Translate
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         { pageLanguage: 'en' },
//         'google_translate_element'
//       );
//     };

//     // Load the Google Translate script
//     loadGoogleTranslateScript();

//     // Cleanup function to remove script from DOM when component unmounts
//     return () => {
//       const scripts = document.querySelectorAll('script[src^="https://translate.google.com"]');
//       scripts.forEach(script => script.remove());
//     };
//   }, []);

//   return (
//     <div className="translation-dropdown">
      
//     </div>
//   );
// };

// export default TranslationDropdown;
