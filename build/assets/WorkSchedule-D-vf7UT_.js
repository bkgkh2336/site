import{j as e}from"./react-vendor-mP65msGK.js";import{H as a}from"./H1-9kKnwnEv.js";import{B as i,T as s}from"./index-D7FjMF91.js";import{d as r}from"./styled-DA0GsMuf.js";import{_ as n,l,a2 as d,d as o,j as t,m as x}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const p=r(i)`
    align-items: center;
    flex-direction: column;
    gap: 40px;
    padding: 40px 20px;
    background: linear-gradient(to bottom, rgba(40, 167, 69, 0.02) 0%, transparent 100%);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    * {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .header-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        text-align: center;
        margin-bottom: 20px;
        
        h1 {
            color: rgb(40, 167, 69);
            margin: 0;
        }
    }
    
    .cards-container {
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: 90%;
        max-width: 1000px;
        
        @media (max-width: 768px) {
            width: 95%;
            gap: 20px;
        }
        
        @media (max-width: 480px) {
            width: 100%;
            gap: 15px;
            padding: 0 5px;
        }
    }
`,c=r.div`
    background: white;
    border-radius: 16px;
    padding: 28px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(40, 167, 69, 0.1);
    
    &:hover {
        box-shadow: 0 6px 20px rgba(40, 167, 69, 0.15);
        transform: translateY(-2px);
    }
    
    .card-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 2px solid rgba(40, 167, 69, 0.1);
        
        h3 {
            margin: 0;
            font-size: 1.3rem;
            color: #333;
            line-height: 1.3;
            
            @media (max-width: 480px) {
                font-size: 1.15rem;
            }
        }
        
        @media (max-width: 480px) {
            gap: 12px;
        }
    }
    
    .card-content {
        display: flex;
        flex-direction: column;
        gap: 18px;
        
        @media (max-width: 480px) {
            gap: 15px;
        }
    }
    
    .reception-link {
        text-align: center;
        padding: 12px;
        background: rgba(40, 167, 69, 0.05);
        border-radius: 8px;
        margin-bottom: 10px;
        
        a {
            text-decoration: none;
            transition: opacity 0.2s ease;
            
            &:hover {
                opacity: 0.8;
            }
        }
    }
    
    .info-row {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        
        &.lunch-row {
            margin-top: -10px;
        }
    }
    
    .info-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 5px;
        
        .label {
            color: #666;
            font-size: 0.95rem;
            
            @media (max-width: 480px) {
                font-size: 0.9rem;
            }
        }
        
        .value {
            color: #333;
            line-height: 1.6;
            
            @media (max-width: 480px) {
                font-size: 0.95rem;
            }
        }
    }
    
    .map-container {
        margin-top: 10px;
        padding-top: 18px;
        border-top: 1px solid rgba(40, 167, 69, 0.1);
        
        iframe {
            border: 1px solid rgba(40, 167, 69, 0.1);
            transition: all 0.3s ease;
            
            &:hover {
                border-color: rgba(40, 167, 69, 0.3);
            }
        }
        
        @media (max-width: 480px) {
            iframe {
                height: 250px;
            }
        }
    }
    
    @media (max-width: 768px) {
        padding: 24px;
    }
    
    @media (max-width: 480px) {
        padding: 18px;
        border-radius: 12px;
    }
`,m=r.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${e=>"small"===e.size?"36px":"48px"};
    height: ${e=>"small"===e.size?"36px":"48px"};
    min-width: ${e=>"small"===e.size?"36px":"48px"};
    background: ${e=>e.color?`${e.color}15`:"rgba(40, 167, 69, 0.1)"};
    border-radius: 12px;
    color: ${e=>e.color||"rgb(40, 167, 69)"};
    transition: all 0.3s ease;
    
    ${c}:hover & {
        background: ${e=>e.color?`${e.color}25`:"rgba(40, 167, 69, 0.2)"};
        transform: scale(1.05);
    }
    
    @media (max-width: 480px) {
        width: ${e=>"small"===e.size?"32px":"40px"};
        height: ${e=>"small"===e.size?"32px":"40px"};
        min-width: ${e=>"small"===e.size?"32px":"40px"};
        
        svg {
            width: ${e=>"small"===e.size?"16px":"20px"};
            height: ${e=>"small"===e.size?"16px":"20px"};
        }
    }
