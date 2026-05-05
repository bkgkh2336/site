import{j as e}from"./react-vendor-mP65msGK.js";import{B as r}from"./Block-BD7PERss.js";import{B as t,T as a}from"./index-D7FjMF91.js";import{d as i}from"./styled-DA0GsMuf.js";import{P as o,j as n}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const s=i(t)`
    flex-direction: column;
    padding: 60px 20px;
    flex: 1;
`,l=i(t)`
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 60px 40px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 30px;
    box-shadow: 
        0 20px 60px rgba(40, 167, 69, 0.4),
        0 10px 30px rgba(32, 201, 151, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
    animation: heroGlow 3s ease-in-out infinite alternate;

    @keyframes heroGlow {
        0% {
            box-shadow: 
                0 20px 60px rgba(40, 167, 69, 0.4),
                0 10px 30px rgba(32, 201, 151, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        100% {
            box-shadow: 
                0 25px 70px rgba(40, 167, 69, 0.5),
                0 15px 40px rgba(32, 201, 151, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
    }

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -10%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
        border-radius: 50%;
        animation: float1 6s ease-in-out infinite;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -30%;
        left: -5%;
        width: 350px;
        height: 350px;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
        border-radius: 50%;
        animation: float2 8s ease-in-out infinite;
    }

    @keyframes float1 {
        0%, 100% {
            transform: translate(0, 0) scale(1);
        }
        50% {
            transform: translate(-20px, 20px) scale(1.1);
        }
    }

    @keyframes float2 {
        0%, 100% {
            transform: translate(0, 0) scale(1);
        }
        50% {
            transform: translate(20px, -20px) scale(0.9);
        }
    }
`,d=i.div`
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    box-shadow: 
        0 15px 45px rgba(0, 0, 0, 0.15),
        inset 0 2px 10px rgba(255, 255, 255, 0.3);
    animation: iconPulse 3s ease-in-out infinite;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        inset: -5px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1));
        z-index: -1;
        animation: rotate 10s linear infinite;
    }

    @keyframes iconPulse {
        0%, 100% {
            transform: scale(1);
            box-shadow: 
                0 15px 45px rgba(0, 0, 0, 0.15),
                inset 0 2px 10px rgba(255, 255, 255, 0.3);
        }
        50% {
            transform: scale(1.08);
            box-shadow: 
                0 20px 60px rgba(0, 0, 0, 0.2),
                inset 0 3px 15px rgba(255, 255, 255, 0.4);
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;i(t)`
    flex-direction: column;
    align-items: center;
    padding: 60px;
    background: 
        linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 100%),
        url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(40,167,69,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    border-radius: 25px;
    box-shadow: 
        0 20px 70px rgba(0, 0, 0, 0.12),
        0 10px 30px rgba(40, 167, 69, 0.08);
    border: 3px solid #e8f5e9;
    background-clip: padding-box;
    position: relative;
`;const p=i.div`
    display: flex;
    align-items: center;
    gap: 25px;
    font-size: 4.5rem;
    font-weight: 800;
    color: #28a745;
    padding: 30px 60px;
    background: 
        linear-gradient(135deg, rgba(40, 167, 69, 0.12), rgba(32, 201, 151, 0.08)),
        linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
    background-size: 100% 100%, 200% 200%;
    border-radius: 25px;
    border: 4px solid #28a745;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
    letter-spacing: 0.05em;
    text-shadow: 0 2px 10px rgba(40, 167, 69, 0.2);
    animation: shimmer 3s ease-in-out infinite;

    @keyframes shimmer {
        0%, 100% {
            background-position: 0% 0%, 0% 0%;
        }
        50% {
            background-position: 0% 0%, 100% 100%;
        }
    }

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150%;
        height: 150%;
        background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.6s ease;
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 15px 50px rgba(40, 167, 69, 0.3);
        border-color: #20c997;
        
        &::before {
            transform: translate(-50%, -50%) scale(1);
        }
    }

    @media (max-width: 768px) {
        font-size: 3rem;
        padding: 25px 40px;
        gap: 20px;
    }
