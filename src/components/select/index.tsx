import classes from './select.module.scss';

type Option = {
    value: string
    title: string
}

interface ISelect {
    options?: Option[]
    onChange?: () => void
}

const Select = ({ options = [], onChange }: ISelect) => {
    return (
        <select name="select" className={classes.Select} onChange={onChange}>
            {
                options.map(({ value, title }) => (
                    <option value={value} key={value}>{title}</option>
                ))
            }
        </select>
    )
};

export default Select;
