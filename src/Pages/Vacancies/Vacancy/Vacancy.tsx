import { Briefcase, MapPin, ChevronRight } from "lucide-react";
import H2 from "../../../Components/H2/H2";
import H3 from "../../../Components/H3/H3";
import Text from "../../../Components/Text/Text";
import { 
    Vacancy_, 
    VacancyContent, 
    VacancyInfo, 
    VacancyHeader, 
    LocationWrapper
} from "./styled";

export interface VacancyProps {
    title: string;
    salary: string;
    address: string;
    link: string;
    index: number;
}

const Vacancy = (props: VacancyProps) => {
    return (
        <Vacancy_ index={props.index} href={'https://gsz.gov.by' + props.link} target="_blank">
            <VacancyContent>
                <VacancyInfo>
                    <VacancyHeader>
                        <Briefcase style={{ width: '1.2rem', height: '1.2rem', color: '#28a745', flexShrink: 0 }} />
                        <H2 style={{ color: 'rgba(19,138,8)' }}>{props.title}</H2>
                        <H3 style={{ fontWeight: '600', color: 'rgb(0,128,0)', backgroundColor: 'rgba(8, 138, 19, 0.2)', padding: "5px 10px", borderRadius: 10 }}>{props.salary}</H3>
                    </VacancyHeader>
                    <LocationWrapper>
                        <MapPin style={{ width: '1.2rem', height: '1.2rem', color: '#28a745', flexShrink: 0 }} />
                        <Text>{props.address}</Text>
                    </LocationWrapper>
                </VacancyInfo>
                <ChevronRight 
                    style={{ 
                        width: '1.6rem', 
                        height: '1.6rem', 
                        color: '#28a745', 
                        opacity: 0.6, 
                        transition: 'all 0.3s ease, transform 0.3s ease', 
                        flexShrink: 0 
                    }} 
                    className="arrow-icon"
                />
            </VacancyContent>
        </Vacancy_>
    )
}

export default Vacancy
