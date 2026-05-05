import{u as e,r as i,j as a}from"./react-vendor-mP65msGK.js";import{u as t}from"./usefulToKnowArticles-Du3xMxiB.js";import{d as n,m as r}from"./styled-DA0GsMuf.js";import{U as o,H as s,g as d,S as x,W as p,h as l,Z as m,i as g,F as h,D as c,j as f,k as b,l as w,m as u,n as j,o as z,P as v}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const y=r`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
`,k=r`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,S=n.div`
    width: 100%;
    animation: ${k} 0.6s ease-out;
    will-change: auto;
`,U=n.section`
    background: white;
    padding: 30px 40px 20px;
    border-bottom: 1px solid rgba(40, 167, 69, 0.1);
    
    @media (max-width: 768px) {
        padding: 20px 20px 15px;
    }
`,I=n.div`
    max-width: 1200px;
    margin: 0 auto;
`,L=n.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 15px;
    }
`,_=n.div`
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.05) 0%, rgba(32, 201, 151, 0.05) 100%);
    border: 1px solid rgba(40, 167, 69, 0.15);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(32, 201, 151, 0.1) 100%);
        border-color: rgba(40, 167, 69, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
    }
    
    @media (max-width: 768px) {
        padding: 15px;
    }
`,A=n.div`
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 45px;
        height: 45px;
    }
`,Y=n.div`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #28a745;
    
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`,C=n.section`
    background: #f8f9fa;
    padding: 30px 40px;
    border-bottom: 1px solid rgba(40, 167, 69, 0.1);
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`,$=n.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    
    @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`,M=n.div`
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-left: 4px solid #28a745;
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 4px 16px rgba(40, 167, 69, 0.15);
        transform: translateX(5px);
    }
    
    @media (max-width: 768px) {
        padding: 15px;
    }
`,T=n.div`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #28a745;
    margin-bottom: 12px;
    
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`,W=n.a`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    transition: color 0.3s ease;
    
    &:hover {
        color: #28a745;
    }
    
    svg {
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`,D=n.div`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.95rem;
    color: #6c757d;
    display: flex;
    align-items: center;
    gap: 6px;
    
    svg {
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`,F=n.section`
    background: white;
    padding: 30px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`,G=n.div`
    width: 90%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 768px) {
        border-radius: 12px;
    }
`,H=n.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.65) 0%,
        rgba(0, 0, 0, 0.55) 50%,
        rgba(0, 0, 0, 0.65) 100%
    );
    backdrop-filter: blur(2px);
    z-index: 2;
    
    @media (max-width: 968px) {
        padding: 30px 20px;
    }
    
    @media (max-width: 768px) {
        padding: 20px 12px;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.75) 0%,
            rgba(0, 0, 0, 0.65) 50%,
            rgba(0, 0, 0, 0.75) 100%
        );
    }
    
    @media (max-width: 480px) {
        padding: 15px 10px;
        background: rgba(0, 0, 0, 0.75);
    }
`,K=n.h2`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 20px;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    line-height: 1.2;
    
    @media (max-width: 968px) {
        font-size: 2rem;
        margin-bottom: 15px;
    }
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 12px;
    }
    
    @media (max-width: 480px) {
        font-size: 1.3rem;
        margin-bottom: 10px;
    }
`,P=n.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 12px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    max-width: 900px;
    
    @media (max-width: 968px) {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 10px;
    }
    
    @media (max-width: 768px) {
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 8px;
    }
    
    @media (max-width: 480px) {
        font-size: 0.85rem;
        line-height: 1.4;
        margin-bottom: 6px;
    }
`,V=n.a`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 15px;
    padding: 12px 28px;
    background: rgba(40, 167, 69, 0.9);
    border-radius: 50px;
    transition: all 0.3s ease;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    
    &:hover {
        background: rgba(32, 201, 151, 0.95);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }
    
    @media (max-width: 768px) {
        font-size: 0.95rem;
        padding: 10px 20px;
        margin-top: 10px;
    }
    
    @media (max-width: 480px) {
        font-size: 0.85rem;
        padding: 8px 16px;
        margin-top: 8px;
    }
`,X=n.img`
    width: 100%;
    height: auto;
    display: block;
    position: relative;
    z-index: 1;
    
    @media (max-width: 768px) {
        min-height: 500px;
        object-fit: cover;
    }
    
    @media (max-width: 480px) {
        min-height: 450px;
    }
`,Z=n.section`
    background: #e3f2fd;
    padding: 30px 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        padding: 20px;
    }
