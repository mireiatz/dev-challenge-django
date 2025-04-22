import { Text, Flex } from '@chakra-ui/react'
import { formatCurrency } from '../utils/formatCurrency'

type Props = {
    finalAmount: string
    numberOfYears: number
}

const ProjectionsSummary = ({ finalAmount, numberOfYears }: Props) => {
    return (
        <Flex direction="column" mb={4} pl={2} borderLeft="4px solid" borderColor="blue.400">
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                {formatCurrency(finalAmount)}
            </Text>
            <Text fontSize="sm" color="gray.600">
                Projected value in {numberOfYears} years
            </Text>
        </Flex>
    )
}

export default ProjectionsSummary 