import{r,j as e}from"./react-vendor-mP65msGK.js";import{H as i}from"./H1-9kKnwnEv.js";import{G as t}from"./functions-CCafmNLR.js";import{L as o}from"./index-D7FjMF91.js";import{d as a,m as s}from"./styled-DA0GsMuf.js";import{E as n}from"./ExternalLink-DeYgwZNU.js";import{P as d}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const l=s`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,x=a.div`
    max-width: 90%;
    width: 100%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    animation: ${l} 0.6s ease-out;
    
    @media (max-width: 768px) {
        max-width: 95%;
        margin: 20px auto;
        gap: 12px;
    }
`,c=a.h2`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #212529;
    margin: 20px 0 10px 0;
    text-align: center;
    line-height: 1.5;
`,p=a.div`
    width: 100%;
    overflow-x: auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    animation: ${l} 0.6s ease-out;
    
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    
    &::-webkit-scrollbar {
        height: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(40, 167, 69, 0.05);
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(40, 167, 69, 0.3);
        border-radius: 4px;
        
        &:hover {
            background: rgba(40, 167, 69, 0.5);
        }
    }
    
    @media (max-width: 768px) {
        border-radius: 12px;
        
        &::-webkit-scrollbar {
            height: 6px;
        }
    }
`,h=a.table`
    width: 100%;
    min-width: 800px;
    border-collapse: collapse;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    @media (max-width: 768px) {
        min-width: 700px;
    }
`,m=a.th`
    padding: 18px 24px;
    text-align: left;
    font-weight: 700;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: #ffffff;
    
    &:first-child {
        border-top-left-radius: 16px;
    }
    
    &:last-child {
        border-top-right-radius: 16px;
    }
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: 0.85rem;
        
        &:first-child {
            border-top-left-radius: 12px;
        }
        
        &:last-child {
            border-top-right-radius: 12px;
        }
    }
`,b=a.tr`
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(40, 167, 69, 0.05);
    }
    
    &:not(:last-child) {
        border-bottom: 1px solid rgba(40, 167, 69, 0.1);
    }
`,g=a.td`
    padding: 18px 24px;
    color: #212529;
    font-weight: 500;
    font-size: 0.95rem;
    
    strong {
        color: #28a745;
        font-weight: 700;
    }
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: 0.85rem;
    }
`,f=a.p`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    color: #495057;
    margin: 15px 0;
    padding: 16px 20px;
    background: rgba(220, 53, 69, 0.1);
    border-left: 4px solid #dc3545;
    border-radius: 8px;
    line-height: 1.6;
    font-weight: 500;
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: 0.9rem;
    }
`,j=a.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
    padding: 20px;
    background: rgba(76, 175, 80, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(76, 175, 80, 0.2);
`,u=()=>{const[a,s]=r.useState([]),[l,u]=r.useState(!0);r.useEffect(()=>{w()},[]);const w=async()=>{u(!0);try{const r=(await t("contacts")).filter(r=>"Директор"===r.job_title||"Заместитель директора"===r.job_title);s(r)}catch(r){}finally{u(!1)}},k=r=>`${r.surname} ${r.name} ${r.patronymic}`,y=r=>{if("Директор"===r){const r=a.find(r=>"Заместитель директора"===r.job_title);return r?k(r):""}return""};return e.jsxs(x,{children:[e.jsx(i,{children:"График приема"}),l?e.jsx(o,{}):e.jsxs(e.Fragment,{children:[e.jsx(c,{children:'График личных приемов граждан, их представителей, представителей юридических лиц руководством и специалистами КЖУП "Буда-Кошелевский коммунальник" на 2025 год'}),e.jsx(p,{children:e.jsxs(h,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx(m,{children:"Ф.И.О."}),e.jsx(m,{children:"Должность"}),e.jsx(m,{children:"Время личного приема"}),e.jsx(m,{children:"Время проведения «прямых телефонных линий», тел."}),e.jsx(m,{children:"Замещение на время отсутствия"})]})}),e.jsx("tbody",{children:a.map(r=>e.jsxs(b,{children:[e.jsx(g,{children:k(r)}),e.jsx(g,{children:r.job_title}),e.jsx(g,{children:"Директор"===r.job_title?"1, 3 среда каждого месяца с 08:00 до 13:00":"1, 3 вторник каждого месяца с 08:00 до 13:00"}),e.jsxs(g,{children:[e.jsx(d,{style:{color:"rgb(40, 167, 69)",height:"1rem"}}),"+375 2336 7-45-03 с 09:00 до 10:00"]}),e.jsx(g,{children:y(r.job_title)})]},r.id))})]})}),e.jsx(f,{children:"В случае служебной необходимости прием граждан проводится начальниками отделов по компетенции поступающих вопросов. Прием к директору и заместителю директора осуществляется в порядке очереди и по предварительной записи по тел. 8-02336-7-45-03"}),e.jsx(c,{style:{marginTop:"50px"},children:"ГРАФИК личного приема граждан и юридических лиц, проведения «прямых линий» генеральным директором, заместителями генерального директора ГО «ЖКХ Гомельской области»"}),e.jsx(p,{children:e.jsxs(h,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx(m,{children:"Фамилия, имя, отчество, должность"}),e.jsx(m,{children:"Время личного приема, время проведения «прямых телефонных линий»"}),e.jsx(m,{children:"Замещение на время отсутствия"})]})}),e.jsx("tbody",{children:e.jsxs(b,{children:[e.jsxs(g,{children:[e.jsx("strong",{children:"Пархоменко Вячеслав Николаевич"}),e.jsx("br",{}),"Генеральный директор",e.jsx("br",{}),"Прямая линия"]}),e.jsxs(g,{children:["3-я среда каждого месяца каб.3-14 с 8:00 до 13:00",e.jsx("br",{}),"27-46-07 с 9:00 до 10:00"]}),e.jsx(g,{children:"Заместитель генерального директора"})]})})]})}),e.jsx(f,{children:"В случае служебной необходимости прием граждан проводится начальниками отделов по компетенции поступающих вопросов. Прием к генеральному директору и заместителям генерального директора осуществляется в порядке очереди и по предварительной записи по тел. 8-0232-22-83-26, 30-47-06, 28-38-25"}),e.jsxs(j,{children:[e.jsx(n,{href:"https://www.mjkx.gov.by/odno-okno",target:"_blank",rel:"noopener noreferrer",children:"График личного приема граждан и юридических лиц Министром, заместителями Министра"}),e.jsx(n,{href:"https://siap.gomel-region.gov.by/ochered/",target:"_blank",rel:"noopener noreferrer",children:"Информация об очередности граждан, нуждающихся в улучшении жилищных условий, в городах, районах Гомельской области и районных администрациях г.Гомеля"})]})]})]})};export{u as default};
