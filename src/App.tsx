import { getData } from './utils';
import type { ItemData } from './types';
import Dashboard from './feature/dashboard';

const config = [
    {
        label: 'Температура',
        id: 'temperature',
        request: () => getData<ItemData>('../data/temperature.json')
    },
    {
        label: 'Осадки',
        id: 'precipitation',
        request: () => getData<ItemData>('../data/precipitation.json')
    },
]

function App() {
    return  <Dashboard label='Архив метеослужбы' config={config} />
}

export default App;
