import React from 'react';
import Computer from '../images/home-page1.jpg'

const Home = () => {
    return (
        <div className='text-white'>
          <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-xl font-bold'>
              Got Phish?
            </p>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
              Lorem Ipsum Lorem Ipsum
            </h1>
            <div className='flex justify-center items-center'>
            </div>
            <p className='md:text-2xl text-xl font-bold text-gray-500'>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.</p>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black shadow-lg'>Get Started</button>
          </div>

          <div className='bg-white rounded-2xl max-w-[1500px] mx-auto my-8 py-16 px-4 shadow-2xl'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <img className='w-[500px] mx-auto my-4 border-4 border-gray-500 shadow-2xl' src={Computer} alt='/' />
                <div className='flex flex-col justify-center'>
                <p className='text-[#00df9a] font-bold '>Tired of Phishing Emails?</p>
                <h1 className='text-black md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Lorem Ipsum Lorem Ipsum</h1>
                <p className="text-black">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
                    molestiae delectus culpa hic assumenda, voluptate reprehenderit
                    dolore autem cum ullam sed odit perspiciatis. Doloribus quos velit,
                    eveniet ex deserunt fuga?
                </p>
                <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 shadow-lg'>Get Started</button>
                </div>
            </div>
          </div>
        </div>
      );
}
 
export default Home;