import React, { useState, useEffect } from "react";
import axios from "axios";

interface NewsItem {
  title: string;
  description: string;
  content: string[];
  pub_date: string;
  link: string;
  image: string;
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://cricket-live-line1.p.rapidapi.com/news",
          headers: {
            "x-rapidapi-key": "d08c00c3e5msh8255c9165bd1713p19a07ajsnb32d9cbc87e6",
            "x-rapidapi-host": "cricket-live-line1.p.rapidapi.com",
          },
        };
        const response = await axios.request<{ data: NewsItem[] }>(options);
        setNews(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load news.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Cricket News</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
          >
            {/* News Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            {/* News Title and Publication Date */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{item.pub_date}</p>

            {/* News Description */}
            <p className="text-gray-700 mb-4">{item.description}</p>

            {/* Read More Link */}
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-semibold"
            >
              Read More
            </a>

            {/* Full Content Preview (collapsed initially) */}
            <div className="mt-4">
              <details className="group">
                <summary className="cursor-pointer text-blue-500 font-semibold">
                  Read Full Article
                </summary>
                <div className="mt-2 text-gray-700">
                  {item.content.map((para, idx) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
                  ))}
                </div>
              </details>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
