// --- Utility & state ---
    const barsEl = document.getElementById('bars');
    const sizeEl = document.getElementById('size');
    const speedEl = document.getElementById('speed');
    const randomizeBtn = document.getElementById('randomize');
    const startBtn = document.getElementById('start');
    const pauseBtn = document.getElementById('pause');
    const stepBtn = document.getElementById('step');
    const algorithmEl = document.getElementById('algorithm');
    const comparisonsEl = document.getElementById('comparisons');
    const swapsEl = document.getElementById('swaps');
    const statusEl = document.getElementById('status');
    const codeEl = document.getElementById('code');
    const arrayInput = document.getElementById('arrayInput');
    const fromInputBtn = document.getElementById('fromInput');

    let arr = [];
    let running = false;
    let paused = false;
    let stepMode = false;
    let speed = 45; // 1..100 (higher -> faster)
    let comparisons = 0, swaps = 0;
    let controller = {cancel:false};

    function sleep(ms){
      return new Promise(res => setTimeout(res, ms));
    }

    function delay() {
      // map slider (1..100) to ms (350..8)
      const v = Number(speedEl.value);
      const ms = Math.round(350 - (v/100) * 342); // 350..8
      return ms;
    }

    function resetCounts(){comparisons=0;swaps=0;comparisonsEl.textContent='Comparisons: 0';swapsEl.textContent='Swaps: 0'}

    function setStatus(text){statusEl.textContent = text}

    function render() {
      barsEl.innerHTML = '';
      document.documentElement.style.setProperty('--n', arr.length);
      const max = Math.max(...arr,1);
      for (let i=0;i<arr.length;i++){
        const val = arr[i];
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.flex = `0 0 calc((100% - ${arr.length*6}px) / ${arr.length})`;
        const height = Math.max(6, Math.round((val/max) * 100));
        bar.style.height = (height*3.4)+'px';
        bar.setAttribute('data-index', i);
        bar.setAttribute('aria-label', 'value '+val);
        const label = document.createElement('span'); label.textContent = val;
        bar.appendChild(label);
        barsEl.appendChild(bar);
      }
    }

    // Helpers for animation controls
    async function waitWhilePaused() {
      while (paused && running && !stepMode) {
        await sleep(40);
      }
      if (stepMode) {
        stepMode = false; // consume step
      }
    }

    function highlight(i, j, cls){
      const a = barsEl.querySelector('[data-index="'+i+'"]');
      const b = barsEl.querySelector('[data-index="'+j+'"]');
      if (a) a.classList.add(cls);
      if (b && i!==j) b.classList.add(cls);
    }
    function unhighlightAll(){
      barsEl.querySelectorAll('.bar').forEach(b=>b.classList.remove('comparing','swapping'));
    }

    function swap(i,j){
      [arr[i], arr[j]] = [arr[j], arr[i]];
      swaps++; swapsEl.textContent='Swaps: '+swaps;
      render();
    }

    // --- Algorithms (each returns a Promise that resolves when finished) ---
    async function bubbleSort(ctrl){
      const n = arr.length;
      for (let i=0;i<n;i++){
        for (let j=0;j<n-i-1;j++){
          if (ctrl.cancel) return; 
          comparisons++; comparisonsEl.textContent='Comparisons: '+comparisons;
          highlight(j,j+1,'comparing');
          await sleep(delay()); await waitWhilePaused();
          if (arr[j] > arr[j+1]){
            highlight(j,j+1,'swapping');
            await sleep(delay()/1.8);
            swap(j,j+1);
          }
          unhighlightAll();
        }
      }
    }

    async function selectionSort(ctrl){
      const n = arr.length;
      for (let i=0;i<n-1;i++){
        let min=i;
        for (let j=i+1;j<n;j++){
          if (ctrl.cancel) return;
          comparisons++; comparisonsEl.textContent='Comparisons: '+comparisons;
          highlight(min,j,'comparing');
          await sleep(delay()); await waitWhilePaused();
          if (arr[j] < arr[min]){ min=j }
          unhighlightAll();
        }
        if (min !== i){highlight(i,min,'swapping'); await sleep(delay()/1.8); swap(i,min); unhighlightAll()}
      }
    }

    async function insertionSort(ctrl){
      for (let i=1;i<arr.length;i++){
        let key = arr[i];
        let j=i-1;
        while (j>=0 && arr[j] > key){
          if (ctrl.cancel) return;
          comparisons++; comparisonsEl.textContent='Comparisons: '+comparisons;
          highlight(j,j+1,'comparing'); await sleep(delay()); await waitWhilePaused();
          arr[j+1] = arr[j]; swaps++; swapsEl.textContent='Swaps: '+swaps; render();
          j--; unhighlightAll();
        }
        arr[j+1] = key; render(); await sleep(delay()/1.5); await waitWhilePaused();
      }
    }

    async function mergeSortWrapper(ctrl){
      await mergeSort(0, arr.length-1, ctrl);
      render();
    }
    async function mergeSort(l, r, ctrl){
      if (l>=r || ctrl.cancel) return;
      const m = Math.floor((l+r)/2);
      await mergeSort(l,m,ctrl); await mergeSort(m+1,r,ctrl);
      await merge(l,m,r,ctrl);
    }
    async function merge(l,m,r,ctrl){
      if (ctrl.cancel) return;
      const left = arr.slice(l,m+1), right = arr.slice(m+1,r+1);
      let i=0,j=0,k=l;
      while (i<left.length && j<right.length){
        comparisons++; comparisonsEl.textContent='Comparisons: '+comparisons;
        highlight(k,k,'comparing'); await sleep(delay()); await waitWhilePaused();
        if (left[i] <= right[j]){ arr[k++] = left[i++]; } else { arr[k++] = right[j++]; }
        swaps++; swapsEl.textContent='Swaps: '+swaps; render(); unhighlightAll();
      }
      while (i<left.length){ if (ctrl.cancel) return; arr[k++]=left[i++]; swaps++; swapsEl.textContent='Swaps: '+swaps; render(); await sleep(delay()/2)}
      while (j<right.length){ if (ctrl.cancel) return; arr[k++]=right[j++]; swaps++; swapsEl.textContent='Swaps: '+swaps; render(); await sleep(delay()/2)}
    }

    async function quickSortWrapper(ctrl){ await quickSort(0,arr.length-1,ctrl); }
    async function quickSort(low,high,ctrl){
      if (low<high && !ctrl.cancel){
        const p = await partition(low,high,ctrl);
        await quickSort(low,p-1,ctrl); await quickSort(p+1,high,ctrl);
      }
    }
    async function partition(low,high,ctrl){
      const pivot = arr[high];
      let i=low-1;
      for (let j=low;j<high;j++){
        if (ctrl.cancel) return high;
        comparisons++; comparisonsEl.textContent='Comparisons: '+comparisons;
        highlight(j,high,'comparing'); await sleep(delay()); await waitWhilePaused();
        if (arr[j] <= pivot){ i++; highlight(i,j,'swapping'); await sleep(delay()/1.8); swap(i,j); }
        unhighlightAll();
      }
      highlight(i+1,high,'swapping'); await sleep(delay()/1.8); swap(i+1,high); unhighlightAll();
      return i+1;
    }

    async function heapSort(ctrl){
      const n = arr.length;
      for (let i=Math.floor(n/2)-1;i>=0;i--){ await heapify(n,i,ctrl) }
      for (let i=n-1;i>0;i--){ if (ctrl.cancel) return; highlight(0,i,'swapping'); await sleep(delay()/1.4); swap(0,i); await heapify(i,0,ctrl); }
    }
    async function heapify(n,i,ctrl){
      let largest=i; let l=2*i+1; let r=2*i+2;
      if (l<n){ comparisons++; comparisonsEl.textContent='Comparisons: '+comparisons; highlight(i,l,'comparing'); await sleep(delay()); unhighlightAll(); if (arr[l] > arr[largest]) largest=l }
      if (r<n){ comparisons++; comparisonsEl.textContent='Comparisons: '+comparisons; highlight(l,r,'comparing'); await sleep(delay()); unhighlightAll(); if (arr[r] > arr[largest]) largest=r }
      if (largest !== i){ highlight(i,largest,'swapping'); await sleep(delay()/1.4); swap(i,largest); await heapify(n,largest,ctrl) }
    }

    // --- Control flow ---
    async function runAlgorithm(){
      running = true; paused = false; controller.cancel=false; resetCounts(); setStatus('Running: '+algorithmEl.value);
      const alg = algorithmEl.value;
      try{
        if (alg==='bubble') await bubbleSort(controller);
        else if (alg==='selection') await selectionSort(controller);
        else if (alg==='insertion') await insertionSort(controller);
        else if (alg==='merge') await mergeSortWrapper(controller);
        else if (alg==='quick') await quickSortWrapper(controller);
        else if (alg==='heap') await heapSort(controller);
        setStatus('Completed');
      } catch(e){ console.error(e); setStatus('Stopped'); }
      running=false;
    }

    function stopAlgorithm(){ controller.cancel=true; running=false; paused=false; setStatus('Stopped'); }

    // --- UI wiring ---
    function randomize(n=20){ arr = []; for (let i=0;i<n;i++) arr.push(Math.floor(Math.random()*100)+1); render(); }
    randomize(Number(sizeEl.value));

    randomizeBtn.addEventListener('click', ()=>{ randomize(Number(sizeEl.value)); setStatus('Randomized'); });
    sizeEl.addEventListener('change', ()=>{ const v=Number(sizeEl.value); if (v<5) sizeEl.value=5; if (v>200) sizeEl.value=200; randomize(v); });
    speedEl.addEventListener('input', ()=>{ setStatus('Speed: '+speedEl.value); });

    startBtn.addEventListener('click', async ()=>{
      if (running){ paused=false; setStatus('Resumed'); return }
      controller = {cancel:false}; resetCounts(); render(); await runAlgorithm();
    });
    pauseBtn.addEventListener('click', ()=>{ if (!running) return; paused=!paused; setStatus(paused? 'Paused' : 'Running'); });
    stepBtn.addEventListener('click', ()=>{ if (!running) { startBtn.click(); } stepMode = true; paused=false; setStatus('Step'); });

    algorithmEl.addEventListener('change', ()=>{ showCode(algorithmEl.value); setStatus('Algorithm: '+algorithmEl.value) });
    fromInputBtn.addEventListener('click', ()=>{
      const text = arrayInput.value.trim();
      if (!text) return; const nums = text.split(/[,\s]+/).map(x=>Number(x)).filter(n=>!isNaN(n)); if (nums.length){ arr = nums; render(); sizeEl.value = arr.length; setStatus('Loaded from input') }
    });

    // simple export (screenshot) — uses html2canvas? can't load libs. We'll use draw to canvas quickly.
    document.getElementById('saveImage').addEventListener('click', ()=>{
      const w = barsEl.clientWidth, h = barsEl.clientHeight;
      const c = document.createElement('canvas'); c.width = w; c.height = h; const ctx = c.getContext('2d'); ctx.fillStyle = getComputedStyle(document.body).backgroundColor; ctx.fillRect(0,0,w,h);
      const barNodes = barsEl.querySelectorAll('.bar');
      barNodes.forEach((b,i)=>{
        const rect = b.getBoundingClientRect();
        const val = arr[i];
        const bw = Math.floor((w - (arr.length-1)*6)/arr.length);
        const x = i*(bw+6);
        const maxH = h-24; const maxVal = Math.max(...arr);
        const bh = Math.max(4, Math.round((val/maxVal)*maxH));
        ctx.fillStyle = '#00bcd4'; ctx.fillRect(x, h-bh-10, bw, bh);
      });
      const link = document.createElement('a'); link.download = 'sorting-visual.png'; link.href = c.toDataURL('image/png'); link.click();
    });

    function showCode(name){
      const codes = {
        bubble:`Bubble Sort (simple):\nfor i from 0 to n-1:\n  for j from 0 to n-i-2:\n    if A[j] > A[j+1] swap(A[j], A[j+1])\nTime: O(n^2)`,
        selection:`Selection Sort:\nfor i from 0 to n-2:\n  min = i\n  for j from i+1 to n-1:\n    if A[j] < A[min] min = j\n  swap(A[i], A[min])\nTime: O(n^2)`,
        insertion:`Insertion Sort:\nfor i from 1 to n-1:\n  key = A[i]\n  j = i-1\n  while j>=0 and A[j] > key:\n    A[j+1] = A[j]; j--\n  A[j+1] = key\nTime: O(n^2) best O(n)`,
        merge:`Merge Sort:\ndef mergeSort(A,l,r):\n  if l < r:\n    m = (l+r)/2\n    mergeSort(A,l,m)\n    mergeSort(A,m+1,r)\n    merge(A,l,m,r)\nTime: O(n log n)`,
        quick:`Quick Sort:\nchoose pivot, partition, recurse on halves\nAverage: O(n log n) Worst: O(n^2)`,
        heap:`Heap Sort:\nBuild max heap, swap root with last, heapify, repeat\nTime: O(n log n)`
      };
      codeEl.textContent = codes[name] || 'Algorithm code not found';
    }

    // initial code
    showCode(algorithmEl.value);

    function showCode(name){
      const codes = {
        bubble:`Bubble Sort (simple):\nfor i from 0 to n-1:\n  for j from 0 to n-i-2:\n    if A[j] > A[j+1] swap(A[j], A[j+1])\nTime: O(n^2)`,
        selection:`Selection Sort:\nfor i from 0 to n-2:\n  min = i\n  for j from i+1 to n-1:\n    if A[j] < A[min] min = j\n  swap(A[i], A[min])\nTime: O(n^2)`,
        insertion:`Insertion Sort:\nfor i from 1 to n-1:\n  key = A[i]\n  j = i-1\n  while j>=0 and A[j] > key:\n    A[j+1] = A[j]; j--\n  A[j+1] = key\nTime: O(n^2) best O(n)`,
        merge:`Merge Sort:\ndef mergeSort(A,l,r):\n  if l < r:\n    m = (l+r)/2\n    mergeSort(A,l,m)\n    mergeSort(A,m+1,r)\n    merge(A,l,m,r)\nTime: O(n log n)`,
        quick:`Quick Sort:\nchoose pivot, partition, recurse on halves\nAverage: O(n log n) Worst: O(n^2)`,
        heap:`Heap Sort:\nBuild max heap, swap root with last, heapify, repeat\nTime: O(n log n)`
      };
      const descriptions = {
        bubble:`Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.\nBest: O(n) (already sorted), Worst & Average: O(n²), Space: O(1), Stable.`,
        selection:`Finds the minimum element from the unsorted part and swaps it with the first unsorted element.\nBest/Worst/Average: O(n²), Space: O(1), Not Stable.`,
        insertion:`Builds the sorted array one element at a time by inserting each new element into its correct position.\nBest: O(n) (nearly sorted), Worst & Average: O(n²), Space: O(1), Stable.`,
        merge:`Divides the array into halves, sorts each half, then merges them.\nBest/Worst/Average: O(n log n), Space: O(n), Stable.`,
        quick:`Picks a pivot, partitions the array, then recursively sorts the partitions.\nBest & Average: O(n log n), Worst: O(n²), Space: O(log n), Not Stable.`,
        heap:`Builds a max heap, then repeatedly swaps the root with the last element and heapifies.\nBest/Worst/Average: O(n log n), Space: O(1), Not Stable.`
      };
      codeEl.textContent = codes[name] || 'Algorithm code not found';
      document.getElementById('explain').textContent = descriptions[name] || '';
    }
    // initial code
    showCode(algorithmEl.value);


    // accessibility: keyboard shortcuts
    window.addEventListener('keydown', (e)=>{
      if (e.key === ' ') { e.preventDefault(); if (running) pauseBtn.click(); else startBtn.click(); }
      if (e.key === 'r') randomizeBtn.click();
      if (e.key === 's') stepBtn.click();
    });

    // expose for debugging
    window._sv = {arr,render,randomize,runAlgorithm};