`,q=n.div`
    width: 90%;
    max-width: 1200px;
    background: #ffffff;
    border-radius: 16px;
    padding: 32px 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border-left: 6px solid #1976d2;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 28px rgba(21, 101, 192, 0.18);
    }

    @media (max-width: 768px) {
        padding: 20px 18px;
        border-radius: 12px;
        border-left-width: 4px;
    }
`,B=n.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
`,E=n.h2`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: #1565c0;
    margin: 0 0 12px 0;
    line-height: 1.3;

    @media (max-width: 768px) {
        font-size: 1.3rem;
        margin-bottom: 10px;
    }

    @media (max-width: 480px) {
        font-size: 1.15rem;
    }
`;n.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: #0d47a1;
    margin: 0 0 14px 0;

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 10px;
    }
`;const J=n.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.05rem;
    line-height: 1.6;
    color: #1a1a1a;
    margin: 0 0 14px 0;

    @media (max-width: 768px) {
        font-size: 0.95rem;
        line-height: 1.5;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`,N=n.span`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #1976d2;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;

    @media (max-width: 768px) {
        font-size: 0.95rem;
    }
`,O=n.section`
    position: relative;
    min-height: 600px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    display: flex;
    align-items: center;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('/main_2.png') center/cover;
        opacity: 0.15;
        mix-blend-mode: overlay;
    }
    
    @media (max-width: 768px) {
        min-height: 500px;
        padding: 40px 20px;
    }
`,Q=n.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 40px;
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    
    @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 40px;
        padding: 60px 30px;
    }
    
    @media (max-width: 768px) {
        padding: 40px 20px;
    }
`,R=n.div`
    color: white;
`,ee=n.h1`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 20px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 768px) {
        font-size: 2.2rem;
    }
`,ie=n.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.3rem;
    line-height: 1.6;
    margin-bottom: 35px;
    color: rgba(255, 255, 255, 0.95);
    
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`,ae=n.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`,te=n.button`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    padding: 16px 32px;
    font-size: 1.1rem;
    font-weight: 600;
    background: white;
    color: #28a745;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 10px;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        background: #f8f9fa;
    }
    
    @media (max-width: 768px) {
        padding: 14px 28px;
        font-size: 1rem;
    }
`,ne=n(te)`
    background: transparent;
    color: white;
    border: 2px solid white;
    
    &:hover {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    }
`,re=n.div`
    position: relative;
    
    img {
        width: 150%;    
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: ${y} 6s ease-in-out infinite;
    }
    
    @media (max-width: 968px) {
        display: none;
    }
`,oe=n.section`
    background: white;
    padding: 80px 40px;
    @media (max-width: 768px) {
        padding: 60px 20px;
    }
`,se=n.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    
    @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
    }
    
    @media (max-width: 768px) {
        gap: 20px;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`,de=n.div`
    text-align: center;
    padding: 30px;
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.05) 0%, rgba(32, 201, 151, 0.05) 100%);
    border-radius: 16px;
    border: 1px solid rgba(40, 167, 69, 0.1);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 220px;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(40, 167, 69, 0.1);
    }
    
    @media (max-width: 768px) {
        padding: 25px;
        min-height: 200px;
    }
    
    @media (max-width: 480px) {
        padding: 20px;
        min-height: 180px;
    }
`,xe=n.div`
    width: 70px;
    height: 70px;
    margin: 0 auto 20px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`,pe=n.div`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #28a745;
    margin-bottom: 10px;
`,le=n.div`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    color: #6c757d;
`,me=n.section`
    background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
    padding: 10px 40px;
    
    @media (max-width: 768px) {
        padding: 60px 20px;
    }
`,ge=n.h2`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    color: #28a745;
    margin-bottom: 20px;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`,he=n.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    text-align: center;
    color: #6c757d;
    margin-bottom: 60px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    
    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 40px;
        padding: 0 10px;
    }
