'use client';

import React from 'react';

export default function ContactButton() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const footer = document.getElementById('footer');
    const phoneNumber = document.getElementById('phone-number');
    footer?.scrollIntoView({ behavior: 'smooth' });
    phoneNumber?.classList.add('animate-pulse', 'text-red-500');
    setTimeout(() => {
      phoneNumber?.classList.remove('animate-pulse', 'text-red-500');
    }, 3000);
  };

  return (
    <a 
      href="#footer" 
      className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors inline-block"
      onClick={handleClick}
    >
      Skontaktuj się z nami
    </a>
  );
} 