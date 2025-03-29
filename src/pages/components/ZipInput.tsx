import { Autocomplete, Chip, TextField } from "@mui/material";

export default function ZipInput({ setZipCodes }: { setZipCodes: (zips: string[]) => void }) {
    return (
        <Autocomplete
            className="zip-input"
            options={[]}
            freeSolo
            multiple
            renderTags={(value, props) =>
                <div id="chip-container">
                    {value.slice(0).reverse().map((option, index) => (
                        <Chip label={option} {...props({ index: value.length - index - 1 })} />
                    ))}
                </div>
            }
            renderInput={(params) => <TextField label="Zip Codes" {...params} />}
            onChange={(_, newValue) => {
                setZipCodes(newValue)
            }}
        />

    );
};