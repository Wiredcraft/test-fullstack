import { createRoot } from 'react-dom/client';

import { App } from '@/pages/App';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);

console.debug(`Version: ${__GIT_REVISION__}`);
