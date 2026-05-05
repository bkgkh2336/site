import{L as t,j as e}from"./react-vendor-mP65msGK.js";import{H as i}from"./H1-9kKnwnEv.js";import{d as n}from"./styled-DA0GsMuf.js";import{W as r,h as o,Z as s,i as a,F as d,D as l,u as c,v as p,w as h}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const x=n.div`
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
`,m=n.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    width: 100%;
    max-width: 1200px;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`,g="\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding: 32px 24px;\n    background: rgba(255, 255, 255, 0.95);\n    backdrop-filter: blur(10px);\n    border: 2px solid transparent;\n    border-radius: 16px;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n    text-decoration: none;\n    transition: all 0.3s ease-in-out;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n    \n    &::before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 4px;\n        background: #4CAF50;\n        transform: scaleX(0);\n        transition: transform 0.3s ease-in-out;\n    }\n    \n    &:hover {\n        transform: translateY(-8px);\n        box-shadow: 0 8px 24px #4CAF5033;\n        border-color: #4CAF50;\n        \n        &::before {\n            transform: scaleX(1);\n        }\n    }\n    \n    &:active {\n        transform: translateY(-4px);\n    }\n",f=n(t)`
    ${g}
`,w=n.div`
    ${g}
`,j=n.div`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #4CAF5015;
    margin-bottom: 20px;
    transition: all 0.3s ease-in-out;
    
    ${f}:hover &, ${w}:hover & {
        background: #4CAF5025;
        transform: scale(1.1) rotate(5deg);
    }
`,u=n.h3`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #212529;
    margin: 0 0 12px 0;
    text-align: center;
    
    @media (max-width: 768px) {
        font-size: 1.15rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.1rem;
    }
`,v=n.p`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    color: #6c757d;
    margin: 0;
    text-align: center;
    line-height: 1.5;
    
    @media (max-width: 768px) {
        font-size: 0.95rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`,y=()=>{const t=[{title:"Услуги вентиляционных и дымовых каналов",description:"",path:"/ventilation_services",icon:e.jsx(r,{style:{width:32,height:32,color:"#4CAF50"}})},{title:"Услуги по вывозу мусора на полигон собственным транспортом заказчика с последующим захоронением",description:"",path:"/waste_services",icon:e.jsx(o,{style:{width:32,height:32,color:"#4CAF50"}})},{title:"Услуги по электрофизическим измерениям, оказываемым населению измерительной лабораторией энергетической службы",description:"",path:"/electro_services",icon:e.jsx(s,{style:{width:32,height:32,color:"#4CAF50"}})},{title:"Услуги по скашиванию травы (сплошных и комбинированных газонов) ручным моторизированным инструментом",description:'Газонокосилками  типа  "Husgvarna -143R,235R,240R,245R,343R", "Stihl FS-400"',path:"/grass_services",icon:e.jsx(a,{style:{width:32,height:32,color:"#4CAF50"}})},{title:"Услуги по отоплению населению",description:"",path:"/heating_services",icon:e.jsx(d,{style:{width:32,height:32,color:"#4CAF50"}})},{title:"Услуги по водопроводу и канализации населению",description:"",path:"/plumbing_services",icon:e.jsx(l,{style:{width:32,height:32,color:"#4CAF50"}})},{title:"Электромонтажные работы населению",description:"",path:"/el_inst_services",icon:e.jsx(c,{style:{width:32,height:32,color:"#4CAF50"}})},{title:"Транспортные услуги населению и бюджетным организациям",description:"",path:"/transport_services",icon:e.jsx(p,{style:{width:32,height:32,color:"#4CAF50"}})},{title:"Транспортные услуги для юридических лиц",description:"",path:"/transport_jur_services",icon:e.jsx(p,{style:{width:32,height:32,color:"#4CAF50"}})},{title:"Прочие транспортные услуги",description:"",path:"/transport_other_services",icon:e.jsx(p,{style:{width:32,height:32,color:"#4CAF50"}})},{title:"Об организации похоронного дела и оказанию ритуальных (гарантированных) услуг",description:"",pdfPath:"/documents/Об организации похоронного дела и оказанию ритуальных (гарантированных) услуг.pdf",icon:e.jsx(h,{style:{width:32,height:32,color:"#4CAF50"}})}];return e.jsxs(x,{children:[e.jsx(i,{style:{marginBottom:"40px"},children:"Наши услуги"}),e.jsx(m,{children:t.map((t,i)=>t.pdfPath?e.jsxs(w,{onClick:()=>window.open(t.pdfPath,"_blank"),children:[e.jsx(j,{children:t.icon}),e.jsx(u,{children:t.title}),e.jsx(v,{children:t.description})]},i):e.jsxs(f,{to:t.path||"/",children:[e.jsx(j,{children:t.icon}),e.jsx(u,{children:t.title}),e.jsx(v,{children:t.description})]},i))})]})};export{y as default};
