let flag = true;
let array = [];
let barGraph = document.getElementById('barGraph');
let min_index;
const see1=document.getElementById('see-more');

array = [];
    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 15) + 1);
    }
    renderBars();

function renderBars() {
    barGraph.innerHTML = '';
    array.forEach(value => {
        let bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = (value * 50) + 'px';
        barGraph.appendChild(bar);
    });
}

let intervalID;

//refresh ARRAY SIZE

document.getElementById("ref").onclick = function() {
    console.log("refresh");
    array = [];
    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 15) + 1);
    }
    renderBars();
    
    
};


// bubbleSort()

document.getElementById('bs').onclick = function() {
    // document.getElementById('out1').textContent = null;

document.getElementById('num').textContent = '';
let listItem = document.createElement('p');

let link = document.createElement('a');
link.href = "https://www.geeksforgeeks.org/bubble-sort-algorithm/"; 
link.target = "_blank";
let img = document.createElement('img');
img.src = "https://media.geeksforgeeks.org/wp-content/uploads/20230526103842/1.webp";
img.style.width = '500px'; 
link.appendChild(img);

listItem.appendChild(link);

document.getElementById('num').appendChild(listItem);

console.log("see-more");



    barGraph.innerHTML = '';

   
    array.forEach(value => {
        let bar = document.createElement('div');
        bar.className = 'bar';
        if (value !== null) {
            bar.style.height = (value * 30) + 'px'; 
        }
        barGraph.appendChild(bar);
    });

    clearInterval(intervalID); 

    flag = true;
    bubbleSort();
};

function bubbleSort() {
    let i = 0;
    let j = 1;

    function performStep() {
        if (!flag) {
            clearInterval(intervalID);
            return;
        }

        let swapped = false;

        if (j < array.length - i) {
            if (array[j] < array[j - 1]) {
                [array[j - 1], array[j]] = [array[j], array[j - 1]];
                swapped = true;
            }
            j++;
        } else {
            j = 1;
            i++;
        }

        if (i >= array.length - 1) {
            flag = false; 
            clearInterval(intervalID);
        }

        renderBars();
    }

    intervalID = setInterval(performStep, 700);
}

function renderBars() {
    let barGraph = document.getElementById('barGraph');
    barGraph.innerHTML = '';

    array.forEach(value => {
        let bar = document.createElement('div');
        bar.className = 'bar';
        if (value !== null) {
            bar.style.height = (value * 30) + 'px';
        }
        barGraph.appendChild(bar);
    });
}

//SelectionSort()

document.getElementById('ss').onclick = function() {
   // document.getElementById('out1').textContent = null;
    
// document.getElementById('num').textContent = '';

// console.log("ac");

// let listItem = document.createElement('p');

// listItem.textContent = "bye";


// listItem.style.color = 'white'; 

// console.log("s0\t");

// document.getElementById('num').appendChild(listItem);

document.getElementById('num').textContent = '';


let link = document.createElement('a');
link.href = "https://www.geeksforgeeks.org/selection-sort-algorithm-2/"; 
link.target = "_blank";

let img = document.createElement('img');
img.src = "https://www.programiz.com/sites/tutorial2program/files/Selection-sort-0.png";

img.style.width = '500px'; 
let listItem = document.createElement('p');
// listItem.textContent = "Please refer to troubleshooting section for more info: https://github.com/oracle/javavscode/blob/main/README.md#troubleshooting";


// listItem.style.color = 'white'; 
link.appendChild(img);

listItem.appendChild(link);

document.getElementById('num').appendChild(listItem);

console.log("see-more");
    
    barGraph.innerHTML = '';

   
    array.forEach(value => {
        let bar = document.createElement('div');
        bar.className = 'bar';
        if (value !== null) {
            bar.style.height = (value * 30) + 'px'; 
        }
        barGraph.appendChild(bar);
    });
    let flag = true;

    function renderBars() {
        barGraph.innerHTML = '';
        array.forEach(value => {
            let bar = document.createElement('div');
            bar.className = 'bar';
            if (value !== null) {
                bar.style.height = (value * 30) + 'px'; 
            }
            barGraph.appendChild(bar);
        });
    }

    function SelectionSort() {
        console.log("Sorting started");
        let swapped;
        let i = 0;

        function step() {
            if (i >= array.length - 1) {
                clearInterval(intervalID);
                console.log("Sorting completed");
                return;
            }

            swapped = false;
            let min_index = i;

            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[min_index]) {
                    min_index = j;
                }
            }

            if (min_index !== i) {
                [array[i], array[min_index]] = [array[min_index], array[i]];
                swapped = true;
                renderBars();
            }

            i++;
        }

        let intervalID = setInterval(step, 900);
    }

   //s document.getElementById('out1').textContent = '';
    barGraph.innerHTML = '';

    renderBars();

  
    if (flag) {
        SelectionSort();
    }
};

let timeoutID;

// quicksort

