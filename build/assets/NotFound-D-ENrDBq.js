import{u as t,j as i}from"./react-vendor-mP65msGK.js";import{d as e,m as a}from"./styled-DA0GsMuf.js";import{t as r,H as o,x as n,P as s}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const d=a`
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,x=a`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
`,p=a`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
`,h=a`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`,g=e.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 20px 40px;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
        padding: 60px 20px 40px;
    }
`,m=e.div`
    position: absolute;
    top: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(32, 201, 151, 0.1) 100%);
    border-radius: 50%;
    animation: ${h} 60s linear infinite;
    
    &::before {
        content: '';
        position: absolute;
        bottom: -150px;
        left: -200px;
        width: 500px;
        height: 500px;
        background: linear-gradient(135deg, rgba(32, 201, 151, 0.08) 0%, rgba(40, 167, 69, 0.08) 100%);
        border-radius: 50%;
    }
    
    @media (max-width: 768px) {
        width: 300px;
        height: 300px;
        top: -50px;
        right: -50px;
    }
`,l=e.div`
    max-width: 600px;
    text-align: center;
    position: relative;
    z-index: 2;
    animation: ${d} 0.8s ease-out;
    
    @media (max-width: 768px) {
        max-width: 90%;
    }
`,f=e.div`
    width: 140px;
    height: 140px;
    margin: 0 auto 30px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    animation: ${x} 4s ease-in-out infinite;
    box-shadow: 0 10px 40px rgba(40, 167, 69, 0.3);
    
    @media (max-width: 768px) {
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
        
        svg {
            width: 50px !important;
            height: 50px !important;
        }
    }
`,c=e.h1`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 8rem;
    font-weight: 800;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    line-height: 1;
    animation: ${p} 3s ease-in-out infinite;
    
    @media (max-width: 768px) {
        font-size: 5rem;
    }
`,b=e.h2`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #28a745;
    margin-bottom: 20px;
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`,w=e.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    line-height: 1.8;
    color: #6c757d;
    margin-bottom: 40px;
    
    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 30px;
    }
`,u=e.div`
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    
    @media (max-width: 768px) {
        gap: 10px;
    }
`,j=e.button`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    padding: 16px 32px;
    font-size: 1.1rem;
    font-weight: 600;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
    }
    
    &:active {
        transform: translateY(0);
    }
    
    @media (max-width: 768px) {
        padding: 14px 24px;
        font-size: 1rem;
    }
`,y=e(j)`
    background: white;
    color: #28a745;
    border: 2px solid #28a745;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.1);
    
    &:hover {
        background: rgba(40, 167, 69, 0.05);
        box-shadow: 0 6px 20px rgba(40, 167, 69, 0.15);
    }
`,v=()=>{const e=t();return i.jsxs(g,{children:[i.jsx(m,{}),i.jsxs(l,{children:[i.jsx(f,{children:i.jsx(r,{style:{width:80,height:80}})}),i.jsx(c,{children:"404"}),i.jsx(b,{children:"Страница не найдена"}),i.jsx(w,{children:"К сожалению, запрашиваемая страница не существует или была перемещена. Пожалуйста, вернитесь на главную страницу или свяжитесь с нами."}),i.jsxs(u,{children:[i.jsxs(j,{onClick:()=>e("/"),children:[i.jsx(o,{style:{width:20,height:20}}),"На главную"]}),i.jsxs(y,{onClick:()=>e(-1),children:[i.jsx(n,{style:{width:20,height:20}}),"Назад"]}),i.jsxs(y,{onClick:()=>e("/contacts"),children:[i.jsx(s,{style:{width:20,height:20}}),"Контакты"]})]})]})]})};export{v as default};
