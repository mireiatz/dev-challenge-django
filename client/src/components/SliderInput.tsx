import { Box, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'

interface SliderInputProps {
    label: string
    value: number
    onChange: (value: number) => void
    min: number
    max: number
    step: number
    unit?: string
}

const SliderInput = ({ 
    label, 
    value, 
    onChange, 
    min, 
    max, 
    step, 
    unit = '' 
}: SliderInputProps) => {
    return (
        <Box width="100%">
            <Text mb={2}>
                {label}: {unit}{value}
            </Text>
            <Slider
                aria-label={label}
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={onChange}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </Box>
    )
}

export default SliderInput 