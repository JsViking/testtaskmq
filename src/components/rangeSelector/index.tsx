import { useMemo } from 'react';
import Select, { SelectOption } from '../select';

export interface IRangeSelector {
    start: SelectOption
    end: SelectOption
}

interface Props extends IRangeSelector {
    minYear: number
    maxYear: number
    onChange: (e: IRangeSelector) => void
}

const RangeSelector = ({ start, end, minYear, maxYear, onChange }: Props) => {
    const options = useMemo(() => {
        const diff = maxYear - minYear + 1
        return new Array(diff).fill(null).map((_, i) => {
            const year = minYear + i
            return {
                title: String(year),
                value: String(year)
            }
        })
    }, [minYear, maxYear])

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!onChange) return
        const { name, value } =  e.target
        const obj = {
            [name]: options.find((option) => value === option.value)
        }

        onChange({ start, end, ...obj })
    }

    return (
        <>
            <Select 
                options={options} 
                value={start} 
                onChange={handleSelect}
                name="start"
            />
            <Select 
                options={options} 
                value={end} 
                onChange={handleSelect}
                name="end"
            />
        </>
    );
};

export default RangeSelector;
