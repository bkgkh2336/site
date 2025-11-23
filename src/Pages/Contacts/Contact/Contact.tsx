import { Contact_ } from "./styled"
import Text from "../../../Components/Text/Text"
import Block from "../../../Components/Block/Block";

interface FIO {
    name: string;
    surname: string;
    patronymic?: string;
}

interface ContactProps {
    src?: string;
    name: FIO;
    job_title: string;
    phone?: string;
    email?: string;
}

const Contact = (props: ContactProps) => {
    return (
        <Contact_>
            <img
                style={{ width: "200px", height: "200px", objectFit: 'cover', objectPosition: 'center top', borderRadius: '50%' }}
                src={props.src || 'user.png'}
            />
            <Block style={{ flexDirection: 'column', gap: 0, padding: 0 }}>
                <Text bold="bolder">{props.name.surname}</Text>
                <Text bold="bolder">{props.name.name} {props.name.patronymic ? ` ${props.name.patronymic}` : ''}</Text>
                <Text style={{ color: '#206b24', textAlign: 'center' }}>{props.job_title}</Text>
            </Block>
            <Block style={{ flexDirection: 'column', gap: 0, padding: 0 }}>
                {props.email && <Text>Почта: {props.email}</Text>}
                {props.phone && <Text>Телефон: {props.phone}</Text>}
            </Block>
        </Contact_>
    )
}

export default Contact
