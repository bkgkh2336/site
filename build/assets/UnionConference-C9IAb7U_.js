import{r as e,j as i}from"./react-vendor-mP65msGK.js";import{d as a}from"./styled-DA0GsMuf.js";import{H as t}from"./H1-9kKnwnEv.js";import{X as r,Q as n,f as o,m as x,V as d,Y as s,I as p}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const l=a.div`
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
`,g=a.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.95rem;
    color: #6c757d;
    margin-bottom: 20px;
    padding: 10px 16px;
    background: rgba(40, 167, 69, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(40, 167, 69, 0.15);
    align-self: flex-start;
    
    svg {
        flex-shrink: 0;
        color: #28a745;
    }
    
    span {
        font-weight: 500;
    }
    
    @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 8px 14px;
    }
    
    @media (max-width: 480px) {
        font-size: 0.85rem;
        padding: 6px 12px;
        gap: 6px;
        
        svg {
            width: 14px;
            height: 14px;
        }
    }
`,m=a.div`
    width: 100%;
    background: transparent;
    line-height: 1.6;
`,h=a.img`
    width: 100%;
    max-width: 450px;
    max-height: 300px;
    object-fit: cover;
    height: auto;
    border-radius: 12px;
    margin-bottom: 30px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 768px) {
        margin-bottom: 25px;
    }
`;a.div`
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.08) 0%, rgba(32, 201, 151, 0.08) 100%);
    border-left: 5px solid #28a745;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    gap: 20px;
    
    @media (max-width: 768px) {
        padding: 20px;
        gap: 15px;
    }
    
    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`,a.div`
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
    
    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
        
        svg {
            width: 32px;
            height: 32px;
        }
    }
`;const c=a.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    color: #333;
    margin-bottom: 20px;
    text-align: justify;
    line-height: 1.8;
    
    strong {
        color: #28a745;
        font-weight: 700;
    }
    
    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.7;
    }
    
    @media (max-width: 480px) {
        font-size: 0.95rem;
        text-align: left;
    }
`,f=a.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 25px;
    text-align: justify;
    line-height: 1.8;
    
    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.15rem;
        text-align: left;
    }
`,b=a.h2`
    font-family: 'Archivo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #28a745;
    margin: 30px 0 25px 0;
    display: flex;
    align-items: center;
    gap: 12px;
    
    @media (max-width: 768px) {
        font-size: 1.4rem;
        margin: 25px 0 20px 0;
    }
    
    @media (max-width: 480px) {
        font-size: 1.2rem;
        margin: 20px 0 15px 0;
    }
`,w=a.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
    
    @media (max-width: 768px) {
        gap: 15px;
    }
`,u=a.div`
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 25px;
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.03) 0%, rgba(32, 201, 151, 0.03) 100%);
    border: 2px solid rgba(40, 167, 69, 0.15);
    border-radius: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    &:hover {
        background: linear-gradient(135deg, rgba(40, 167, 69, 0.06) 0%, rgba(32, 201, 151, 0.06) 100%);
        border-color: #28a745;
        transform: translateX(5px);
        box-shadow: 0 4px 15px rgba(40, 167, 69, 0.15);
    }
    
    @media (max-width: 768px) {
        padding: 20px;
        gap: 15px;
    }
    
    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 16px;
    }
`,j=a.div`
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.25);
    
    @media (max-width: 768px) {
        width: 50px;
        height: 50px;
        
        svg {
            width: 20px;
            height: 20px;
        }
    }
`,v=a.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`,y=a.h3`
    font-family: 'Archivo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #28a745;
    margin: 0;
    line-height: 1.4;
    
    @media (max-width: 768px) {
        font-size: 1.15rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.1rem;
    }
`,z=a.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    color: #555;
    margin: 0;
    line-height: 1.6;
    
    @media (max-width: 768px) {
        font-size: 0.95rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`,k=a.div`
    margin: 30px 0;
    
    & > ${b}:first-child {
        margin-top: 0;
    }
`,I=a.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    
    @media (max-width: 768px) {
        gap: 15px;
    }
