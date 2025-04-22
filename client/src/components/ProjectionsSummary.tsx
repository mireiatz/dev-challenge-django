import { Text, Flex, Box, Divider } from '@chakra-ui/react'
import { formatCurrency } from '../utils/format'

type Props = {
    savings: string
    earnings: string
    contributions: string
    numberOfYears: number
    initialAmount: number
    monthlyDeposit: number
    interestRate: number
}

const ProjectionsSummary = ({ 
    savings,
    earnings,
    contributions,
    numberOfYears, 
    initialAmount, 
    monthlyDeposit, 
    interestRate 
}: Props) => {
    return (
        <Flex direction="column" mb={4}>
            {/* Main projected value with timeline */}
            <Flex direction="column">
                <Box pl={2} borderLeft="4px solid" borderColor="blue.500">
                    <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                        {formatCurrency(savings)}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        Projected value in {numberOfYears} years
                    </Text>
                </Box>
                {/* Earnings and contributions breakdown */}
                <Flex gap={8} mt={2}>
                    <Box pl={2} borderLeft="4px solid" borderColor="blue.300">
                        <Text fontSize="lg" fontWeight="bold" color="blue.300">
                            {formatCurrency(earnings)}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                            Total earnings
                        </Text>
                    </Box>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold" color="blue.300">
                            {formatCurrency(contributions)}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                            Total contributions
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <Divider my={4} borderColor="gray.200" />
            {/* Input parameters summary */}
            <Flex justify="center" gap={4} fontSize="xs" color="gray.500">
                <Box textAlign="center">
                    <Text fontWeight="medium">Initial Amount</Text>
                    <Text>{formatCurrency(initialAmount.toString())}</Text>
                </Box>
                <Box borderLeft="1px solid" borderColor="gray.200" pl={4} textAlign="center">
                    <Text fontWeight="medium">Monthly Deposit</Text>
                    <Text>{formatCurrency(monthlyDeposit.toString())}</Text>
                </Box>
                <Box borderLeft="1px solid" borderColor="gray.200" pl={4} textAlign="center">
                    <Text fontWeight="medium">Interest Rate</Text>
                    <Text>{interestRate}%</Text>
                </Box>
            </Flex>
        </Flex>
    )
}

export default ProjectionsSummary 