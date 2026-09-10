import {
    Newsletter,
    NewsletterBlock,
    TextLink,
} from "../blocks/types";

function escapeHtml(value: string = ""): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function normalizeUrl(url: string = ""): string {
    if (!url) {
        return "#";
    }

    if (
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("mailto:")
    ) {
        return url;
    }

    return `https://${url}`;
}

function renderLinkedText(
    text: string = "",
    links: TextLink[] = [],
    field?: string
): string {
    if (!text) {
        return "";
    }

    let result = escapeHtml(text);

    const fieldLinks = links.filter(
        (link) =>
            !field ||
            !link.field ||
            link.field === field
    );

    for (const link of fieldLinks) {
        if (!link.text || !link.url) {
            continue;
        }

        const escapedText = escapeHtml(link.text);

        const anchor = `
            <a
                href="${escapeHtml(normalizeUrl(link.url))}"
                style="color:#d9468f;text-decoration:underline;"
            >
                ${escapedText}
            </a>
        `;

        result = result.replace(
            escapedText,
            anchor
        );
    }

    return result;
}

function renderBlock(
    block: NewsletterBlock
): string {
    const props = block.props || {};

    switch (block.type) {
        case "heading": {
            const alignment =
                props.alignment || "left";

            return `
                <tr>
                    <td
                        style="
                            padding:20px 0 12px;
                            text-align:${alignment};
                        "
                    >
                        <h1
                            style="
                                margin:0;
                                font-family:Arial,Helvetica,sans-serif;
                                font-size:30px;
                                line-height:1.2;
                                font-weight:700;
                                color:#222222;
                            "
                        >
                            ${renderLinkedText(
                                props.text || "",
                                props.links || [],
                                "text"
                            )}
                        </h1>
                    </td>
                </tr>
            `;
        }

        case "paragraph": {
            const alignment =
                props.alignment || "left";

            return `
                <tr>
                    <td
                        style="
                            padding:10px 0;
                            text-align:${alignment};
                        "
                    >
                        <p
                            style="
                                margin:0;
                                font-family:Arial,Helvetica,sans-serif;
                                font-size:16px;
                                line-height:1.6;
                                color:#333333;
                            "
                        >
                            ${renderLinkedText(
                                props.text || "",
                                props.links || [],
                                "text"
                            )}
                        </p>
                    </td>
                </tr>
            `;
        }

        case "divider": {
            const borderStyle =
                props.style || "solid";

            return `
                <tr>
                    <td style="padding:18px 0;">
                        <div
                            style="
                                border-top:1px ${borderStyle} #dddddd;
                                width:100%;
                                height:1px;
                            "
                        ></div>
                    </td>
                </tr>
            `;
        }

        case "quote": {
            const alignment =
                props.alignment || "left";

            return `
                <tr>
                    <td style="padding:20px 0;">
                        <table
                            role="presentation"
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                        >
                            <tr>
                                <td
                                    style="
                                        border-left:4px solid #d9468f;
                                        padding:12px 20px;
                                        text-align:${alignment};
                                    "
                                >
                                    <p
                                        style="
                                            margin:0 0 8px;
                                            font-family:Georgia,serif;
                                            font-size:18px;
                                            line-height:1.5;
                                            font-style:italic;
                                            color:#444444;
                                        "
                                    >
                                        ${renderLinkedText(
                                            props.text || "",
                                            props.links || [],
                                            "text"
                                        )}
                                    </p>

                                    ${
                                        props.author
                                            ? `
                                                <p
                                                    style="
                                                        margin:0;
                                                        font-family:Arial,Helvetica,sans-serif;
                                                        font-size:13px;
                                                        color:#777777;
                                                    "
                                                >
                                                    — ${renderLinkedText(
                                                        props.author,
                                                        props.links || [],
                                                        "author"
                                                    )}
                                                </p>
                                            `
                                            : ""
                                    }
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            `;
        }

        case "image": {
            if (!props.src) {
                return "";
            }

            const alignment =
                props.alignment || "center";

            const width =
                Number(props.width) || 300;

            return `
                <tr>
                    <td
                        style="
                            padding:18px 0;
                            text-align:${alignment};
                        "
                    >
                        <img
                            src="${escapeHtml(props.src)}"
                            alt="${escapeHtml(
                                props.caption || ""
                            )}"
                            width="${width}"
                            style="
                                display:inline-block;
                                max-width:100%;
                                height:auto;
                                border:0;
                            "
                        />

                        ${
                            props.caption
                                ? `
                                    <p
                                        style="
                                            margin:8px 0 0;
                                            font-family:Arial,Helvetica,sans-serif;
                                            font-size:12px;
                                            line-height:1.4;
                                            color:#777777;
                                        "
                                    >
                                        ${renderLinkedText(
                                            props.caption,
                                            props.links || [],
                                            "caption"
                                        )}
                                    </p>
                                `
                                : ""
                        }
                    </td>
                </tr>
            `;
        }

        case "double-image": {
            const gap =
                Number(props.gap) || 16;

            return `
                <tr>
                    <td style="padding:18px 0;">
                        <table
                            role="presentation"
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                        >
                            <tr>
                                <td
                                    width="50%"
                                    valign="top"
                                    style="
                                        padding-right:${gap / 2}px;
                                    "
                                >
                                    ${
                                        props.leftSrc
                                            ? `
                                                <img
                                                    src="${escapeHtml(
                                                        props.leftSrc
                                                    )}"
                                                    alt="${escapeHtml(
                                                        props.leftCaption ||
                                                            ""
                                                    )}"
                                                    width="100%"
                                                    style="
                                                        display:block;
                                                        width:100%;
                                                        height:auto;
                                                        border:0;
                                                    "
                                                />
                                            `
                                            : ""
                                    }

                                    ${
                                        props.leftCaption
                                            ? `
                                                <p
                                                    style="
                                                        margin:8px 0 0;
                                                        font-family:Arial,Helvetica,sans-serif;
                                                        font-size:12px;
                                                        line-height:1.4;
                                                        color:#777777;
                                                    "
                                                >
                                                    ${renderLinkedText(
                                                        props.leftCaption,
                                                        props.links ||
                                                            [],
                                                        "leftCaption"
                                                    )}
                                                </p>
                                            `
                                            : ""
                                    }
                                </td>

                                <td
                                    width="50%"
                                    valign="top"
                                    style="
                                        padding-left:${gap / 2}px;
                                    "
                                >
                                    ${
                                        props.rightSrc
                                            ? `
                                                <img
                                                    src="${escapeHtml(
                                                        props.rightSrc
                                                    )}"
                                                    alt="${escapeHtml(
                                                        props.rightCaption ||
                                                            ""
                                                    )}"
                                                    width="100%"
                                                    style="
                                                        display:block;
                                                        width:100%;
                                                        height:auto;
                                                        border:0;
                                                    "
                                                />
                                            `
                                            : ""
                                    }

                                    ${
                                        props.rightCaption
                                            ? `
                                                <p
                                                    style="
                                                        margin:8px 0 0;
                                                        font-family:Arial,Helvetica,sans-serif;
                                                        font-size:12px;
                                                        line-height:1.4;
                                                        color:#777777;
                                                    "
                                                >
                                                    ${renderLinkedText(
                                                        props.rightCaption,
                                                        props.links ||
                                                            [],
                                                        "rightCaption"
                                                    )}
                                                </p>
                                            `
                                            : ""
                                    }
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            `;
        }

        case "text-image": {
            const imagePosition =
                props.imagePosition || "right";

            const imageWidth =
                Number(props.imageWidth) || 220;

            const textWidth =
                100 - Math.min(
                    Math.max(
                        (imageWidth / 600) * 100,
                        25
                    ),
                    50
                );

            const imageCell = `
                <td
                    width="${100 - textWidth}%"
                    valign="top"
                    style="
                        padding:8px;
                    "
                >
                    ${
                        props.imageSrc
                            ? `
                                <img
                                    src="${escapeHtml(
                                        props.imageSrc
                                    )}"
                                    alt="${escapeHtml(
                                        props.imageCaption ||
                                            ""
                                    )}"
                                    width="${imageWidth}"
                                    style="
                                        display:block;
                                        width:100%;
                                        max-width:${imageWidth}px;
                                        height:auto;
                                        border:0;
                                    "
                                />
                            `
                            : ""
                    }

                    ${
                        props.imageCaption
                            ? `
                                <p
                                    style="
                                        margin:8px 0 0;
                                        font-family:Arial,Helvetica,sans-serif;
                                        font-size:12px;
                                        line-height:1.4;
                                        color:#777777;
                                    "
                                >
                                    ${renderLinkedText(
                                        props.imageCaption,
                                        props.links ||
                                            [],
                                        "imageCaption"
                                    )}
                                </p>
                            `
                            : ""
                    }
                </td>
            `;

            const textCell = `
                <td
                    width="${textWidth}%"
                    valign="top"
                    style="
                        padding:8px;
                    "
                >
                    <p
                        style="
                            margin:0;
                            font-family:Arial,Helvetica,sans-serif;
                            font-size:16px;
                            line-height:1.6;
                            color:#333333;
                        "
                    >
                        ${renderLinkedText(
                            props.text || "",
                            props.links || [],
                            "text"
                        )}
                    </p>
                </td>
            `;

            return `
                <tr>
                    <td style="padding:18px 0;">
                        <table
                            role="presentation"
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                        >
                            <tr>
                                ${
                                    imagePosition ===
                                    "left"
                                        ? imageCell +
                                          textCell
                                        : textCell +
                                          imageCell
                                }
                            </tr>
                        </table>
                    </td>
                </tr>
            `;
        }

        default:
            return "";
    }
}

