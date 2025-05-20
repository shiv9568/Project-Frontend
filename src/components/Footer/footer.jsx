

const links = [
  { name: 'About Us', href: '#' },
  { name: 'Upcoming Events', href: '#' },
  { name: 'Past Events', href: '#' },
  { name: 'Contact Us', href: '#' },
];
const stats = [
  { name: 'Events Hosted', value: '100+' },
  { name: 'Universities Engaged', value: '50+' },
  { name: 'Participants Registered', value: '10K+' },
  { name: 'Tech Workshops & Competitions', value: '200+' },
];

export default function UniversityEventFooter() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-20">
      {/* Background Image */}
      <img
        alt="Technical Event Background"
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title and Tagline */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Innovate, Compete, and Collaborate
          </h2>
          <p className="mt-6 text-base font-medium text-gray-300">
            Join us for cutting-edge technical events, hackathons, and workshops that drive innovation, collaboration, and skill-building for future leaders.
          </p>
        </div>

        {/* Event Stats */}
        <div className="mx-auto mt-8 max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-sm text-gray-300">{stat.name}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-gray-400">
         
          <p className="mt-4 text-gray-400">
            © 2024 TechFest Hub. All rights reserved. Powered by technology and innovation.
          </p>
          <p className="mt-4 text-sm italic text-gray-300">
            Technology is best when it brings people together to create, compete, and collaborate. 💡
          </p>
        </div>
      </div>
    </div>
  );
}
