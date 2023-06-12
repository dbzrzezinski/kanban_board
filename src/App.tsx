// basic stuff
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import { Board } from './components/Board/Board';
import { Login } from './components/Login/Login';

import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth, firebaseApp } from './services/AuthentificationService';
import ProtectedRoute from './Routes/ProtectedRoutes';

import { AuthContextProvider } from './Contexts/AuthContext';
import { getDatabase, ref, set, serverTimestamp } from 'firebase/database';

function App() {
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      // User is signed in
      if (user) {
        const db = getDatabase(firebaseApp);

        // Put user into database
        set(ref(db, 'users/' + user.uid), {
          uuid: user.uid,
          username: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          lastLogin: serverTimestamp(),
          banned: false
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  }, []);

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route
            path="/board"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
