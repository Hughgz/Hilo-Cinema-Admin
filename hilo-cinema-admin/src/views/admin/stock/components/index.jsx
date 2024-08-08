import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Movies from '../components/movie'
import Theaters from '../components/theater'
const Stock = () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path} component={Movies} />
        <Route path={`${path}/movie`} component={Movies} />
        <Route path={`${path}/theater`} component={Theaters} />
      </Switch>
    </div>
  );
};

export default Stock;
