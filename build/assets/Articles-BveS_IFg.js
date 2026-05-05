import{u as e,j as i}from"./react-vendor-mP65msGK.js";import{d as a}from"./styled-DA0GsMuf.js";import{H as t}from"./H1-9kKnwnEv.js";import{m as r}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const n=a.div`
    max-width: 90%;
    width: 100%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media (max-width: 768px) {
        max-width: 95%;
        margin: 30px auto;
    }
    
    @media (max-width: 480px) {
        margin: 20px auto;
    }
`,o=a.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    width: 100%;
    margin-top: 20px;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`,s=a.div`
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 2px solid transparent;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        transform: scaleX(0);
        transition: transform 0.3s ease-in-out;
    }

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 40px rgba(40, 167, 69, 0.15);
        border-color: #28a745;
        
        &::before {
            transform: scaleX(1);
        }
    }

    &:active {
        transform: translateY(-4px);
    }
`,d=a.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    ${s}:hover & {
        transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
        height: 180px;
    }
`,p=a.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
    gap: 12px;
    
    @media (max-width: 768px) {
        padding: 20px;
    }
    
    @media (max-width: 480px) {
        padding: 16px;
    }
`,x=a.h3`
    font-family: 'Archivo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
    color: #28a745;
    line-height: 1.4;
    text-align: center;
    
    @media (max-width: 768px) {
        font-size: 1.15rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.1rem;
    }
`,l=a.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.9rem;
    color: #6c757d;
    padding: 8px 12px;
    background: rgba(40, 167, 69, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(40, 167, 69, 0.15);
    align-self: center;
    
    svg {
        flex-shrink: 0;
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        font-size: 0.85rem;
        padding: 6px 10px;
    }
    
    @media (max-width: 480px) {
        font-size: 0.8rem;
        padding: 5px 8px;
        gap: 4px;
        
        svg {
            width: 14px;
            height: 14px;
        }
    }
`,m=()=>{const a=e();return i.jsxs(n,{children:[i.jsx(t,{style:{marginBottom:"20px"},children:"Статьи"}),i.jsx(o,{children:[{title:"Профилактика и уход за котельными установками во время морозов",image:"/articles/prevention_and_maintenance_of_boiler_installations_during_frosts.jpg",url:"/news/articles/boiler_maintenance",publishedDate:"28.01.2026 19:00"}].map((e,t)=>i.jsxs(s,{onClick:()=>a(e.url),children:[i.jsx(d,{src:e.image,alt:e.title,loading:"lazy"}),i.jsxs(p,{children:[i.jsx(x,{children:e.title}),i.jsxs(l,{children:[i.jsx(r,{size:16}),i.jsx("span",{children:e.publishedDate})]})]})]},t))})]})};export{m as default};
