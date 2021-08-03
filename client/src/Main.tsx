import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Profile from './components/profile/Profile'
import Contact from './components/contact/Contact'
import Statistics from './components/statistics/Statistics'
import Recommendations from './components/recommendations/Recommendations'

interface Props {
    
}
const Main: React.FC<Props> = (props) => {
    return (
        
        <Switch>
            <Route exact path='/' component={Profile} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/statistics' component={Statistics} />
            <Route exact path='/discover' component={Recommendations} />
        </Switch>
        
    )
}

export default Main