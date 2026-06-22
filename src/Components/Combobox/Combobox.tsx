import { useState } from "react";
import { Combobox_, Option_, Options_ } from "./styled";
import Text from "../Text/Text";

interface ComboboxProps {
    values: string[];
    onChange?: (value: string) => void;
    defaultValue?: string;
}

const Combobox = (props: ComboboxProps) => {
    const [selectedValue, setSelectedValue] = useState(props.defaultValue);
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Combobox_
            $isOpen={isVisible}
            onClick={() => setIsVisible(!isVisible)}
        >
            <Text>{selectedValue || "Select an option"}</Text>
            {isVisible &&
                <Options_>
                    {props.values.map((value, index) => (
                        <Option_
                            key={index}
                            data-selected={value === selectedValue}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (props.onChange) props.onChange(value);
                                setSelectedValue(value);
                                setIsVisible(false);
                            }}
                        >
                            <Text>
                                {value}
                            </Text>
                        </Option_>
                    ))}
                </Options_>
            }
        </Combobox_>
    )
}

export default Combobox
