import { projectTypes, stacks } from './data/index.js';
import { generateProject, DATA_COUNTS } from './generator.js';
import { randomSeed, xmur3, clamp } from './rng.js';

const STORAGE_KEY = 'rpg:v2:saved';
const state = {
  seed: 0,
  project: null,
  locks: { type: false, stack: false, subject: false, action: false, twist: false },
  saved: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
};

const $ = (id) => document.getElementById(id);
const els = {
  typeFilter: $('typeFilter'), stackFilter: $('stackFilter'), difficultyFilter: $('difficultyFilter'),
  scopeFilter: $('scopeFilter'), modeFilter: $('modeFilter'), chaosRange: $('chaosRange'), chaosValue: $('chaosValue'),
  generateBtn: $('generateBtn'), surpriseBtn: $('surpriseBtn'), dailyBtn: $('dailyBtn'), projectName: $('projectName'),
  projectDescription: $('projectDescription'), resultMeta: $('resultMeta'), chips: $('chips'), partsGrid: $('partsGrid'),
  constraintText: $('constraintText'), featuresList: $('featuresList'), saveBtn: $('saveBtn'), rerollBtn: $('rerollBtn'),
  copyBtn: $('copyBtn'), shareBtn: $('shareBtn'), savedList: $('savedList'), clearSavedBtn: $('clearSavedBtn'),
  partTemplate: $('partTemplate'), poolStats: $('poolStats')
};

function populateFilters() {
  els.typeFilter.innerHTML = '<option value="any">Any</option>' + projectTypes.map((t) => `<option value="${t.id}">${t.name}</option>`).join('');
  els.stackFilter.innerHTML = '<option value="any">Any</option>' + stacks.map((s) => `<option value="${s.id}">${s.name}</option>`).join('');
}

function getFilters() {
  return { type: els.typeFilter.value, stack: els.stackFilter.value, difficulty: els.difficultyFilter.value,
    scope: els.scopeFilter.value, mode: els.modeFilter.value, chaos: Number(els.chaosRange.value) };
}

function labelize(value) {
  if (value === 'any') return 'Any';
  const labels = { month: 'Month+', hour: '1 hour' };
  return labels[value] || value.charAt(0).toUpperCase() + value.slice(1);
}

function renderPoolStats() {
  const total = Object.values(DATA_COUNTS).reduce((a, b) => a * b, 1);
  const compact = total > 1e15 ? `${(total / 1e15).toFixed(1)} quadrillion+ raw combinations` : `${total.toLocaleString()} raw combinations`;
  els.poolStats.textContent = `${DATA_COUNTS.projectTypes} types · ${DATA_COUNTS.stacks} stacks · ${DATA_COUNTS.subjects} subjects · ${DATA_COUNTS.twists} twists · ${compact}`;
}

function renderProject(project) {
  state.project = project; state.seed = project.seed;
  els.projectName.textContent = project.name;
  els.projectDescription.textContent = project.description;
  els.resultMeta.textContent = `SEED ${project.seed}`;
  els.constraintText.textContent = project.constraint.text;
  const chipData = [project.type.name, project.stack.name, labelize(project.difficulty), labelize(project.scope), `${project.chaos}% chaos`];
  els.chips.innerHTML = chipData.map((c) => `<span class="chip">${escapeHtml(c)}</span>`).join('');
  renderParts();
  els.featuresList.innerHTML = project.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('');
  updateSaveButton(); updateUrl();
}

