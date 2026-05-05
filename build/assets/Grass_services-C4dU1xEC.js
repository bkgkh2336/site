import{u as e,r as a,j as i}from"./react-vendor-mP65msGK.js";import{G as r}from"./functions-CCafmNLR.js";import{H as n}from"./H1-9kKnwnEv.js";import{L as t}from"./index-D7FjMF91.js";import{S as o,a as s}from"./ServiceTable-B4MXanO8.js";import{V as d}from"./ViewToggle-C3Ap3URn.js";import{d as p,m as x}from"./styled-DA0GsMuf.js";import{x as l,i as c,t as m}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const f=x`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,h=x`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
`,g=p.div`
    width: 90%;
    max-width: 1400px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    animation: ${f} 0.6s ease-out;
    
    @media (max-width: 768px) {
        width: 95%;
        margin: 20px auto;
        gap: 20px;
    }
`,b=p.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.2);
    border-radius: 12px;
    color: #28a745;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.1);
    
    &:hover {
        background: #28a745;
        color: #ffffff;
        transform: translateX(-4px);
        box-shadow: 0 6px 20px rgba(40, 167, 69, 0.25);
    }
    
    &:active {
        transform: translateX(-2px);
    }
    
    @media (max-width: 768px) {
        padding: 10px 20px;
        font-size: 0.9rem;
    }
`,u=p.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    @media (max-width: 768px) {
        gap: 15px;
        margin-bottom: 5px;
    }
`,j=p.div`
    min-width: 80px;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #e7f3e9;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
    animation: ${h} 3s ease-in-out infinite;
    
    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
`,w=p.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
    }
`,v=p.div`
    display: flex;
    gap: 12px;
    padding: 6px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.1);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
    
    @media (max-width: 768px) {
        width: 100%;
        gap: 8px;
    }
`,y=p.button`
    padding: 10px 20px;
    background: ${e=>e.$active?"#28a745":"transparent"};
    color: ${e=>e.$active?"#ffffff":"#6c757d"};
    border: none;
    border-radius: 8px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: ${e=>e.$active?"#218838":"rgba(40, 167, 69, 0.1)"};
        color: ${e=>e.$active?"#ffffff":"#28a745"};
    }
    
    &:active {
        transform: scale(0.98);
    }
    
    @media (max-width: 768px) {
        flex: 1;
        padding: 10px 16px;
        font-size: 0.9rem;
    }
`,k=p.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.1);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
    transition: all 0.3s ease-in-out;
    flex: 1;
    
    &:focus-within {
        border-color: #28a745;
        box-shadow: 0 4px 16px rgba(40, 167, 69, 0.25);
    }
    
    @media (max-width: 768px) {
        width: 100%;
    }
`,$=p.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    color: #212529;
    
    &::placeholder {
        color: #6c757d;
    }
`,S=p.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 48px;
    text-align: center;
    color: #6c757d;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.1);
    border-radius: 24px;
    animation: ${f} 0.6s ease-out;
    
    h3 {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.5rem;
        font-weight: 600;
        color: #212529;
        margin: 16px 0 8px 0;
    }
    
    p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1rem;
        margin: 0;
    }
    
    @media (max-width: 768px) {
        padding: 60px 24px;
        
        h3 {
            font-size: 1.25rem;
        }
        
        p {
            font-size: 0.9rem;
        }
    }
`,_=p.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 20px;
    animation: ${f} 0.6s ease-out;
`,z=p.div`
    padding: 16px 20px;
    background: rgba(220, 53, 69, 0.1);
    border-left: 4px solid #dc3545;
    border-radius: 8px;
    color: #dc3545;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    font-weight: 500;
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: 0.9rem;
    }
`,V=()=>{const p=e(),[x,f]=a.useState([]),[h,V]=a.useState([]),[U,C]=a.useState(!1),[T,G]=a.useState(""),[I,Y]=a.useState("cards"),[E,L]=a.useState("all");return a.useEffect(()=>{(async()=>{C(!0);try{const e=await r("grass_services"),a=[];e.forEach(e=>{a.push({id:2*e.id-1,name:`${e.name} (сплошной газон)`,price_no_nds:e.price_no_nds_is_solid}),a.push({id:2*e.id,name:`${e.name} (комбинированный)`,price_no_nds:e.price_no_nds_no_solid})}),f(a),V(a)}catch(e){}finally{C(!1)}})()},[]),a.useEffect(()=>{let e=x.filter(e=>e.name.toLowerCase().includes(T.toLowerCase()));"solid"===E?e=e.filter(e=>e.name.includes("(сплошной газон)")):"combined"===E&&(e=e.filter(e=>e.name.includes("(комбинированный)"))),V(e)},[T,E,x]),i.jsxs(g,{children:[i.jsxs(b,{onClick:()=>p("/services"),children:[i.jsx(l,{style:{width:20,height:20}}),"Назад к услугам"]}),i.jsxs(u,{children:[i.jsx(j,{children:i.jsx(c,{style:{width:40,height:40,color:"#28a745"}})}),i.jsx(n,{children:"Услуги по скашиванию травы (сплошных и комбинированных газонов) ручным моторизированным инструментом"})]}),U&&i.jsx(t,{}),!U&&0===x.length&&i.jsxs(S,{children:[i.jsx(c,{style:{width:64,height:64,opacity:.5,color:"#28a745"}}),i.jsx("h3",{children:"Услуги не найдены"}),i.jsx("p",{children:"В данный момент список услуг пуст"})]}),!U&&x.length>0&&i.jsxs(i.Fragment,{children:[i.jsxs(w,{children:[i.jsxs(k,{children:[i.jsx(m,{style:{width:20,height:20,color:"#28a745"}}),i.jsx($,{type:"text",placeholder:"Поиск услуг...",value:T,onChange:e=>G(e.target.value)})]}),i.jsxs(v,{children:[i.jsx(y,{$active:"all"===E,onClick:()=>L("all"),children:"Все"}),i.jsx(y,{$active:"solid"===E,onClick:()=>L("solid"),children:"Сплошной"}),i.jsx(y,{$active:"combined"===E,onClick:()=>L("combined"),children:"Комбинированный"})]}),i.jsx(d,{view:I,onViewChange:Y})]}),"cards"===I?i.jsx(o,{services:h,priceUnit:"(за 100 м²)"}):i.jsx(s,{services:h,priceUnit:"(за 100 м²)"}),0===h.length&&i.jsxs(S,{children:[i.jsx(m,{style:{width:64,height:64,opacity:.5,color:"#28a745"}}),i.jsx("h3",{children:"Ничего не найдено"}),i.jsx("p",{children:"Попробуйте изменить параметры поиска"})]}),i.jsx(_,{children:i.jsx(z,{children:'Дополнительные платные услуги осуществляются по заявительному принципу, согласно письменному заявлению заказчика, зарегистрированного в приемной КЖУП "Буда-Кошелевский коммунальник", подписанного руководителем предприятия и оплатой за услугу.'})})]})]})};export{V as default};
