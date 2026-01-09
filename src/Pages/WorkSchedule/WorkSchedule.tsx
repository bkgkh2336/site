import { MapPin, Clock, Calendar, Building2, FileText, Fuel } from "lucide-react"
import H1 from "../../Components/H1/H1"
import Text from "../../Components/Text/Text"
import { WorkSchedule_, LocationCard, IconWrapper } from "./styled"

const WorkSchedule = () => {
    const locations = [
        {
            title: "Администрация предприятия",
            address: "г. Буда-Кошелево, ул. Озерная, 3а",
            schedule: "пн. - пт. с 8:00 до 17:00",
            lunch: "обед с 13:00 до 14:00",
            weekend: "Выходной: суббота, воскресенье",
            mapIframe: "https://yandex.by/map-widget/v1/?ll=30.564938%2C52.726729&z=17&l=map&pt=30.564938,52.726729,pm2rdm",
            hasReceptionLink: true,
            icon: Building2
        },
        {
            title: "Паспортный стол и Абонентский отдел",
            address: "г. Буда-Кошелево, ул. 50 лет Октября, 3",
            schedule: "пн. - пт. с 8:00 до 17:00",
            lunch: "обед с 13:00 до 14:00",
            weekend: "Выходной: суббота, воскресенье",
            mapIframe: "https://yandex.by/map-widget/v1/?ll=30.570897%2C52.717861&z=17&l=map&pt=30.570897,52.717861,pm2rdm",
            icon: FileText
        },
        {
            title: "Участок реализации топлива",
            address: "г. Буда-Кошелево, ул. Прищепы, 40",
            schedule: "пн. - пт. с 8:00 до 17:00",
            lunch: "обед с 13:00 до 14:00",
            weekend: "Выходной: суббота, воскресенье",
            mapIframe: "https://yandex.by/map-widget/v1/?ll=30.584660%2C52.708282&z=17&l=map&pt=30.584660,52.708282,pm2rdm",
            icon: Fuel
        }
    ]

    return (
        <WorkSchedule_>
            <div className="header-section">
                <H1>Режим работы</H1>
                <Text style={{ fontSize: '1.1rem', textAlign: 'center', color: '#666', maxWidth: '700px' }}>
                    Информация о режиме работы подразделений предприятия
                </Text>
            </div>

            <div className="cards-container">
                {locations.map((location, index) => {
                    const LocationIcon = location.icon
                    return (
                        <LocationCard key={index}>
                            <div className="card-header">
                                <IconWrapper color="#28a745">
                                    <LocationIcon size={24} />
                                </IconWrapper>
                                <h3>{location.title}</h3>
                            </div>

                        <div className="card-content">
                            {location.hasReceptionLink && (
                                <div className="reception-link">
                                    <a href="/schedule_forms">
                                        <span style={{ color: '#28a745', fontSize: '1.05rem' }}>
                                            График приема граждан
                                        </span>
                                    </a>
                                </div>
                            )}

                            <div className="info-row">
                                <IconWrapper color="#28a745" size="small">
                                    <MapPin size={18} />
                                </IconWrapper>
                                <div className="info-content">
                                    <span className="label">Адрес:</span>
                                    <span className="value">{location.address}</span>
                                </div>
                            </div>

                            <div className="info-row">
                                <IconWrapper color="#28a745" size="small">
                                    <Clock size={18} />
                                </IconWrapper>
                                <div className="info-content">
                                    <span className="label">Режим работы:</span>
                                    <span className="value">{location.schedule}</span>
                                </div>
                            </div>

                            {location.lunch && (
                                <div className="info-row lunch-row">
                                    <div className="info-content" style={{ marginLeft: '46px' }}>
                                        <span className="value">{location.lunch}</span>
                                    </div>
                                </div>
                            )}

                            <div className="info-row">
                                <IconWrapper color="#28a745" size="small">
                                    <Calendar size={18} />
                                </IconWrapper>
                                <div className="info-content">
                                    <span className="value">{location.weekend}</span>
                                </div>
                            </div>

                            <div className="map-container">
                                <iframe 
                                    src={location.mapIframe}
                                    width="100%" 
                                    height="300"
                                    frameBorder="0"
                                    allowFullScreen
                                    style={{ borderRadius: '8px' }}
                                />
                            </div>
                            </div>
                        </LocationCard>
                    )
                })}
            </div>
        </WorkSchedule_>
    )
}

export default WorkSchedule