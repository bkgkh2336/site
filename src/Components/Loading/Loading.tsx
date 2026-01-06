import { LoadingContainer, LoadingText, DotsContainer, Loading_ } from "./styled"

const Loading = () => {
    return (
        <LoadingContainer>
            <LoadingText>Загрузка</LoadingText>
            <DotsContainer>
                <Loading_ />
                <Loading_ />
                <Loading_ />
                <Loading_ />
            </DotsContainer>
        </LoadingContainer>
    )
}

export default Loading