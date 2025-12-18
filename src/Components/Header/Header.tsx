import Block from "../Block/Block"
import Section from "../Section/Section"
import Text from "../Text/Text"
import { Header_ } from "./styled"

interface HeaderProps {
    ref?: React.RefObject<HTMLDivElement | null>
}

const Header = (props: HeaderProps) => {
    return (
        <Header_ ref={props.ref}>
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
                <Section caption="Документы" url='documents' />
                <Section
                    list={[
                        { caption: 'О нас', url: 'about_us' },
                        { caption: 'Контакты', url: 'contacts' },
                        { caption: 'Вакансии', url: 'vacancies' },
                    ]}
                    caption="О нас"
                />
            </Block>
            <Block>
                <img src="phone.png" alt="phone" style={{width: '1rem'}} />
                <Text bold="bold">+375 2336 7-45-07</Text>
            </Block>
        </Header_>
    )
}

export default Header
