import React from 'react';
import { Link } from 'react-router-dom';
import TeamMemberCard from './TeamMemberCard';

export default function MeetTeamSection() {
  const team = [
    {
      name: 'Ayşe Kaya',
      profession: 'Frontend Developer',
      image: '/team1.jpg',
    },
    {
      name: 'Zeynep Demir',
      profession: 'UX Designer',
      image: '/team2.jpg',
    },
    {
      name: 'Mehmet Yılmaz',
      profession: 'Backend Developer',
      image: '/team3.jpg',
    },
  ];

  return (
    <section className="py-16 bg-white text-center px-6">
      <h2 className="text-4xl font-bold text-[#252B42] mb-2">Meet Our Team</h2>
      <p className="max-w-xl mx-auto text-sm text-[#737373] mb-24 font-normal">
        Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
      </p>

      <div className="flex justify-center gap-10 flex-wrap">
        {team.map((member, index) => (
          <TeamMemberCard key={index} {...member} />
        ))}
      </div>

      <Link
        to="/team"
        className="mt-16 inline-block bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
      >
        Full Team →
      </Link>
    </section>
  );
}
