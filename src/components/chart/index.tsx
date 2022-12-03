import classes from './chart.module.scss';
import { useEffect, useRef } from 'react';
import { ItemData } from '../../types';

const WIDTH = 600;
const HEIGHT = 400;
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;
const PADDING = 20;
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2

interface IRender extends IChart {
    canvas: HTMLCanvasElement
}

function render({canvas, data, rows, zeroPoint}: IRender) {
    // Определяем количество строк в сетке
    const ROWS_COUNT = rows.length
    // Определяем размер шага в сетке
    const ROW_STEP = VIEW_HEIGHT / ROWS_COUNT
    // Определяем нулевой ряд
    const ZERO_LINE = ROW_STEP * zeroPoint

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Canvas context did't init");
    
    canvas.style.width = WIDTH + 'px';
    canvas.style.height = HEIGHT + 'px';
    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;

    // Рисуем сетку диаграммы
    ctx.beginPath();
    ctx.strokeStyle = '#808080';
    ctx.font = 'normal 20px sans-serif';
    ctx.fillStyle = 'lightgrey';
    for (let i = 1; i <= ROWS_COUNT; i++) {
        const y = ROW_STEP * i;
        ctx?.fillText(rows[i - 1], 5, DPI_HEIGHT - (y - ROW_STEP + PADDING + 10))
        ctx?.moveTo(0, y + PADDING);
        ctx?.lineTo(DPI_WIDTH, y + PADDING)
    };
    ctx.stroke();
    ctx.closePath();

    // Рисуем диаграмму
    if (!data?.length) return
    const lineStep = DPI_WIDTH / data.length 
    console.log('lineStep', lineStep)
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'green';
    for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const x = i * lineStep
        const y = item.v
        ctx.lineTo(x, DPI_HEIGHT - ZERO_LINE - PADDING - y)
    }
    ctx.stroke();
    ctx.closePath();
}

interface IChart {
    data: ItemData[]
    rows: string[]
    zeroPoint: number
}

const Chart = ({ data, rows, zeroPoint }: IChart) => {
    const chartRef = useRef(null)
    useEffect(() => {
        if (!chartRef?.current) return;
        render({
            canvas: chartRef.current,
            data,
            rows,
            zeroPoint
        });
    }, [data])

    return (
        <div className={classes.Chart}>
            <canvas ref={chartRef} id='chart'></canvas>
        </div>
    );
};

export default Chart;
