import { Contact_ } from "./styled"
import Text from "../../../Components/Text/Text"
import Block from "../../../Components/Block/Block";
import React, { useEffect, useState, memo } from "react";
import { Mail, Phone } from "lucide-react";

interface FIO {
    name: string;
    surname: string;
    patronymic?: string;
}

interface ContactProps {
    src?: string;
    name: FIO;
    job_title: string;
    phone?: string[];
    email?: string;
}

const Contact = (props: ContactProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [fontSize, setFontSize] = useState(52);

    useEffect(() => {
        if (ref.current) {
            const height = ref.current.offsetHeight;
            setFontSize(height * 0.35);
        }
    }, []);

    return (
        <Contact_>
            {props.src &&
                <img
                    style={{ width: "150px", height: "150px", objectFit: 'cover', objectPosition: 'center top', borderRadius: '50%' }}
                    src={props.src}
                    loading="lazy"
                />
            }
            {!props.src &&
                <Block
                    ref={ref}
                    style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: !props.name.name ? "#28a7465d" : "#28a745", gap: 0, justifyContent: 'center', padding: 0 }}
                >
                    {props.name.name && props.name.patronymic &&
                        <>
                            <Text style={{ color: 'white', fontSize }}>{props.name.name[0].toUpperCase()}</Text>
                            <Text style={{ color: 'white', fontSize }}>{props.name.patronymic[0].toUpperCase()}</Text>
                        </>
                    }
                    {!props.name.name &&
                        <Text style={{ color: 'white', fontSize }}>...</Text>
                    }
                </Block>
            }
            <Block style={{ flexDirection: 'column', gap: 5, padding: 0 }}>
                <Text bold="bolder" style={{ textAlign: 'center' }}>{props.name.surname}</Text>
                <Text bold="bolder" style={{ textAlign: 'center' }}>{props.name.name} {props.name.patronymic ? ` ${props.name.patronymic}` : ''}</Text>
                <Text style={{ color: '#4e8c51', textAlign: 'center', marginTop: 5 }}>{props.job_title}</Text>
            </Block>
            {(props.email || props.phone) &&
                <Block style={{ flexDirection: 'column', gap: 10, padding: 0, marginTop: 5 }}>
                    {props.email &&
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Mail style={{ width: '1rem', height: '1rem', color: '#28a745' }} />
                            <Text>{props.email}</Text>
                        </div>
                    }
                    {props.phone && props.phone.map((x, index) =>
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Phone style={{ width: '1rem', height: '1rem', color: '#28a745' }} />
                            <Text>{x}</Text>
                        </div>
                    )}
                </Block>
            }
        </Contact_ >
    )
}

export default memo(Contact)
