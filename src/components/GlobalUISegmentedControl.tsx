import React from "react";


type SegmentedOption = { label: string, value: string };

type SegmentedControlProps = {
    options: SegmentedOption[],
    value: string,
    onChange: (value: string) => void
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({options, value, onChange}) => {
    return(
        <div className="segmented">
            {options.map((o) => (
                <button
                    key={o.value}
                    className={value === o.value ? "active" : ""}
                    onClick={() => onChange(o.value)}
                >
                    {o.label}
                </button>
            ))}
        </div>
    )
};

export default SegmentedControl;