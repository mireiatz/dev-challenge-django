import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Container, VStack, Box } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import SliderInput from './components/SliderInput'
import ProjectionsSummary from './components/ProjectionsSummary'
import theme from './theme'
import { debounce } from 'lodash'
import { getFutureDate } from './utils/date'

const defaultTheme = extendTheme(theme)

function App() {
    // State for user inputs and chart data
    const [initialAmount, setInitialAmount] = useState(1000)
    const [monthlyDeposit, setMonthlyDeposit] = useState(100) 
    const [interestRate, setInterestRate] = useState(5) 
    const [chartData, setChartData] = useState({
        xAxis: [] as string[],
        yAxis: [] as string[],
        summary: {
            savings: '0',
            earnings: '0',
            contributions: '0'
        }
    })

    // Fetch projections
    const fetchProjections = useCallback(
        // Debounce for performance
        debounce(async (amount: number, deposit: number, rate: number) => {
            try {
                const response = await fetch('http://localhost:8000/interest-data/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        initial_amount: amount,
                        monthly_deposit: deposit,
                        interest_rate: rate,
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
                }

                const data = await response.json();

                const projectionsLength = data.projections.length;
                const amountOfYears = projectionsLength / 12;

                // Create labels for the x-axis - show Today and end date
                const monthLabels = Array.from({ length: projectionsLength }, (_, i) => {
                    if (i === 0) return 'Today';
                    if (i === projectionsLength - 1) return getFutureDate(amountOfYears);
                    return '';
                });

                // Update chart data with all monthly projections
                setChartData({
                    xAxis: monthLabels,
                    yAxis: data.projections.map((item: any) => item.value.toString()),
                    summary: {
                        savings: data.summary.savings.toString(),
                        earnings: data.summary.earnings.toString(),
                        contributions: data.summary.contributions.toString()
                    }
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }, 300),
        []
    );

    // Fetch new projections whenever any input value changes
    useEffect(() => {
        fetchProjections(initialAmount, monthlyDeposit, interestRate);
    }, [initialAmount, monthlyDeposit, interestRate, fetchProjections]);

    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <Container pt={6} pb={12}>
                    <VStack spacing={8} mb={6}>
                        <SliderInput
                            label="Initial Amount"
                            value={initialAmount}
                            onChange={setInitialAmount}
                            min={0}
                            max={10000}
                            step={100}
                            unit="£"
                            unitPosition={0}
                        />

                        <SliderInput
                            label="Monthly Deposit"
                            value={monthlyDeposit}
                            onChange={setMonthlyDeposit}
                            min={0}
                            max={5000}
                            step={100}
                            unit="£"
                            unitPosition={0}
                        />

                        <SliderInput
                            label="Interest Rate"
                            value={interestRate}
                            onChange={setInterestRate}
                            min={0}
                            max={20}
                            step={0.1}
                            unit="%"
                            unitPosition={1}
                        />
                    </VStack>
                    <Box p={4} bg="white" borderRadius="lg" border="1px solid" borderColor="gray.100" boxShadow="sm" mb={6}>
                        <ProjectionsSummary 
                            savings={chartData.summary.savings}
                            earnings={chartData.summary.earnings}
                            contributions={chartData.summary.contributions}
                            numberOfYears={chartData.yAxis.length / 12}
                            initialAmount={initialAmount}
                            monthlyDeposit={monthlyDeposit}
                            interestRate={interestRate}
                        />
                        <LineChart
                            xAxisData={chartData.xAxis}
                            yAxisData={chartData.yAxis}
                        />
                    </Box>
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
