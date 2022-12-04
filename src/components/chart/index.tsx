import classes from './chart.module.scss';
import { useEffect, useRef } from 'react';
import { ItemData } from '../../types';
import { computeBoundaries } from '../../utils';

const WIDTH = 600;
const HEIGHT = 400;
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;
const PADDING = 40;
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2

interface IRender extends IChart {
    canvas: HTMLCanvasElement
}

function render({canvas, data, rowsCount = 6}: IRender) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Canvas context didn't init");
    canvas.style.width = WIDTH + 'px';
    canvas.style.height = HEIGHT + 'px';
    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;

    // Определяем количество строк в сетке


    // Установка пороговых значений для полученных данных по координате y
    const [yMin, yMax] = computeBoundaries(data, 'v');
    const yRatio = VIEW_HEIGHT / (yMax - yMin)

    // Определяем размер шага в сетке
    const rowStep = VIEW_HEIGHT / rowsCount
    // Определяем шаг для текста относительно медианы минимума и максимума
    const textStep = (yMax - yMin) / rowsCount

    // Рисуем сетку диаграммы
    ctx.beginPath();
    ctx.strokeStyle = '#808080';
    ctx.font = 'normal 20px sans-serif';
    ctx.fillStyle = 'lightgrey';
    for (let i = 1; i <= rowsCount; i++) {
        const y = rowStep * i;
        const text = Math.round(yMax - textStep * i)
        ctx?.fillText(String(text), 5, y + PADDING - 10)
        ctx?.moveTo(0, y + PADDING);
        ctx?.lineTo(DPI_WIDTH, y + PADDING)
    };
    ctx.stroke();
    ctx.closePath();

    // Рисуем диаграмму
    if (!data?.length) return
    const lineStep = DPI_WIDTH / data.length 
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'green';
    for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const x = i * lineStep
        const y = item.v
        ctx.lineTo(x, DPI_HEIGHT - PADDING - y * yRatio)
    }
    ctx.stroke();
    ctx.closePath();
}

interface IChart {
    data: ItemData[]
    rowsCount?: number
}

const Chart = ({ data, rowsCount }: IChart) => {
    const chartRef = useRef(null)
    useEffect(() => {
        if (!chartRef?.current) return;
        render({
            canvas: chartRef.current,
            data,
            rowsCount,
        });
    }, [data])

    return (
        <div className={classes.Chart}>
            <canvas ref={chartRef} id='chart'></canvas>
        </div>
    );
};

export default Chart;
