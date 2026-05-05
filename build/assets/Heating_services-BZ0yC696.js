import{u as e,r as a,j as i}from"./react-vendor-mP65msGK.js";import{G as t}from"./functions-CCafmNLR.js";import{H as r}from"./H1-9kKnwnEv.js";import{L as s}from"./index-D7FjMF91.js";import{S as o,a as n}from"./ServiceTable-B4MXanO8.js";import{V as d}from"./ViewToggle-C3Ap3URn.js";import{d as x,m as p}from"./styled-DA0GsMuf.js";import{x as l,F as c,t as m}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const f=p`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,h=p`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
`,g=x.div`
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
`,u=x.button`
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
`,b=x.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    @media (max-width: 768px) {
        gap: 15px;
        margin-bottom: 5px;
    }
`,j=x.div`
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
`,w=x.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
    }
`,y=x.div`
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
`,v=x.input`
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
`,S=x.div`
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
`,k=x.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 20px;
    animation: ${f} 0.6s ease-out;
`,z=x.div`
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
`,V=()=>{const x=e(),[p,f]=a.useState([]),[h,V]=a.useState([]),[T,U]=a.useState(!1),[C,G]=a.useState(""),[I,Y]=a.useState("cards");return a.useEffect(()=>{(async()=>{U(!0);try{const e=await t("heating_services");f(e),V(e)}catch(e){}finally{U(!1)}})()},[]),a.useEffect(()=>{const e=p.filter(e=>e.name.toLowerCase().includes(C.toLowerCase()));V(e)},[C,p]),i.jsxs(g,{children:[i.jsxs(u,{onClick:()=>x("/services"),children:[i.jsx(l,{style:{width:20,height:20}}),"Назад к услугам"]}),i.jsxs(b,{children:[i.jsx(j,{children:i.jsx(c,{style:{width:40,height:40,color:"#28a745"}})}),i.jsx(r,{children:"Услуги по отоплению населению"})]}),T&&i.jsx(s,{}),!T&&0===p.length&&i.jsxs(S,{children:[i.jsx(c,{style:{width:64,height:64,opacity:.5,color:"#28a745"}}),i.jsx("h3",{children:"Услуги не найдены"}),i.jsx("p",{children:"В данный момент список услуг пуст"})]}),!T&&p.length>0&&i.jsxs(i.Fragment,{children:[i.jsxs(w,{children:[i.jsxs(y,{children:[i.jsx(m,{style:{width:20,height:20,color:"#28a745"}}),i.jsx(v,{type:"text",placeholder:"Поиск услуг...",value:C,onChange:e=>G(e.target.value)})]}),i.jsx(d,{view:I,onViewChange:Y})]}),"cards"===I?i.jsx(o,{services:h}):i.jsx(n,{services:h,showUnitColumn:!0}),0===h.length&&i.jsxs(S,{children:[i.jsx(m,{style:{width:64,height:64,opacity:.5,color:"#28a745"}}),i.jsx("h3",{children:"Ничего не найдено"}),i.jsx("p",{children:"Попробуйте изменить параметры поиска"})]}),i.jsx(k,{children:i.jsx(z,{children:"Цены настоящего прейскуранта установлены без учета стоимости основных материалов оборудования, их доставки к месту работы, которые оплачиваются заказчиком дополнительно по ценам их приобретения и действующим тарифом на перевозку."})})]})]})};export{V as default};
