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
            onChange={onChange}
            value={value.value}
        >
            {
                options.map((option) => (
                    <option 
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
