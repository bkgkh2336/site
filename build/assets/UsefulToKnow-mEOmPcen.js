import{u as r,j as a}from"./react-vendor-mP65msGK.js";import{H as e}from"./H1-9kKnwnEv.js";import{u as o}from"./usefulToKnowArticles-Du3xMxiB.js";import{d as i,m as t}from"./styled-DA0GsMuf.js";import"./vendor-DOAUwEz1.js";const n=t`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,s=i.div`
    max-width: 90%;
    width: 100%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    animation: ${n} 0.6s ease-out;
    
    @media (max-width: 768px) {
        max-width: 95%;
        margin: 20px auto;
    }
`,d=i.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`,l=i.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 48px rgba(40, 167, 69, 0.2);
        border-color: #28a745;
    }
`,p=i.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    
    @media (max-width: 768px) {
        height: 200px;
    }
`,m=i.h3`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #212529;
    padding: 20px;
    margin: 0;
    line-height: 1.4;
    
    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 15px;
    }
`,x=()=>{const i=r();return a.jsxs(s,{children:[a.jsx(e,{style:{marginBottom:"20px"},children:"Полезно знать"}),a.jsx(d,{children:o.map((r,e)=>a.jsxs(l,{onClick:()=>{r.externalUrl?window.open(r.externalUrl,"_blank","noopener,noreferrer"):r.url&&i(`/news/useful_to_know/${r.url}`)},children:[a.jsx(p,{src:r.image,alt:r.title,loading:"lazy"}),a.jsx(m,{children:r.title})]},e))})]})};export{x as default};
