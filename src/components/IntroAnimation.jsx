import React, { useEffect, useState } from "react";

export default function IntroAnimation() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        /* Preloader screen */
        .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          z-index: 9999;
          color: white;
          overflow: hidden;
        }

        /* Fullscreen responsive image with smooth animation */
        .preloader img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: professionalZoom 3s ease-in-out infinite alternate;
        }

        /* Smooth fade + zoom animation */
        @keyframes professionalZoom {
          0% {
            transform: scale(1) translateY(0);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05) translateY(-5px);
            opacity: 1;
          }
          100% {
            transform: scale(1.1) translateY(0);
            opacity: 0.9;
          }
        }

        /* Loading text styling */
        .preloader p {
          position: absolute;
          bottom: 20px;
          font-size: 1.2rem;
          background: rgba(0, 0, 0, 0.5);
          padding: 5px 15px;
          border-radius: 5px;
          animation: fadeText 1.5s ease-in-out infinite;
        }

        /* Text fade animation */
        @keyframes fadeText {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        @media (max-width: 600px) {
          .preloader p {
            font-size: 1rem;
          }
        }
      `}</style>

      {loading && (
        <div className="preloader">
          <img src="/images/logo.png" alt="Loading..." />
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}


