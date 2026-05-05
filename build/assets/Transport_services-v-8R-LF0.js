import{u as e,r as i,j as r}from"./react-vendor-mP65msGK.js";import{G as a}from"./functions-CCafmNLR.js";import{H as s}from"./H1-9kKnwnEv.js";import{L as t}from"./index-D7FjMF91.js";import{V as n}from"./ViewToggle-C3Ap3URn.js";import{d as o,m as d}from"./styled-DA0GsMuf.js";import{S as l,B as c,P as h,H as p,E as x,V as m,a as g,b as f,N as u,c as b,f as j}from"./styled-MlAW4SaM.js";import{x as v,v as w,t as y}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const k=l,_=c,$=h,S=p,V=m,z=g,U=f,F=x,I=u,G=b,T=d`
    0%, 100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
`,B=o.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`,E=o.div`
    position: relative;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    animation: ${j} 0.6s ease-out;
    
    &:hover {
        box-shadow: 0 16px 48px rgba(40, 167, 69, 0.2);
        border-color: #28a745;
        
        & > div:first-child {
            opacity: 1;
        }
    }
`,L=o.div`
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(40, 167, 69, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    animation: ${T} 3s ease-in-out infinite;
`,C=o.div`
    display: inline-block;
    background: #28a745;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.85rem;
    padding: 6px 16px;
    border-radius: 50px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`,D=o.h3`
    font-size: 1.15rem;
    font-weight: 600;
    color: #212529;
    margin: 0 0 20px 0;
    line-height: 1.5;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 50px;
`,H=o.div`
    display: flex;
    flex-direction: column;
`,N=o.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`,q=o.span`
    font-size: 0.85rem;
    color: #6c757d;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`,A=o.span`
    font-size: ${e=>e.$highlight?"1.3rem":"1.1rem"};
    font-weight: 700;
    color: ${e=>e.$highlight?"#28a745":"#212529"};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`,M=o.div`
    width: 100%;
    overflow-x: auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    animation: ${j} 0.6s ease-out;
    
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
        border-radius: 16px;
        
        &::-webkit-scrollbar {
            height: 6px;
        }
    }
`,R=o.table`
    width: 100%;
    min-width: 800px;
    border-collapse: collapse;
    
    @media (max-width: 768px) {
        min-width: 700px;
    }
`,P=o.thead`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
`,Y=o.tr`
    transition: background-color 0.2s ease;
    
    &:hover,
    &.group-hover {
        background-color: rgba(40, 167, 69, 0.05);
    }
`,Z=o.th`
    padding: 16px 20px;
    text-align: left;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    @media (max-width: 768px) {
        padding: 12px 16px;
        font-size: 0.8rem;
    }
`,J=o.td`
    padding: 16px 20px;
    border-bottom: 1px solid rgba(40, 167, 69, 0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.95rem;
    color: ${e=>e.$highlight?"#28a745":"#212529"};
    font-weight: ${e=>e.$highlight?"700":"400"};
    
    @media (max-width: 768px) {
        padding: 12px 16px;
        font-size: 0.85rem;
    }
`;o.div`
    margin-bottom: 8px;
    
    &:last-child {
        margin-bottom: 0;
    }
`;const K=({services:e})=>{const i=e=>new Intl.NumberFormat("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e);return r.jsx(B,{children:e.map((e,a)=>r.jsxs(E,{children:[r.jsx(L,{}),r.jsxs(C,{children:["№",a+1]}),r.jsx(D,{children:e.name}),r.jsx(H,{children:e.variants.map((a,s)=>r.jsxs("div",{style:{marginBottom:s<e.variants.length-1?"12px":"0"},children:[r.jsxs(N,{children:[r.jsxs(q,{children:["Без НДС (",a.unit,")"]}),r.jsxs(A,{children:[i(a.price_no_nds)," Br"]})]}),r.jsxs(N,{children:[r.jsxs(q,{children:["С НДС 20% (",a.unit,")"]}),r.jsxs(A,{$highlight:!0,children:[i(1.2*a.price_no_nds)," Br"]})]})]},s))})]},e.id))})},O=({services:e})=>{const i=e=>new Intl.NumberFormat("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e);return r.jsx(M,{children:r.jsxs(R,{children:[r.jsx(P,{children:r.jsxs(Y,{children:[r.jsx(Z,{children:"№"}),r.jsx(Z,{children:"Наименование транспорта"}),r.jsx(Z,{children:"Ед. изм."}),r.jsx(Z,{children:"Цена без НДС (Br)"}),r.jsx(Z,{children:"Цена с НДС 20% (Br)"})]})}),r.jsx("tbody",{children:e.map((e,a)=>e.variants.map((s,t)=>r.jsxs(Y,{"data-group-id":e.id,onMouseEnter:()=>{document.querySelectorAll(`tr[data-group-id="${e.id}"]`).forEach(e=>e.classList.add("group-hover"))},onMouseLeave:()=>{document.querySelectorAll(`tr[data-group-id="${e.id}"]`).forEach(e=>e.classList.remove("group-hover"))},children:[0===t&&r.jsxs(r.Fragment,{children:[r.jsx(J,{rowSpan:e.variants.length,children:a+1}),r.jsx(J,{rowSpan:e.variants.length,children:e.name})]}),r.jsx(J,{children:s.unit}),r.jsx(J,{children:i(s.price_no_nds)}),r.jsx(J,{$highlight:!0,children:i(1.2*s.price_no_nds)})]},`${e.id}-${t}`)))})]})})},Q=()=>{const o=e(),[d,l]=i.useState([]),[c,h]=i.useState([]),[p,x]=i.useState(!1),[m,g]=i.useState(""),[f,u]=i.useState("cards");return i.useEffect(()=>{(async()=>{x(!0);try{const e=await a("transport_population_and_budget"),i=await a("transport_price_population_and_budget");if(!e||!i)return l([]),void h([]);const r=e.map(e=>{const r=i.filter(i=>i.id_transport===e.id);return{id:e.id,name:e.name,variants:r.map(e=>({unit:e.unit,price_no_nds:e.price_no_nds}))}}).filter(e=>e.variants.length>0);l(r),h(r)}catch(e){l([]),h([])}finally{x(!1)}})()},[]),i.useEffect(()=>{const e=d.filter(e=>e.name.toLowerCase().includes(m.toLowerCase()));h(e)},[m,d]),r.jsxs(k,{children:[r.jsxs(_,{onClick:()=>o("/services"),children:[r.jsx(v,{style:{width:20,height:20}}),"Назад к услугам"]}),r.jsxs($,{children:[r.jsx(S,{children:r.jsx(w,{style:{width:40,height:40,color:"#28a745"}})}),r.jsx(s,{children:"Транспортные услуги населению и бюджетным организациям"})]}),p&&r.jsx(t,{}),!p&&0===d.length&&r.jsxs(F,{children:[r.jsx(w,{style:{width:64,height:64,opacity:.5,color:"#28a745"}}),r.jsx("h3",{children:"Услуги не найдены"}),r.jsx("p",{children:"В данный момент список услуг пуст"})]}),!p&&d.length>0&&r.jsxs(r.Fragment,{children:[r.jsxs(V,{children:[r.jsxs(z,{children:[r.jsx(y,{style:{width:20,height:20,color:"#28a745"}}),r.jsx(U,{type:"text",placeholder:"Поиск услуг...",value:m,onChange:e=>g(e.target.value)})]}),r.jsx(n,{view:f,onViewChange:u})]}),"cards"===f?r.jsx(K,{services:c}):r.jsx(O,{services:c}),0===c.length&&r.jsxs(F,{children:[r.jsx(y,{style:{width:64,height:64,opacity:.5,color:"#28a745"}}),r.jsx("h3",{children:"Ничего не найдено"}),r.jsx("p",{children:"Попробуйте изменить параметры поиска"})]}),r.jsx(I,{children:r.jsx(G,{children:"Транспортные услуги оказываются на основании письменной заявки заказчика и оплаты с предоставлением квитанции об оплате."})})]})]})};export{Q as default};
