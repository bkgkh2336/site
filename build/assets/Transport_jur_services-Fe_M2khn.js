import{u as e,r as i,j as a}from"./react-vendor-mP65msGK.js";import{G as r}from"./functions-CCafmNLR.js";import{H as t}from"./H1-9kKnwnEv.js";import{L as n}from"./index-D7FjMF91.js";import{V as o}from"./ViewToggle-C3Ap3URn.js";import{d as s,m as d}from"./styled-DA0GsMuf.js";import{x as l,v as p,t as x}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const c=d`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,h=d`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
`,m=s.div`
    width: 90%;
    max-width: 1400px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    animation: ${c} 0.6s ease-out;
    
    @media (max-width: 768px) {
        width: 95%;
        margin: 20px auto;
        gap: 20px;
    }
`,g=s.button`
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
`,f=s.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    @media (max-width: 768px) {
        gap: 15px;
        margin-bottom: 5px;
    }
`,b=s.div`
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
`,u=s.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
    }
`,j=s.div`
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
`,w=s.input`
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
`,v=s.div`
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
    animation: ${c} 0.6s ease-out;
    
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
`,y=s.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 20px;
    animation: ${c} 0.6s ease-out;
`,k=s.div`
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
`,$=d`
    0%, 100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
`,S=s.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`,z=s.div`
    position: relative;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    animation: ${c} 0.6s ease-out;
    
    &:hover {
        box-shadow: 0 16px 48px rgba(40, 167, 69, 0.2);
        border-color: #28a745;
        
        & > div:first-child {
            opacity: 1;
        }
    }