`,ce=n.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    justify-content: center;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`,fe=n.div`
    background: white;
    padding: 35px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    will-change: transform;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 40px rgba(40, 167, 69, 0.15);
        
        ${xe} {
            transform: scale(1.1);
        }
    }
    
    @media (max-width: 768px) {
        padding: 25px;
    }
    
    @media (max-width: 480px) {
        padding: 20px;
    }
`,be=n.h3`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #28a745;
    margin-bottom: 15px;
`,we=n.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #6c757d;
    margin-bottom: 20px;
`,ue=n.span`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #28a745;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: gap 0.3s ease;
    
    ${fe}:hover & {
        gap: 12px;
    }
`,je=n.section`
        background: white;
        padding: 0px 40px;
    
    @media (max-width: 768px) {
        padding: 60px 20px;
    }
`,ze=n.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    
    @media (max-width: 768px) {
        gap: 30px;
    }
    
    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        gap: 25px;
    }
`,ve=n.div`
    text-align: center;
    padding: 30px;
    flex: 0 1 250px;
    
    ${xe} {
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    }
    
    @media (max-width: 768px) {
        flex: 0 1 200px;
    }
    
    @media (max-width: 480px) {
        flex: 1 1 100%;
        max-width: 100%;
    }
`,ye=n.h3`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #28a745;
    margin-bottom: 15px;
`,ke=n.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #6c757d;
`,Se=n.section`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    padding: 80px 40px;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -10%;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
        border-radius: 50%;
    }
    
    @media (max-width: 768px) {
        padding: 60px 20px;
    }
`,Ue=n.div`
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 2;
`,Ie=n.h2`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 20px;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`,Le=n.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 35px;
    
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`,_e=n.a`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    display: inline-flex;
    align-items: center;
    gap: 15px;
    font-size: 2rem;
    font-weight: 700;
    color: white;
    text-decoration: none;
    padding: 20px 40px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 50px;
    border: 2px solid white;
    transition: all 0.3s ease;
    
    &:hover {
        background: white;
        color: #28a745;
        transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
        padding: 16px 32px;
    }
`,Ae=n.section`
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 60px 40px;
    
    @media (max-width: 768px) {
        padding: 40px 20px;
    }
`,Ye=n.div`
    max-width: 1200px;
    margin: 0 auto;
`,Ce=n.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
`,$e=n.h2`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #212529;
    margin: 0;
    
    @media (max-width: 768px) {
        font-size: 1.6rem;
    }
`,Me=n.button`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #28a745;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0;
    transition: all 0.3s ease;
    
    &:hover {
        color: #1e7e34;
        gap: 12px;
    }
