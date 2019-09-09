
const RECURSION_LIMIT = 5000; 

const ClearpathAlgorithm = (allocated, max, resources) => {

    return new Promise((resolve, reject) => {

        if (allocated.length != max.length) {
            reject("Error, invalid start parameters (allocated.length not equal max.length)");
        }

        let finished = [];
        let process_path = [];
        let work = []; // resources available for currentely executed process;
        let need = []; // resources required to complete each process
        let total_process = allocated.length;
        let resources_slots_nb = resources.length;

        for (let i = 0; i < resources_slots_nb; i++) {
            let sum = 0;
            for (let j = 0; j < total_process; j++) {
                sum += allocated[j][i];
            }
            work[i] = resources[i] - sum;
        }

        for (let i = 0; i < total_process; i++) {
            for (let j = 0; j < resources_slots_nb; j++) {
                if (!need[i]) need[i] = [];
                need[i][j] = max[i][j] - allocated[i][j];
                if (need[i][j] < 0) {
                    reject(`Error, allocated greater than maximum ( process: ${i}, resource: ${j}, allocated ${allocated[i][j]}, maximum: ${max[i][j]} )`);
                }
            }

            finished[i] = false;
        }

        let resources_available = (process_id, need, available) => {
            for (let j = 0; j < resources_slots_nb; j++) {
                if (need[process_id][j] > available[j]) return false;
                return true;
            }
        }

        let call_count = 0;
        let find_sequence = (finished, allocated, max, need, work, process_path) => {
            call_count++;
            if(call_count >= RECURSION_LIMIT)  {
                reject("Error, Recursion limit reached.");
                return;
            }
            
            for (let i = 0; i < total_process; i++) {
                if (!finished[i] && resources_available(i, need, work)) {
                     finished[i] = true;
                    for (let j = 0; j < resources_slots_nb; j++) {
                        work[j] += allocated[i][j];
                    }

                    process_path.push(i);

                    find_sequence(finished, allocated, max, need, work, process_path);
                }
            }
        }

        find_sequence(finished, allocated, max, need, work, process_path);
   
        if (process_path.length === total_process) {
            resolve(process_path);
        }

        reject("Error, Deadlock state.");
    })
};

module.exports.ClearpathAlgorithm = ClearpathAlgorithm;
