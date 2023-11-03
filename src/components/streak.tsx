import React, { useState, useEffect } from 'react';

const Streak = () => {
  const [streakData, setStreakData] = useState<string | null>(null); // Data can be a string or null
  const [isLoading, setIsLoading] = useState<boolean>(true); // Explicit boolean type
  const [error, setError] = useState<string | null>(null); // Error can be a string or null

  useEffect(() => {
    chrome.runtime.sendMessage(
      { message: "fetchDuolingoData" },
      (response: { error: React.SetStateAction<string | null>; html: string; }) => {
        if (response.error) {
          setError(response.error); // Error is a string
          setIsLoading(false);
        } else {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response.html, "text/html");
          const streakElement = doc.querySelector('span[data-test="streak-stat"]');
          if (streakElement && streakElement.textContent) {
            setStreakData(streakElement.textContent);
          } else {
            setError('Streak element not found or contains no text');
          }
          setIsLoading(false);
        }
      }
    );
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="streak">
      <h2>Your Streak:</h2>
      {streakData !== null ? (
        <p>Current Streak: {streakData}</p>
      ) : (
        <p>No streak data available.</p>
      )}
    </div>
  );
};

export default Streak;
