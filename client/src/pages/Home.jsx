import React from "react";
import Computer from "../images/home-page1.jpg";
import CyberThief from "../images/home-page2.jpg";
import { Element } from "react-scroll";
import fish from "../images/gotphishfish2.png";

const Home = () => {
  return (
    <div className="text-white">
      <div className="card text-center background-image" style={{ height: '700px', backgroundColor: 'transparent' }}>
      <div className="card-body">
        <div className="max-w-[800px] mt-[-70px] w-full h-screen mx-auto text-center flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold font-mono text-white mb-4">
            Got Phish?{' '}
          </h1>
          <img className="w-28 h-auto max-w-full mb-6" src={fish} alt="image description" />

          <h1 className="md:text-6xl sm:text-5xl text-3xl font-bold py-4 text-white">
            Secure Your Inbox with{' '}
            <span className="font-extrabold italic text-[#FF7210]">Confidence</span>
          </h1>

          <p className="md:text-xl text-lg font-semibold text-white mb-8">
            Protect your business from phishing attacks with our advanced
            AI-driven email security solution.
          </p>

          <button
            onClick={() => (window.location.href = '/login')}
            className="bg-[#FEB500] w-[200px] rounded-md font-medium my-6 py-3 text-black shadow-lg hover:bg-[#FFD700] transition duration-300 focus:outline-none focus:shadow-outline transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>

      <div className="bg-white rounded-2xl max-w-[1500px] mx-auto my-8 py-16 px-4 shadow-2xl">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <img
            className="w-[500px] mx-auto my-4 border-4 border-gray-500 shadow-2xl"
            src={Computer}
            alt="/"
          />
          <div className="flex flex-col justify-center">
            <p className="text-[#FF7210] text-2xl font-extrabold pb-4">
              Tired of Phishers trying to steal your data?
            </p>
            <h1 className="text-black md:text-4xl sm:text-3xl text-2xl font-bold py-4">
              Experience Secure Communication with Our Email Protection
            </h1>
            <p className="text-black font-semibold">
              Safeguard your business from phishing threats. Our advanced
              AI-driven solution identifies and blocks malicious emails,
              ensuring a worry-free communication environment. Don't let
              phishing attacks compromise your data and integrity!
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="bg-black text-[#FEB500] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl max-w-[1500px] mx-auto my-24 py-16 px-4 shadow-2xl">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="text-[#FF7210] text-2xl font-extrabold pb-4">
              Strengthen Your Defenses Against Rising Cyber Threats
            </p>
            <h1 className="text-black md:text-4xl sm:text-3xl text-2xl font-bold py-4">
              With a 53% increase in cyberattacks from 2016-2022 and an
              estimated loss of over $775 million in 2022 alone, securing your
              data is crucial
            </h1>
            <p className="text-black font-semibold">
              Our advanced AI-driven phishing detection system empowers NYC
              businesses to identify and thwart phishing emails, safeguarding
              against potential privacy invasions, identity theft, and fraud.
              Don't be a victim – fortify your defenses with us today.
            </p>
            <button
              onClick={() =>
                window.open(
                  "https://www.osc.ny.gov/press/releases/2023/10/cyberattack-complaints-in-new-york-rise-53-percent",
                  "_blank"
                )
              }
              className="bg-black text-[#FEB500] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 shadow-lg"
            >
              Go To Source
            </button>
          </div>
          <img
            className="w-[500px] mx-auto my-4 border-4 border-gray-500 shadow-2xl"
            src={CyberThief}
            alt="/"
          />
        </div>
      </div>

      <Element name="about-section" className="element">
        <div className="bg-white rounded-2xl max-w-[1500px] mx-auto my-24 py-16 px-4 shadow-2xl">
          <div className="max-w-[1240px] mx-auto">
            <div className="flex flex-col justify-center">
              <p className="text-[#FF7210] text-6xl font-bold pb-12">
                About Us
              </p>
              <h1 className="text-black md:text-4xl sm:text-3xl text-2xl font-bold py-2">
                Got Phish? No fear!
              </h1>
              <p className="text-black md:text-xl sm:text-3xl text-2xl font-semibold py-8">
                🎣 Tired of swimming in the sea of phishing emails? Dive into
                safety with Got Phish! We're your digital lifeguard, dedicated
                to protecting small businesses in the bustling waters of NYC
                from phishing threats.
              </p>
              <p className="text-black md:text-xl sm:text-3xl text-2xl font-semibold py-8">
                🏖️ Log in with your Gmail, and let our AI, powered by a dataset
                sea, analyze your emails. We'll display a clear signal: which
                emails are likely safe and which ones are phishing – making your
                inbox a haven.
              </p>
              <p className="text-black md:text-xl sm:text-3xl text-2xl font-semibold py-8">
                🌐 Utilizing the Google API for seamless email retrieval and the
                Cohere API for intelligent analysis, we ensure a smooth sailing
                experience for our users. Our backend, equipped with Kaggle's
                phishing dataset, dives deep into the digital waves to tag
                overall email safety. So, why get caught in phishing nets when
                you can ride the Got Phish wave?
              </p>
              <p className="text-black md:text-xl sm:text-3xl text-2xl font-semibold py-8">
                Copyright &copy; 2024 GotPhish?
              </p>
            </div>
          </div>
        </div>
      </Element>
    </div>
  );
};

export default Home;
