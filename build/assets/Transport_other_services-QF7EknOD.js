import{u as e,r,j as i}from"./react-vendor-mP65msGK.js";import{G as a}from"./functions-CCafmNLR.js";import{H as s}from"./H1-9kKnwnEv.js";import{L as t}from"./index-D7FjMF91.js";import{V as o}from"./ViewToggle-C3Ap3URn.js";import{d as n,m as d}from"./styled-DA0GsMuf.js";import{S as l,B as c,P as h,H as x,E as p,V as m,a as g,b as f,N as u,c as b,f as j}from"./styled-MlAW4SaM.js";import{x as v,v as w,t as y}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const k=l,$=c,S=h,V=x,z=m,U=g,F=f,I=p,G=u,T=b,B=d`
    0%, 100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
`,E=n.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`,L=n.div`
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
`,C=n.div`
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(40, 167, 69, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    animation: ${B} 3s ease-in-out infinite;
`,D=n.div`
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
`,_=n.h3`
    font-size: 1.15rem;
    font-weight: 600;
    color: #212529;
    margin: 0 0 20px 0;
    line-height: 1.5;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 50px;
`,H=n.div`
    display: flex;
    flex-direction: column;
`,N=n.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`,q=n.span`
    font-size: 0.85rem;
    color: #6c757d;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`,A=n.span`
    font-size: ${e=>e.$highlight?"1.3rem":"1.1rem"};
    font-weight: 700;
    color: ${e=>e.$highlight?"#28a745":"#212529"};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`,M=n.div`
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
`,R=n.table`
    width: 100%;
    min-width: 800px;
    border-collapse: collapse;
    
    @media (max-width: 768px) {
        min-width: 700px;
    }
`,P=n.thead`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
`,Y=n.tr`
    transition: background-color 0.2s ease;
    
    &:hover,
    &.group-hover {
        background-color: rgba(40, 167, 69, 0.05);
    }
`,Z=n.th`
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
`,J=n.td`
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
`;n.div`
    margin-bottom: 8px;
    
    &:last-child {
        margin-bottom: 0;
    }
`;const K=({services:e})=>{const r=e=>new Intl.NumberFormat("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e);return i.jsx(E,{children:e.map((e,a)=>i.jsxs(L,{children:[i.jsx(C,{}),i.jsxs(D,{children:["№",a+1]}),i.jsx(_,{children:e.name}),i.jsx(H,{children:e.variants.map((a,s)=>i.jsxs("div",{style:{marginBottom:s<e.variants.length-1?"12px":"0"},children:[i.jsxs(N,{children:[i.jsxs(q,{children:["Без НДС (",a.unit,")"]}),i.jsxs(A,{children:[r(a.price)," Br"]})]}),i.jsxs(N,{children:[i.jsxs(q,{children:["С НДС 20% (",a.unit,")"]}),i.jsxs(A,{$highlight:!0,children:[r(1.2*a.price)," Br"]})]})]},s))})]},e.id))})},O=({services:e})=>{const r=e=>new Intl.NumberFormat("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e);return i.jsx(M,{children:i.jsxs(R,{children:[i.jsx(P,{children:i.jsxs(Y,{children:[i.jsx(Z,{children:"№"}),i.jsx(Z,{children:"Наименование транспорта"}),i.jsx(Z,{children:"Ед. изм."}),i.jsx(Z,{children:"Цена без НДС (Br)"}),i.jsx(Z,{children:"Цена с НДС 20% (Br)"})]})}),i.jsx("tbody",{children:e.map((e,a)=>e.variants.map((s,t)=>i.jsxs(Y,{"data-group-id":e.id,onMouseEnter:()=>{document.querySelectorAll(`tr[data-group-id="${e.id}"]`).forEach(e=>e.classList.add("group-hover"))},onMouseLeave:()=>{document.querySelectorAll(`tr[data-group-id="${e.id}"]`).forEach(e=>e.classList.remove("group-hover"))},children:[0===t&&i.jsxs(i.Fragment,{children:[i.jsx(J,{rowSpan:e.variants.length,children:a+1}),i.jsx(J,{rowSpan:e.variants.length,children:e.name})]}),i.jsx(J,{children:s.unit}),i.jsx(J,{children:r(s.price)}),i.jsx(J,{$highlight:!0,children:r(1.2*s.price)})]},`${e.id}-${t}`)))})]})})},Q=()=>{const n=e(),[d,l]=r.useState([]),[c,h]=r.useState([]),[x,p]=r.useState(!1),[m,g]=r.useState(""),[f,u]=r.useState("cards");return r.useEffect(()=>{(async()=>{p(!0);try{const e=await a("transport_other"),r=await a("transport_price_other");if(!e||!r)return l([]),void h([]);const i=e.map(e=>{const i=r.filter(r=>r.id_transport===e.id);return{id:e.id,name:e.name,variants:i.map(e=>({unit:e.unit,price:e.price}))}}).filter(e=>e.variants.length>0);l(i),h(i)}catch(e){l([]),h([])}finally{p(!1)}})()},[]),r.useEffect(()=>{const e=d.filter(e=>e.name.toLowerCase().includes(m.toLowerCase()));h(e)},[m,d]),i.jsxs(k,{children:[i.jsxs($,{onClick:()=>n("/services"),children:[i.jsx(v,{style:{width:20,height:20}}),"Назад к услугам"]}),i.jsxs(S,{children:[i.jsx(V,{children:i.jsx(w,{style:{width:40,height:40,color:"#28a745"}})}),i.jsx(s,{children:"Прочие транспортные услуги"})]}),x&&i.jsx(t,{}),!x&&0===d.length&&i.jsxs(I,{children:[i.jsx(w,{style:{width:64,height:64,opacity:.5,color:"#28a745"}}),i.jsx("h3",{children:"Услуги не найдены"}),i.jsx("p",{children:"В данный момент список услуг пуст"})]}),!x&&d.length>0&&i.jsxs(i.Fragment,{children:[i.jsxs(z,{children:[i.jsxs(U,{children:[i.jsx(y,{style:{width:20,height:20,color:"#28a745"}}),i.jsx(F,{type:"text",placeholder:"Поиск услуг...",value:m,onChange:e=>g(e.target.value)})]}),i.jsx(o,{view:f,onViewChange:u})]}),"cards"===f?i.jsx(K,{services:c}):i.jsx(O,{services:c}),0===c.length&&i.jsxs(I,{children:[i.jsx(y,{style:{width:64,height:64,opacity:.5,color:"#28a745"}}),i.jsx("h3",{children:"Ничего не найдено"}),i.jsx("p",{children:"Попробуйте изменить параметры поиска"})]}),i.jsxs(G,{children:[i.jsx(T,{children:"Транспортные услуги оказываются на основании письменной заявки заказчика и оплаты с предоставлением квитанции об оплате."}),i.jsx(T,{children:"Прейскурант составлен согласно расчетам, калькуляциям, данным по транспортным  средствам и их техническим характеристикам, нормам расхода топлива, утвержденных действующими нормативными документами в Республике Беларусь."})]})]})]})};export{Q as default};
