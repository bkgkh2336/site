import{j as a}from"./react-vendor-mP65msGK.js";import{d as e}from"./styled-DA0GsMuf.js";import{L as r,y as i}from"./icons-CVa_ZadQ.js";const t=e.div`
    display: flex;
    gap: 12px;
    padding: 6px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.1);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
    width: fit-content;
    
    @media (max-width: 768px) {
        width: 100%;
        gap: 8px;
    }
`,o=e.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: ${a=>a.$active?"#28a745":"transparent"};
    color: ${a=>a.$active?"#ffffff":"#6c757d"};
    border: none;
    border-radius: 8px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: ${a=>a.$active?"#218838":"rgba(40, 167, 69, 0.1)"};
        color: ${a=>a.$active?"#ffffff":"#28a745"};
    }
    
    &:active {
        transform: scale(0.98);
    }
    
    @media (max-width: 768px) {
        flex: 1;
        justify-content: center;
        padding: 10px 16px;
        font-size: 0.9rem;
    }
`,s=({view:e,onViewChange:s})=>a.jsxs(t,{children:[a.jsxs(o,{$active:"cards"===e,onClick:()=>s("cards"),children:[a.jsx(r,{style:{width:20,height:20}}),"Карточки"]}),a.jsxs(o,{$active:"table"===e,onClick:()=>s("table"),children:[a.jsx(i,{style:{width:20,height:20}}),"Таблица"]})]});export{s as V};
