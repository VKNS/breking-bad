import { Route, Switch, HashRouter } from 'react-router-dom';

import {List, Card} from './components';
import {routes} from './constants';


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route component={List} exact path={routes.list} />
        <Route component={Card} exact path={routes.card} />
      </Switch>
    </HashRouter>

  );
}

export default App;
