import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Profile from './components/profile/Profile'

interface Props {
    
}
const Main: React.FC<Props> = (props) => {
    return (
        <Switch>
            <Route exact path='/' component={Profile} />
        </Switch>
    )
}

export default Main