`,Te=n.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`,We=n.div`
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
`,De=n.img`
    width: 100%;
    height: 180px;
    object-fit: contain;
    
    @media (max-width: 768px) {
        height: 200px;
    }
`,Fe=n.h3`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #212529;
    padding: 16px;
    margin: 0;
    line-height: 1.4;
`,Ge=()=>{const n=e(),r=i.useMemo(()=>[{icon:a.jsx(o,{size:32}),number:"70+",label:"Лет опыта работы"},{icon:a.jsx(s,{size:32}),number:"500+",label:"Обслуживаемых домов"},{icon:a.jsx(d,{size:32}),number:"24/7",label:"Круглосуточная поддержка"},{icon:a.jsx(x,{size:32}),number:"100%",label:"Гарантия качества"}],[]),y=i.useMemo(()=>[{icon:a.jsx(p,{size:32}),title:"Услуги вентиляционных и дымовых каналов",description:"Профессиональная чистка и обслуживание вентиляционных систем",link:"/ventilation_services"},{icon:a.jsx(l,{size:32}),title:"Услуги по вывозу мусора",description:"Вывоз мусора на полигон собственным транспортом с последующим захоронением",link:"/waste_services"},{icon:a.jsx(m,{size:32}),title:"Услуги по электрофизическим измерениям",description:"Измерительная лаборатория энергетической службы для населения",link:"/electro_services"},{icon:a.jsx(g,{size:32}),title:"Услуги по скашиванию травы",description:"Скашивание газонов ручным моторизированным инструментом",link:"/grass_services"},{icon:a.jsx(h,{size:32}),title:"Услуги по отоплению населению",description:"Надежное теплоснабжение и обслуживание отопительных систем",link:"/heating_services"},{icon:a.jsx(c,{size:32}),title:"Услуги по водопроводу и канализации населению",description:"Качественные услуги по обеспечению водоснабжения и водоотведения",link:"/plumbing_services"}],[]),k=i.useMemo(()=>[{icon:a.jsx(f,{size:32}),title:"Оперативность",description:"Быстрое реагирование на заявки и устранение неисправностей"},{icon:a.jsx(d,{size:32}),title:"Профессионализм",description:"Квалифицированные специалисты с большим опытом работы"},{icon:a.jsx(b,{size:32}),title:"Поддержка",description:"Круглосуточная диспетчерская служба и техническая поддержка"}],[]),Ge=i.useMemo(()=>[{icon:a.jsx(w,{size:28}),title:"База документов",url:"/documents"},{icon:a.jsx(u,{size:28}),title:"График приёма",url:"/schedule_forms"},{icon:a.jsx(j,{size:28}),title:"Оплата по ЕРИП",url:"/payment"}],[]),He=i.useMemo(()=>[{title:"Приёмная",phone:"+375 2336 7-45-07",phoneLink:"tel:+375233674507",schedule:"пн-пт с 9:00 до 17:00"},{title:"Диспетчерская",phone:"115",phoneLink:"tel:115",schedule:"круглосуточно"},{title:"Абонентский отдел",phone:"+375 2336 2-51-38",phoneLink:"tel:+375233625138",schedule:"пн-пт с 9:00 до 17:00"}],[]);return a.jsxs(S,{children:[a.jsx(O,{children:a.jsxs(Q,{children:[a.jsxs(R,{children:[a.jsx(ee,{children:'КЖУП "Буда-Кошелёвский коммунальник"'}),a.jsx(ie,{children:"Надежный партнер в сфере жилищно-коммунальных услуг. Обеспечиваем комфорт и безопасность вашего дома."}),a.jsxs(ae,{children:[a.jsxs(te,{onClick:()=>n("/services"),children:["Наши услуги",a.jsx(z,{size:20})]}),a.jsx(ne,{onClick:()=>n("/contacts"),children:"Контакты"})]})]}),a.jsx(re,{children:a.jsx("img",{src:"/main.png",alt:"main.pg",loading:"lazy"})})]})}),a.jsx(U,{children:a.jsx(I,{children:a.jsx(L,{children:Ge.map((e,i)=>a.jsxs(_,{onClick:()=>n(e.url),children:[a.jsx(A,{children:e.icon}),a.jsx(Y,{children:e.title})]},i))})})}),a.jsx(C,{children:a.jsx($,{children:He.map((e,i)=>a.jsxs(M,{children:[a.jsx(T,{children:e.title}),a.jsxs(W,{href:e.phoneLink,children:[a.jsx(v,{size:18}),e.phone]}),a.jsxs(D,{children:[a.jsx(f,{size:16}),e.schedule]})]},i))})}),a.jsx(F,{children:a.jsxs(G,{children:[a.jsx(X,{src:"/2026.jpg",alt:"2026 - Год белорусской женщины",loading:"lazy",width:"1200",height:"400"}),a.jsxs(H,{children:[a.jsx(K,{children:"2026 — Год белорусской женщины"}),a.jsx(P,{children:"Президент Беларуси Александр Лукашенко подписал Указ № 1, которым 2026 год объявлен Годом белорусской женщины."}),a.jsx(P,{children:"Документ принят в целях формирования национального образа женщины-труженицы, популяризации роли женщин в сохранении и развитии общества."}),a.jsxs(V,{href:"https://buda-koshelevo.gov.by/ru/2026-ru",target:"_blank",rel:"noopener noreferrer",children:["Подробнее ",a.jsx(z,{size:16})]})]})]})}),a.jsx(Z,{children:a.jsx(q,{onClick:()=>window.open("/documents/profsouz_priem.pdf","_blank","noopener,noreferrer"),children:a.jsxs(B,{children:[a.jsx(E,{children:"📅 Республиканский профсоюзный правовой прием граждан"}),a.jsx(J,{style:{fontSize:"18px",fontWeight:500,color:"#0d47a1"},children:"В Гомельской области"}),a.jsx(J,{children:"Прием будет проводиться 30 апреля 2026 года. Юристы профсоюза окажут бесплатную юридическую помощь по вопросам трудового законодательства, социального обеспечения, жилищных и других прав граждан."}),a.jsxs(N,{children:["Подробнее и график приема ",a.jsx(z,{size:16})]})]})})}),a.jsx(oe,{children:a.jsx(se,{children:r.map((e,i)=>a.jsxs(de,{children:[a.jsx(xe,{children:e.icon}),a.jsx(pe,{children:e.number}),a.jsx(le,{children:e.label})]},i))})}),a.jsxs(me,{children:[a.jsx(ge,{children:"Наши услуги"}),a.jsx(he,{children:"Полный спектр жилищно-коммунальных услуг для вашего комфорта"}),a.jsx(ce,{children:y.map((e,i)=>a.jsxs(fe,{onClick:()=>n(e.link),children:[a.jsx(xe,{children:e.icon}),a.jsx(be,{children:e.title}),a.jsx(we,{children:e.description}),a.jsxs(ue,{children:["Подробнее ",a.jsx(z,{size:16})]})]},i))})]}),a.jsxs(je,{children:[a.jsx(ge,{children:"Почему выбирают нас"}),a.jsx(he,{children:"Мы гордимся качеством предоставляемых услуг и доверием наших клиентов"}),a.jsx(ze,{children:k.map((e,i)=>a.jsxs(ve,{children:[a.jsx(xe,{children:e.icon}),a.jsx(ye,{children:e.title}),a.jsx(ke,{children:e.description})]},i))})]}),a.jsx(Ae,{children:a.jsxs(Ye,{children:[a.jsxs(Ce,{children:[a.jsx($e,{children:"Полезно знать"}),a.jsxs(Me,{onClick:()=>n("/news/useful_to_know"),children:["Все материалы ",a.jsx(z,{size:18})]})]}),a.jsx(Te,{children:t.slice(t.length-4,t.length).map((e,i)=>a.jsxs(We,{onClick:()=>{e.externalUrl?window.open(e.externalUrl,"_blank","noopener,noreferrer"):e.url&&n(`/news/useful_to_know/${e.url}`)},children:[a.jsx(De,{src:e.image,alt:e.title,loading:"lazy"}),a.jsx(Fe,{children:e.title})]},i))})]})}),a.jsx(Se,{children:a.jsxs(Ue,{children:[a.jsx(Ie,{children:"Аварийно-диспетчерская служба"}),a.jsx(Le,{children:"Круглосуточная поддержка при возникновении аварийных ситуаций"}),a.jsxs(_e,{href:"tel:+375233674507",children:[a.jsx(v,{size:28}),"115"]})]})})]})};export{Ge as default};
