import { Task_, CheckIcon } from "./styled"
import Text from "../../../Components/Text/Text"

interface TaskProps {
    name: string;
    style?: React.CSSProperties
}

const Task = (props: TaskProps) => {
    return (
        <Task_ style={props.style}>
            <CheckIcon />
            <Text>{props.name}</Text>
        </Task_>
    )
}

export default Task
