import { useEffect, useState } from 'react';
import Button from '../../components/button';
import RangeSelector from '../../components/rangeSelector';
import { ItemData } from '../../types';
import classes from './dashboard.module.scss';

export interface IIitems {
    label: string
    id: string
    list: ItemData[]
}
export interface IDashboard {
    label?: string
    data: IIitems[]
    minYear?: number
    maxYear?: number 
}

const Dashboard = ({ label, data, minYear = 1981, maxYear = 2006  }: IDashboard) => {
    const [currentId, setCurrentId] = useState(data[0]?.id)
    const [dateRange, setDateRange] = useState({ 
        start: { value: String(minYear), title: String(minYear)}, 
        end: { value: String(maxYear), title: String(maxYear)} 
    })

    useEffect(() => {
        console.log('CHANGE')
    }, [currentId, dateRange])

    return <div className={classes.Dashboard}>
        {label && <h1>{label}</h1>}
        <div className={classes.contentWrapper}>
            <div className={classes.buttonBlock}>
                {
                    data.map(({ label, id }) => (
                        <Button disabled={currentId === id} onClick={() => setCurrentId(id)} key={id}>{label}</Button>
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