`,_=a.div`
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 20px;
    background: rgba(40, 167, 69, 0.03);
    border-radius: 12px;
    border-left: 4px solid #28a745;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(40, 167, 69, 0.06);
        transform: translateX(5px);
        box-shadow: 0 2px 8px rgba(40, 167, 69, 0.1);
    }
    
    @media (max-width: 768px) {
        padding: 15px;
        gap: 15px;
    }
    
    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 12px;
    }
`,U=a.div`
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.25);
    
    @media (max-width: 768px) {
        width: 45px;
        height: 45px;
        font-size: 1.2rem;
    }
    
    @media (max-width: 480px) {
        width: 40px;
        height: 40px;
        font-size: 1.1rem;
    }
`,C=a.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.05rem;
    color: #333;
    margin: 0;
    line-height: 1.7;
    flex: 1;
    @media (max-width: 768px) {
        font-size: 1rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.95rem;
    }
`,S=a.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 40px 0;
    
    @media (max-width: 768px) {
        gap: 15px;
        margin: 30px 0;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 12px;
        margin: 25px 0;
    }
`,L=a.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.02);
        box-shadow: 0 6px 25px rgba(40, 167, 69, 0.2);
    }
    
    @media (max-width: 768px) {
        height: 250px;
    }
    
    @media (max-width: 480px) {
        height: 200px;
    }
`,A=a.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(8px);
    animation: fadeIn 0.3s ease;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`,V=a.div`
    position: relative;
    max-width: 95vw;
    max-height: 95vh;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: zoomIn 0.3s ease;

    @keyframes zoomIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`,T=a.img`
    max-width: 95vw;
    max-height: 95vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
`,E=a.button`
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    z-index: 10001;

    &:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.5);
        transform: rotate(90deg);
    }

    &:active {
        transform: rotate(90deg) scale(0.95);
    }

    @media (max-width: 768px) {
        top: 15px;
        right: 15px;
        width: 45px;
        height: 45px;

        svg {
            width: 20px;
            height: 20px;
        }
    }
`,G=a.button`
    position: fixed;
    ${e=>e.position}: 30px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    z-index: 10001;

    &:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-50%) scale(1.1);
    }

    &:active {
        transform: translateY(-50%) scale(1);
    }

    @media (max-width: 768px) {
        ${e=>e.position}: 15px;
        width: 50px;
        height: 50px;

        svg {
            width: 24px;
            height: 24px;
        }
    }

    @media (max-width: 480px) {
        ${e=>e.position}: 10px;
        width: 45px;
        height: 45px;

        svg {
            width: 20px;
            height: 20px;
        }
    }
`,Y=a.div`
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    padding: 10px 25px;
    color: white;
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        bottom: 20px;
        padding: 8px 20px;
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        bottom: 15px;
        padding: 6px 16px;
        font-size: 0.9rem;
    }
`,$=({images:a,currentIndex:t,onClose:x,onNavigate:d})=>{e.useEffect(()=>{const e=e=>{"Escape"===e.key?x():"ArrowLeft"===e.key?d((t-1+a.length)%a.length):"ArrowRight"===e.key&&d((t+1)%a.length)};return document.body.style.overflow="hidden",window.addEventListener("keydown",e),()=>{document.body.style.overflow="unset",window.removeEventListener("keydown",e)}},[t,a.length,x,d]);return i.jsx(A,{onClick:e=>{e.target===e.currentTarget&&x()},children:i.jsxs(V,{children:[i.jsx(E,{onClick:x,"aria-label":"Закрыть",children:i.jsx(r,{size:24})}),a.length>1&&i.jsxs(i.Fragment,{children:[i.jsx(G,{position:"left",onClick:()=>{d((t-1+a.length)%a.length)},"aria-label":"Предыдущее фото",children:i.jsx(n,{size:32})}),i.jsx(G,{position:"right",onClick:()=>{d((t+1)%a.length)},"aria-label":"Следующее фото",children:i.jsx(o,{size:32})})]}),i.jsx(T,{src:a[t].src,alt:a[t].alt}),a.length>1&&i.jsxs(Y,{children:[t+1," / ",a.length]})]})})},X=()=>{const[a,r]=e.useState(!1),[n,o]=e.useState(0),A=[{src:"/news/UnionConference_12_02_26/img1.jpg",alt:"Фото с конференции 1"},{src:"/news/UnionConference_12_02_26/img2.jpg",alt:"Фото с конференции 2"},{src:"/news/UnionConference_12_02_26/img3.jpg",alt:"Фото с конференции 3"},{src:"/news/UnionConference_12_02_26/img4.jpg",alt:"Фото с конференции 4"}];return i.jsxs(l,{children:[i.jsx(t,{style:{marginBottom:"20px"},children:"Прошла отчетная профсоюзная конференция"}),i.jsxs(g,{children:[i.jsx(x,{size:16}),i.jsxs("span",{children:["Опубликовано: ","13.02.2026"]})]}),i.jsxs(m,{children:[i.jsx(h,{src:"/news/UnionConference_12_02_26/img1.jpg",alt:"Прошла отчетная профсоюзная конференция",loading:"lazy"}),i.jsx(f,{children:'Вчера, 12 февраля 2026 года, прошла отчетная профсоюзная конференция КЖУП "Буда-Кошелёвский коммунальник".'}),i.jsxs(b,{children:[i.jsx(d,{size:28}),"Участники конференции"]}),i.jsx(w,{children:[{name:"Мишаков Денис Сергеевич",role:"Технический инспектор труда Гомельской областной организации Белорусского профессионального союза работников жилищно-коммунального хозяйства и сферы обслуживания"},{name:"Ананич Нина Вячеславовна",role:"Специалист Гомельского областного объединения профсоюзов"}].map((e,a)=>i.jsxs(u,{children:[i.jsx(j,{children:i.jsx(d,{size:24})}),i.jsxs(v,{children:[i.jsx(y,{children:e.name}),i.jsx(z,{children:e.role})]})]},a))}),i.jsxs(k,{children:[i.jsxs(b,{children:[i.jsx(s,{size:28}),"Повестка дня"]}),i.jsx(c,{children:"На рассмотрение отчетной конференции вносилась следующая повестка дня:"}),i.jsx(I,{children:["Об отчете профсоюзного комитета первичной профсоюзной организации КЖУП «Буда-Кошелёвский коммунальник» за 2025 год","Об отчете ревизионной комиссии первичной профсоюзной организации КЖУП «Буда-Кошелёвский коммунальник» за 2025 год","Об утверждении отчета об исполнении сметы доходов и расходов первичной профсоюзной организации КЖУП «Буда-Кошелёвский коммунальник» за 2025 год","Об одобрении утвержденной профсоюзным комитетом сметы доходов и расходов первичной профсоюзной организации КЖУП «Буда-Кошелёвский коммунальник» на 2026 год","Об итогах выполнения коллективного договора за 2025 год","Об информировании делегатов конференции о Положении о фонде помощи первичной профсоюзной организации КЖУП «Буда-Кошелёвский коммунальник» на 2026 год","Об изменениях в составе профсоюзного комитета первичной профсоюзной организации","Об изменениях в составе ревизионной комиссии первичной профсоюзной организации","О внесении изменений и дополнений в коллективный договор"].map((e,a)=>i.jsxs(_,{children:[i.jsx(U,{children:a+1}),i.jsx(C,{children:e})]},a))})]}),i.jsxs(b,{children:[i.jsx(p,{size:28}),"Фотографии с конференции"]}),i.jsx(S,{children:A.map((e,a)=>i.jsx(L,{src:e.src,alt:e.alt,loading:"lazy",onClick:()=>(e=>{o(e),r(!0)})(a)},a))})]}),a&&i.jsx($,{images:A,currentIndex:n,onClose:()=>{r(!1)},onNavigate:e=>{o(e)}})]})};export{X as default};
