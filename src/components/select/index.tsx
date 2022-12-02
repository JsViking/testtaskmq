import classes from './select.module.scss';

export type SelectOption = {
    value: string
    title: string
}

export interface ISelect {
    options?: SelectOption[]
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value: SelectOption
    name: string
}

const Select = ({ value, options = [], onChange, name }: ISelect) => {

    return (
        <select 
            name={name} 
            className={classes.Select} 
            onChange={onChange}>
            {
                options.map((option) => (
                    <option 
                        selected={value.value === option.value} 
                        value={option.value} 
                        key={option.value}
                    >
                        {option.title}
                    </option>
                ))
            }
        </select>
    )
};

export default Select;
