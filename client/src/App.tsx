import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Container, VStack } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import SliderInput from './components/SliderInput'
import theme from './theme'
import { debounce } from 'lodash'

const defaultTheme = extendTheme(theme)

function App() {
    // State for user inputs and chart data
    const [initialAmount, setInitialAmount] = useState(1000)
    const [monthlyDeposit, setMonthlyDeposit] = useState(100) 
    const [interestRate, setInterestRate] = useState(5) 
    const [chartData, setChartData] = useState({
        xAxis: [] as string[],
        yAxis: [] as string[],
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
                
                // Create labels for the x-axis (year markers every 12 months)
                const monthLabels = Array.from({ length: 600 }, (_, i) => {
                    const month = i + 1;
                    return month % 12 === 0 ? `Year ${month / 12}` : ' ';
                })
                
                // Update chart data with all monthly projections
                setChartData({
                    xAxis: monthLabels,
                    yAxis: data.projections.map((item: any) => item.value.toString()),
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
                <Container pt={6}>
                    <VStack spacing={8} mb={6}>
                        <SliderInput
                            label="Initial Amount"
                            value={initialAmount}
                            onChange={setInitialAmount}
                            min={0}
                            max={10000}
                            step={100}
                            unit="$"
                        />

                        <SliderInput
                            label="Monthly Deposit"
                            value={monthlyDeposit}
                            onChange={setMonthlyDeposit}
                            min={0}
                            max={1000}
                            step={10}
                            unit="$"
                        />

                        <SliderInput
                            label="Interest Rate"
                            value={interestRate}
                            onChange={setInterestRate}
                            min={0}
                            max={20}
                            step={0.1}
                            unit="%"
                        />
                    </VStack>

                    <LineChart
                        title="Savings Over time"
                        xAxisData={chartData.xAxis}
                        yAxisData={chartData.yAxis}
                        xLabel="Years"
                        yLabel="Amount"
                    />
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
