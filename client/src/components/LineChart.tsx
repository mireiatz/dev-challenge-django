import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Box } from '@chakra-ui/react'
import { formatCurrency } from '../utils/format'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type Props = {
    xAxisData: string[]
    yAxisData: string[]
    title?: string
    xLabel?: string
    yLabel?: string
}

// Chart styling configuration
const createChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: (context: any) => formatCurrency(context.raw),
            },
        },
    },
    scales: {
        y: {
            grid: {
                color: 'rgba(0, 0, 0, 0.05)',
                drawBorder: false,
            },
            ticks: {
                callback: (value: any) => {
                    if (value === 0) return ''
                    return formatCurrency(value)
                },
                font: {
                    size: 11,
                },
            },
            padding: {
                top: 20,
                bottom: 20,
            },
        },
        x: {
            grid: {
                display: false,
            },
            ticks: {
                maxRotation: 0,
                font: {
                    size: 11,
                },
                padding: 10,
                autoSkip: false,
            },
            offset: true,
        },
    },
    layout: {
        padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
        },
    },
})

const LineChart = ({ xAxisData, yAxisData }: Props) => {
    const options = createChartOptions()

    return (
        <Box height="400px">
            <Line
                data={{
                    labels: xAxisData,
                    datasets: [
                        {
                            data: yAxisData,
                            borderColor: '#3182CE',
                            backgroundColor: 'rgba(66, 153, 225, 0.1)',
                            borderWidth: 2,
                            tension: 0.4,
                            pointRadius: 0,
                            pointHoverRadius: 4,
                        },
                    ],
                }}
                options={options}
            />
        </Box>
    )
}

export default LineChart
