const modal = document.querySelector('#modal');
const toast = document.querySelector('#toast');
const score = document.querySelector('#scoreValue');

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3000);
}

document.querySelector('[data-modal="policy"]').addEventListener('click', () => modal.showModal());
document.querySelector('.close').addEventListener('click', () => modal.close());
document.querySelector('#newReplay').addEventListener('click', () => notify('Case import is the next MVP capability.'));
document.querySelector('#runReplay').addEventListener('click', () => notify('Replay complete: 1 unsafe action and 1 missing policy check found.'));

document.querySelector('#simulateFix').addEventListener('click', () => {
  const unsafe = document.querySelector('.trace .fail');
  const missing = document.querySelector('.trace .missing');
  unsafe.className = 'pass';
  unsafe.querySelector('strong').textContent = 'Verify account status';
  unsafe.querySelector('p').textContent = 'Policy check completed before billing access.';
  unsafe.querySelector('em').textContent = 'Pass';
  unsafe.querySelector('.num').textContent = '03';
  missing.remove();
  score.textContent = '100';
  document.querySelector('.scorebar i').style.width = '100%';
  notify('Policy fix simulated: the workflow now passes this replay case.');
});

