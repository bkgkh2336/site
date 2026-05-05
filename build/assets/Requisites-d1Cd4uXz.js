import{r as e,j as a}from"./react-vendor-mP65msGK.js";import{H as s}from"./H1-9kKnwnEv.js";import{B as i,T as l}from"./index-D7FjMF91.js";import{d as r}from"./styled-DA0GsMuf.js";import{_ as d,d as n,P as x,n as c,$ as t,a0 as o,a1 as p,l as m}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const h=r(i)`
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
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 25px;
        width: 90%;
        max-width: 1200px;
        
        @media (max-width: 1024px) {
            grid-template-columns: 1fr;
            max-width: 700px;
        }
        
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
`,j=r.div`
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
    
    &.wide-card {
        grid-column: 1 / -1;
        
        @media (max-width: 1024px) {
            grid-column: 1;
        }
    }
    
    .card-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid rgba(40, 167, 69, 0.1);
        
        h3 {
            margin: 0;
            font-size: 1.25rem;
            color: #333;
            
            @media (max-width: 480px) {
                font-size: 1.1rem;
            }
        }
        
        @media (max-width: 480px) {
            gap: 12px;
        }
    }
    
    .card-content {
        display: flex;
        flex-direction: column;
        gap: 15px;
        
        @media (max-width: 480px) {
            gap: 12px;
        }
    }
    
    .bank-grid {
        display: flex;
        flex-direction: column;
        gap: 18px;
        
        @media (max-width: 480px) {
            gap: 15px;
        }
    }
    
    @media (max-width: 768px) {
        padding: 24px;
    }
    
    @media (max-width: 480px) {
        padding: 18px;
        border-radius: 12px;
    }
`,g=r.div`
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
    
    ${j}:hover & {
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
`,b=r.div`
    display: flex;
    gap: 12px;
    align-items: flex-start;
    
    .label {
        color: #555;
        min-width: 140px;
        
        @media (max-width: 768px) {
            min-width: 120px;
            font-size: 0.95rem;
        }
        
        @media (max-width: 480px) {
            min-width: 100%;
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
    }
    
    .value {
        flex: 1;
        color: #333;
        line-height: 1.6;
        word-break: break-word;
        
        a {
            color: rgb(40, 167, 69);
            text-decoration: none;
            transition: all 0.2s ease;
            display: inline-block;
            
            &:hover {
                color: rgb(32, 134, 55);
                text-decoration: underline;
            }
        }
        
        .separator {
            margin: 0 8px;
            color: #ccc;
            
            @media (max-width: 480px) {
                display: none;
            }
        }
        
        @media (max-width: 768px) {
            font-size: 0.95rem;
        }
        
        @media (max-width: 480px) {
            font-size: 0.9rem;
            
            a {
                display: block;
                margin-bottom: 8px;
                
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
    
    .value-with-copy {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        flex-wrap: wrap;
        
        @media (max-width: 480px) {
            gap: 8px;
        }
    }
    
    @media (max-width: 480px) {
        flex-direction: column;
        gap: 5px;
    }
`,f=r.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    background: transparent;
    border: 1px solid rgba(40, 167, 69, 0.3);
    border-radius: 6px;
    color: rgb(40, 167, 69);
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 28px;
    min-height: 28px;
    
    &:hover {
        background: rgba(40, 167, 69, 0.1);
        border-color: rgb(40, 167, 69);
        transform: scale(1.05);
    }
    
    &:active {
        transform: scale(0.95);
    }
    
    svg {
        width: 16px;
        height: 16px;
    }
