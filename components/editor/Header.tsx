"use client";

import { useState } from "react";

import { NewsletterBlock } from "./blocks/types";

type HeaderProps = {
    isSaving: boolean;
    title: string;
    volume: string;
    date: string;
    blocks: NewsletterBlock[];
    onUpdateNewsletter: (
        updatedData: {
            title?: string;
            volume?: string;
            date?: string;
        }
    ) => void;
};

export default function Header({
    isSaving,
    title,
    volume,
    date,
    blocks,
    onUpdateNewsletter,
}: HeaderProps) {
    const [isPublishing, setIsPublishing] =
        useState(false);

    const handlePublish = async () => {
        try {
            setIsPublishing(true);

            const response = await fetch(
                "/api/newsletter/send",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        to: "maxi.a.clavero@gmail.com",
                        subject: title,
                        html: generateNewsletterHtml(
                            title,
                            volume,
                            date,
                            blocks
                        ),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                        "No se pudo enviar el newsletter"
                );
            }

            alert(
                "Newsletter enviado correctamente."
            );
        } catch (error) {
            console.error(error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Error al enviar el newsletter"
            );
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="text-xl text-gray-500 transition hover:text-gray-900"
                >
                    ←
                </button>

                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={title}
                        onChange={(event) =>
                            onUpdateNewsletter({
                                title: event.target.value,
                            })
                        }
                        className="w-56 border-b border-transparent bg-transparent font-semibold outline-none transition focus:border-gray-300"
                        aria-label="Título del newsletter"
                    />

                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <span>Volumen</span>

                        <input
                            type="text"
                            value={volume}
                            onChange={(event) =>
                                onUpdateNewsletter({
                                    volume: event.target.value,
                                })
                            }
                            className="w-12 border-b border-transparent bg-transparent text-center outline-none transition focus:border-gray-300"
                            aria-label="Volumen del newsletter"
                        />

                        <span>·</span>

                        <input
                            type="date"
                            value={date}
                            onChange={(event) =>
                                onUpdateNewsletter({
                                    date: event.target.value,
                                })
                            }
                            className="border-b border-transparent bg-transparent text-xs text-gray-400 outline-none transition focus:border-gray-300"
                            aria-label="Fecha del newsletter"
                        />
                    </div>
                </div>

                <span
                    className={`text-sm ${
                        isSaving
                            ? "text-gray-400"
                            : "text-green-600"
                    }`}
                >
                    {isSaving
                        ? "Guardando..."
                        : "✓ Guardado automáticamente"}
                </span>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600"
                >
                    Desktop
                </button>

                <button
                    type="button"
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600"
                >
                    Mobile
                </button>

                <button
                    type="button"
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600"
                >
                    Vista previa
                </button>

                <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="rounded-xl bg-black px-5 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isPublishing
                        ? "Enviando..."
                        : "Publicar"}
                </button>
            </div>
        </header>
    );
}

function generateNewsletterHtml(
    title: string,
    volume: string,
    date: string,
    blocks: NewsletterBlock[]
) {
    const blocksHtml = blocks
        .map((block) => {
            switch (block.type) {
                case "heading":
                    return `<h1>${escapeHtml(
                        block.props.text || ""
                    )}</h1>`;

                case "paragraph":
                    return `<p>${escapeHtml(
                        block.props.text || ""
                    )}</p>`;

                case "quote":
                    return `<blockquote>${escapeHtml(
                        block.props.text || ""
                    )}</blockquote>`;

                case "divider":
                    return `<hr />`;

                case "image":
                    if (!block.props.src) {
                        return "";
                    }

                    return `
                        <figure>
                            <img
                                src="${escapeAttribute(
                                    block.props.src
                                )}"
                                style="max-width:100%;"
                            />
                            ${
                                block.props.caption
                                    ? `<figcaption>${escapeHtml(
                                          block.props.caption
                                      )}</figcaption>`
                                    : ""
                            }
                        </figure>
                    `;

                case "double-image":
                    return `
                        <div style="display:flex;gap:16px;">
                            ${
                                block.props.leftSrc
                                    ? `<img src="${escapeAttribute(
                                          block.props.leftSrc
                                      )}" style="width:50%;" />`
                                    : ""
                            }
                            ${
                                block.props.rightSrc
                                    ? `<img src="${escapeAttribute(
                                          block.props.rightSrc
                                      )}" style="width:50%;" />`
                                    : ""
                            }
                        </div>
                    `;

                case "text-image":
                    return `
                        <div>
                            ${
                                block.props.imageSrc
                                    ? `<img src="${escapeAttribute(
                                          block.props.imageSrc
                                      )}" style="max-width:100%;" />`
                                    : ""
                            }
                            <p>${escapeHtml(
                                block.props.text || ""
                            )}</p>
                        </div>
                    `;

                default:
                    return "";
            }
        })
        .join("\n");

    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <title>${escapeHtml(title)}</title>
            </head>

            <body>
                <main style="max-width:600px;margin:0 auto;padding:32px;">
                    <header>
                        <h1>${escapeHtml(title)}</h1>
                        <p>
                            Volumen ${escapeHtml(volume)}
                            · ${escapeHtml(date)}
                        </p>
                    </header>

                    ${blocksHtml}
                </main>
            </body>
        </html>
    `;
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function escapeAttribute(value: string) {
    return escapeHtml(value);
}