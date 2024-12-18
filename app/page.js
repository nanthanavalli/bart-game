'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handlePlayClick = () => {
    router.push('/game');
  };

  return (
    <div className="relative h-screen">
      <Image
        src="/images/background.jpeg" // Path to the image
        alt="Background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority // Optimize loading
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-6">BART Game</h1>
        <button
          onClick={handlePlayClick}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md"
        >
          Play
        </button>
      </div>
    </div>
  );
}
