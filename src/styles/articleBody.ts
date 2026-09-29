import { css } from 'styled-components';

/**
 * Shared typography for article bodies (public ArticlePage and admin editor preview).
 * Keep in sync with what sanitizeArticleBody() allows in backend/api.php.
 */
export const articleBodyCss = css`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    line-height: 1.7;
    color: #495057;

    p {
        margin: 0 0 15px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #28a745;
        margin: 1.3em 0 15px;

        @media (max-width: 768px) {
            font-size: 1.3rem;
        }
    }

    h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: #212529;
        margin: 1.2em 0 12px;
    }

    h4 {
        font-size: 1.1rem;
        font-weight: 700;
        color: #212529;
        margin: 1.1em 0 10px;
    }

    ul, ol {
        padding-left: 20px;
        margin: 0 0 15px;

        li {
            margin-bottom: 6px;

            &::marker {
                color: #28a745;
                font-weight: 700;
            }
        }
    }

    a {
        color: #007bff;
        text-decoration: none;

        &:hover {
            color: #0056b3;
            text-decoration: underline;
        }
    }

    blockquote {
        margin: 15px 0;
        padding: 10px 16px;
        border-left: 4px solid #28a745;
        background: rgba(40, 167, 69, 0.05);
        border-radius: 0 8px 8px 0;
        color: #495057;

        p:last-child {
            margin-bottom: 0;
        }
    }

    img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 6px 0 15px;
        display: block;
    }

    hr {
        border: none;
        border-top: 1px solid #dee2e6;
        margin: 20px 0;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
        font-size: 1rem;

        th, td {
            border: 1px solid #dee2e6;
            padding: 8px 12px;
            text-align: left;
            vertical-align: top;
        }

        th {
            background: #f6f8fa;
            font-weight: 600;
        }
    }

    video {
        width: 100%;
        max-width: 800px;
        border-radius: 12px;
        margin: 30px auto;
        display: block;
        background: #000;
    }

    figure {
        margin: 15px 0;

        figcaption {
            font-size: 0.9rem;
            color: #6c757d;
            margin-top: 6px;
        }
    }
`;
