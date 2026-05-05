import{j as i}from"./react-vendor-mP65msGK.js";import{d as r,m as e}from"./styled-DA0GsMuf.js";const t=e`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,a=e`
    0%, 100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
`,o=r.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`,n=r.div`
    position: relative;
    background-color: white;
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    animation: ${t} 0.6s ease-out;
    
    &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 16px 48px rgba(40, 167, 69, 0.2);
        border-color: #28a745;
        
        & > div:first-child {
            opacity: 1;
        }
    }
`,s=r.div`
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(40, 167, 69, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    animation: ${a} 3s ease-in-out infinite;
`,d=r.div`
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
`,l=r.h3`
    font-size: 1.15rem;
    font-weight: 600;
    color: #212529;
    margin: 0 0 20px 0;
    line-height: 1.5;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 50px;
`,h=r.div`
    display: flex;
    flex-direction: column;
`,c=r.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`,p=r.span`
    font-size: 0.85rem;
    color: #6c757d;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`,x=r.span`
    font-size: ${i=>i.$highlight?"1.3rem":"1.1rem"};
    font-weight: 700;
    color: ${i=>i.$highlight?"#28a745":"#212529"};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`,g=({services:r,priceUnit:e})=>{const t=i=>new Intl.NumberFormat("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2}).format(i);return i.jsx(o,{children:r.map((r,a)=>i.jsxs(n,{children:[i.jsx(s,{}),i.jsxs(d,{children:["№",a+1]}),i.jsx(l,{children:r.name}),i.jsxs(h,{children:[i.jsxs(c,{children:[i.jsxs(p,{children:["Без НДС",r.unit?` (${r.unit})`:e?` ${e}`:""]}),i.jsxs(x,{children:[t(r.price_no_nds)," Br"]})]}),i.jsxs(c,{children:[i.jsxs(p,{children:["С НДС (20%)",r.unit?` (${r.unit})`:e?` ${e}`:""]}),i.jsxs(x,{$highlight:!0,children:[t(1.2*r.price_no_nds)," Br"]})]})]})]},r.id))})},m=e`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,f=r.div`
    width: 100%;
    overflow-x: auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    animation: ${m} 0.6s ease-out;
    
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
        border-radius: 12px;
        
        &::-webkit-scrollbar {
            height: 6px;
        }
    }
`,b=r.table`
    width: 100%;
    min-width: 700px;
    border-collapse: collapse;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    @media (max-width: 768px) {
        min-width: 600px;
    }
`,u=r.thead`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: #ffffff;
`,w=r.tr`
    transition: all 0.3s ease;
    
    &:not(:first-child):hover {
        background: rgba(40, 167, 69, 0.05);
    }
    
    &:not(:last-child) {
        border-bottom: 1px solid rgba(40, 167, 69, 0.1);
    }
`,j=r.th`
    padding: 18px 24px;
    text-align: left;
    font-weight: 700;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    &:first-child {
        border-top-left-radius: 16px;
        width: 60px;
        text-align: center;
    }
    
    &:last-child {
        border-top-right-radius: 16px;
        text-align: right;
    }
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: 0.85rem;
        
        &:first-child {
            border-top-left-radius: 12px;
        }
        
        &:last-child {
            border-top-right-radius: 12px;
        }
    }
`,v=r.td`
    padding: 18px 24px;
    color: ${i=>i.$highlight?"#28a745":"#212529"};
    font-weight: ${i=>i.$highlight?"700":"500"};
    font-size: ${i=>i.$highlight?"1.05rem":"0.95rem"};
    
    &:first-child {
        text-align: center;
        font-weight: 600;
        color: #6c757d;
    }
    
    &:last-child {
        text-align: right;
    }
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: ${i=>i.$highlight?"0.95rem":"0.85rem"};
    }
`,$=({services:r,priceUnit:e,showUnitColumn:t=!1})=>{const a=i=>new Intl.NumberFormat("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2}).format(i);return i.jsx(f,{children:i.jsxs(b,{children:[i.jsx(u,{children:i.jsxs(w,{children:[i.jsx(j,{children:"№"}),i.jsx(j,{children:"Наименование услуги"}),t&&i.jsx(j,{children:"Ед. изм."}),i.jsxs(j,{children:["Цена без НДС",!t&&e?` ${e}`:""," (Br)"]}),i.jsxs(j,{children:["Цена с НДС 20%",!t&&e?` ${e}`:""," (Br)"]})]})}),i.jsx("tbody",{children:r.map((r,e)=>i.jsxs(w,{children:[i.jsx(v,{children:e+1}),i.jsx(v,{children:r.name}),t&&i.jsx(v,{children:r.unit||"-"}),i.jsx(v,{children:a(r.price_no_nds)}),i.jsx(v,{$highlight:!0,children:a(1.2*r.price_no_nds)})]},r.id))})]})})};export{g as S,$ as a};
