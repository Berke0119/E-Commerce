import React from 'react';
import TeamMemberCard from './TeamMemberCard';

const teamData = [
  { id: 1, name: "Emily Clark", profession: "UI Designer", image: "/team1.jpg" },
  { id: 2, name: "James Lee", profession: "Backend Developer", image: "/team2.jpg" },
  { id: 3, name: "Sophie Kim", profession: "Marketing Lead", image: "/team3.jpg" },
  { id: 4, name: "Daniel Smith", profession: "Mobile Developer", image: "/team4.jpg" },
  { id: 5, name: "Olivia Jones", profession: "Product Manager", image: "/team5.jpg" },
  { id: 6, name: "Ethan Brown", profession: "QA Engineer", image: "/team6.jpg" },
  { id: 7, name: "Liam Johnson", profession: "DevOps Engineer", image: "/team7.jpg" },
  { id: 8, name: "Isabella Davis", profession: "UX Researcher", image: "/team8.jpg" },
  { id: 9, name: "Mason Wilson", profession: "Full Stack Developer", image: "/team9.jpg" },
];


export default function FullTeamSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 py-20 bg-white">
      <h2 className="text-center text-4xl font-bold text-[#252B42] mb-10">
        Meet Our Team
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {teamData.map((member) => (
          <TeamMemberCard
            key={member.id}
            name={member.name}
            profession={member.profession}
            image={member.image}
          />
        ))}
      </div>
    </section>
  );
}
