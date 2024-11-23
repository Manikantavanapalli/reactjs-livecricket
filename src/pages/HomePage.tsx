import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the structure of match data
interface MatchData {
    matchs: string;
    series: string;
    venue: string;
    match_status: string;
    toss: string;
    team_a_img: string;
    team_b_img: string;
    team_a: string;
    team_b: string;
    trail_lead: string;
    match_date: string;
    match_time: string;
}

const Homepage: React.FC = () => {
    const [matches, setMatches] = useState<MatchData[]>([]); // Use MatchData type
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: "GET",
                    url: "https://cricket-live-line1.p.rapidapi.com/home",
                    headers: {
                        "x-rapidapi-key": "d08c00c3e5msh8255c9165bd1713p19a07ajsnb32d9cbc87e6",
                        "x-rapidapi-host": "cricket-live-line1.p.rapidapi.com",
                    },
                };
                const response = await axios.request<{ data: MatchData[] }>(options); // Specify response type
                setMatches(response.data.data); // Update matches state
                setLoading(false);
            } catch (err) {
                setError("Failed to load data.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="text-center text-blue-500">Loading matches...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="font-sans bg-gray-100 min-h-screen">
            <main className="container mx-auto p-8">
                <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">
                    Live & Upcoming Matches
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {matches.map((match, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
                        >
                            <h3 className="text-2xl font-semibold text-blue-900 mb-2">{match.matchs}</h3>
                            <p className="text-gray-600 text-lg">{match.series}</p>
                            <p className="text-gray-500 text-sm">{match.venue}</p>
                            <p className="text-sm text-gray-600 mt-2">
                                Status:{" "}
                                <span
                                    className={`font-semibold ${
                                        match.match_status.toLowerCase() === "live"
                                            ? "text-green-600"
                                            : "text-orange-600"
                                    }`}
                                >
                                    {match.match_status}
                                </span>
                            </p>
                            <div className="flex justify-between items-center mt-4">
                                <img
                                    src={match.team_a_img}
                                    alt={match.team_a}
                                    className="w-16 h-16 object-cover rounded-full border-2 border-gray-200"
                                />
                                <p className="text-gray-800 text-lg font-medium">
                                    {match.team_a} vs {match.team_b}
                                </p>
                                <img
                                    src={match.team_b_img}
                                    alt={match.team_b}
                                    className="w-16 h-16 object-cover rounded-full border-2 border-gray-200"
                                />
                            </div>
                            <p className="mt-3 text-sm text-gray-600">
                                Toss: <span className="font-semibold">{match.toss}</span>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">{match.trail_lead}</p>
                            <p className="text-sm text-gray-400 mt-1">
                                Date: {match.match_date} | Time: {match.match_time}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Homepage;
