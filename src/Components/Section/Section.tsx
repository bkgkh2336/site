import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../Text/Text";
import Section_tooltip from "../Section_tooltip/Section_tooltip";
import Button from "../Button/Button";

interface SectionProps {
    src?: string,
    caption: string;
    list?: ListProps[];
    url?: string;
}

interface ListProps {
    caption: string;
    url: string;
}

const Section = (props: SectionProps) => {
    const [isVisibleCard, setIsVisibleCard] = useState(false);
    const [isHidingCard, setIsHidingCard] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isHidingCard) {
            setTimeout(() => {
                setIsVisibleCard(false);
                setIsHidingCard(false);
            }, 300);
        }
    }, [isHidingCard]);

    return (
        <div
            onClick={() => props.url && navigate(props.url)}
            onMouseEnter={() => setIsVisibleCard(true)}
            onMouseLeave={() => setIsHidingCard(true)}
        >
            <Button style={{ boxShadow: 'none' }}>
                {props.src &&
                    <img
                        style={{ height: 30 }}
                        src={props.src}
                        alt={props.caption}
                    />}
                <Text>{props.caption}</Text>
            </Button>
            {isVisibleCard && props.list && props.list.length > 0 &&
                <Section_tooltip isHidingCard={isHidingCard}>
                    {props.list.map((item) => (
                        <Button
                            key={item.caption}
                            style={{ width: "100%" }}
                            onClick={() => navigate(item.url)}
                        >
                            <Text
                                style=
                                {{
                                    textAlign: 'left',
                                    width: '100%',
                                    display: 'block'
                                }}
                            >
                                {item.caption}
                            </Text>
                        </Button>
                    ))}
                </Section_tooltip>
            }
        </div>
    )
}

export default Section;
