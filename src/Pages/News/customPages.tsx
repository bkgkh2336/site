import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

/**
 * Pages whose layout lives in code (not in the WYSIWYG body).
 * Key: `${section}/${slug}` — must match CUSTOM_ARTICLE_KEYS in data/articles.ts.
 */
const registry: Record<string, LazyExoticComponent<ComponentType>> = {
    'news/union_conference': lazy(() => import('./News/UnionConference/UnionConference')),
    'news/cleanup_day': lazy(() => import('./News/CleanupDay/CleanupDay')),
    'news/unified_safety_day': lazy(() => import('./News/UnifiedSafetyDay/UnifiedSafetyDay')),
    'news/safety_day_passed': lazy(() => import('./News/SafetyDayPassed/SafetyDayPassed')),
    'articles/boiler_maintenance': lazy(() => import('./Articles/BoilerMaintenance/BoilerMaintenance')),
    'articles/attractions_safety': lazy(() => import('./Articles/AttractionsSafety/AttractionsSafety')),
    'articles/autonomous_fire_detectors': lazy(() => import('./Articles/AutonomousFireDetectors/AutonomousFireDetectors'))
};

export const getCustomPage = (key: string): LazyExoticComponent<ComponentType> | undefined =>
    registry[key];
