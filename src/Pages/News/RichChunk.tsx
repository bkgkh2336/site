import React from 'react';
import styled from 'styled-components';
import { articleBodyCss } from '../../styles/articleBody';

const Box = styled.div`
    ${articleBodyCss}
`;

/**
 * Wrapper for rich body fragments that contain block-level markup
 * (lists, tables, headings) coming from the WYSIWYG editor.
 */
export const RichChunk: React.FC<{ html: string }> = ({ html }) => (
    <Box dangerouslySetInnerHTML={{ __html: html }} />
);

export default RichChunk;
