// pages/404.jsx
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import '../styles/globals.css';
import {changeButton} from '../app/utils/changebutton'


export default function Custom404() {
    const [position, setPosition] = useState({ top: '50%', left: '50%' });
    const [timerStarted, setTimerStarted] = useState(false);

    const moveButton = () => {
        const realButton = document.getElementById('real-button')
        if (!timerStarted) {
            setTimerStarted(true);
            const titlefunny = document.getElementById("titlefunny");
            const parafunny = document.getElementById("parafunny");
            const timer = setTimeout(() => {
                setPosition({ top: '50%', left: '50%' });
                const button = document.querySelector('button');
                if (button) {
                    setTimeout(() => {
                        parafunny.textContent = 'i stop now';
                        titlefunny.style.display = "none";
                        setTimeout(() => {
                            parafunny.textContent += ' here is the button';
                            setTimeout(() => {
                                realButton.style.display = "block";
                            }, 2000);
                        }, 2000);
                    }, 5000);
                    titlefunny.textContent = '🫵🤣';
                    button.style.display = "none";
                }
            }, 2000);
        }

        const newTop = Math.random() * 80 + 10 + '%'; // Random position between 10% and 90%
        const newLeft = Math.random() * 80 + 10 + '%'; // Random position between 10% and 90%
        setPosition({ top: newTop, left: newLeft });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Head>
                <title>404 - Page Not Found</title>
            </Head>
            <div>
                <div>
                <h1 className="text-4xl text-red-500 block">404 - Page Not Found</h1>
                <div
                    style={{ 
                        position: 'absolute', 
                        top: position.top, 
                        left: position.left, 
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <button
                        onMouseEnter={moveButton}
                        className="block mt-24 text-center bg-white text-black font-bold py-2 px-4 rounded"
                    >
                        Go back home
                    </button>
                </div>
                <h2 id='titlefunny' className='text-5xl pt-6 text-center'></h2>
                <p id='parafunny' className='text-2xl text-center mt-4'></p>
                <a id='real-button' className='hidden mt-12 text-center bg-white text-black font-bold py-2 px-4 rounded' href="/">Back to home</a>
            </div>
            </div>
        </div>
    );
}