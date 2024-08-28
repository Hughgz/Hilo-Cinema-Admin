import React from 'react'
import Rooms from './roomSeat'
import UserManagement from './schedules'
import Ticket from './ticket'
import { Switch, Route, useRouteMatch } from 'react-router-dom';

function Sales() {
    let { path } = useRouteMatch();
    return (
        <div>
            <Switch>
                {/* <Route exact path={path} component={Rooms} /> */}
                <Route path={`${path}/room`} component={Rooms} />
                <Route path={`${path}/schedule`} component={UserManagement} />
                {/* <Route path={`${path}/category`} component={Categories} />
      <Route path={`${path}/producer`} component={Producers} /> */}
                <Route path={`${path}/ticket`} component={Ticket} />
            </Switch>
        </div>
    )
}

export default Sales