export function generateNewsletterHtml(
    newsletter: Newsletter
): string {
    const blocksHtml =
        newsletter.blocks
            .map(renderBlock)
            .join("");

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />
    <title>${escapeHtml(newsletter.title)}</title>
</head>

<body
    style="
        margin:0;
        padding:0;
        background:#f5f5f5;
    "
>
    <table
        role="presentation"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
            background:#f5f5f5;
            margin:0;
            padding:0;
        "
    >
        <tr>
            <td align="center">
                <table
                    role="presentation"
                    width="600"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="
                        width:600px;
                        max-width:100%;
                        background:#ffffff;
                    "
                >
                    <tr>
                        <td
                            style="
                                padding:32px 40px 12px;
                                text-align:center;
                                border-bottom:1px solid #eeeeee;
                            "
                        >
                            <h2
                                style="
                                    margin:0;
                                    font-family:Arial,Helvetica,sans-serif;
                                    font-size:14px;
                                    font-weight:600;
                                    letter-spacing:1px;
                                    color:#888888;
                                    text-transform:uppercase;
                                "
                            >
                                Femiciencia
                            </h2>

                            <h1
                                style="
                                    margin:10px 0 4px;
                                    font-family:Arial,Helvetica,sans-serif;
                                    font-size:26px;
                                    line-height:1.2;
                                    color:#222222;
                                "
                            >
                                ${escapeHtml(
                                    newsletter.title
                                )}
                            </h1>

                            <p
                                style="
                                    margin:0;
                                    font-family:Arial,Helvetica,sans-serif;
                                    font-size:12px;
                                    color:#999999;
                                "
                            >
                                Vol. ${escapeHtml(
                                    newsletter.volume
                                )}
                                ·
                                ${escapeHtml(
                                    newsletter.date
                                )}
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td
                            style="
                                padding:20px 40px 40px;
                            "
                        >
                            <table
                                role="presentation"
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                            >
                                ${blocksHtml}
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td
                            style="
                                padding:24px 40px;
                                border-top:1px solid #eeeeee;
                                text-align:center;
                            "
                        >
                            <p
                                style="
                                    margin:0;
                                    font-family:Arial,Helvetica,sans-serif;
                                    font-size:11px;
                                    line-height:1.5;
                                    color:#999999;
                                "
                            >
                                Femiciencia · Divulgación pública de la ciencia
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
}