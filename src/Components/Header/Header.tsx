import Block from "../Block/Block"
import Section from "../Section/Section"
import Text from "../Text/Text"
import { Header_ } from "./styled"

const Header = () => {
    return (
        <Header_>
            <Block>
                <img
                    style={{ height: 55 }}
                    src="logo.png"
                    alt="logo"
                />
                <Text bold="bolder">Буда-Кошелёвский <br /> коммунальник</Text>
            </Block>
            <Block style={{ gap: 10, padding: 0 }}>
                <Section list={[]} caption="Главная" url=" " />
                <Section
                    list={[
                        { caption: 'График вывоза отходов (сектор индивидуальной жилой застройки)', url: '' },
                        { caption: 'Санитарное содержание вспомогательных помещений жилых домов', url: '' },
                        { caption: 'Содержание и текущий ремонт объектов внешнего благоустройтва', url: '' },
                        { caption: 'Теплоснабжение', url: '' },
                        { caption: 'Эксплуатация жилищного фонда', url: '' },
                    ]}
                    caption="Услуги и тарифы"
                />
                <Section caption="Для граждан" />
                <Section caption="Пресс-центр" />
                <Section
                    list={[
                        { caption: 'О нас', url: '' },
                        { caption: 'Контакты', url: 'contacts' },
                        { caption: 'Вакансии', url: '' },
                    ]}
                    caption="О нас"
                />
            </Block>
            <Text bold="bold">8 (02336) 7-45-07</Text>
        </Header_>
    )
}

export default Header
