const { createBot, createProvider, createFlow, addKeyword,fallBack } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')





const  flowPlanDeEstudioPrecencial = addKeyword('2').addAnswer('- Nuestra Licenciatura tiene una duración de 3 años                             Lo que te permitirá obtener un título🧑🏼‍🍳🏤😱 universitario en un tiempo reducido y comenzar tu carrera profesional rápidamente.🧑🏻‍🍳👩‍💻.             PLAN CUATRIMESTRAL',{
    media:'https://i.postimg.cc/02dXSjBs/7dfe941b-79aa-446e-b9f7-9fe3094ea865.jpg'
},({fallBack})=>{

    return (fallBack)
}

)

const  flowCostos = addKeyword('3').addAnswer(
    [
    'COSTOS CUOTA DE NUEVO ',
     'INGRESO',
     '$1,999',
     'Ambas modalidades incluyen:',
     'UNIFORME \n✔️Filipina\n✔️ Mandil\n✔️Toque\n✔️Pico'

    ]

)


const  flowDocumentos = addKeyword('1').addAnswer(
    [
    'Documentos  Requeridos',

    ],{
        media:'https://i.postimg.cc/wjVG135M/documentos.png'
    }

)


const flowPrecencial = addKeyword(['1','regresar']).addAnswer(['SELECCIONA  UNA OPCIÓN']).addAnswer([
    '   1️⃣ Documentos ',
        '2️⃣ Plan de Estrudio',
        '3️⃣ Costos',
],null,null,[flowPlanDeEstudioPrecencial,flowCostos,flowDocumentos])






const flowMixto = addKeyword(['2',]).addAnswer(['SELECCIONA  UNA OPCIÓN']).addAnswer([
        '1️⃣ Documentos ',
        '2️⃣ Plan de Estrudio',
        '3️⃣ Costos',
],null,null,[flowPlanDeEstudioPrecencial])

const flowOnline = addKeyword(['3', '']).addAnswer(['Online'])

const flowDocs = addKeyword(['1',]).addAnswer(
    "Contamos con  Tres Modalidades 👉",{
        delay:100
    }
).addAnswer(
    [
        '1️⃣ Modalidad Precencial',
        '2️⃣ Modalidad  Mixta',
        '3️⃣ Modalidad Online',
    ],
    null,
    null,
    [flowPrecencial,flowMixto,flowOnline]
)


const  flowPlanChef = addKeyword('2').addAnswer('- Nuestra Licenciatura tiene una duración de 3 años                             Lo que te permitirá obtener un título🧑🏼‍🍳🏤😱 universitario en un tiempo reducido y comenzar tu carrera profesional rápidamente.🧑🏻‍🍳👩‍💻.             PLAN CUATRIMESTRAL',{
    media:'https://i.postimg.cc/rwst6Ppm/b02bca63-73fc-4931-9f79-b7435f0d2ce9.jpg'
},({fallBack})=>{

    return (fallBack)
}

)
const flowDocumentosChef = addKeyword(['1']).addAnswer('')
const flowChef = addKeyword(['2',]).addAnswer(
    "Chef Profecional 👉",{
        delay:100
    }
).addAnswer(
    [
        '1️⃣ Documentos ',
        '2️⃣ Plan de Estrudio',
        '3️⃣ Costos',
    ],
    null,
    null,
    [flowDocumentosChef,flowPlanChef]
)



const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('Somos una INSTITUCION EDUCTIVA especializada en GASTRONOMÍA y TURISMO 🙋‍♀️',{
        media:'https://i.postimg.cc/sX9XXW87/log.jpg',
    }).addAnswer('Nuestra Licenciatura cuenta con validez oficial ante la S.E.P. REVOE:  SSEMSyS 1456101. Esto significa que tu título tendrá reconocimiento a nivel nacional e internacional.  ~2 LICENCIATURAS EN 1~ 🧑🏻‍🍳🏤🧑‍🍳',{
        media:'https://i.postimg.cc/pTxkTB93/55562964-c59d-4e5a-a2a2-13dad66def8a.jpg'
    })
    .addAnswer(
        [
            'contamos con diferentes programas educativos ',
            '1️⃣ *Doble Licenciatura en Gastronomía   y turismo* ',
            '2️⃣ *Chef Profecional  Informes  Para Diplomado en chef  Profecional*',
            '3️⃣ *ESPECIALIDAD EN GASTRONOMÍA INTERNACIONA Informes de la ESPECIALIDAD EN GASTRONOMÍA INTERNACIONAL* ',
            '4️⃣ *MAESTRIA EN ADMINISTRACIÓN Y DIRECCION TURISTICA*',
            '5️⃣ *BACHILLERATO*'
            ,
           
        ],
        {
            media:'https://i.postimg.cc/mk0hVmGr/48b3ac39-d3f5-4159-aa28-1acb2cc7697b.jpg',
           
          
        },
        null,
        [flowDocs,flowChef]
    )
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