document.getElementById('qs').onclick = function() {
    // document.getElementById('out1').textContent = '';

    document.getElementById('num').textContent = '';

let listItem = document.createElement('p');

let link = document.createElement('a');
link.href = "https://www.geeksforgeeks.org/quick-sort-algorithm/"; 
link.target = "_blank";

let img = document.createElement('img');
img.src = "https://miro.medium.com/v2/resize:fit:577/1*bIJvejLlEshkf-ehYJJlWQ.png";
img.style.width = '500px'; 
link.appendChild(img);

listItem.appendChild(link);

document.getElementById('num').appendChild(listItem);

console.log("see-more");

    barGraph.innerHTML = '';


    array.forEach(value => {
        let bar = document.createElement('div');
        bar.className = 'bar';
        if (value !== null) {
            bar.style.height = (value * 30) + 'px'; 
        }
        barGraph.appendChild(bar);
    });

    renderBars();

    quicksort(array, 0, array.length - 1);
};

function renderBars() {
    barGraph.innerHTML = '';

    array.forEach(value => {
        let bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = (value * 30) + 'px';
        barGraph.appendChild(bar);
    });
}

function quicksort(array, low, high) {
    if (low < high) {
        const pivotIndex = partition(array, low, high);
        timeoutID = setTimeout(() => {
            quicksort(array, low, pivotIndex - 1);
            quicksort(array, pivotIndex + 1, high);
        }, 1500); 
    }
}

function partition(array, low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] <= pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]]; 
            renderBars(); 
        }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]]; 
    renderBars(); 
    return i + 1;
}

//mergeSort()
document.getElementById('ms').onclick = function() {
    document.getElementById('num').textContent = '';

    let listItem = document.createElement('p');

    let link = document.createElement('a');
    link.href = "https://www.geeksforgeeks.org/merge-sort/"; 
    link.target = "_blank";
    
    let img = document.createElement('img');
    img.src = "https://miro.medium.com/v2/resize:fit:750/1*U79OjuSOatHRk8EVsnknzQ.png";
    img.style.width = '500px'; 
    link.appendChild(img);
    
    listItem.appendChild(link);
    
    document.getElementById('num').appendChild(listItem);
    
    console.log("see-more");

    barGraph.innerHTML = '';

    array.forEach(value => {
        let bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = (value * 30) + 'px';
        barGraph.appendChild(bar);
    });

    function renderBars() {
        barGraph.innerHTML = '';

        array.forEach(value => {
            let bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = (value * 30) + 'px';
            barGraph.appendChild(bar);
        });
    }

    let interval;
    let delay = 1000; 
    let steps = []; 

    function mergeSort(array, left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);

            mergeSort(array, left, mid);
            mergeSort(array, mid + 1, right);

            steps.push({ array: array.slice(), left, mid, right });

            setTimeout(() => {
                merge(array, left, mid, right);
            }, delay); 
        }
    }

    function merge(array, left, mid, right) {
        const leftArray = array.slice(left, mid + 1);
        const rightArray = array.slice(mid + 1, right + 1);

        let i = 0, j = 0, k = left;

        while (i < leftArray.length && j < rightArray.length) {
            if (leftArray[i] <= rightArray[j]) {
                array[k++] = leftArray[i++];
            } else {
                array[k++] = rightArray[j++];
            }
        }

        while (i < leftArray.length) {
            array[k++] = leftArray[i++];
        }

        while (j < rightArray.length) {
            array[k++] = rightArray[j++];
        }

        steps.push({ array: array.slice(), left, mid, right });

        if (interval) clearInterval(interval); 
        let index = 0;

        interval = setInterval(() => {
            if (index < steps.length) {
                array = steps[index].array.slice();
                renderBars();
                index++;
            } else {
                clearInterval(interval);
            }
        }, delay);
    }

    mergeSort(array, 0, array.length - 1);
};

document.getElementById("ref").onclick = function() {
    console.log("refresh");
    array = [];
    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 15) + 1);
    }
    renderBars();
};

// Insertion Sort ()

document.getElementById('is').onclick = function() {
  
    document.getElementById('num').textContent = '';
    let listItem = document.createElement('p');

    let link = document.createElement('a');
    link.href = "https://www.geeksforgeeks.org/insertion-sort/";
    link.target = "_blank";
    let img = document.createElement('img');
    img.src = "https://media.geeksforgeeks.org/wp-content/uploads/20240802210251/Insertion-sorting.png";
    img.style.width = '500px';
    link.appendChild(img);

    listItem.appendChild(link);
    document.getElementById('num').appendChild(listItem);

    console.log("see-more");

    barGraph.innerHTML = '';

    index = 1;
    flag = true;

    renderBars();
    insertionSort();
};

let index = 1;
// let intervalID;

function insertionSort() {
    function performStep() {
        if (!flag) {
            clearInterval(intervalID);
            return;
        }

        if (index < array.length) {
            let key = array[index];
            let j = index - 1;

            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;

            index++;
        } else {
            flag = false;
            clearInterval(intervalID);
        }

        renderBars();
    }

    intervalID = setInterval(performStep, 700);
}

function renderBars() {
    let barGraph = document.getElementById('barGraph');
    barGraph.innerHTML = '';

    array.forEach(value => {
        let bar = document.createElement('div');
        bar.className = 'bar';
        if (value !== null) {
            bar.style.height = (value * 30) + 'px';
        }
        barGraph.appendChild(bar);
    });
}
