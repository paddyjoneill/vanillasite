const { SECRET_KEY, EMAIL_LAMBDA } = process.env;

export default async function handler(req, res) {
    const payload = req.body;

    const { name, email, phone, message, key } = payload;

    const utcFromRequest = parseInt(atob(key));

    const utc = new Date().getTime();
    const difference = utc - utcFromRequest;
    const maxDifferenceAllowed = 10000;

    if (difference > maxDifferenceAllowed) {
        res.status(401).json({ message: 'unauthorized' });
        return;
    }

    const to = process.env.TO_ADDRESS;
    const secret = SECRET_KEY;
    const url = EMAIL_LAMBDA;

    const payloadToForward = {
        from: email,
        name,
        to,
        message,
        phone,
        secret,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadToForward),
    });

    if (response.ok) {
        res.status(200).json({ message: 'email sent' });
    } else if (response.status === 401) {
        res.status(401).json({ message: 'to address not recognized' });
    } else if (response.status === 500) {
        res.status(500).json({ message: 'aws error' });
    }
}