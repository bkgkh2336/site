import H2 from "../../../Components/H2/H2";
import H3 from "../../../Components/H3/H3";
import Text from "../../../Components/Text/Text";
import { 
    Vacancy_, 
    VacancyContent, 
    VacancyInfo, 
    VacancyHeader, 
    VacancyIcon, 
    LocationWrapper, 
    ArrowIcon 
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
                        <VacancyIcon src="skill.png" alt="job-title" />
                        <H2 style={{ color: 'rgba(19,138,8)' }}>{props.title}</H2>
                        <H3 style={{ fontWeight: '600', color: 'rgb(0,128,0)', backgroundColor: 'rgba(8, 138, 19, 0.2)', padding: "5px 10px", borderRadius: 10 }}>{props.salary}</H3>
                    </VacancyHeader>
                    <LocationWrapper>
                        <VacancyIcon src="gps.png" alt="location" />
                        <Text>{props.address}</Text>
                    </LocationWrapper>
                </VacancyInfo>
                <ArrowIcon src="right.png" alt="right" />
            </VacancyContent>
        </Vacancy_>
    )
}

export default Vacancy
