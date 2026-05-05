import{u as a,j as r}from"./react-vendor-mP65msGK.js";import{d as e,m as o}from"./styled-DA0GsMuf.js";import{x as t}from"./icons-CVa_ZadQ.js";const s=o`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,i=e.div`
    width: 85%;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    animation: ${s} 0.6s ease-out;
    
    @media (max-width: 768px) {
        width: 95%;
        margin: 15px auto;
        gap: 15px;
    }
`,n=e.button`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    background: rgba(40, 167, 69, 0.1);
    border: 2px solid #28a745;
    border-radius: 12px;
    color: #28a745;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    align-self: flex-start;
    
    &:hover {
        background: #28a745;
        color: white;
    }
`,l=({children:e,backUrl:o="/news/useful_to_know",backText:s="Вернуться к списку"})=>{const l=a();return r.jsxs(i,{children:[r.jsxs(n,{onClick:()=>l(o),children:[r.jsx(t,{style:{width:"1.2rem",height:"1.2rem"}}),s]}),e]})};export{l as A};
