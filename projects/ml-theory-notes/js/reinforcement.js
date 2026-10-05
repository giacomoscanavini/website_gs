(() => {
  'use strict';
  function compute(gamma, probability) {
    gamma = Number(gamma); probability = Number(probability);
    if (!Number.isFinite(gamma) || !Number.isFinite(probability) || gamma < 0 || gamma > 1 || probability < 0 || probability > 1) throw new RangeError('Inputs must be between 0 and 1');
    const stop = 2, wait = 4 * gamma * gamma;
    return {gamma, probability, stop, wait, value: (1 - probability) * stop + probability * wait, optimum: Math.max(stop, wait)};
  }
  function init(root = document) {
    const box = root.querySelector('#rl-discount-calculation');
    if (!box || box.dataset.initialized) return;
    box.dataset.initialized = 'true';
    function render() {
    const result = compute(document.getElementById('rl-gamma').value, document.getElementById('rl-wait-prob').value);
    document.getElementById('rl-gamma-output').textContent = result.gamma.toFixed(2);
    document.getElementById('rl-prob-output').textContent = result.probability.toFixed(2);
    for (const [id, value] of [['stop', result.stop], ['wait', result.wait], ['policy', result.value]]) {
      document.getElementById('rl-' + id + '-bar').style.width = (100 * value / 4) + '%';
      document.getElementById('rl-' + id + '-value').textContent = value.toFixed(3);
    }
    const choice = Math.abs(result.wait - result.stop) < 1e-12 ? 'Both actions tie' : result.wait > result.stop ? 'The optimal choice is wait' : 'The optimal choice is stop';
    document.getElementById('rl-value-output').textContent = `At γ = ${result.gamma.toFixed(2)}, waiting returns ${result.wait.toFixed(3)}. A policy that waits with probability ${result.probability.toFixed(2)} has expected return ${result.value.toFixed(3)}. ${choice}.`;
    box.dataset.result = JSON.stringify(result);
  }
  box.addEventListener('input', render);
  box.addEventListener('change', render);
  document.getElementById('rl-reset').addEventListener('click', () => {
    document.getElementById('rl-gamma').value = '0.9';
    document.getElementById('rl-wait-prob').value = '0.5';
    render();
  });
    render();
  }
  window.ReinforcementVisual = {compute, init};
})();