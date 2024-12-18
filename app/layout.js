import '../styles/globals.css';

export const metadata = {
  title: 'BART Game',
  description: 'A simple BART game built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100">{children}</body>
    </html>
  );
}
