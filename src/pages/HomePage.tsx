// src/components/Homepage.js
import React from 'react';

const Homepage = () => {
  return (
    <div className="font-sans bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Cricket World</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/teams" className="hover:text-gray-300">Teams</a></li>
              <li><a href="/matches" className="hover:text-gray-300">Matches</a></li>
              <li><a href="/news" className="hover:text-gray-300">News</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="container mx-auto p-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-4">Welcome to Cricket World</h2>
          <p className="text-lg text-gray-700">Get the latest updates on cricket matches, players, teams, and news.</p>
        </section>

        {/* Featured Matches */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Upcoming Match</h3>
            <p className="text-gray-600">India vs Australia</p>
            <p className="text-gray-500">Date: 25th November 2024</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Latest News</h3>
            <p className="text-gray-600">India wins the series against England</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Top Players</h3>
            <p className="text-gray-600">Virat Kohli, Rohit Sharma, Steve Smith</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-700 text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Cricket World. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