function renderParts() {
  const parts = [['type','Project type',state.project.type.name],['stack','Stack',state.project.stack.name],['subject','Subject',state.project.subject.name],['action','Action',state.project.action.text],['twist','Twist',state.project.twist]];
  els.partsGrid.innerHTML = '';
  for (const [key,label,value] of parts) {
    const node = els.partTemplate.content.cloneNode(true); const card = node.querySelector('.part-card'); card.dataset.key = key;
    if (state.locks[key]) card.classList.add('locked');
    node.querySelector('.part-label').textContent = label; node.querySelector('.part-value').textContent = value;
    const lockBtn = node.querySelector('.lock-btn'); lockBtn.textContent = state.locks[key] ? '🔒' : '🔓';
    lockBtn.addEventListener('click', () => toggleLock(key));
    node.querySelector('.single-reroll-btn').addEventListener('click', () => rerollSingle(key));
    els.partsGrid.appendChild(node);
  }
}

function toggleLock(key) { state.locks[key] = !state.locks[key]; renderParts(); }
function preserveLocked(exceptKey = null) {
  const preserve = {}; for (const key of Object.keys(state.locks)) if (state.locks[key] && key !== exceptKey) preserve[key] = state.project[key]; return preserve;
}
function rerollSingle(key) {
  const preserve = {}; for (const other of Object.keys(state.locks)) if (other !== key) preserve[other] = state.project[other];
  renderProject(generateProject(randomSeed(), getFilters(), preserve));
}
function generate(preserveLocks = false) { renderProject(generateProject(randomSeed(), getFilters(), preserveLocks && state.project ? preserveLocked() : {})); }

function surpriseMe() {
  const pickFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  els.typeFilter.value='any'; els.stackFilter.value='any';
  els.difficultyFilter.value=pickFrom(['beginner','easy','medium','hard','insane']);
  els.scopeFilter.value=pickFrom(['hour','evening','weekend','week','month']);
  els.modeFilter.value=pickFrom(['random','useful','technical','creative','cursed','useless']);
  els.chaosRange.value=Math.floor(Math.random()*101); els.chaosValue.textContent=`${els.chaosRange.value}%`;
  state.locks={ type:false,stack:false,subject:false,action:false,twist:false }; generate(false);
}
function dailyProject() {
  const day=new Date().toISOString().slice(0,10); const seed=xmur3(day)(); state.locks={ type:false,stack:false,subject:false,action:false,twist:false };
  renderProject(generateProject(seed,getFilters()));
}

function serializeProject(p) { return `${p.name}

${p.description}

Constraint: ${p.constraint.text}
Features:
${p.features.map((f)=>`- ${f}`).join('\n')}

Seed: ${p.seed}`; }
async function copyText(text, successText) {
  try { await navigator.clipboard.writeText(text); showToast(successText); }
  catch { const area=document.createElement('textarea'); area.value=text; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); showToast(successText); }
}

function updateUrl() {
  const p=state.project; const params=new URLSearchParams({ seed:p.seed, type:els.typeFilter.value, stack:els.stackFilter.value, difficulty:els.difficultyFilter.value, scope:els.scopeFilter.value, mode:els.modeFilter.value, chaos:els.chaosRange.value });
  history.replaceState(null,'',`${location.pathname}?${params.toString()}`);
}
function loadFromUrl() {
  const params=new URLSearchParams(location.search); if(!params.has('seed')) return false;
  const setIfValid=(el,key)=>{ const value=params.get(key); if(value && [...el.options].some((o)=>o.value===value)) el.value=value; };
  setIfValid(els.typeFilter,'type'); setIfValid(els.stackFilter,'stack'); setIfValid(els.difficultyFilter,'difficulty'); setIfValid(els.scopeFilter,'scope'); setIfValid(els.modeFilter,'mode');
  const chaos=Number(params.get('chaos')); if(Number.isFinite(chaos)){ els.chaosRange.value=clamp(chaos,0,100); els.chaosValue.textContent=`${els.chaosRange.value}%`; }
  const seed=Number(params.get('seed')); renderProject(generateProject(Number.isFinite(seed)?seed:1,getFilters())); return true;
}

