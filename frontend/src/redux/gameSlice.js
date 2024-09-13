import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; 
// require('dotenv')


const initialState = {
  inputNumber: '',
  randomNumber: null,
  points: 0,
  highestPoints: 0,
  message: ''
};


const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setInputNumber(state, action) {
      state.inputNumber = action.payload;
    },
    generateRandomNumber(state) {
      state.randomNumber = Math.floor(Math.random() * 5) + 1;
    },
    checkNumber(state) {
      if (parseInt(state.inputNumber) === state.randomNumber) {
        state.points += 5;
        state.message = 'Congratulations! You guessed the correct number.';
      } else {
        state.message = 'Oops! Try again.';
      }
    },
    resetGame(state) {
      state.inputNumber = '';
      state.randomNumber = null;
      state.message = '';
    },
    setHighestPoints(state, action) {
      state.highestPoints = action.payload;
    }
  }
});

export const { setInputNumber, generateRandomNumber, checkNumber, resetGame, setHighestPoints } = gameSlice.actions;


// export const checkAndUpdatePoints = (points) => async (dispatch) => {


//   try {
//     const token = localStorage.getItem('token');
//     if (!token) throw new Error("No token found");

//     console.log("first");
    
//     const decodedToken = jwtDecode(token);
    
//     const userId = decodedToken.id || decodedToken._id; 

//     const response = await fetch('http://localhost:8000/auth/updatePoints', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify({ points, userId }),
//     });

//     if (!response.ok) {
//       const errorDetails = await response.text();
//       throw new Error(`Failed to update points ${errorDetails}`);
//     }

//     const data = await response.json();
//     console.log(data);
    
//     if (data.highestPoints) {
//       dispatch(setHighestPoints(data.highestPoints));
//     }
//   } catch (err) {
//     console.error('Error updating points:', err.message || err);
//   }
// };


export const checkAndUpdatePoints = (points) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token found");

    console.log("Token:", token);
    
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);
    
    const userId = decodedToken.id || decodedToken._id; 
    console.log("User ID:", userId);

    // const response = await fetch('http://localhost:8080/auth/updatePoints', {
    const response = await fetch(`https://assignbackend-hmk7.onrender.com/auth/updatePoints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ points, userId }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to update points: ${errorDetails}`);
    }

    const data = await response.json();
    console.log("Response Data:", data);
    
    if (data.highestPoints) {
      dispatch(setHighestPoints(data.highestPoints));
    }
  } catch (err) {
    console.error('Error updating points:', err.message || err);
  }
};



export default gameSlice.reducer;
