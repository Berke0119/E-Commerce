import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-white pt-20 w-full'>
      <div className='max-w-7xl mx-auto px-6 md:px-20 flex flex-col gap-4 items start md:flex-row justify-between md:items-center border-b border-[#E0E0E0] pb-10'>
        <h2 className="text-2xl font-bold text-[#252B42]">Bandage</h2>
        <div className="flex gap-4 text-[#23A6F0] text-xl">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
        </div>
      </div>

      <div className='flex flex-col gap-8 px-6 md:px-20 md:flex-row w-full justify-center items-start md:gap-40 py-20'>
        <div>
          <h4 className="text-base font-bold text-[#252B42] mb-4">Company Info</h4>
          <ul className="space-y-2 text-[#737373] text-sm font-bold">
            <li className='hover:underline'><Link to="/about">About Us</Link></li>
            <li className='hover:underline'><Link to="/contact">Carrier</Link></li>
            <li className='hover:underline'><a href="#">Pricing</a></li>
            <li className='hover:underline'><Link to="/team">Our Team</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-base font-bold text-[#252B42] mb-4">Resources</h4>
          <ul className="space-y-2 text-[#737373] text-sm font-bold">
            <li className='hover:underline'><a href="#">IOS & Android</a></li>
            <li className='hover:underline'><a href="#">Watch a Demo</a></li>
            <li className='hover:underline'><a href="#">Customers</a></li>
            <li className='hover:underline'><a href="#">API</a></li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h4 className="text-base font-bold text-[#252B42] mb-4">Get In Touch</h4>
          <div className="flex items-center border rounded overflow-hidden max-w-[300px]">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 text-sm text-[#737373] font-bold w-full outline-none"
            />
            <button className="bg-[#23A6F0] text-white text-sm font-semibold px-4 py-2">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-[#737373] mt-2">Lore imp sum dolor Amit</p>
        </div>
      </div>

      <div className='w-full flex justify-center items-center py-10 bg-[#FAFAFA]'>
        <p className='text-base  text-[#737373]'>Copyright © 2025 All rights reserved</p>
      </div>
    </footer >
  );
}
