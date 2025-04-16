import React from 'react';

export default function TeamMemberCard({ image, name, profession }) {
  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <img src={image} alt={name} className="w-60 h-60 object-cover shadow" />
      <div className="font-bold text-lg text-[#252B42]">{name}</div>
      <div className="font-bold text-sm text-[#737373]">{profession}</div>
      <div className="flex gap-4 text-blue-500 mt-2">
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
      </div>
    </div>
  );
}
