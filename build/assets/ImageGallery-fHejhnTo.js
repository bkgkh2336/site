import{j as r}from"./react-vendor-mP65msGK.js";import{d as a}from"./styled-DA0GsMuf.js";const d=a.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    
    @media (max-width: 768px) {
        padding: 15px;
        gap: 15px;
    }
`,i=a.img`
    width: 100%;
    border-radius: 8px;
`,p=({images:a,altPrefix:p="Изображение"})=>r.jsx(d,{children:a.map((a,d)=>r.jsx(i,{src:a,alt:`${p} ${d+1}`,loading:"lazy"},d))});export{p as I};
