import React from 'react';
import { Switch , Route} from 'react-router-dom';

import Talks from './Talks';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Talks} />
        </Switch>
    </main>
)

export default Main;