import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import SigninScreen from './screens/SigninScreen';
import TodoScreen from './screens/TodoScreen';




function App(props) {
  // const [signout, setSignout] = useState(false);

  const Check = () => {
    const value = document.cookie.split(';').find(x => x.trim().startsWith('token'));
    if (value) {
      return (<TodoScreen />);
    }
    return (<Redirect to="/" />);
  };
  

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <div>
            <span> DREY TODO APP</span>
          </div>
          
        </header>
        <main>
          <Route path="/signin" component={SigninScreen} />
          <Route path="/todo" component={Check} />
          <Route path="/registration" component={RegistrationScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer><i className="fa fa-copyright"></i>All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
