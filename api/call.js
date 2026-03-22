export default async function handler(req, res) {
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify({
            phone: "+1234567890", // Replace with your test number
            name: "Jesse"
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    res.status(200).json({ message: 'Success' });
}
