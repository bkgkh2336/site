import { Contact_ } from "../Contact/styled";
import Text from "../../../Components/Text/Text"
import Block from "../../../Components/Block/Block";

interface ContactProps {
    src?: string;
    name: string;
    email?: string;
    phone?: string[];
    fax?: string[];
}

const Department = (props: ContactProps) => {

    return (
        <Contact_ style={{ gap: 10, width: 210 }}>
            {props.src &&
                <img
                    style={{ width: "150px", height: "150px", objectFit: 'cover', objectPosition: 'center top' }}
                    src={`departments/${props.src}`}
                />
            }
            <Text style={{ textAlign: 'center' }} bold="bolder">{props.name}</Text>
            {(props.email || props.phone || props.fax) &&
                <Block style={{ flexDirection: 'column', gap: 10, padding: 0 }}>
                    {props.email &&
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <img style={{ width: '1rem', height: '1rem' }} src="mail.png" alt="email" />
                            <Text>{props.email}</Text>
                        </div>
                    }
                    {props.phone && props.phone.map((phone, index) =>
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <img style={{ width: '1rem', height: '1rem' }} src="phone.png" alt="phone" />
                            <Text>{phone}</Text>
                        </div>
                    )}
                    {props.fax && props.fax.map((fax, index) =>
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <img style={{ width: '1rem', height: '1rem' }} src="fax.png" alt="phone" />
                            <Text>{fax} (факс)</Text>
                        </div>
                    )}
                </Block>
            }
        </Contact_ >
    )
}

export default Department
