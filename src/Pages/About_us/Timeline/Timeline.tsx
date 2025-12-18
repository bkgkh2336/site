import { DescriptionEvent_, Dot_, Line_, Timeline_ } from "./styled";
import Text from "../../../Components/Text/Text";

interface TimeEvent {
    year: number;
    title: string;
    description: string;
}

interface TimeLineProps {
    events: TimeEvent[];
}

const TimeLine = (props: TimeLineProps) => {
    return (
        <Timeline_>
            {props.events.map((event: TimeEvent, index: number) => (
                <div key={index} style={{height: 'fit-content', position: 'relative', width: '80%'}}>
                    <Dot_>
                        <Text bold="bolder">{event.year}</Text>
                    </Dot_>
                    <Line_ />
                    <DescriptionEvent_ style={index % 2 == 0 ? {left: 0} : {right: 0}}>
                        <Text bold="bolder" style={{...(index % 2 == 0 ? {textAlign: 'right'} : {textAlign: 'left'}), color: 'rgb(0,128,0)'}}>{event.title}</Text>
                        <Text style={{...(index % 2 == 0 ? {textAlign: 'right'} : {textAlign: 'left'}), color: 'rgb(0,0,0,0.75)'}}>{event.description}</Text>
                    </DescriptionEvent_>
                </div>
            ))}
        </Timeline_>
    );
};

export default TimeLine
