import React, { useState, useEffect } from "react";
import axios from "axios";

interface LiveMatch {
  team_a: string;
  team_b: string;
  match_status: string;
  team_a_img: string;
  team_b_img: string;
  venue: string;
  series: string;
  match_time: string;
  match_type: string;
  team_a_scores: string;
  team_a_over: string;
  team_b_scores: string;
  team_b_over: string;
  toss: string;
  trail_lead: string;
  matchs: string;
}

const LiveMatches: React.FC = () => {
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://cricket-live-line1.p.rapidapi.com/liveMatches",
          headers: {
            "x-rapidapi-key": "d08c00c3e5msh8255c9165bd1713p19a07ajsnb32d9cbc87e6",
            "x-rapidapi-host": "cricket-live-line1.p.rapidapi.com",
          },
        };
        const response = await axios.request<{ data: LiveMatch[] }>(options);
        setLiveMatches(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load live matches.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-blue-500 text-lg">Loading live matches...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-900">Live Cricket Matches</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveMatches.map((match, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <h3 className="text-2xl font-semibold text-center text-blue-800 mb-4">
              {match.matchs} - {match.series}
            </h3>
            <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <img
                  src={match.team_a_img}
                  alt={match.team_a}
                  className="w-20 h-20 rounded-full mx-auto mb-2"
                />
                <p className="font-medium text-lg">{match.team_a}</p>
                <p className="text-sm text-gray-500">{match.team_a_scores} ({match.team_a_over} overs)</p>
              </div>
              <p className="text-xl font-bold text-gray-800">VS</p>
              <div className="text-center">
                <img
                  src={match.team_b_img}
                  alt={match.team_b}
                  className="w-20 h-20 rounded-full mx-auto mb-2"
                />
                <p className="font-medium text-lg">{match.team_b}</p>
                <p className="text-sm text-gray-500">{match.team_b_scores} ({match.team_b_over} overs)</p>
              </div>
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Venue:</strong> {match.venue}
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Match Type:</strong> {match.match_type}
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Match Time:</strong> {match.match_time}
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Status:</strong> <span className={`font-semibold ${match.match_status === 'Live' ? 'text-green-600' : 'text-gray-600'}`}>{match.match_status}</span>
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Toss:</strong> {match.toss}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Trail/Lead:</strong> {match.trail_lead}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMatches;
