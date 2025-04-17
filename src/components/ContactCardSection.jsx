import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactCardsSection() {
  const data = [
    {
      icon: <Phone size={40} className="text-[#23A6F0]" />,
      bg: 'bg-white',
      textColor: 'text-[#252B42]',
      emails: ['georgia.young@example.com', 'georgia.young@ple.com'],
    },
    {
      icon: <MapPin size={40} className="text-[#23A6F0]" />,
      bg: 'bg-[#252B42]',
      textColor: 'text-white',
      emails: ['georgia.young@example.com', 'georgia.young@ple.com'],
    },
    {
      icon: <Mail size={40} className="text-[#23A6F0]" />,
      bg: 'bg-white',
      textColor: 'text-[#252B42]',
      emails: ['georgia.young@example.com', 'georgia.young@ple.com'],
    },
  ];

  return (
    <section className="w-full px-6 md:px-20 py-20 bg-white">
      <div className="text-center mb-12">
        <p className="text-sm font-bold text-[#737373]">VISIT OUR OFFICE</p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#252B42] mt-3">
          We help small businesses <br className="hidden md:block" /> with big ideas
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-auto max-w-7xl">
        {data.map((item, i) => (
          <div key={i} className={`flex flex-col items-center justify-center text-center p-12 rounded-lg shadow ${item.bg}`}>
            <div className="mb-6">
              {item.icon}
            </div>
            <div className={`space-y-1 ${item.textColor}`}>
              {item.emails.map((mail, idx) => (
                <p key={idx} className="text-sm font-bold">{mail}</p>
              ))}
              <p className="text-base font-bold mt-2">Get Support</p>
            </div>
            <button className={`mt-6 px-6 py-2 rounded-full border-2 transition-all ${
              item.bg === 'bg-white'
                ? 'border-[#23A6F0] text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-[#252B42]'
            }`}>
              Submit Request
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
