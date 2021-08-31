import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Profile from './components/profile/Profile'
import Contact from './components/contact/Contact'
import Info from './components/info/Info';
import PlaylistExpanded from './components/info/PlaylistExpanded';

interface Props {
    
}
const Main: React.FC<Props> = (props) => {

    return (
        
        <Switch>
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/' component={Info} />
            <Route exact path='/playlists/:id' component={PlaylistExpanded} />
        </Switch>
        
    )
}

export default Main