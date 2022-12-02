import Button from '../../components/button';
import Select from '../../components/select';
import classes from './dashboard.module.scss';

export interface IDashboard {
    label?: string
}

const Dashboard = ({ label }: IDashboard) => {
 return <div className={classes.Dashboard}>
    {label && <h1>{label}</h1>}
    <div className={classes.contentWrapper}>
        <div className={classes.buttonBlock}>
            <Button>Температура</Button>
            <Button>Осадки</Button>
        </div>
        <div className={classes.content}>
            <div className={classes.selectBlock}>
                <Select />
                <Select />
            </div>
            <div className={classes.canvasWrapper}>

            </div>
        </div>
    </div>
 </div>
};

export default Dashboard;
