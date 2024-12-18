'use client';

import { useState } from 'react';
import Image from 'next/image';
import balloonImage from '/public/images/balloon.png'; // Replace with your balloon image

const BALLOONS_COUNT = 30; // Total number of balloons
const MONEY_PER_PUMP = 0.05; // Money earned per pump
const MAX_PUMPS = 64; // Maximum pumps allowed

export default function GamePage() {
  const [balloonIndex, setBalloonIndex] = useState(0); // Current balloon number
  const [pumps, setPumps] = useState(0); // Pumps for current balloon
  const [temporaryBank, setTemporaryBank] = useState(0); // Money in the temporary bank
  const [permanentBank, setPermanentBank] = useState(0); // Total money collected
  const [isBurst, setIsBurst] = useState(false); // Whether the balloon burst
  const [balloonStats, setBalloonStats] = useState([]); // Track stats for each balloon

  // Generate a random pump limit for the current balloon
  const generatePumpLimit = () => {
    return Math.ceil(Math.random() * MAX_PUMPS); // Random pump limit between 1 and MAX_PUMPS
  };

  const [pumpLimit, setPumpLimit] = useState(generatePumpLimit);

  // Handle the "Pump" action
  const handlePump = () => {
    if (isBurst || balloonIndex >= BALLOONS_COUNT) return;

    const burst = pumps + 1 >= pumpLimit;

    if (burst) {
      // Balloon bursts
      setIsBurst(true);
      setBalloonStats((prev) => [...prev, { pumps, popped: true }]);
    } else {
      // Balloon inflates
      setPumps((prev) => prev + 1);
      setTemporaryBank((prev) => prev + MONEY_PER_PUMP);
    }
  };

  // Handle the "Collect" action
  const handleCollect = () => {
    if (isBurst || balloonIndex >= BALLOONS_COUNT) return;

    setPermanentBank((prev) => prev + temporaryBank); // Add temporary bank to permanent bank
    setBalloonStats((prev) => [...prev, { pumps, popped: false }]);
    resetBalloon();
  };

  // Reset for the next balloon
  const resetBalloon = () => {
    setPumps(0);
    setTemporaryBank(0);
    setIsBurst(false);
    setPumpLimit(generatePumpLimit());
    setBalloonIndex((prev) => prev + 1);
  };

  // Balloon size calculation (based on pumps)
  const balloonSize = Math.min(100 + pumps * 10, 300); // Balloon grows with each pump

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      
      {balloonIndex < BALLOONS_COUNT ? (
        <>
          {/* Balloon Animation */}
          <div className="mb-8">
            <div
              className={`relative transition-transform duration-300 ${
                isBurst ? 'animate-ping scale-0 opacity-0' : ''
              }`}
              style={{
                width: `${balloonSize}px`,
                height: `${balloonSize}px`,
              }}
            >
              {!isBurst && (
                <Image
                  src={balloonImage}
                  alt="Balloon"
                  layout="fill"
                  objectFit="contain"
                  className="transition-transform duration-300"
                />
              )}
            </div>
          </div>
          <div className="mb-4 text-xl">Balloon {balloonIndex + 1} / {BALLOONS_COUNT}</div>
          <div className="mb-4 text-xl">Temporary Bank: ${temporaryBank.toFixed(2)}</div>
          <div className="mb-4 text-xl">Permanent Bank: ${permanentBank.toFixed(2)}</div>
          <div className="flex space-x-4">
            <button
              onClick={handlePump}
              disabled={isBurst || balloonIndex >= BALLOONS_COUNT}
              className="px-6 py-3 bg-green-500 hover:bg-green-700 text-white font-medium rounded-md"
            >
              Pump
            </button>
            <button
              onClick={handleCollect}
              disabled={isBurst || balloonIndex >= BALLOONS_COUNT}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-700 text-white font-medium rounded-md"
            >
              Collect
            </button>
            {isBurst && balloonIndex < BALLOONS_COUNT && (
              <button
                onClick={resetBalloon}
                className="px-6 py-3 bg-red-500 hover:bg-red-700 text-white font-medium rounded-md"
              >
                Next Balloon
              </button>
            )}
          </div>
          {isBurst && <div className="mt-4 text-xl text-red-400">The balloon burst! You lost the round.</div>}
        </>
      ) : (
        // Game Over Stats
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Game Over!</h1>
          <p className="text-xl mb-4">Total Money Earned: ${permanentBank.toFixed(2)}</p>
          <button
            onClick={() => location.reload()} // Simple reload to restart the game
            className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}
