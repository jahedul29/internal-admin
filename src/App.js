import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login';
import Statistics from './pages/Statistics/index';
import MessageTracking from './pages/MessageTracking';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const AppContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AppContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <Statistics />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/message-tracking">
            <MessageTracking />
          </PrivateRoute>
        </Switch>
      </Router>
    </AppContext.Provider>
    
  );
}

export default App;
