import nodemailer from "nodemailer";

function prepareInlineImages(html: string): {
    html: string;
    attachments: {
        filename: string;
        content: Buffer;
        cid: string;
        contentType: string;
    }[];
} {
    const attachments: {
        filename: string;
        content: Buffer;
        cid: string;
        contentType: string;
    }[] = [];

    const cidByDataUrl = new Map<string, string>();

    let index = 0;

    const processedHtml: string = html.replace(
        /data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=]+)/g,
        (
            fullMatch: string,
            contentType: string,
            base64: string
        ): string => {
            let cid = cidByDataUrl.get(fullMatch);

            if (!cid) {
                cid = `femiciencia-image-${index}@newsletter`;

                const extension =
                    contentType
                        .split("/")
                        [1]
                        ?.split("+")[0]
                        ?.toLowerCase() || "png";

                attachments.push({
                    filename: `image-${index}.${extension}`,
                    content: Buffer.from(base64, "base64"),
                    cid,
                    contentType,
                });

                cidByDataUrl.set(fullMatch, cid);

                index++;
            }

            return `cid:${cid}`;
        }
    );

    return {
        html: processedHtml,
        attachments,
    };
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            to,
            subject,
            html,
        } = body;

        if (!to || !subject || !html) {
            return Response.json(
                {
                    error:
                        "Faltan datos requeridos: to, subject o html.",
                },
                {
                    status: 400,
                }
            );
        }

        const transporter =
            nodemailer.createTransport({
                host:
                    process.env.SMTP_HOST,
                port: Number(
                    process.env.SMTP_PORT
                ),
                secure:
                    process.env.SMTP_SECURE ===
                    "true",
                auth: {
                    user:
                        process.env.SMTP_USER,
                    pass:
                        process.env.SMTP_PASSWORD,
                },
            });

            const {
    html: processedHtml,
    attachments,
} = prepareInlineImages(html);

        await transporter.sendMail({
    from:
        process.env.SMTP_FROM ||
        process.env.SMTP_USER,
    to,
    subject,
    html: processedHtml,
    attachments,
});

        return Response.json({
            success: true,
        });
    } catch (error) {
        console.error(
            "Error enviando newsletter:",
            error
        );

        return Response.json(
            {
                error:
                    "No se pudo enviar el newsletter.",
            },
            {
                status: 500,
            }
        );
    }
}