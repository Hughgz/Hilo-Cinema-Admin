import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Movies from '../components/movie'
import Theaters from '../components/theater'
import Actors from './actor';
import Producers from './producer';
import Categories from './category';
const Stock = () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path} component={Movies} />
        <Route path={`${path}/movie`} component={Movies} />
        <Route path={`${path}/theater`} component={Theaters} />
        <Route path={`${path}/category`} component={Categories} />
        <Route path={`${path}/producer`} component={Producers} />
        <Route path={`${path}/actor`} component={Actors} />
      </Switch>
    </div>
  );
};

export default Stock;