`,h=()=>{const i=[{title:"Администрация предприятия",address:"г. Буда-Кошелево, ул. Озерная, 3а",schedule:"пн. - пт. с 8:00 до 17:00",lunch:"обед с 13:00 до 14:00",weekend:"Выходной: суббота, воскресенье",mapIframe:"https://yandex.by/map-widget/v1/?ll=30.564938%2C52.726729&z=17&l=map&pt=30.564938,52.726729,pm2rdm",hasReceptionLink:!0,icon:n},{title:"Паспортный стол и Абонентский отдел",address:"г. Буда-Кошелево, ул. 50 лет Октября, 3",schedule:"пн. - пт. с 8:00 до 17:00",lunch:"обед с 13:00 до 14:00",weekend:"Выходной: суббота, воскресенье",mapIframe:"https://yandex.by/map-widget/v1/?ll=30.570897%2C52.717861&z=17&l=map&pt=30.570897,52.717861,pm2rdm",icon:l},{title:"Участок реализации топлива",address:"г. Буда-Кошелево, ул. Прищепы, 40",schedule:"пн. - пт. с 8:00 до 17:00",lunch:"обед с 13:00 до 14:00",weekend:"Выходной: суббота, воскресенье",mapIframe:"https://yandex.by/map-widget/v1/?ll=30.584660%2C52.708282&z=17&l=map&pt=30.584660,52.708282,pm2rdm",icon:d}];return e.jsxs(p,{children:[e.jsxs("div",{className:"header-section",children:[e.jsx(a,{children:"Режим работы"}),e.jsx(s,{style:{fontSize:"1.1rem",textAlign:"center",color:"#666",maxWidth:"700px"},children:"Информация о режиме работы подразделений предприятия"})]}),e.jsx("div",{className:"cards-container",children:i.map((a,i)=>{const s=a.icon;return e.jsxs(c,{children:[e.jsxs("div",{className:"card-header",children:[e.jsx(m,{color:"#28a745",children:e.jsx(s,{size:24})}),e.jsx("h3",{children:a.title})]}),e.jsxs("div",{className:"card-content",children:[a.hasReceptionLink&&e.jsx("div",{className:"reception-link",children:e.jsx("a",{href:"/schedule_forms",children:e.jsx("span",{style:{color:"#28a745",fontSize:"1.05rem"},children:"График приема граждан"})})}),e.jsxs("div",{className:"info-row",children:[e.jsx(m,{color:"#28a745",size:"small",children:e.jsx(o,{size:18})}),e.jsxs("div",{className:"info-content",children:[e.jsx("span",{className:"label",children:"Адрес:"}),e.jsx("span",{className:"value",children:a.address})]})]}),e.jsxs("div",{className:"info-row",children:[e.jsx(m,{color:"#28a745",size:"small",children:e.jsx(t,{size:18})}),e.jsxs("div",{className:"info-content",children:[e.jsx("span",{className:"label",children:"Режим работы:"}),e.jsx("span",{className:"value",children:a.schedule})]})]}),a.lunch&&e.jsx("div",{className:"info-row lunch-row",children:e.jsx("div",{className:"info-content",style:{marginLeft:"46px"},children:e.jsx("span",{className:"value",children:a.lunch})})}),e.jsxs("div",{className:"info-row",children:[e.jsx(m,{color:"#28a745",size:"small",children:e.jsx(x,{size:18})}),e.jsx("div",{className:"info-content",children:e.jsx("span",{className:"value",children:a.weekend})})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{src:a.mapIframe,width:"100%",height:"300",frameBorder:"0",allowFullScreen:!0,style:{borderRadius:"8px"}})})]})]},i)})})]})};export{h as default};
