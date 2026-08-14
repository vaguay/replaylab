const modal = document.querySelector('#modal');
const toast = document.querySelector('#toast');
const score = document.querySelector('#scoreValue');
const cards = document.querySelector('#scenarioCards');
let activeScenario = scenarios[0];

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3000);
}

function renderScenarioCards() {
  cards.innerHTML = scenarios.map((scenario) => `<button class="scenario-card ${scenario.id === activeScenario.id ? 'active' : ''}" data-id="${scenario.id}" data-risk="${scenario.risk}"><span class="scenario-tag">${scenario.tag} · ${scenario.risk} risk</span><strong>${scenario.label}</strong><p>${scenario.summary}</p></button>`).join('');
  cards.querySelectorAll('.scenario-card').forEach((card) => card.addEventListener('click', () => selectScenario(card.dataset.id)));
}

function renderTrace(trace) {
  document.querySelector('#traceList').innerHTML = trace.map(([state, number, title, description, label]) => `<li class="${state}"><span class="num">${number}</span><div><strong>${title}</strong><p>${description}</p></div><em>${label}</em></li>`).join('');
}

function renderEvaluation(evaluation) {
  document.querySelector('#outcomeScore').textContent = evaluation.outcome;
  document.querySelector('#actionScore').textContent = evaluation.action;
  document.querySelector('#policyScore').textContent = evaluation.policy;
  document.querySelector('#operationsScore').textContent = evaluation.operations;
  document.querySelector('#releaseDecision strong').textContent = evaluation.decision;
  document.querySelector('#releaseDecision p').textContent = evaluation.rationale;
  document.querySelector('#releaseDecision').classList.toggle('blocked', evaluation.decision === 'Blocked');
}

function selectScenario(id) {
  activeScenario = scenarios.find((scenario) => scenario.id === id);
  const s = activeScenario;
  document.querySelector('#caseTitle').textContent = s.title;
  document.querySelector('#caseMeta').textContent = s.meta;
  document.querySelector('#requiredActions').textContent = s.requiredActions;
  document.querySelector('#humanCheckpoints').textContent = s.checkpoints;
  document.querySelector('#riskLevel').textContent = s.risk;
  document.querySelector('#avatar').textContent = s.customer.initials;
  document.querySelector('#customerName').textContent = s.customer.name;
  document.querySelector('#customerMeta').textContent = s.customer.meta;
  document.querySelector('#ticketText').textContent = s.ticket;
  document.querySelector('#facts').innerHTML = s.facts.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('');
  renderTrace(s.trace);
  score.textContent = s.score;
  document.querySelector('.scorebar i').style.width = `${s.score}%`;
  document.querySelector('#findingLabel').textContent = s.blocker[0];
  document.querySelector('#findingTitle').textContent = s.blocker[1];
  document.querySelector('#findingText').textContent = s.blocker[2];
  renderEvaluation(s.evaluation);
  renderScenarioCards();
  notify(`${s.label} scenario loaded.`);
}

const mutationTemplates = {
  tool: { label: 'Account service unavailable', scenarioId: 'unavailable' },
  approval: { label: 'Refund exceeds approval limit', scenarioId: 'high-value' },
  security: { label: 'Account takeover signal present', scenarioId: 'security' }
};

function generateMutation() {
  const selected = [...document.querySelectorAll('.mutation-options input:checked')]
    .map((input) => input.value);

  if (!selected.length) {
    notify('Select at least one mutation condition first.');
    return;
  }

  // When conditions conflict, safety takes precedence over recovery and monetary workflow rules.
  const highestPriority = ['security', 'tool', 'approval']
    .find((mutation) => selected.includes(mutation));
  const source = scenarios.find((scenario) => scenario.id === mutationTemplates[highestPriority].scenarioId);
  const generated = {
    ...source,
    id: 'generated',
    label: 'Generated replay',
    tag: 'Mutation',
    meta: source.meta.replace('Controlled mutation', 'Generated mutation'),
    summary: selected.map((mutation) => mutationTemplates[mutation].label).join(' · ')
  };
  const existing = scenarios.findIndex((scenario) => scenario.id === 'generated');
  if (existing === -1) scenarios.push(generated);
  else scenarios.splice(existing, 1, generated);

  document.querySelectorAll('.mutation-options input:checked')
    .forEach((input) => { input.checked = false; });
  selectScenario('generated');
  notify(`Generated replay with ${selected.length} controlled condition${selected.length > 1 ? 's' : ''}.`);
}

document.querySelector('[data-modal="policy"]').addEventListener('click', () => modal.showModal());
document.querySelector('.close').addEventListener('click', () => modal.close());
document.querySelector('#newReplay').addEventListener('click', () => notify('Case import is the next MVP capability.'));
document.querySelector('#runReplay').addEventListener('click', () => notify(`Replay complete: ${activeScenario.score}/100 workflow score.`));
document.querySelector('#generateMutation').addEventListener('click', generateMutation);
document.querySelector('#simulateFix').addEventListener('click', () => notify('Use the mutation engine to replay a controlled policy condition.'));

renderScenarioCards();
selectScenario('baseline');
