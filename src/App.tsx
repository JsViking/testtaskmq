import { useState, useEffect } from 'react';
import { getData } from './utils';
import type { ItemData } from './types';
import Dashboard, { IIitems } from './feature/dashboard';

function App() {
    const [data, setData] = useState<IIitems[]>([])

    useEffect(() => {
        const request = [getData<ItemData>('../data/temperature.json'), getData<ItemData>('../data/precipitation.json')]
        Promise.all(request).then(([temperature, precipitation]) => {
            setData([
                {
                    label: 'Температура',
                    list: temperature,
                    id: 'temperature'
                },
                {
                    label: 'Осадки',
                    list: precipitation,
                    id: 'precipitation'
                },
            ])
        })
    }, []);

    return  <Dashboard label='Архив метеослужбы' data={data} />
}

export default App;
