import { configure } from '@kadira/storybook';

function loadStories() {
    // require as many as stories you need.
    require('../story/IndexStory');
}

configure(loadStories, module);