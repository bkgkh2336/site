import{j as i}from"./react-vendor-mP65msGK.js";import{B as t}from"./Block-BD7PERss.js";import{H as e}from"./H1-9kKnwnEv.js";import{H as r}from"./H2-DmeoaPza.js";import{d as a}from"./styled-DA0GsMuf.js";import{B as d,T as n}from"./index-D7FjMF91.js";import"./vendor-DOAUwEz1.js";import"./icons-CVa_ZadQ.js";const o=a.h3`
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
`,s=t=>i.jsx(o,{style:t.style,children:t.children}),x=a(d)`
    align-items: start;
    flex-direction: column;
    align-items: center;
    
    .intro-block {
        width: 80%;
        padding: 0;
        
        @media (max-width: 768px) {
            width: 95%;
            padding: 10px;
        }
        
        @media (max-width: 480px) {
            width: 100%;
            padding: 5px;
        }
    }
    
    .tasks-container {
        flex-wrap: wrap;
        align-items: stretch;
        justify-content: center;
        width: 90%;
        gap: 20px;
        
        > div {
            width: 48%;
            
            @media (max-width: 968px) {
                width: 100%;
            }
        }
        
        @media (max-width: 768px) {
            width: 95%;
            gap: 15px;
        }
        
        @media (max-width: 480px) {
            width: 100%;
            gap: 12px;
        }
    }
`,p=a(d)`
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 20px 24px;
    box-sizing: border-box;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 16px;
    border-radius: 12px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
        box-shadow: 0 8px 24px rgba(76, 175, 80, 0.2);
        transform: translateY(-2px);
        border-color: #4CAF50;
    }
    
    @media (max-width: 768px) {
        padding: 16px 20px;
        gap: 12px;
    }
    
    @media (max-width: 480px) {
        padding: 14px 16px;
        gap: 10px;
        
        &:hover {
            transform: none;
        }
    }
`,l=a.div`
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 16px;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
    
    &::after {
        content: '✓';
    }
    
    @media (max-width: 768px) {
        width: 28px;
        height: 28px;
        min-width: 28px;
        font-size: 14px;
    }
    
    @media (max-width: 480px) {
        width: 24px;
        height: 24px;
        min-width: 24px;
        font-size: 12px;
    }
`,h=t=>i.jsxs(p,{style:t.style,children:[i.jsx(l,{}),i.jsx(n,{children:t.name})]}),m=a(d)`
    flex-direction: column;
    gap: 0;
    box-sizing: border-box;
    width: 100%;
`,c=a.div`
    width: 3px;
    height: 5rem;
    background-color: #28a745;
    margin: auto;
    
    @media (max-width: 768px) {
        height: 3rem;
    }
    
    @media (max-width: 480px) {
        height: 2rem;
        width: 2px;
    }
`,g=a.div`
    display: flex;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: #28a745;
    margin: auto;
    text-align: center;
    
    > span {
        margin: 0;
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        margin: auto;
    }
    
    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
        
        > span {
            font-size: 1.2rem;
        }
    }
    
    @media (max-width: 480px) {
        width: 50px;
        height: 50px;
        
        > span {
            font-size: 1rem;
        }
    }
`,w=a(d)`
    flex-direction: column;
    align-items: normal;
    position: absolute;
    background-color: white;
    padding: 20px;
    bottom: 0px;
    border: 1px solid #28a745;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 30%;
    
    @media (max-width: 968px) {
        position: relative;
        width: 80%;
        left: 0 !important;
        right: 0 !important;
        margin: 10px auto;
        bottom: auto;
        
        span {
            text-align: center !important;
        }
    }
    
    @media (max-width: 768px) {
        width: 90%;
        padding: 15px;
    }
    
    @media (max-width: 480px) {
        width: 95%;
        padding: 12px;
    }
`,b=t=>i.jsx(m,{children:t.events.map((t,e)=>i.jsxs("div",{style:{height:"fit-content",position:"relative",width:"80%"},children:[i.jsx(g,{children:i.jsx(n,{bold:"bolder",children:t.year})}),i.jsx(c,{}),i.jsxs(w,{style:e%2==0?{left:0}:{right:0},children:[i.jsx(n,{bold:"bolder",style:{...e%2==0?{textAlign:"right"}:{textAlign:"left"},color:"rgb(0,128,0)"},children:t.title}),i.jsx(n,{style:{...e%2==0?{textAlign:"right"}:{textAlign:"left"},color:"rgb(0,0,0,0.75)"},children:t.description})]})]},e))}),f=()=>i.jsxs(x,{children:[i.jsxs(t,{className:"intro-block",children:[i.jsx(e,{style:{margin:"auto"},children:"О нас"}),i.jsxs(s,{style:{textAlign:"center",fontWeight:"normal"},children:[i.jsx("span",{style:{color:"rgba(0,128,0)"},children:"КЖУП «Буда-Кошелевский коммунальник»"})," — это предприятие с богатой историей и многолетним опытом служения людям. На протяжении более 70 лет мы обеспечиваем комфорт и благополучие жителей нашего региона."]})]}),i.jsx(r,{children:"Путь развития"}),i.jsx(b,{events:[{year:1951,title:"Основание ремонтно-строительной конторы",description:"Начало деятельности в сфере строительства и ремонта."},{year:1963,title:"Создание Комбината коммунальных предприятий",description:"Объединение и расширение услуг (баня, гостиница, жилфонд, водопровод)."},{year:1983,title:"Создание районного ПО ЖКХ (РПОЖКХ)",description:"Значительное расширение зоны ответственности: Принятие на баланс городских сетей водоснабжения и канализации."},{year:1996,title:"Регистрация под именем «Буда-Кошелевский коммунальник»",description:"Формирование современного бренда предприятия."},{year:2002,title:"Прием на обслуживание сельских ВКС",description:"Расширение услуг на сельские населенные пункты."},{year:2005,title:"Принятие объектов теплового хозяйства",description:"Полное коммунальное обеспечение: Предприятие становится основным оператором теплоснабжения (котельных) в районе."}]}),i.jsxs(t,{className:"intro-block",children:[i.jsx(r,{style:{margin:"auto"},children:"Сегодня"}),i.jsxs(s,{style:{textAlign:"center",fontWeight:"normal"},children:[i.jsx("span",{style:{color:"rgba(0,128,0)"},children:"КЖУП «Буда-Кошелевский коммунальник»"})," — это самостоятельное унитарное предприятие, которое обеспечивает полноценную жизнедеятельность региона."]})]}),i.jsxs(t,{style:{flexDirection:"column",width:"100%"},children:[i.jsx(r,{children:"Задачи и функции"}),i.jsx(t,{className:"tasks-container",children:["Обеспечение правильной эксплуатации, ремонта, сохранности жилищного фонда, коммунальных предприятий и других объектов жилищно-коммунального хозяйства города","Совершенствование организационной структуры управления отраслью, повышение её эффективности и удешевление стоимости предоставляемых услуг и работ","Организация и координация внедрения приборов учета тепловой энергии, холодного и горячего водоснабжения на обслуживаемых объектах","Обеспечение перспективного развития, проведение единой технической политики в жилищно-коммунальном хозяйстве города","Проведение инвестиционной политики в развитии объектов коммунального хозяйства, благоустройства и капремонта жилфонда города","Руководство и координация деятельности предприятий","Обеспечение технического надзора за ремонтируемыми и строящимися объектами коммунального хозяйства, инженерными сооружениями и объектами внешнего благоустройства","Выполнение функций Заказчика по капитальному ремонту (тепловая модернизация), реконструкции объектов жилищного, производственного и социального назначения","Выполнение функций Заказчика по основным и дополнительным жилищно-коммунальным услугам по коммунальному жилищному фонду","Осуществление контроля за зелеными насаждениями в городе, торговыми местами на городской территории","Выдача разрешений на раскопки и контроль за их проведением","Материально-техническое снабжение предприятий","Работа с обращениями граждан"].map(t=>i.jsx(h,{name:t},t))})]})]});export{f as default};
