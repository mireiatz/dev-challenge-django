import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Container, Slider, SliderTrack, SliderFilledTrack, SliderThumb, VStack, Text, Box } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
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
                        
                        <Box width="100%">
                            <Text mb={2}>Initial Amount: ${initialAmount}</Text>
                            <Slider
                                aria-label="initial-amount"
                                value={initialAmount}
                                min={0}
                                max={10000}
                                step={100}
                                onChange={setInitialAmount}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </Box>

                        <Box width="100%">
                            <Text mb={2}>Monthly Deposit: ${monthlyDeposit}</Text>
                            <Slider
                                aria-label="monthly-deposit"
                                value={monthlyDeposit}
                                min={0}
                                max={1000}
                                step={10}
                                onChange={setMonthlyDeposit}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </Box>

                        <Box width="100%">
                            <Text mb={2}>Interest Rate: {interestRate}%</Text>
                            <Slider
                                aria-label="interest-rate"
                                value={interestRate}
                                min={0}
                                max={20}
                                step={0.1}
                                onChange={setInterestRate}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </Box>
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
