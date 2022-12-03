import { getData } from './utils';
import type { ItemData } from './types';
import Dashboard from './feature/dashboard';

const config = [
    {
        label: 'Температура',
        id: 'temperature',
        request: () => getData<ItemData>('../data/temperature.json'),
        rows: ['-40', '-30', '-20', '-10', '0', '10', '20', '30', '40'],
        zeroPoint: 4
    },
    {
        label: 'Осадки',
        id: 'precipitation',
        request: () => getData<ItemData>('../data/precipitation.json'),
        rows: ['0мм', '5мм', '10мм', '15мм', '20мм', '25мм', '30мм', '35мм', '40мм'],
        zeroPoint: 0
    },
]

function App() {
    return  <Dashboard label='Архив метеослужбы' config={config} />
}

export default App;
