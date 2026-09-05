import { modeProfiles } from './data/index.js';

const set = (items = []) => new Set(items);
export const intersects = (a = [], b = []) => a.some((x) => b.includes(x));
export const overlapCount = (a = [], b = []) => {
  const B = set(b);
  return a.reduce((n, x) => n + (B.has(x) ? 1 : 0), 0);
};


export function typeSupportsStack(type, stack) {
  const specificTags = type.stackTags.filter((tag) => tag !== 'general');
  return specificTags.length ? intersects(stack.tags, specificTags) : stack.tags.includes('general');
}

export function stackPoolForType(type, stacks, forcedStackId = 'any') {
  const specificTags = type.stackTags.filter((tag) => tag !== 'general');
  let pool = specificTags.length
    ? stacks.filter((stack) => intersects(stack.tags, specificTags))
    : stacks.filter((stack) => stack.tags.includes('general'));
  if (!pool.length) pool = stacks.filter((stack) => intersects(stack.tags, type.stackTags));
  if (forcedStackId !== 'any') {
    const forced = stacks.find((stack) => stack.id === forcedStackId);
    if (forced && pool.some((s) => s.id === forced.id)) pool = [forced];
  }
  return pool.length ? pool : stacks;
}

export function typePoolForFilters(types, filters) {
  let pool = filters.type === 'any' ? [...types] : types.filter((t) => t.id === filters.type);
  if (filters.difficulty !== 'any') {
    const filtered = pool.filter((t) => t.difficulties.includes(filters.difficulty));
    if (filtered.length) pool = filtered;
  }
  if (filters.scope !== 'any') {
    const filtered = pool.filter((t) => t.scopes.includes(filters.scope));
    if (filtered.length) pool = filtered;
  }
  return pool.length ? pool : types;
}

function weightedPick(items, scoreFn, rng) {
  const scored = items.map((item) => ({ item, score: Math.max(0.05, scoreFn(item)) }));
  const total = scored.reduce((sum, x) => sum + x.score, 0);
  let target = rng() * total;
  for (const x of scored) {
    target -= x.score;
    if (target <= 0) return x.item;
  }
  return scored.at(-1).item;
}

export function chooseSubject(type, subjects, filters, rng) {
  const modeTags = modeProfiles[filters.mode]?.tags || [];
  const crossDomain = filters.chaos >= 78 || filters.mode === 'cursed' || filters.mode === 'useless';
  const bridgeData = type.tags.includes('visual') || type.tags.includes('data') || type.tags.includes('report') || type.tags.includes('tracker');
  let pool = subjects.filter((subject) => {
    const direct = overlapCount(subject.tags, type.tags) > 0;
    const bridge = bridgeData && subject.tags.includes('data');
    return crossDomain || direct || bridge;
  });
  if (!pool.length) pool = subjects;
  return weightedPick(pool, (subject) => {
    const typeMatch = overlapCount(subject.tags, type.tags);
    const modeMatch = overlapCount(subject.tags, modeTags);
    const bridge = bridgeData && subject.tags.includes('data') ? 0.7 : 0;
    const chaosBonus = filters.chaos > 70 && subject.tags.includes('fun') ? 1.5 : 0;
    return 0.2 + typeMatch * 2.8 + modeMatch * 1.2 + bridge + chaosBonus;
  }, rng);
}

export function chooseAction(type, subject, actions, filters, rng) {
  const joined = [...type.tags, ...subject.tags];
  const modeTags = modeProfiles[filters.mode]?.tags || [];
  const crossDomain = filters.chaos >= 85 || filters.mode === 'cursed' || filters.mode === 'useless';
  let pool = actions.filter((action) => crossDomain || overlapCount(action.tags, joined) > 0);
  if (!pool.length) pool = actions;
  return weightedPick(pool, (action) => {
    const semantic = overlapCount(action.tags, joined);
    const modeMatch = overlapCount(action.tags, modeTags);
    const funPenalty = filters.chaos < 35 && action.tags.includes('fun') ? -0.8 : 0;
    const funBonus = filters.chaos > 70 && action.tags.includes('fun') ? 2 : 0;
    return 0.2 + semantic * 2.2 + modeMatch + funPenalty + funBonus;
  }, rng);
}

export function chooseConstraint(type, stack, constraints, filters, rng) {
  const tags = [...type.tags];
  let pool = constraints.filter((constraint) => {
    const tagOK = constraint.tags.includes('all') || intersects(constraint.tags, tags);
    const forbidden = constraint.forbid?.some((tag) => tags.includes(tag));
    const difficultyOK = !constraint.difficulties?.length || filters.difficulty === 'any' || constraint.difficulties.includes(filters.difficulty);
    const scopeOK = !constraint.scopes?.length || filters.scope === 'any' || constraint.scopes.includes(filters.scope);
    return tagOK && !forbidden && difficultyOK && scopeOK;
  });
  if (!pool.length) pool = constraints.filter((c) => c.tags.includes('all'));
  return weightedPick(pool, (constraint) => {
    const specificity = constraint.tags.includes('all') ? 0.5 : overlapCount(constraint.tags, tags) * 1.4;
    return 1 + specificity;
  }, rng);
}

export function featurePool(type, subject, features) {
  const specific = features.filter((f) => f.tags.includes('all') || intersects(f.tags, type.tags));
  return specific.length ? specific : features.filter((f) => f.tags.includes('all'));
}

export function chooseFeatures(type, subject, features, count, rng) {
  const pool = featurePool(type, subject, features);
  const picked = [];
  const remaining = [...pool];
  while (picked.length < count && remaining.length) {
    const item = weightedPick(remaining, (f) => 1 + overlapCount(f.tags, type.tags) * 1.0 + overlapCount(f.tags, subject.tags) * 0.25, rng);
    picked.push(item.text);
    remaining.splice(remaining.indexOf(item), 1);
  }
  return picked;
}
