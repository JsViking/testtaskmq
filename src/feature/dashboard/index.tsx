import { useEffect, useState } from 'react';
import Button from '../../components/button';
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
                name: 'meteo',
                storeName: currentData.id,
                keyPath: 'id'
            })
            const start = new Date(dateRange.start.value).getTime()
            const end = new Date(dateRange.end.value).getTime()
            const result = db.getRange(start, end) as unknown as ItemData[] | undefined
            if (result) {
                setList(result)
            } else {
                const res = await currentData.request()
                const sliceData = getDataFromList(res as unknown as ItemData[], dateRange.start.value, dateRange.end.value, 't')
                setList(sliceData)

            }
        }
        getData()
    }, [currentData, dateRange])

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
                <div className={classes.canvasWrapper}>

                </div>
            </div>
        </div>
    </div>
};

export default Dashboard;