`;i(t)`
    flex-direction: column;
    align-items: center;
    padding: 45px 30px;
    background: 
        linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 20px;
    box-shadow: 
        0 10px 40px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
    width: 100%;
    max-width: 400px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 2px solid rgba(40, 167, 69, 0.1);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(40, 167, 69, 0.1), transparent);
        transition: left 0.7s ease;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #28a745, #20c997);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s ease;
    }

    &:hover {
        transform: translateY(-15px) scale(1.02);
        box-shadow: 
            0 20px 60px rgba(40, 167, 69, 0.2),
            0 10px 30px rgba(32, 201, 151, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        border-color: #28a745;
        
        &::before {
            left: 100%;
        }

        &::after {
            transform: scaleX(1);
        }
        
        svg {
            transform: scale(1.2) rotate(10deg);
            filter: drop-shadow(0 5px 15px rgba(40, 167, 69, 0.4));
        }
    }

    svg {
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;const x=i(t)`
    flex-direction: column;
    padding: 50px;
    background: 
        linear-gradient(135deg, #ffffff 0%, #f8fffe 100%);
    border-radius: 25px;
    box-shadow: 
        0 15px 50px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
    border-left: 6px solid #28a745;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 6px;
        height: 100%;
        background: linear-gradient(180deg, #28a745, #20c997, #28a745);
        background-size: 100% 200%;
        animation: borderFlow 3s ease infinite;
    }

    @keyframes borderFlow {
        0%, 100% {
            background-position: 0% 0%;
        }
        50% {
            background-position: 0% 100%;
        }
    }

    &::after {
        content: '';
        position: absolute;
        top: -50%;
        right: -20%;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(40, 167, 69, 0.03) 0%, transparent 70%);
        border-radius: 50%;
    }

    &:hover {
        box-shadow: 
            0 20px 70px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        transform: translateX(8px);
        border-left-width: 8px;
    }
`,g=()=>e.jsx(s,{children:e.jsxs(r,{style:{flexDirection:"column",gap:40,maxWidth:"1200px",margin:"0 auto",width:"100%"},children:[e.jsxs(l,{children:[e.jsx(d,{children:e.jsx(o,{style:{width:"4rem",height:"4rem",color:"white"}})}),e.jsx(a,{bold:"bolder",style:{fontSize:"3rem",color:"white",textAlign:"center",textShadow:"0 2px 10px rgba(0,0,0,0.2)"},children:"Служба 115"}),e.jsx(a,{style:{fontSize:"1.2rem",color:"rgba(255,255,255,0.95)",textAlign:"center",maxWidth:"800px"},children:"Диспетчерская служба для приёма обращений и заявок граждан"}),e.jsx(r,{style:{width:"100%",height:"1px",backgroundColor:"rgba(255,255,255,0.3)",margin:"30px 0 20px"}}),e.jsx(a,{style:{fontSize:"1.2rem",color:"rgba(255,255,255,0.9)",marginBottom:"20px"},children:"Заявки и претензии подаются по номеру"}),e.jsxs(p,{style:{color:"white",border:"4px solid white",background:"linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))",backdropFilter:"blur(10px)"},children:[e.jsx(o,{style:{width:"2.5rem",height:"2.5rem",color:"white"}}),"115"]}),e.jsxs(r,{style:{flexDirection:"column",gap:20,marginTop:"30px",alignItems:"center"},children:[e.jsx(r,{style:{flexDirection:"column",alignItems:"center",gap:8},children:e.jsx(a,{style:{fontSize:"0.95rem",color:"rgba(255,255,255,0.8)",textAlign:"center"},children:"Короткий телефонный номер"})}),e.jsx(r,{style:{width:"60px",height:"2px",backgroundColor:"rgba(255,255,255,0.3)"}}),e.jsxs(r,{style:{flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx(n,{style:{width:"1.8rem",height:"1.8rem",color:"white"}}),e.jsx(a,{bold:"bolder",style:{fontSize:"1.1rem",color:"white"},children:"Круглосуточно"}),e.jsx(a,{style:{fontSize:"0.9rem",color:"rgba(255,255,255,0.85)",textAlign:"center"},children:"Служба работает 24/7"})]})]})]}),e.jsxs(x,{children:[e.jsx(a,{bold:"bolder",style:{fontSize:"1.5rem",color:"#28a745",marginBottom:"20px"},children:"О системе"}),e.jsx(a,{style:{fontSize:"1.05rem",lineHeight:"1.9",textAlign:"justify",color:"#444"},children:"В соответствии с Постановлением Совета Министров Республики Беларусь от 18.09.2019 № 628 создана и функционирует единая информационная система АС «Диспетчерская служба» для работы с обращениями и заявками граждан по вопросам жилищно-коммунального и городского хозяйства."}),e.jsx(a,{style:{fontSize:"1.05rem",lineHeight:"1.9",textAlign:"justify",color:"#444",marginTop:"15px"},children:"Единая производительная база данных позволяет собирать аналитическую информацию, необходимую для успешной деятельности, и обеспечивает удобную обратную связь при работе с исполнителями."})]})]})});export{g as default};
