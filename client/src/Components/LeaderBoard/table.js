import React, { useEffect, useState } from "react";
import "./Leaderboard";

export default function Table() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    async function leaderboardPoints() {
      const response = await fetch("/api/leaderboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const boardWithBadges = assignBadges(data);
        setBoard(boardWithBadges);
      } else {
        const data = await response.json();
        alert(data.error);
      }
    }

    leaderboardPoints();
  }, []);

  const assignBadges = (data) => {
    const sortedData = data.sort((a, b) => b.points - a.points);
    const usersWithBadges = sortedData.map((user, index) => {
      let badges = [];
      if (index === 0) {
        badges.push("Top Performer");
      }
      if (user.points >= 1000) {
        badges.push("Eco Warrior");
      }
      if (user.points >= 500) {
        badges.push("Environment Champion");
      }
      return { ...user, badges: badges };
    });

    return usersWithBadges;
  };

  return (
    <div id="profile" className="flex justify-center items-center">
      {board ? <Items data={board} /> : <p>Loading...</p>}
    </div>
  );
}

function Items({ data }) {
  return (
    <table className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr>
          <th className="py-2 px-4 bg-gray-200 font-semibold text-gray-700">
            Name
          </th>
          <th className="py-2 px-4 bg-gray-200 font-semibold text-gray-700">
            Location
          </th>
          <th className="py-2 px-4 bg-gray-200 font-semibold text-gray-700">
            Points
          </th>
          <th className="py-2 px-4 bg-gray-200 font-semibold text-gray-700">
            Badges
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((value, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{value.username}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{value.location}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{value.points}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{value.badges.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