function saveCurrent() {
  const p=state.project; const idx=state.saved.findIndex((item)=>item.seed===p.seed);
  if(idx>=0) state.saved.splice(idx,1); else state.saved.unshift({ seed:p.seed,name:p.name,description:p.description,savedAt:Date.now(),filters:getFilters() });
  state.saved=state.saved.slice(0,50); localStorage.setItem(STORAGE_KEY,JSON.stringify(state.saved)); renderSaved(); updateSaveButton();
}
function updateSaveButton() { const isSaved=state.saved.some((item)=>item.seed===state.project?.seed); els.saveBtn.textContent=isSaved?'♥':'♡'; els.saveBtn.title=isSaved?'Remove from saved':'Save project'; }
function renderSaved() {
  if(!state.saved.length){ els.savedList.innerHTML='<div class="saved-empty">Nothing saved yet. Generate something questionable.</div>'; return; }
  els.savedList.innerHTML=state.saved.map((item)=>`<article class="saved-item" data-seed="${item.seed}"><div><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.description.slice(0,115))}${item.description.length>115?'…':''}</p></div><div class="saved-item-actions"><button class="tiny-btn load-saved" type="button" title="Load">↗</button><button class="tiny-btn delete-saved" type="button" title="Delete">×</button></div></article>`).join('');
  els.savedList.querySelectorAll('.saved-item').forEach((node)=>{ const seed=Number(node.dataset.seed); node.querySelector('.load-saved').addEventListener('click',()=>loadSaved(seed)); node.querySelector('.delete-saved').addEventListener('click',()=>deleteSaved(seed)); });
}
function loadSaved(seed) {
  const item=state.saved.find((s)=>s.seed===seed); if(!item)return; const f=item.filters||{};
  for (const [key,el] of [['type',els.typeFilter],['stack',els.stackFilter],['difficulty',els.difficultyFilter],['scope',els.scopeFilter],['mode',els.modeFilter]]) if(f[key] && [...el.options].some((o)=>o.value===f[key])) el.value=f[key];
  if(Number.isFinite(f.chaos)){ els.chaosRange.value=f.chaos; els.chaosValue.textContent=`${f.chaos}%`; }
  renderProject(generateProject(seed,getFilters())); window.scrollTo({top:300,behavior:'smooth'});
}
function deleteSaved(seed){ state.saved=state.saved.filter((item)=>item.seed!==seed); localStorage.setItem(STORAGE_KEY,JSON.stringify(state.saved)); renderSaved(); updateSaveButton(); }
function clearSaved(){ state.saved=[]; localStorage.removeItem(STORAGE_KEY); renderSaved(); updateSaveButton(); }

function showToast(text){ document.querySelector('.toast')?.remove(); const toast=document.createElement('div'); toast.className='toast'; toast.textContent=text; document.body.appendChild(toast); setTimeout(()=>toast.remove(),1500); }
function escapeHtml(value){ return String(value).replace(/[&<>'"]/g,(ch)=>({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[ch])); }
function bindEvents(){
  els.generateBtn.addEventListener('click',()=>generate(false)); els.rerollBtn.addEventListener('click',()=>generate(true)); els.surpriseBtn.addEventListener('click',surpriseMe); els.dailyBtn.addEventListener('click',dailyProject);
  els.chaosRange.addEventListener('input',()=>els.chaosValue.textContent=`${els.chaosRange.value}%`); els.saveBtn.addEventListener('click',saveCurrent); els.copyBtn.addEventListener('click',()=>copyText(serializeProject(state.project),'Project copied')); els.shareBtn.addEventListener('click',()=>copyText(location.href,'Link copied')); els.clearSavedBtn.addEventListener('click',clearSaved);
  [els.typeFilter,els.stackFilter,els.difficultyFilter,els.scopeFilter,els.modeFilter].forEach((el)=>el.addEventListener('change',()=>generate(false)));
}
function init(){ populateFilters(); renderPoolStats(); bindEvents(); renderSaved(); if(!loadFromUrl()) renderProject(generateProject(481516234,getFilters())); }
init();
