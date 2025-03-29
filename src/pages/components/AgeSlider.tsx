import { InputLabel, Slider } from "@mui/material";

interface AgeSliderProps {
    ageRange: number[];
    setAgeRange: (ageRange: number[]) => void;
};

export default function AgeSlider({ageRange, setAgeRange}: AgeSliderProps) {
    const handleAgeChange = (_: Event, newValue: number | number[]) => {
        setAgeRange(newValue as number[]);
    };

    return (
        <>
            <InputLabel>Age Range</InputLabel>
            <Slider
                sx={{ width: "90%", '& .MuiSlider-valueLabel': { backgroundColor: "unset", top: "2em", fontSize: "0.7em" } }}
                value={ageRange}
                onChange={handleAgeChange}
                valueLabelDisplay="on"
                max={15}
            />
        </>
    );
};