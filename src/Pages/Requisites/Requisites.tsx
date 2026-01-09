import { Building2, MapPin, Phone, CreditCard, User, FileText, Copy, Check } from "lucide-react"
import { useState } from "react"
import H1 from "../../Components/H1/H1"
import Text from "../../Components/Text/Text"
import { Requisites_, InfoCard, IconWrapper, DetailRow, CopyButton } from "./styled"

const Requisites = () => {
    const [copiedField, setCopiedField] = useState<string | null>(null)

    const copyToClipboard = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedField(fieldName)
            setTimeout(() => setCopiedField(null), 2000)
        })
    }

    return (
        <Requisites_>
            <div className="header-section">
                <H1>Реквизиты предприятия</H1>
                <Text style={{ fontSize: '1.1rem', textAlign: 'center', color: '#666', maxWidth: '600px' }}>
                    Официальная информация и банковские реквизиты
                </Text>
            </div>
            
            <div className="cards-container">
                <InfoCard>
                    <div className="card-header">
                        <IconWrapper color="#28a745">
                            <Building2 size={24} />
                        </IconWrapper>
                        <h3>Полное наименование</h3>
                    </div>
                    <div className="card-content">
                        <Text style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Коммунальное жилищное унитарное предприятие<br />
                            "Буда-Кошелёвский коммунальник"
                        </Text>
                    </div>
                </InfoCard>

                <InfoCard>
                    <div className="card-header">
                        <IconWrapper color="#28a745">
                            <MapPin size={24} />
                        </IconWrapper>
                        <h3>Юридический адрес</h3>
                    </div>
                    <div className="card-content">
                        <Text style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                            247355, Республика Беларусь<br />
                            Гомельская область<br />
                            г. Буда-Кошелёво, ул. Озёрная, 3а
                        </Text>
                    </div>
                </InfoCard>

                <InfoCard>
                    <div className="card-header">
                        <IconWrapper color="#28a745">
                            <Phone size={24} />
                        </IconWrapper>
                        <h3>Контактная информация</h3>
                    </div>
                    <div className="card-content">
                        <DetailRow>
                            <span className="label">Телефон/Факс:</span>
                            <div className="value">
                                <a href="tel:+375233674503">+375 (2336) 7-45-03</a>
                                <span className="separator">•</span>
                                <a href="tel:+375233674507">+375 (2336) 7-45-07</a>
                            </div>
                        </DetailRow>
                    </div>
                </InfoCard>

                <InfoCard className="wide-card">
                    <div className="card-header">
                        <IconWrapper color="#28a745">
                            <CreditCard size={24} />
                        </IconWrapper>
                        <h3>Банковские реквизиты</h3>
                    </div>
                    <div className="card-content">
                        <div className="bank-grid">
                            <DetailRow>
                                <span className="label">УНП:</span>
                                <div className="value-with-copy">
                                    <span className="value">400041543</span>
                                    <CopyButton
                                        onClick={() => copyToClipboard('400041543', 'unp')}
                                        title="Копировать"
                                    >
                                        {copiedField === 'unp' ? <Check size={16} /> : <Copy size={16} />}
                                    </CopyButton>
                                </div>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">ОКПО:</span>
                                <div className="value-with-copy">
                                    <span className="value">033696453000</span>
                                    <CopyButton
                                        onClick={() => copyToClipboard('033696453000', 'okpo')}
                                        title="Копировать"
                                    >
                                        {copiedField === 'okpo' ? <Check size={16} /> : <Copy size={16} />}
                                    </CopyButton>
                                </div>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">Расчётный счёт:</span>
                                <div className="value-with-copy">
                                    <span className="value">BY69BLBB30120400041543001001</span>
                                    <CopyButton
                                        onClick={() => copyToClipboard('BY69BLBB30120400041543001001', 'account')}
                                        title="Копировать"
                                    >
                                        {copiedField === 'account' ? <Check size={16} /> : <Copy size={16} />}
                                    </CopyButton>
                                </div>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">Банк:</span>
                                <span className="value">
                                    Дирекция ОАО «Белинвестбанк» по Гомельской области<br />
                                    г. Гомель, ул. Советская, 7
                                </span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">МФО:</span>
                                <div className="value-with-copy">
                                    <span className="value">BLBBBY2X</span>
                                    <CopyButton
                                        onClick={() => copyToClipboard('BLBBBY2X', 'mfo')}
                                        title="Копировать"
                                    >
                                        {copiedField === 'mfo' ? <Check size={16} /> : <Copy size={16} />}
                                    </CopyButton>
                                </div>
                            </DetailRow>
                        </div>
                    </div>
                </InfoCard>

                <InfoCard>
                    <div className="card-header">
                        <IconWrapper color="#28a745">
                            <User size={24} />
                        </IconWrapper>
                        <h3>Руководство</h3>
                    </div>
                    <div className="card-content">
                        <DetailRow>
                            <span className="label">Директор:</span>
                            <span className="value">Новик Евгений Витальевич</span>
                        </DetailRow>
                        <DetailRow>
                            <IconWrapper color="#28a745" size="small">
                                <FileText size={18} />
                            </IconWrapper>
                            <span className="value" style={{ fontStyle: 'italic', color: '#666' }}>
                                Действует на основании Устава
                            </span>
                        </DetailRow>
                    </div>
                </InfoCard>
            </div>
        </Requisites_>
    )
}

export default Requisites