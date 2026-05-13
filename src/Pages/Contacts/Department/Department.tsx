import { Contact_ } from "../Contact/styled";
import Text from "../../../Components/Text/Text"
import Block from "../../../Components/Block/Block";
import { Mail, Phone, Printer } from "lucide-react";

interface ContactProps {
    src?: string;
    name: string;
    email?: string;
    phone?: string[];
    fax?: string[];
}

const Department = (props: ContactProps) => {

    return (
        <Contact_ style={{ gap: 10 }}>
            {props.src &&
                <img
                    style={{ 
                        width: "150px", 
                        height: "150px", 
                        maxWidth: "100%",
                        objectFit: 'cover', 
                        objectPosition: 'center top' 
                    }}
                    src={`departments/${props.src}`}
                    alt={props.name}
                />
            }
            <Text style={{ textAlign: 'center' }} bold="bolder">{props.name}</Text>
            {(props.email || props.phone || props.fax) &&
                <Block style={{ flexDirection: 'column', gap: 10, padding: 0 }}>
                    {props.email &&
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Mail style={{ width: '1rem', height: '1rem', color: '#28a745' }} />
                            <Text>{props.email}</Text>
                        </div>
                    }
                    {props.phone && props.phone.map((phone, index) =>
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Phone style={{ width: '1rem', height: '1rem', color: '#28a745' }} />
                            <Text><a href={`tel:${phone.replace(/[^+\d]/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>{phone}</a></Text>
                        </div>
                    )}
                    {props.fax && props.fax.map((fax, index) =>
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Printer style={{ width: '1rem', height: '1rem', color: '#28a745' }} />
                            <Text><a href={`tel:${fax.replace(/[^+\d]/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>{fax}</a> (факс)</Text>
                        </div>
                    )}
                </Block>
            }
        </Contact_ >
    )
}

export default Department
