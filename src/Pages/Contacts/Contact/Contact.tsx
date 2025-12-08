import { Contact_ } from "./styled"
import Text from "../../../Components/Text/Text"
import Block from "../../../Components/Block/Block";
import React from "react";

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

    return (
        <Contact_>
            {props.src &&
                <img
                    style={{ width: "150px", height: "150px", objectFit: 'cover', objectPosition: 'center top', borderRadius: '50%' }}
                    src={props.src}
                />
            }
            {!props.src &&
                <Block
                    ref={ref}
                    style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: !props.name.name ? "#28a7465d" : "#28a745", gap: 0, justifyContent: 'center', padding: 0 }}
                >
                    {props.name.name && props.name.patronymic &&
                        <>
                            <Text style={{ color: 'white', fontSize: parseInt(ref.current?.style.height || "0") * 0.35 }}>{props.name.name[0].toUpperCase()}</Text>
                            <Text style={{ color: 'white', fontSize: parseInt(ref.current?.style.height || "0") * 0.35 }}>{props.name.patronymic[0].toUpperCase()}</Text>
                        </>
                    }
                    {!props.name.name &&
                        <Text style={{ color: 'white', fontSize: parseInt(ref.current?.style.height || "0") * 0.35 }}>...</Text>
                    }
                </Block>
            }
            <Block style={{ flexDirection: 'column', gap: 5, padding: 0 }}>
                <Text bold="bolder">{props.name.surname}</Text>
                <Text bold="bolder">{props.name.name} {props.name.patronymic ? ` ${props.name.patronymic}` : ''}</Text>
                <Text style={{ color: '#4e8c51', textAlign: 'center', marginTop: 5 }}>{props.job_title}</Text>
            </Block>
            {(props.email || props.phone) &&
                <Block style={{ flexDirection: 'column', gap: 10, padding: 0, marginTop: 5 }}>
                    {props.email &&
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <img style={{ width: '1rem', height: '1rem' }} src="mail.png" alt="email" />
                            <Text>{props.email}</Text>
                        </div>
                    }
                    {props.phone && props.phone.map((x, index) =>
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <img style={{ width: '1rem', height: '1rem' }} src="phone.png" alt="phone" />
                            <Text>{x}</Text>
                        </div>
                    )}
                </Block>
            }
        </Contact_ >
    )
}

export default Contact
