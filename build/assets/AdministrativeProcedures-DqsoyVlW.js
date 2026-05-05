import{j as e}from"./react-vendor-mP65msGK.js";import{H as a}from"./H1-9kKnwnEv.js";import{H as t}from"./H2-DmeoaPza.js";import{T as r}from"./Table-z1BMUiIX.js";import{d as i,m as n}from"./styled-DA0GsMuf.js";import"./vendor-DOAUwEz1.js";const o=n`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,m=i.div`
    max-width: 90%;
    width: 100%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 25px;
    animation: ${o} 0.6s ease-out;
    
    @media (max-width: 768px) {
        max-width: 95%;
        margin: 20px auto;
        gap: 20px;
    }
`,s=i.h2`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #212529;
    margin: 20px 0;
    text-align: center;
    line-height: 1.6;
    
    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`,d=()=>e.jsxs(m,{children:[e.jsx(a,{style:{marginBottom:"30px"},children:"Административные процедуры"}),e.jsx(s,{children:"Перечень административных процедур, осуществляемых уполномоченными лицами КЖУП «Буда-Кошелевский коммунальник»"}),e.jsx(t,{style:{fontSize:"1.4rem",marginBottom:"20px",color:"#28a745"},children:"3.1.10. Выдача технических условий на:"}),e.jsx(r,{columns:[{header:"Наименование административной процедуры",key:"name"},{header:"Уполномоченное лицо предприятия",key:"authorized",render:a=>e.jsx("div",{style:{whiteSpace:"pre-line"},children:a})},{header:"Перечень документов и (или) сведений, представляемых заинтересованными лицами",key:"documents",render:a=>e.jsx("div",{style:{whiteSpace:"pre-line"},children:a})},{header:"Срок осуществления административной процедуры",key:"term"},{header:"Срок действия справок или других документов",key:"validity"},{header:"Размер платы",key:"fee"}],data:[{name:"3.1.10.1. теплоснабжение объекта",authorized:"Начальник ПТО Цыкунова А.И.\nТел: 80233670726",documents:"заявление\nзаявка по утвержденной форме",term:"7 дней",validity:"2 года до начала строительства, в дальнейшем – до даты приемки объекта в эксплуатацию",fee:"бесплатно"},{name:"3.1.10.2. присоединение объекта к системам водоснабжения, хозяйственно-бытовой канализации, дождевой канализации",authorized:"Начальник ПТО Цыкунова А.И.\nТел: 80233670726",documents:"заявление\nзадание на проектирование объекта\nсхема расположения объекта (ситуационный план)\nбалансовая схема водопотребления и водоотведения, качественный состав воды (стоков)",term:"7 дней",validity:"2 года до начала строительства, в дальнейшем – до даты приемки объекта в эксплуатацию",fee:"бесплатно"}]})]});export{d as default};
