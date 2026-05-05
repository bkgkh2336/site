import{j as r}from"./react-vendor-mP65msGK.js";import{d as a,m as e}from"./styled-DA0GsMuf.js";const t=e`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,o=a.div`
    width: 100%;
    overflow-x: auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    animation: ${t} 0.6s ease-out;
    
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
`,i=a.table`
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    @media (max-width: 768px) {
        min-width: 500px;
    }
`,d=a.thead`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
`,s=a.th`
    padding: 18px 24px;
    text-align: left;
    font-weight: 700;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #ffffff;
    
    &:first-child {
        border-top-left-radius: 16px;
    }
    
    &:last-child {
        border-top-right-radius: 16px;
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
`,l=a.tr`
    transition: all 0.3s ease;
    
    &:not(:first-child):hover {
        background: rgba(40, 167, 69, 0.05);
    }
    
    &:not(:last-child) {
        border-bottom: 1px solid rgba(40, 167, 69, 0.1);
    }
`,p=a.td`
    padding: 18px 24px;
    color: #212529;
    font-weight: 500;
    font-size: 0.95rem;
    
    &:first-child {
        font-weight: 600;
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: 0.85rem;
    }
`,n=({columns:a,data:e})=>r.jsx(o,{children:r.jsxs(i,{children:[r.jsx(d,{children:r.jsx(l,{children:a.map((a,e)=>r.jsx(s,{children:a.header},e))})}),r.jsx("tbody",{children:e.map((e,t)=>r.jsx(l,{children:a.map((a,t)=>r.jsx(p,{children:a.render?a.render(e[a.key],e):e[a.key]},t))},t))})]})});export{n as T};