`,V=s.div`
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(40, 167, 69, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    animation: ${$} 3s ease-in-out infinite;
`,U=s.div`
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
`,I=s.h3`
    font-size: 1.15rem;
    font-weight: 600;
    color: #212529;
    margin: 0 0 20px 0;
    line-height: 1.5;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 50px;
`,G=s.div`
    display: flex;
    flex-direction: column;
`,T=s.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`,F=s.span`
    font-size: 0.85rem;
    color: #6c757d;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`,L=s.span`
    font-size: ${e=>e.$highlight?"1.3rem":"1.1rem"};
    font-weight: 700;
    color: ${e=>e.$highlight?"#28a745":"#212529"};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`,B=s.div`
    width: 100%;
    overflow-x: auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    animation: ${c} 0.6s ease-out;
    
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
`,C=s.table`
    width: 100%;
    min-width: 800px;
    border-collapse: collapse;
    
    @media (max-width: 768px) {
        min-width: 700px;
    }
`,E=s.thead`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
`,Y=s.tr`
    transition: background-color 0.2s ease;
    
    &:hover,
    &.group-hover {
        background-color: rgba(40, 167, 69, 0.05);
    }
`,D=s.th`
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
`,_=s.td`
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
`;s.div`
    margin-bottom: 8px;
    
    &:last-child {
        margin-bottom: 0;
    }
`;const q=({services:e})=>{const i=e=>new Intl.NumberFormat("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e);return a.jsx(S,{children:e.map((e,r)=>a.jsxs(z,{children:[a.jsx(V,{}),a.jsxs(U,{children:["№",r+1]}),a.jsx(I,{children:e.name}),a.jsx(G,{children:e.variants.map((r,t)=>a.jsxs("div",{style:{marginBottom:t<e.variants.length-1?"12px":"0"},children:[a.jsxs(T,{children:[a.jsxs(F,{children:["Без НДС (",r.unit,")"]}),a.jsxs(L,{children:[i(r.price)," Br"]})]}),a.jsxs(T,{children:[a.jsxs(F,{children:["С НДС 20% (",r.unit,")"]}),a.jsxs(L,{$highlight:!0,children:[i(1.2*r.price)," Br"]})]})]},t))})]},e.id))})},A=({services:e})=>{const i=e=>new Intl.NumberFormat("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e);return a.jsx(B,{children:a.jsxs(C,{children:[a.jsx(E,{children:a.jsxs(Y,{children:[a.jsx(D,{children:"№"}),a.jsx(D,{children:"Наименование транспорта"}),a.jsx(D,{children:"Ед. изм."}),a.jsx(D,{children:"Цена без НДС (Br)"}),a.jsx(D,{children:"Цена с НДС 20% (Br)"})]})}),a.jsx("tbody",{children:e.map((e,r)=>e.variants.map((t,n)=>a.jsxs(Y,{"data-group-id":e.id,onMouseEnter:()=>{document.querySelectorAll(`tr[data-group-id="${e.id}"]`).forEach(e=>e.classList.add("group-hover"))},onMouseLeave:()=>{document.querySelectorAll(`tr[data-group-id="${e.id}"]`).forEach(e=>e.classList.remove("group-hover"))},children:[0===n&&a.jsxs(a.Fragment,{children:[a.jsx(_,{rowSpan:e.variants.length,children:r+1}),a.jsx(_,{rowSpan:e.variants.length,children:e.name})]}),a.jsx(_,{children:t.unit}),a.jsx(_,{children:i(t.price)}),a.jsx(_,{$highlight:!0,children:i(1.2*t.price)})]},`${e.id}-${n}`)))})]})})},H=()=>{const s=e(),[d,c]=i.useState([]),[h,$]=i.useState([]),[S,z]=i.useState(!1),[V,U]=i.useState(""),[I,G]=i.useState("cards");return i.useEffect(()=>{(async()=>{z(!0);try{const e=await r("transport_jur"),i=await r("transport_price_jur");if(!e||!i)return c([]),void $([]);const a=e.map(e=>{const a=i.filter(i=>i.id_transport===e.id);return{id:e.id,name:e.name,variants:a.map(e=>({unit:e.unit,price:e.price}))}}).filter(e=>e.variants.length>0);c(a),$(a)}catch(e){c([]),$([])}finally{z(!1)}})()},[]),i.useEffect(()=>{const e=d.filter(e=>e.name.toLowerCase().includes(V.toLowerCase()));$(e)},[V,d]),a.jsxs(m,{children:[a.jsxs(g,{onClick:()=>s("/services"),children:[a.jsx(l,{style:{width:20,height:20}}),"Назад к услугам"]}),a.jsxs(f,{children:[a.jsx(b,{children:a.jsx(p,{style:{width:40,height:40,color:"#28a745"}})}),a.jsx(t,{children:"Транспортные услуги для юридических лиц"})]}),S&&a.jsx(n,{}),!S&&0===d.length&&a.jsxs(v,{children:[a.jsx(p,{style:{width:64,height:64,opacity:.5,color:"#28a745"}}),a.jsx("h3",{children:"Услуги не найдены"}),a.jsx("p",{children:"В данный момент список услуг пуст"})]}),!S&&d.length>0&&a.jsxs(a.Fragment,{children:[a.jsxs(u,{children:[a.jsxs(j,{children:[a.jsx(x,{style:{width:20,height:20,color:"#28a745"}}),a.jsx(w,{type:"text",placeholder:"Поиск услуг...",value:V,onChange:e=>U(e.target.value)})]}),a.jsx(o,{view:I,onViewChange:G})]}),"cards"===I?a.jsx(q,{services:h}):a.jsx(A,{services:h}),0===h.length&&a.jsxs(v,{children:[a.jsx(x,{style:{width:64,height:64,opacity:.5,color:"#28a745"}}),a.jsx("h3",{children:"Ничего не найдено"}),a.jsx("p",{children:"Попробуйте изменить параметры поиска"})]}),a.jsxs(y,{children:[a.jsx(k,{children:"Прейскурант составлен согласно расчетам, калькуляциям, данным по транспортным  средствам и их техническим характеристикам, нормам расхода топлива, утвержденных действующими нормативными документами в Республике Беларусь."}),a.jsx(k,{children:'Дополнительные платные (транспортные) услуги осуществляются по заявительному принципу, согласно письменному заявлению заказчика, зарегистрированного в приемной КЖУП "Буда-Кошелевский коммунальник" и подписанного руководителем предприятия.'})]})]})]})};export{H as default};
