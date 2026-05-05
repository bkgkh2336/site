import{j as e}from"./react-vendor-mP65msGK.js";import{H as r}from"./H1-9kKnwnEv.js";import{H as i}from"./H2-DmeoaPza.js";import{T as o}from"./index-D7FjMF91.js";import{T as a}from"./Table-z1BMUiIX.js";import{d,m as n}from"./styled-DA0GsMuf.js";import"./vendor-DOAUwEz1.js";import"./icons-CVa_ZadQ.js";const t=d.ul`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    line-height: 1.7;
    color: #495057;
    padding-left: 25px;
    margin: 0;
    list-style-type: disc;
    
    li {
        margin-bottom: 12px;
        
        &:last-child {
            margin-bottom: 0;
        }
        
        &::marker {
            color: #28a745;
        }
    }
    
    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.6;
        padding-left: 20px;
        
        li {
            margin-bottom: 10px;
        }
    }
`,s=({children:r})=>e.jsx(t,{children:r}),m=n`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,l=d.div`
    max-width: 90%;
    width: 100%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    animation: ${m} 0.6s ease-out;
    
    @media (max-width: 768px) {
        max-width: 95%;
        margin: 20px auto;
        gap: 20px;
    }
`,p=d.section`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    
    @media (max-width: 768px) {
        padding: 20px;
        border-radius: 12px;
    }
`,x=d.div`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 16px;
    padding: 35px;
    color: white;
    box-shadow: 0 10px 40px rgba(40, 167, 69, 0.2);
    
    @media (max-width: 768px) {
        padding: 25px;
        border-radius: 12px;
    }
`,c=d.div`
    background: rgba(40, 167, 69, 0.08);
    border-left: 5px solid #28a745;
    border-radius: 12px;
    padding: 25px 30px;
    
    strong {
        color: #28a745;
        font-size: 1.1rem;
    }
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`,h=()=>e.jsxs(l,{children:[e.jsx(r,{style:{marginBottom:"30px"},children:"Продажа и аренда"}),e.jsxs(x,{children:[e.jsx(i,{style:{fontSize:"1.5rem",marginBottom:"15px",color:"white"},children:"АРЕНДНОЕ ЖИЛЬЕ"}),e.jsx(o,{style:{fontSize:"1.1rem",color:"white",marginBottom:"10px"},children:"Информация о наличии арендного жилья, подлежащего распределению, по состоянию на февраль 2025"})]}),e.jsxs(p,{children:[e.jsx(i,{style:{fontSize:"1.3rem",marginBottom:"20px",color:"#28a745"},children:"Что такое арендное жилье?"}),e.jsx(o,{style:{fontSize:"1.05rem",lineHeight:"1.9",textAlign:"justify"},children:"Арендное жилье – жилые помещения государственного жилищного фонда, предоставляемые гражданам за плату во временное владение и пользование на условиях договора найма арендного жилья."})]}),e.jsxs(c,{children:[e.jsx(o,{style:{fontSize:"1.05rem",lineHeight:"1.8",marginBottom:"15px"},children:e.jsx("strong",{children:"Важно знать:"})}),e.jsxs(s,{children:[e.jsx("li",{children:"Очередь на предоставление арендного жилья не формируется"}),e.jsx("li",{children:"Заявления от граждан принимаются не ранее, чем со дня размещения информации о наличии арендного жилья"}),e.jsx("li",{children:"Преимущественное право на получение арендного жилья имеют граждане, состоящие на учете нуждающихся в улучшении жилищных условий в местном исполнительном и распорядительном органе по месту жительства"})]})]}),e.jsxs("div",{children:[e.jsx(i,{style:{fontSize:"1.3rem",marginBottom:"20px",color:"#28a745"},children:"Доступное арендное жилье"}),e.jsx(a,{columns:[{header:"№",key:"number"},{header:"Адрес",key:"address"},{header:"Этаж квартиры/дома",key:"floor"},{header:"Общ. пл. м.кв.",key:"area"},{header:"Кол-во комнат",key:"rooms"},{header:"Уровень благоустройства",key:"condition"},{header:"Инженерное оборудование",key:"equipment"},{header:"Размер платы за пользование, руб.",key:"price"},{header:"Срок подачи заявлений",key:"deadline"}],data:[{number:1,address:"г. Буда-Кошелево, ул. Совхозная, д.16, кв.26",floor:"2/5",area:"41,5",rooms:"1",condition:"пригоден к заселению",equipment:"электроснабжение, водоснабжение, отопление центральное",price:"66,40+ коммунальные услуги",deadline:"с 08.02.2024 г. по 22.02.2024 г. (с предоставлением индивидуального ходатайства)"},{number:2,address:"г. Буда-Кошелево, ул. Лавриновича, д.5а, кв.14",floor:"4/5",area:"42,2",rooms:"1",condition:"пригоден к заселению",equipment:"электроснабжение, водоснабжение, отопление центральное",price:"67,52+ коммунальные услуги",deadline:"с 08.02.2024 г. по 22.02.2024 г. (с предоставлением индивидуального ходатайства)"},{number:3,address:"аг. Широкое, ул. Советская, д.6а, кв.2",floor:"1/2",area:"55,67",rooms:"2",condition:"пригоден к заселению",equipment:"электроснабжение, водоснабжение, отопление центральное",price:"32,07+ коммунальные услуги",deadline:"с 08.02.2024 г. по 22.02.2024 г."},{number:4,address:"п. Красное Знамя, ул. Октябрьская, д.24, кв.1",floor:"1/1",area:"35,9",rooms:"2",condition:"пригоден к заселению",equipment:"электроснабжение, водоснабжение, отопление центральное",price:"18,79+ коммунальные услуги",deadline:"с 08.02.2024 г. по 22.02.2024 г."},{number:5,address:"аг. Коммунар, ул. Молодежная, д.1, кв.38",floor:"3/5",area:"36,8",rooms:"1",condition:"пригоден к заселению",equipment:"электроснабжение, водоснабжение, отопление центральное",price:"23,55+ коммунальные услуги",deadline:"с 08.02.2024 г. по 22.02.2024 г."},{number:6,address:"аг. Октябрь, ул. Октябрьская, д.8, кв.3",floor:"1/2",area:"39,8",rooms:"2",condition:"требуется ремонт на сумму 9415,06",equipment:"водоснабжение, водоотведение, электроснабжение, отопление центральное",price:"20,38+ коммунальные услуги",deadline:"с 08.02.2024 г. по 22.02.2024 г. Указ №112"}]})]})]});export{h as default};
