import React, { Fragment } from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { getCustomIcon, hasBlockHtml, inlineHtml, type Block } from '../../../data/customContent';
import RichChunk from '../RichChunk';
import {
    BlockText, BlockSectionTitle,
    IntroBoxGreen, IntroBoxRed, IntroBoxPlain, IntroTextPlain, IntroIconGreen, IntroIconRed,
    QuoteBox, QuoteLine,
    InfoGradient, InfoGradientRow, InfoFlat, InfoFlatIcon, InfoFlatText,
    LinkButton,
    Gallery, GalleryImg,
    PeopleList, PersonRow, PersonAvatar, PersonBody, PersonName, PersonRole,
    AgendaWrap, AgendaList, AgendaCard, AgendaNum, AgendaText,
    HighlightBox, HighlightIcon, HighlightBody, HighlightTitle, HighlightText,
    InfoCard, InfoCardIcon, InfoCardBody, InfoCardTitle, InfoCardText,
    PlaceGrid, PlaceCard, PlaceCardYellow, PlaceTitle, PlaceTitleYellow, PlaceText,
    MaintGrid, MaintCard, MaintIcon, MaintTitle, MaintText,
    DangerBox, DangerHeading, DangerList, DangerRow,
    RecoBox, RecoList, RecoRow, RecoIcon, RecoText,
    CheckGrid, CheckRow, CheckIcon, CheckText,
    StepsBox, StepRow, StepNum, StepText,
    StatsBox, StatsInner, StatsCaption, StatsRow, StatCell, StatSep, StatNum, StatMain, StatSub,
    WarnBox, WarnRow, WarnIcon, WarnText,
    AuthorBlue, AuthorBlueRole, AuthorBlueName, AuthorGreen,
    FinalBox, FinalTitle, FinalText, FinalCta
} from './styled';

const AUTO_KEY = 'articles/autonomous_fire_detectors';
const BOILER_KEY = 'articles/boiler_maintenance';
const ATTRACTIONS_KEY = 'articles/attractions_safety';

const RED_INTRO_PAGES = new Set([ATTRACTIONS_KEY, BOILER_KEY]);

export interface BlocksViewProps {
    blocks: Block[];
    /** Article page key (e.g. "news/union_conference") — selects per-page style variants. */
    pageKey?: string;
    /** Opens the shared lightbox for gallery images. */
    onImageClick?: (images: { src: string; alt: string }[], index: number) => void;
}

/**
 * Renders every structural block exactly the way public article pages do.
 * Used by the public pages, the admin preview and the TipTap node view, so
 * the editor always shows the real look of a block.
 */
