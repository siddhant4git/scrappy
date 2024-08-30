import React, { useState, useEffect } from "react";

const Stats = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPoints() {
      try {
        const response = await fetch("/api/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const data = await response.json();
        const points = data.reduce((total, user) => total + user.points, 0);
        setTotalPoints(points);
        setError(null);
      } catch (error) {
        console.error("Error fetching leaderboard:", error.message);
        setError("Error fetching leaderboard");
      } finally {
        setLoading(false);
      }
    }

    fetchPoints();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto rounded-lg md:w-80">
        <table className="w-full text-sm text-left text-gray-400 lg:max-w-3xl">
          <caption className="p-5 md:pb-10 text-left bg-gray-900 font-sans font-bold tracking-tight text-3xl text-white md:text-4xl sm:leading-none">
            Contributions
            <p className="text-sm font-normal text-gray-400 mt-2">
              Track your contributions to see the impact you've had on the
              environment by actively collecting and disposing of garbage.
            </p>
          </caption>
          <thead className="text-xs text-white uppercase bg-gray-900"></thead>
          <div className="border border-transparent" />
          {/* <tbody>
            <tr className="bg-slate-900">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
                Total Points
              </th>
              <td className="px-6 py-4 font-extrabold">
                {loading ? "Loading..." : error ? error : totalPoints}
              </td>
            </tr>
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default Stats;