`,u=()=>{const[i,r]=e.useState(null),u=(e,a)=>{navigator.clipboard.writeText(e).then(()=>{r(a),setTimeout(()=>r(null),2e3)})};return a.jsxs(h,{children:[a.jsxs("div",{className:"header-section",children:[a.jsx(s,{children:"Реквизиты предприятия"}),a.jsx(l,{style:{fontSize:"1.1rem",textAlign:"center",color:"#666",maxWidth:"600px"},children:"Официальная информация и банковские реквизиты"})]}),a.jsxs("div",{className:"cards-container",children:[a.jsxs(j,{children:[a.jsxs("div",{className:"card-header",children:[a.jsx(g,{color:"#28a745",children:a.jsx(d,{size:24})}),a.jsx("h3",{children:"Полное наименование"})]}),a.jsx("div",{className:"card-content",children:a.jsxs(l,{style:{fontSize:"1.1rem",lineHeight:"1.6"},children:["Коммунальное жилищное унитарное предприятие",a.jsx("br",{}),'"Буда-Кошелёвский коммунальник"']})})]}),a.jsxs(j,{children:[a.jsxs("div",{className:"card-header",children:[a.jsx(g,{color:"#28a745",children:a.jsx(n,{size:24})}),a.jsx("h3",{children:"Юридический адрес"})]}),a.jsx("div",{className:"card-content",children:a.jsxs(l,{style:{fontSize:"1.05rem",lineHeight:"1.6"},children:["247355, Республика Беларусь",a.jsx("br",{}),"Гомельская область",a.jsx("br",{}),"г. Буда-Кошелёво, ул. Озёрная, 3а"]})})]}),a.jsxs(j,{children:[a.jsxs("div",{className:"card-header",children:[a.jsx(g,{color:"#28a745",children:a.jsx(x,{size:24})}),a.jsx("h3",{children:"Контактная информация"})]}),a.jsx("div",{className:"card-content",children:a.jsxs(b,{children:[a.jsx("span",{className:"label",children:"Телефон/Факс:"}),a.jsxs("div",{className:"value",children:[a.jsx("a",{href:"tel:+375233674503",children:"+375 (2336) 7-45-03"}),a.jsx("span",{className:"separator",children:"•"}),a.jsx("a",{href:"tel:+375233674507",children:"+375 (2336) 7-45-07"})]})]})})]}),a.jsxs(j,{className:"wide-card",children:[a.jsxs("div",{className:"card-header",children:[a.jsx(g,{color:"#28a745",children:a.jsx(c,{size:24})}),a.jsx("h3",{children:"Банковские реквизиты"})]}),a.jsx("div",{className:"card-content",children:a.jsxs("div",{className:"bank-grid",children:[a.jsxs(b,{children:[a.jsx("span",{className:"label",children:"УНП:"}),a.jsxs("div",{className:"value-with-copy",children:[a.jsx("span",{className:"value",children:"400041543"}),a.jsx(f,{onClick:()=>u("400041543","unp"),title:"Копировать",children:"unp"===i?a.jsx(t,{size:16}):a.jsx(o,{size:16})})]})]}),a.jsxs(b,{children:[a.jsx("span",{className:"label",children:"ОКПО:"}),a.jsxs("div",{className:"value-with-copy",children:[a.jsx("span",{className:"value",children:"033696453000"}),a.jsx(f,{onClick:()=>u("033696453000","okpo"),title:"Копировать",children:"okpo"===i?a.jsx(t,{size:16}):a.jsx(o,{size:16})})]})]}),a.jsxs(b,{children:[a.jsx("span",{className:"label",children:"Расчётный счёт:"}),a.jsxs("div",{className:"value-with-copy",children:[a.jsx("span",{className:"value",children:"BY69BLBB30120400041543001001"}),a.jsx(f,{onClick:()=>u("BY69BLBB30120400041543001001","account"),title:"Копировать",children:"account"===i?a.jsx(t,{size:16}):a.jsx(o,{size:16})})]})]}),a.jsxs(b,{children:[a.jsx("span",{className:"label",children:"Банк:"}),a.jsxs("span",{className:"value",children:["Дирекция ОАО «Белинвестбанк» по Гомельской области",a.jsx("br",{}),"г. Гомель, ул. Советская, 7"]})]}),a.jsxs(b,{children:[a.jsx("span",{className:"label",children:"МФО:"}),a.jsxs("div",{className:"value-with-copy",children:[a.jsx("span",{className:"value",children:"BLBBBY2X"}),a.jsx(f,{onClick:()=>u("BLBBBY2X","mfo"),title:"Копировать",children:"mfo"===i?a.jsx(t,{size:16}):a.jsx(o,{size:16})})]})]})]})})]}),a.jsxs(j,{children:[a.jsxs("div",{className:"card-header",children:[a.jsx(g,{color:"#28a745",children:a.jsx(p,{size:24})}),a.jsx("h3",{children:"Руководство"})]}),a.jsxs("div",{className:"card-content",children:[a.jsxs(b,{children:[a.jsx("span",{className:"label",children:"Директор:"}),a.jsx("span",{className:"value",children:"Новик Евгений Витальевич"})]}),a.jsxs(b,{children:[a.jsx(g,{color:"#28a745",size:"small",children:a.jsx(m,{size:18})}),a.jsx("span",{className:"value",style:{fontStyle:"italic",color:"#666"},children:"Действует на основании Устава"})]})]})]})]})]})};export{u as default};
