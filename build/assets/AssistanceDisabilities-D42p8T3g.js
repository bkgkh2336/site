import{j as e}from"./react-vendor-mP65msGK.js";import{H as i}from"./H1-9kKnwnEv.js";import{T as t}from"./index-D7FjMF91.js";import{d as r,m as a}from"./styled-DA0GsMuf.js";import{P as o}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const n=a`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,d=r.div`
    max-width: 90%;
    width: 100%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    animation: ${n} 0.6s ease-out;
    min-height: 60vh;
    
    @media (max-width: 768px) {
        max-width: 95%;
        margin: 20px auto;
        gap: 20px;
    }
`,s=r.div`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 16px;
    padding: 40px;
    color: white;
    box-shadow: 0 10px 40px rgba(40, 167, 69, 0.2);
    
    @media (max-width: 768px) {
        padding: 30px;
        border-radius: 12px;
    }
`,x=r.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
    
    @media (max-width: 768px) {
        padding: 40px 25px;
        border-radius: 12px;
    }
`,l=()=>e.jsxs(d,{children:[e.jsx(i,{children:"Помощь инвалидам"}),e.jsx(s,{children:e.jsx(t,{style:{fontSize:"1.1rem",lineHeight:"1.8",textAlign:"center",color:"white"},children:'Коммунальное жилищное унитарное предприятие "Буда-Кошелевский коммунальник" предоставляет различную помощь инвалидам.'})}),e.jsxs(x,{children:[e.jsx(o,{style:{width:"3rem",height:"3rem",color:"#28a745"}}),e.jsx(t,{style:{fontSize:"1.2rem",marginBottom:"10px",display:"block",textAlign:"center"},children:"Для получения консультации и помощи необходимо обратиться по номеру телефона:"}),e.jsx("a",{href:"tel:+375233674507",style:{fontSize:"2rem",fontWeight:"bold",color:"#28a745",textDecoration:"none",display:"block",textAlign:"center"},children:"8(02336) 7-45-07"})]})]});export{l as default};
