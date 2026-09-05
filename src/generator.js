import { stacks, projectTypes, subjects, actions, twists, constraints, features, naming, modeProfiles } from './data/index.js';
import { rngFromSeed, pick, clamp } from './rng.js';
import { typePoolForFilters, stackPoolForType, chooseSubject, chooseAction, chooseConstraint, chooseFeatures, intersects, typeSupportsStack } from './compatibility.js';

export const DATA_COUNTS = {
  projectTypes: projectTypes.length,
  stacks: stacks.length,
  subjects: subjects.length,
  actions: actions.length,
  twists: twists.normal.length + twists.weird.length + twists.cursed.length,
  constraints: constraints.length,
  features: features.length,
};

function chooseTwist(chaos, mode, rng) {
  const c = clamp(chaos, 0, 100);
  let normalWeight = Math.max(5, 100 - c);
  let weirdWeight = 20 + c * 0.8;
  let cursedWeight = Math.max(0, (c - 45) * 1.8);
  if (mode === 'creative') weirdWeight *= 1.45;
  if (mode === 'cursed') { cursedWeight += 80; weirdWeight += 25; normalWeight *= 0.3; }
  if (mode === 'useless') { cursedWeight += 35; weirdWeight += 35; }
  const total = normalWeight + weirdWeight + cursedWeight;
  const roll = rng() * total;
  if (roll < normalWeight) return pick(twists.normal, rng);
  if (roll < normalWeight + weirdWeight) return pick(twists.weird, rng);
  return pick(twists.cursed, rng);
}

function subjectLabel(name) {
  return name.replace(/[^A-Za-z0-9 ]/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}

function makeName(project, rng) {
  const modeWords = naming.modeWords[project.mode] || naming.modeWords.random;
  const template = pick(naming.nameTemplates, rng);
  const vars = {
    prefix: pick(naming.prefixes, rng),
    suffix: pick(naming.suffixes, rng),
    subject: subjectLabel(project.subject.name),
    mode: pick(modeWords, rng),
  };
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] || '').replace(/\s+/g, ' ').trim();
}

function buildDescription(project, rng) {
  const modeText = modeProfiles[project.mode]?.text || '';
  const difficultyText = project.difficulty === 'any' ? '' : `Aim for ${project.difficulty} implementation difficulty.`;
  const template = pick(naming.descriptionTemplates, rng);
  return template.replace(/\{(\w+)\}/g, (_, key) => ({
    type: project.type.name.toLowerCase(), stack: project.stack.name, action: project.action.text,
    subject: project.subject.name, twist: project.twist, modeText, difficultyText,
  }[key] || '')).replace(/\s+/g, ' ').trim();
}

export function generateProject(seed, filters, preserve = {}) {
  const rng = rngFromSeed(seed);
  let typePool = typePoolForFilters(projectTypes, filters);
  if (!preserve.type && filters.stack !== 'any') {
    const forcedStack = stacks.find((s) => s.id === filters.stack);
    const stackCompatibleTypes = forcedStack ? typePool.filter((t) => typeSupportsStack(t, forcedStack)) : [];
    if (stackCompatibleTypes.length) typePool = stackCompatibleTypes;
  }
  const type = preserve.type || pick(typePool, rng);
  const stack = preserve.stack || pick(stackPoolForType(type, stacks, filters.stack), rng);
  const subject = preserve.subject || chooseSubject(type, subjects, filters, rng);
  const action = preserve.action || chooseAction(type, subject, actions, filters, rng);
  const twist = preserve.twist || chooseTwist(filters.chaos, filters.mode, rng);
  const constraint = chooseConstraint(type, stack, constraints, filters, rng);
  const featureCount = filters.scope === 'hour' ? 1 : filters.scope === 'evening' ? 2 : filters.scope === 'month' ? 4 : 3;
  const extraFeatures = chooseFeatures(type, subject, features, featureCount, rng);
  const project = {
    seed, type, stack, subject, action, twist, constraint, features: extraFeatures,
    difficulty: filters.difficulty, scope: filters.scope, mode: filters.mode, chaos: filters.chaos
  };
  project.name = makeName(project, rng);
  project.description = buildDescription(project, rng);
  return project;
}
