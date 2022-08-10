import { IRequest, IResponse } from '../interfaces/vendors';
import Locals from '../providers/Locals';

const WACloudAPI = require('whatsappcloudapi_wrapper');
const Whatsapp = new WACloudAPI({
    accessToken: Locals.config().META_WA_ACCESSTOKEN,
    senderPhoneNumberId: Locals.config().META_WA_SENDER,
    WABA_ID: Locals.config().META_WA_ACC_ID,
});

class WhatsAppController {
    public static subscribe(req: IRequest, res: IResponse): void {
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
        if (
            mode &&
            token &&
            mode === 'subscribe' &&
            process.env.META_WA_VERIFY_TOKEN === token
        ) {
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }

    public static async sendMessage(req: IRequest, res: IResponse) {
        try {
            let data = Whatsapp.parseMessage(req.body);
        if (data?.isMessage) {
            let incomingMessage = data.message;
            let recipientPhone = incomingMessage.from.phone;
            let recipientName = incomingMessage.from.name;
            let typeOfMsg = incomingMessage.type;
            let message_id = incomingMessage.message_id;


            if (typeOfMsg === 'text_message') {
                await Whatsapp.sendSimpleButtons({
                    message: `Hey ${recipientName}, \n I am happy to see you here today .\n How Can I help you!?`,
                    recipientPhone: recipientPhone, 
                    listOfButtons: [
                        {
                            title: 'View some products',
                            id: 'see_categories',
                        },
                        {
                            title: 'Speak to a Srinadh',
                            id: 'speak_to_human',
                        },
                    ],
                });
            }
            if (typeOfMsg === 'simple_button_message') {
                let button_id = incomingMessage.button_reply.id;
            
                if (button_id === 'speak_to_human') {
                    await Whatsapp.sendText({
                        recipientPhone: recipientPhone,
                        message: `Arguably, chatbots are faster than humans.\nCall my human with the below details:`,
                    });
            
                    await Whatsapp.sendContact({
                        recipientPhone: recipientPhone,
                        contact_profile: {
                            addresses: [
                                {
                                    city: 'Vizm',
                                    country: 'india',
                                },
                            ],
                            name: {
                                first_name: 'Siva Srinadh',
                                last_name: 'Kaile',
                            },
                            org: {
                                company: 'Inhabitor PVT LTD',
                            },
                            phones: [
                                {
                                    phone: '+91 9052902415',
                                },
                                                    {
                                    phone: '+919052902415',
                                },
                            ],
                        },
                    });
                }
            };
            
            
        }

            res.sendStatus(200);
        } catch (error) {
            console.error({ error })
            res.sendStatus(500);
        }

    }
}

export default WhatsAppController;
