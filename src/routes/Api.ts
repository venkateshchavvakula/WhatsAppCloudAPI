import { Router } from 'express';
import WhatsAppController from '../controllers/WhatsAppController';

const router = Router();

router.get('/', (req, res) => {
    res.send('Server running!...');
});

router.get('/meta_wa_callback',WhatsAppController.subscribe)
router.post('/meta_wa_callback',WhatsAppController.sendMessage)


export default router;
