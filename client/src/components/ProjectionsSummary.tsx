import { Text, Flex, Box } from '@chakra-ui/react'
import { formatCurrency } from '../utils/format'

type Props = {
    savings: string
    earnings: string
    contributions: string
    numberOfYears: number
}

const ProjectionsSummary = ({ savings, earnings, contributions, numberOfYears }: Props) => {
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
        </Flex>
    )
}

export default ProjectionsSummary