export const BlocksView: React.FC<BlocksViewProps> = ({ blocks, pageKey, onImageClick }) => {
    const dense = pageKey === AUTO_KEY;

    const renderBlock = (block: Block, key: number): React.ReactNode => {
        switch (block.type) {
            case 'paragraph':
                return hasBlockHtml(block.html)
                    ? <RichChunk key={key} html={block.html} />
                    : <BlockText key={key} dangerouslySetInnerHTML={{ __html: inlineHtml(block.html) }} />;

            case 'heading': {
                const Icon = getCustomIcon(block.icon);
                return (
                    <BlockSectionTitle key={key} $dense={dense}>
                        {Icon && <Icon size={dense ? 26 : 28} />}
                        {block.text}
                    </BlockSectionTitle>
                );
            }

            case 'intro': {
                if (pageKey === AUTO_KEY) {
                    return (
                        <IntroBoxPlain key={key}>
                            <IntroTextPlain dangerouslySetInnerHTML={{ __html: inlineHtml(block.html) }} />
                        </IntroBoxPlain>
                    );
                }
                const Icon = getCustomIcon(block.icon);
                const Box = RED_INTRO_PAGES.has(pageKey || '') ? IntroBoxRed : IntroBoxGreen;
                const IconBox = RED_INTRO_PAGES.has(pageKey || '') ? IntroIconRed : IntroIconGreen;
                return (
                    <Box key={key}>
                        {Icon && (
                            <IconBox>
                                <Icon size={40} />
                            </IconBox>
                        )}
                        <BlockText dangerouslySetInnerHTML={{ __html: inlineHtml(block.html) }} />
                    </Box>
                );
            }

            case 'quote': {
                const Icon = getCustomIcon(block.icon);
                return (
                    <QuoteBox key={key}>
                        <QuoteLine>
                            {Icon && <Icon size={20} />}
                            <span dangerouslySetInnerHTML={{ __html: inlineHtml(block.html) }} />
                        </QuoteLine>
                    </QuoteBox>
                );
            }

            case 'info': {
                if (pageKey === AUTO_KEY) {
                    return (
                        <InfoFlat key={key}>
                            {block.items.map((item, index) => {
                                const Icon = getCustomIcon(item.icon);
                                return (
                                    <Fragment key={index}>
                                        <InfoFlatIcon>
                                            {Icon && <Icon size={22} />}
                                        </InfoFlatIcon>
                                        <InfoFlatText dangerouslySetInnerHTML={{ __html: inlineHtml(item.html) }} />
                                    </Fragment>
                                );
                            })}
                        </InfoFlat>
                    );
                }
                return (
                    <InfoGradient key={key}>
                        {block.items.map((item, index) => {
                            const Icon = getCustomIcon(item.icon);
                            return (
                                <InfoGradientRow key={index}>
                                    {Icon && <Icon size={24} style={{ flexShrink: 0, color: '#28a745' }} />}
                                    <span dangerouslySetInnerHTML={{ __html: inlineHtml(item.html) }} />
                                </InfoGradientRow>
                            );
                        })}
                    </InfoGradient>
                );
            }

            case 'link':
                return (
                    <LinkButton key={key} href={block.href} target="_blank" rel="noopener noreferrer">
                        {block.text} <ExternalLinkIcon size={18} />
                    </LinkButton>
                );

            case 'gallery': {
                const images = block.items;
                return (
                    <Gallery key={key}>
                        {images.map((image, index) => (
                            <GalleryImg
                                key={`${image.src}-${index}`}
                                src={image.src}
                                alt={image.alt || ''}
                                loading="lazy"
                                onClick={onImageClick
                                    ? () => onImageClick(
                                        images.map(i => ({ src: i.src, alt: i.alt || '' })),
                                        index
                                    )
                                    : undefined}
                            />
                        ))}
                    </Gallery>
                );
            }

            case 'people': {
                const Icon = getCustomIcon('UserCheck');
                return (
                    <PeopleList key={key}>
                        {block.items.map((participant, index) => (
                            <PersonRow key={index}>
                                <PersonAvatar>
                                    {Icon && <Icon size={24} />}
                                </PersonAvatar>
                                <PersonBody>
                                    <PersonName>{participant.name}</PersonName>
                                    <PersonRole>{participant.role}</PersonRole>
                                </PersonBody>
                            </PersonRow>
                        ))}
                    </PeopleList>
                );
            }

            case 'agenda': {
                const Icon = getCustomIcon(block.icon);
                return (
                    <AgendaWrap key={key}>
                        {(block.title || Icon) && (
                            <BlockSectionTitle>
                                {Icon && <Icon size={28} />}
                                {block.title}
                            </BlockSectionTitle>
                        )}
                        {block.intro && <BlockText>{block.intro}</BlockText>}
                        <AgendaList>
                            {block.items.map((item, index) => (
                                <AgendaCard key={index}>
                                    <AgendaNum>{index + 1}</AgendaNum>
                                    <AgendaText>{item}</AgendaText>
                                </AgendaCard>
                            ))}
                        </AgendaList>
                    </AgendaWrap>
                );
            }

            case 'card': {
                if (pageKey === ATTRACTIONS_KEY) {
                    const Icon = getCustomIcon(block.icon);
                    const variant = block.variant === 'warning' ? 'warning' : 'default';
                    return (
                        <HighlightBox key={key} $variant={variant}>
                            <HighlightIcon $variant={variant}>
                                {Icon && <Icon size={32} />}
                            </HighlightIcon>
                            <HighlightBody>
                                <HighlightTitle $variant={variant}>{block.title}</HighlightTitle>
                                <HighlightText dangerouslySetInnerHTML={{ __html: inlineHtml(block.html) }} />
                            </HighlightBody>
                        </HighlightBox>
                    );
                }
                const Icon = getCustomIcon(block.icon);
                return (
                    <InfoCard key={key}>
                        <InfoCardIcon>
                            {Icon && <Icon size={32} />}
                        </InfoCardIcon>
                        <InfoCardBody>
                            <InfoCardTitle>{block.title}</InfoCardTitle>
                            <InfoCardText dangerouslySetInnerHTML={{ __html: inlineHtml(block.html) }} />
                        </InfoCardBody>
                    </InfoCard>
                );
            }

            case 'cards': {
                if (block.style === 'maintenance') {
                    return (
                        <MaintGrid key={key}>
                            {block.items.map((item, index) => {
                                const Icon = getCustomIcon(item.icon);
                                return (
                                    <MaintCard key={index}>
                                        <MaintIcon>
                                            {Icon && <Icon size={22} />}
                                        </MaintIcon>
                                        <MaintTitle>{item.title}</MaintTitle>
                                        <MaintText dangerouslySetInnerHTML={{ __html: inlineHtml(item.html) }} />
                                    </MaintCard>
                                );
                            })}
                        </MaintGrid>
                    );
                }
                return (
                    <PlaceGrid key={key}>
                        {block.items.map((item, index) => {
                            const yellow = item.variant === 'yellow';
                            const Card = yellow ? PlaceCardYellow : PlaceCard;
                            const Title = yellow ? PlaceTitleYellow : PlaceTitle;
                            return (
                                <Card key={index}>
                                    <Title>{item.title}</Title>
                                    <PlaceText dangerouslySetInnerHTML={{ __html: inlineHtml(item.html) }} />
                                </Card>
                            );
                        })}
                    </PlaceGrid>
                );
            }

            case 'list': {
                if (pageKey === AUTO_KEY) {
                    const TitleIcon = getCustomIcon(block.titleIcon) || getCustomIcon('CheckCircle');
                    return (
                        <Fragment key={key}>
                            {block.title && (
                                <BlockSectionTitle $dense>
                                    {TitleIcon && <TitleIcon size={26} />}
                                    {block.title}
                                </BlockSectionTitle>
                            )}
                            <CheckGrid>
                                {block.items.map((item, index) => {
                                    const Icon = getCustomIcon(item.icon);
                                    return (
                                        <CheckRow key={index}>
                                            <CheckIcon>
                                                {Icon ? <Icon size={16} /> : TitleIcon && <TitleIcon size={16} />}
                                            </CheckIcon>
                                            <CheckText dangerouslySetInnerHTML={{ __html: inlineHtml(item.html) }} />
                                        </CheckRow>
                                    );
                                })}
                            </CheckGrid>
                        </Fragment>
                    );
                }
                const TitleIcon = getCustomIcon(block.titleIcon);
                if (TitleIcon) {
                    return (
                        <DangerBox key={key}>
                            <DangerHeading>
                                <TitleIcon size={28} />
                                {block.title}
                            </DangerHeading>
                            <DangerList>
                                {block.items.map((item, index) => {
                                    const Icon = getCustomIcon(item.icon);
                                    return (
                                        <DangerRow key={index}>
                                            {Icon && <Icon size={24} />}
                                            <div dangerouslySetInnerHTML={{ __html: inlineHtml(item.html) }} />
                                        </DangerRow>
                                    );
                                })}
                            </DangerList>
                        </DangerBox>
                    );
                }
                return (
                    <RecoBox key={key}>
                        {block.title && <h3>{block.title}</h3>}
                        <RecoList>
                            {block.items.map((item, index) => {
                                const Icon = getCustomIcon(item.icon);
                                return (
                                    <RecoRow key={index}>
                                        <RecoIcon>
                                            {Icon && <Icon size={20} />}
                                        </RecoIcon>
                                        <RecoText dangerouslySetInnerHTML={{ __html: inlineHtml(item.html) }} />
                                    </RecoRow>
                                );
                            })}
                        </RecoList>
                    </RecoBox>
                );
            }

            case 'steps':
                return (
                    <StepsBox key={key}>
                        {block.items.map((item, index) => (
                            <StepRow key={index}>
                                <StepNum>{String(index + 1).padStart(2, '0')}</StepNum>
                                <StepText dangerouslySetInnerHTML={{ __html: inlineHtml(item.html) }} />
                            </StepRow>
                        ))}
                    </StepsBox>
                );

            case 'stats':
                return (
                    <StatsBox key={key}>
                        <StatsInner>
                            {block.label && <StatsCaption>{block.label}</StatsCaption>}
                            <StatsRow>
                                {block.items.map((item, index) => (
                                    <Fragment key={index}>
                                        {index > 0 && <StatSep />}
                                        <StatCell>
                                            <StatNum>{item.number}</StatNum>
                                            <StatMain>{item.main}</StatMain>
                                            {item.sub && <StatSub>{item.sub}</StatSub>}
                                        </StatCell>
                                    </Fragment>
                                ))}
                            </StatsRow>
                        </StatsInner>
                    </StatsBox>
                );

            case 'warning': {
                if (pageKey === BOILER_KEY) {
                    return (
                        <WarnBox key={key}>
                            <BlockText
                                style={{ marginBottom: 0 }}
                                dangerouslySetInnerHTML={{ __html: inlineHtml(block.html) }}
                            />
                        </WarnBox>
                    );
                }
                const Icon = getCustomIcon(block.icon);
                return (
                    <WarnRow key={key}>
                        {Icon && (
                            <WarnIcon>
                                <Icon size={22} />
                            </WarnIcon>
                        )}
                        <WarnText dangerouslySetInnerHTML={{ __html: inlineHtml(block.html) }} />
                    </WarnRow>
                );
            }

            case 'author': {
                if (pageKey === ATTRACTIONS_KEY) {
                    return (
                        <AuthorBlue key={key}>
                            {block.lines.map((line, index) =>
                                line.kind === 'name'
                                    ? <AuthorBlueName key={index}>{line.text}</AuthorBlueName>
                                    : <AuthorBlueRole key={index}>{line.text}</AuthorBlueRole>
                            )}
                        </AuthorBlue>
                    );
                }
                return (
                    <AuthorGreen key={key}>
                        {block.lines.map((line, index) => {
                            if (line.kind === 'role') return <span key={index}>{line.text}</span>;
                            return <strong key={index}>{line.text}</strong>;
                        })}
                    </AuthorGreen>
                );
            }

            case 'final':
                return (
                    <FinalBox key={key}>
                        {block.title && <FinalTitle>{block.title}</FinalTitle>}
                        {block.paragraphs.map((paragraph, index) => (
                            <FinalText key={index} dangerouslySetInnerHTML={{ __html: inlineHtml(paragraph.text) }} />
                        ))}
                        {block.cta && <FinalCta>{block.cta}</FinalCta>}
                    </FinalBox>
                );

            default:
                return null;
        }
    };

    return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
};

export default BlocksView;
