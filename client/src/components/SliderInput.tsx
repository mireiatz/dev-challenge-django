import { Box, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex, Input } from '@chakra-ui/react'
import { formatCurrency } from '../utils/formatCurrency'

interface SliderInputProps {
    label: string
    value: number
    onChange: (value: number) => void
    min: number
    max: number
    step: number
    unit: string
    unitPosition?: 0 | 1
}

const SliderInput = ({ 
    label, 
    value, 
    onChange, 
    min, 
    max, 
    step, 
    unit,
    unitPosition = 1
}: SliderInputProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value)
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            onChange(newValue)
        }
    }

    const formatValue = (val: number) => {
        if (unit === '£') {
            return formatCurrency(val.toString())
        }
        return unitPosition === 0 ? `${unit}${val}` : `${val}${unit}`
    }

    return (
        <Box width="100%" p={3} bg="white" borderRadius="lg" border="1px solid" borderColor="gray.100" boxShadow="sm">
            <Flex direction="column" gap={2}>
                <Flex justify="space-between" align="center">
                    <Text fontSize="sm" fontWeight="medium" color="gray.600">
                        {label}
                    </Text>
                    <Input
                        value={value}
                        onChange={handleInputChange}
                        size="sm"
                        width="100px"
                        textAlign="right"
                        type="number"
                        min={min}
                        max={max}
                        step={step}
                        borderColor="gray.200"
                        borderRadius="lg"
                        _hover={{ borderColor: 'blue.400' }}
                        _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
                    />
                </Flex>
                <Box px={2}>
                    <Slider
                        aria-label={label}
                        value={value}
                        min={min}
                        max={max}
                        step={step}
                        onChange={onChange}
                        focusThumbOnChange={false}
                    >
                        <SliderTrack bg="gray.100" h={3} borderRadius="full">
                            <SliderFilledTrack bg="blue.400" borderRadius="full" />
                        </SliderTrack>
                        <SliderThumb 
                            boxSize={6}
                            bg="white"
                            border="2px solid"
                            borderColor="blue.400"
                            _hover={{ boxShadow: '0 0 0 4px rgba(66, 153, 225, 0.2)' }}
                            _active={{ boxShadow: '0 0 0 4px rgba(66, 153, 225, 0.2)' }}
                        />
                    </Slider>
                    <Flex justify="space-between" mt={1}>
                        <Text fontSize="xs" color="gray.500">
                            {formatValue(min)}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                            {formatValue(max)}
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default SliderInput 