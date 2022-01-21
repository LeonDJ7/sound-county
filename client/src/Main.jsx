import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Profile from './views/Profile'
import Contact from './views/Contact'
import Home from './views/Home';
import Playlist from './views/Playlist';

interface Props {
    
}
const Main: React.FC<Props> = (props) => {

    return (
        
        <Switch>
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/' component={Home} />
            <Route exact path='/playlists/:id' component={Playlist} />
        </Switch>
        
    )
}

export default Main