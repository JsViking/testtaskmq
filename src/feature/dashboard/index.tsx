import { useEffect, useState } from 'react';
import Button from '../../components/button';
import Chart from '../../components/chart';
import RangeSelector from '../../components/rangeSelector';
import { IndexDb } from '../../libs/indexDB';
import { ItemData } from '../../types';
import { getDataFromList } from '../../utils';
import classes from './dashboard.module.scss';

export interface IConfig {
    label: string
    id: string
    request: () => void
}
export interface IDashboard {
    label?: string
    config: IConfig[]
    minYear?: number
    maxYear?: number 
}

const Dashboard = ({ label, config, minYear = 1881, maxYear = 2006  }: IDashboard) => {
    const [list, setList] = useState<ItemData[]>([])
    const [currentData, setCurrentData] = useState(config[0])
    const [dateRange, setDateRange] = useState({ 
        start: { value: String(minYear), title: String(minYear)}, 
        end: { value: String(maxYear), title: String(maxYear)} 
    })

    useEffect(() => {
        if (!currentData || !dateRange) return
        async function getData() {
            const db = new IndexDb({
                name: currentData.id,
                storeName: 'meteo',
                keyPath: 'id'
            })
            await db.init()
            const start = new Date(dateRange.start.value).getTime()
            const end = new Date(dateRange.end.value).getTime()
            const result = await db.getRange<ItemData[] | undefined>(start, end)
            // если в бд есть данные рендерим оттуда
            if (result?.length) {
                setList(result)
            // в противном случае делаем запрос рендерим из запрошенных данных, в фоне записываем полученные данны в БД
            } else {
                const res = await currentData.request()
                const sliceData = getDataFromList(res as unknown as ItemData[], dateRange.start.value, dateRange.end.value, 't')
                setList(sliceData)
                db.addSome<ItemData>(res as unknown as ItemData[], (el) => new Date(el.t).getTime())
            }
        }
        getData()
    }, [currentData, dateRange])

    useEffect(() => {
        console.log('RENDER', list)
    }, [list])

    return <div className={classes.Dashboard}>
        {label && <h1>{label}</h1>}
        <div className={classes.contentWrapper}>
            <div className={classes.buttonBlock}>
                {
                    config.map((item) => (
                        <Button 
                            disabled={currentData?.id === item.id} 
                            onClick={() => setCurrentData(item)} 
                            key={item.id}
                        >
                            {item.label}
                        </Button>
                    ))
                }
            </div>
            <div className={classes.content}>
                <div className={classes.selectBlock}>
                    <RangeSelector 
                        start={dateRange.start} 
                        end={dateRange.end}
                        minYear={minYear}
                        maxYear={maxYear}
                        onChange={(e) => setDateRange(e)}
                    />
                </div>
                <Chart />
            </div>
        </div>
    </div>
};

export default Dashboard;
