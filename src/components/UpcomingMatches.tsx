import React, { useState, useEffect } from "react";
import axios from "axios";

interface UpcomingMatch {
  team_a: string;
  team_b: string;
  team_a_img: string;
  team_b_img: string;
  match_date: string;
  match_time: string;
  venue: string;
  match_type: string;
  match_status: string;
  series: string;
}

const UpcomingMatches: React.FC = () => {
  const [upcomingMatches, setUpcomingMatches] = useState<UpcomingMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://cricket-live-line1.p.rapidapi.com/upcomingMatches",
          headers: {
            "x-rapidapi-key": "d08c00c3e5msh8255c9165bd1713p19a07ajsnb32d9cbc87e6",
            "x-rapidapi-host": "cricket-live-line1.p.rapidapi.com",
          },
        };
        const response = await axios.request<{ data: UpcomingMatch[] }>(options);
        setUpcomingMatches(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load upcoming matches.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading upcoming matches...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Upcoming Matches</h2>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {upcomingMatches.map((match, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img
                  src={match.team_a_img}
                  alt={match.team_a}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <p className="font-bold text-lg">{match.team_a}</p>
              </div>
              <p className="text-gray-500 font-semibold">vs</p>
              <div className="flex items-center">
                <p className="font-bold text-lg">{match.team_b}</p>
                <img
                  src={match.team_b_img}
                  alt={match.team_b}
                  className="w-12 h-12 rounded-full ml-3"
                />
              </div>
            </div>
            <p className="text-gray-700">
              <span className="font-bold">Date:</span> {match.match_date}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Time:</span> {match.match_time}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Venue:</span> {match.venue}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Match Type:</span> {match.match_type}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Series:</span> {match.series}
            </p>
            <p className={`font-bold mt-2 ${match.match_status === "Live" ? "text-green-500" : "text-gray-500"}`}>
              Status: {match.match_status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches;
