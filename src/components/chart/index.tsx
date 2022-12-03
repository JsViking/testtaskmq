import classes from './chart.module.scss';
import { useEffect, useRef } from 'react';

const WIDTH = 600;
const HEIGHT = 200;
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;
const ROWS_COUNT = 5

function render(canvas: HTMLCanvasElement, data: any) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Canvas context did't init");
    
    canvas.style.width = WIDTH + 'px';
    canvas.style.height = HEIGHT + 'px';
    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;

    const step = DPI_HEIGHT / ROWS_COUNT

    // Рисуем сетку диаграммы
    ctx.beginPath();
    ctx.strokeStyle = '#808080';
    for (let i = 1; i <= ROWS_COUNT; i++) {
        const y = step * i;
        ctx?.moveTo(0, y);
        ctx?.lineTo(DPI_WIDTH, y)
    };
    ctx.stroke();
    ctx.closePath();
}

const Chart = () => {
    const chartRef = useRef(null)
    useEffect(() => {
        if (!chartRef?.current) return;
        render(chartRef.current, null);
    }, [])

    return (
        <div className={classes.Chart}>
            <canvas ref={chartRef} id='chart'></canvas>
        </div>
    );
};

export default Chart;
