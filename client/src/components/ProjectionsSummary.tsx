import { Text, Flex, Box, Divider } from '@chakra-ui/react'
import { formatCurrency } from '../utils/formatCurrency'

type Props = {
    finalAmount: string
    numberOfYears: number
    initialAmount: number
    monthlyDeposit: number
    interestRate: number
}

const ProjectionsSummary = ({ 
    finalAmount, 
    numberOfYears, 
    initialAmount, 
    monthlyDeposit, 
    interestRate 
}: Props) => {
    return (
        <Flex direction="column" mb={4}>
            <Flex pl={2} borderLeft="4px solid" borderColor="blue.400" direction="column">
                <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                    {formatCurrency(finalAmount)}
                </Text>
                <Text fontSize="sm" color="gray.600" mb={2}>
                    Projected value in {numberOfYears} years
                </Text>
            </Flex>
            <Flex pl={2} borderLeft="4px solid" borderColor="blue.300" mt={2} direction="column">
                <Flex gap={4} fontSize="xs" color="gray.500">
                    <Box>
                        <Text fontWeight="medium">Initial Amount</Text>
                        <Text>{formatCurrency(initialAmount.toString())}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight="medium">Monthly Deposit</Text>
                        <Text>{formatCurrency(monthlyDeposit.toString())}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight="medium">Interest Rate</Text>
                        <Text>{interestRate}%</Text>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ProjectionsSummary 