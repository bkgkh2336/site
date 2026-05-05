import{u as e,j as i}from"./react-vendor-mP65msGK.js";import{d as a}from"./styled-DA0GsMuf.js";import{H as t}from"./H1-9kKnwnEv.js";import{m as o,z as r}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const n=a.div`
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
`,s=a.section`
    width: 100%;
    margin-bottom: 60px;
    
    @media (max-width: 768px) {
        margin-bottom: 40px;
    }
`;a.h2`
    font-family: 'Archivo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 30px 0;
    text-align: center;
    position: relative;
    padding-bottom: 15px;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 4px;
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        border-radius: 2px;
    }
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 20px;
    }
    
    @media (max-width: 480px) {
        font-size: 1.3rem;
    }
`;const p=a.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    width: 100%;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`,d=a.div`
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
`,l=a.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    ${d}:hover & {
        transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
        height: 180px;
    }
    
    @media (max-width: 480px) {
        height: 160px;
    }
`,m=a.div`
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
`,h=a.div`
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
`;a.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.85rem;
    color: #6c757d;
    font-style: italic;
    margin-top: 4px;
    
    svg {
        flex-shrink: 0;
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.75rem;
        gap: 4px;
        
        svg {
            width: 12px;
            height: 12px;
        }
    }
`;const g=a.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    
    @media (max-width: 768px) {
        padding: 30px 20px;
        gap: 15px;
    }
    
    @media (max-width: 480px) {
        padding: 25px 15px;
        margin-top: 10px;
    }
`,f=a.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    color: #333;
    margin: 0;
    text-align: center;
    font-weight: 500;
    
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1rem;
    }
`,c=a.a`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #28a745;
    text-decoration: none;
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    transition: all 0.3s ease;
    border-bottom: 2px solid transparent;
    
    svg {
        transition: transform 0.3s ease;
        flex-shrink: 0;
    }
    
    &:hover {
        color: #218838;
        border-bottom-color: #218838;
        
        svg {
            transform: translateX(4px);
        }
    }
    
    &:active {
        color: #1e7e34;
    }
    
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1rem;
        gap: 4px;
        
        svg {
            width: 16px;
            height: 16px;
        }
    }
`,u=()=>{const a=e(),u=e=>{const[i,a,t]=e.split(".").map(Number);return new Date(t,a-1,i).getTime()};return i.jsxs(n,{children:[i.jsx(t,{style:{marginBottom:"40px"},children:"Новости"}),i.jsx(s,{children:i.jsx(p,{children:[{title:"Прошла отчетная профсоюзная конференция",image:"/news/UnionConference_12_02_26/img1.jpg",url:"/news/union_conference",publishedDate:"13.02.2026",isExternal:!1},{title:"От конторы до предприятия — «Буда-Кошелевский коммунальник» отмечает 75-летие",image:"/main.png",url:"https://www.sb.by/articles/delat-zhizn-krashe.html",publishedDate:"23.03.2026",isExternal:!0},{title:"Представители КЖУП «Буда-Кошелевский коммунальник» удостоены наград областного уровня",image:"/news/New2.jpg",url:"https://www.budakosh.by/2026/03/za-dobrosovestnyj-trud-v-preddverii-professionalnogo-prazdnika-dnya-rabotnikov-bytovogo-obsluzhivaniya-naseleniya-i-zhilishhno-kommunalnogo-hozyajstva-predstaviteli-kzhup-bu/",publishedDate:"19.03.2026",isExternal:!0},{title:"Профсоюзный правовой прием граждан прошел в КЖУП «Буда-Кошелевский коммунальник»",image:"https://buda-koshelevo.gov.by/images/storage/news/000050_967797_big.jpg",url:"https://buda-koshelevo.gov.by/ru/district/view/profsojuznyj-pravovoj-priem-grazhdan-proshel-v-kzhup-buda-koshelevskij-kommunalnik-29148-2026/",publishedDate:"29.01.2026",isExternal:!0},{title:"Чернобыль: от возрождения до устойчивого развития. Информационно-пропагандистская группа под руководством начальника главного управления юстиции Гомельского облисполкома Артема Камалыева встретилась с коллективом КЖУП «Буда-Кошелевский коммунальник»",image:"https://www.budakosh.by/wp-content/uploads/2026/04/img_5133.jpg",url:"https://www.budakosh.by/2026/04/chernobyl-ot-vozrozhdeniya-do-ustojchivogo-razvitiya-informaczionno-propagandistskaya-gruppa-pod-rukovodstvom-nachalnika-glavnogo-upravleniya-yusticzii-gomelskogo-oblispolkoma-artema-kamalyeva-vstre/",publishedDate:"16.04.2026",isExternal:!0}].sort((e,i)=>u(i.publishedDate)-u(e.publishedDate)).map((e,t)=>i.jsxs(d,{onClick:()=>{var i;(i=e).isExternal?window.open(i.url,"_blank","noopener,noreferrer"):a(i.url)},children:[i.jsx(l,{src:e.image,alt:e.title,loading:"lazy"}),i.jsxs(m,{children:[i.jsx(x,{children:e.title}),i.jsxs(h,{children:[i.jsx(o,{size:16}),i.jsx("span",{children:e.publishedDate})]})]})]},t))})}),i.jsxs(g,{children:[i.jsx(f,{children:"Больше новостей вы можете увидеть"}),i.jsxs(c,{href:"https://www.budakosh.by/?s=буда-кошелевский+коммунальник",target:"_blank",rel:"noopener noreferrer",children:["здесь ",i.jsx(r,{size:18})]})]})]})};export{u as default};
