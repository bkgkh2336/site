import{u as e,r as a,j as i}from"./react-vendor-mP65msGK.js";import{G as r}from"./functions-CCafmNLR.js";import{H as t}from"./H1-9kKnwnEv.js";import{L as n}from"./index-D7FjMF91.js";import{S as s,a as o}from"./ServiceTable-B4MXanO8.js";import{V as d}from"./ViewToggle-C3Ap3URn.js";import{d as p,m as x}from"./styled-DA0GsMuf.js";import{x as l,h as c,t as m}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const f=x`
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
`,u=p.button`
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
`,b=p.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    @media (max-width: 768px) {
        gap: 15px;
        margin-bottom: 5px;
    }
`,w=p.div`
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
`,j=p.div`
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
`,$=p.div`
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
`,k=p.input`
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
`,z=p.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 20px;
    animation: ${f} 0.6s ease-out;
`,_=p.div`
    padding: 16px 20px;
    background: ${e=>e.$isRed?"rgba(220, 53, 69, 0.1)":"rgba(40, 167, 69, 0.1)"};
    border-left: 4px solid ${e=>e.$isRed?"#dc3545":"#28a745"};
    border-radius: 8px;
    color: ${e=>e.$isRed?"#dc3545":"#28a745"};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    font-weight: 500;
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: 0.9rem;
    }
`,V=()=>{const p=e(),[x,f]=a.useState([]),[h,V]=a.useState([]),[C,T]=a.useState(!1),[G,U]=a.useState(""),[I,Y]=a.useState("cards"),[R,E]=a.useState("all");return a.useEffect(()=>{(async()=>{T(!0);try{const e=await r("waste_services"),a=[];e.forEach(e=>{a.push({id:2*e.id-1,name:`${e.name} (летн. н.)`,price_no_nds:e.price_no_dns_summer}),a.push({id:2*e.id,name:`${e.name} (зимн. н.)`,price_no_nds:e.price_no_dns_winter})}),f(a),V(a)}catch(e){}finally{T(!1)}})()},[]),a.useEffect(()=>{let e=x.filter(e=>e.name.toLowerCase().includes(G.toLowerCase()));"summer"===R?e=e.filter(e=>e.name.includes("(летн. н.)")):"winter"===R&&(e=e.filter(e=>e.name.includes("(зимн. н.)"))),V(e)},[G,R,x]),i.jsxs(g,{children:[i.jsxs(u,{onClick:()=>p("/services"),children:[i.jsx(l,{style:{width:20,height:20}}),"Назад к услугам"]}),i.jsxs(b,{children:[i.jsx(w,{children:i.jsx(c,{style:{width:40,height:40,color:"#28a745"}})}),i.jsx(t,{children:"Услуги по вывозу мусора на полигон собственным транспортом заказчика с последующим захоронением"})]}),C&&i.jsx(n,{}),!C&&0===x.length&&i.jsxs(S,{children:[i.jsx(c,{style:{width:64,height:64,opacity:.5,color:"#28a745"}}),i.jsx("h3",{children:"Услуги не найдены"}),i.jsx("p",{children:"В данный момент список услуг пуст"})]}),!C&&x.length>0&&i.jsxs(i.Fragment,{children:[i.jsxs(j,{children:[i.jsxs($,{children:[i.jsx(m,{style:{width:20,height:20,color:"#28a745"}}),i.jsx(k,{type:"text",placeholder:"Поиск услуг...",value:G,onChange:e=>U(e.target.value)})]}),i.jsxs(v,{children:[i.jsx(y,{$active:"all"===R,onClick:()=>E("all"),children:"Все"}),i.jsx(y,{$active:"summer"===R,onClick:()=>E("summer"),children:"Лето"}),i.jsx(y,{$active:"winter"===R,onClick:()=>E("winter"),children:"Зима"})]}),i.jsx(d,{view:I,onViewChange:Y})]}),"cards"===I?i.jsx(s,{services:h}):i.jsx(o,{services:h}),0===h.length&&i.jsxs(S,{children:[i.jsx(m,{style:{width:64,height:64,opacity:.5,color:"#28a745"}}),i.jsx("h3",{children:"Ничего не найдено"}),i.jsx("p",{children:"Попробуйте изменить параметры поиска"})]}),i.jsx(z,{children:i.jsx(_,{$isRed:!0,children:"Платные услуги осуществляются согласно письменных заявок заказчика и оплатой за услуги."})})]})]})};export{V as default};
