import Svix from "svix";
const { Webhook } = Svix;
import User from "../models/User.js";

export const clerkwebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Ensure raw body is used
        const payload = req.body;
        const headers = req.headers;

        // Verify webhook signature
        const event = whook.verify(payload, headers);

        // Getting data from request body 
        const { data, type } = JSON.parse(payload);

        // Switch case for different events 
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                    resume: ''
                };
                await User.create(userData);
                res.json({ success: true });
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url
                };
                await User.findByIdAndUpdate(data.id, userData);
                res.json({ success: true });
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.json({ success: true });
                break;
            }
            default:
                res.status(400).json({ success: false, message: "Unhandled event type" });
                break;
        }
    } catch (error) {
        console.error("Webhook verification failed:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
