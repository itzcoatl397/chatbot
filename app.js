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


const flowPrecencial = addKeyword(['1','regresar']).addAnswer(['SELECCIONA  UNA OPCIÓN']).addAnswer([
    '   1️⃣ Documentos ',
        '2️⃣ Plan de Estrudio',
        '3️⃣ Modalidad Online',
],null,null,[flowPlanDeEstudioPrecencial])



const flowMixto = addKeyword(['2']).addAnswer(['Mixto'])

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



const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Somos CESGYt',{
        media:'https://i.postimg.cc/sX9XXW87/log.jpg', delay: 1000,
    })
    .addAnswer(
        [
            'Somos una INSTITUCION EDUCTIVA especializada en GASTRONOMÍA y TURISMO contamos con diferentes programas educativos ',
            '1️⃣ *Doble Licenciatura en Gastronomía   y turismo* ',
            '2️⃣ *Chef Profecional  Informes  Para Diplomado en chef  Profecional*',
            '3️⃣ *ESPECIALIDAD EN GASTRONOMÍA INTERNACIONA Informes de la ESPECIALIDAD EN GASTRONOMÍA INTERNACIONAL* ',
            '4️⃣ *MAESTRIA EN ADMINISTRACIÓN Y DIRECCION TURISTICA*',
            '5️⃣ *BACHILLERATO*'
            ,
           
        ],
        {
            delay: 1000,
        },
        null,
        [flowDocs]
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
