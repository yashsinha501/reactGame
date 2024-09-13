import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInputNumber, generateRandomNumber, checkNumber  } from '../redux/gameSlice';
import {checkAndUpdatePoints} from '../redux/gameSlice'



const Game = () => {


    const dispatch = useDispatch();
    const { inputNumber, randomNumber, points, message, highestPoints } = useSelector((state) => state.game);

    const handleCheckNumber = () => {
        dispatch(generateRandomNumber()); 
        dispatch(checkNumber());     

        
        if (points > highestPoints) {

            dispatch(checkAndUpdatePoints(points)); 

        }
        
    };




    return (
        <div className="flex flex-col items-center justify-center h-[88vh] bg-gray-400">
            <div className="bg-black p-8 shadow-lg rounded-lg w-[40%]">
                <h2 className="text-2xl font-bold mb-4 text-center text-white">Guess the Number</h2>
                <p className="mb-4 text-center text-gray-300">Enter a number between 1 and 5:</p>
                <div className="flex justify-center mb-4">
                    <input
                        type="number"
                        value={inputNumber}
                        onChange={(e) => dispatch(setInputNumber(e.target.value))}
                        min="1"
                        max="5"
                        className="border border-gray-500 bg-gray-700 text-white rounded-md p-2 w-16 text-center text-xl"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleCheckNumber}
                        className="bg-cyan-300 text-black px-4 py-2 rounded-md hover:bg-cyan-500 transition duration-300"
                    >
                        Check
                    </button>
                </div>
                <div className="mt-6 text-center">
                    {randomNumber !== null && (
                        <p className="text-gray-300">
                            The random number was: <strong>{randomNumber}</strong>
                        </p>
                    )}
                    <p className="text-lg font-semibold text-gray-300">{message}</p>
                    <p className="mt-4 text-xl font-bold text-cyan-300">
                        Total Points: <strong>{points}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Game;
