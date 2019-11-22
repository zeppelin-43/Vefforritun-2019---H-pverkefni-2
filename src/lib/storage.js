// Þetta verður örugglega svipað og verkefni 10, nota localstorage og þannig lagað

const KEY = 'savedLectures';
/**
 * Loadar vistuðum fyrirlestrum
 */
export function load() {
    const finished = localStorage.getItem(KEY);
    if (finished === null) {
        return [];
    }
    return JSON.parse(favourites);
}

/**
 * Vistar fyrirlestur með <slug>
 * @param {*} slug 
 */
export function save(slug) {
    const finished = load();

    // Tékka hvort fyrirlesturinn sé nú þegar búinn
    if(!finished.includes(slug)) {
        finished.push(slug);
        localStorage.setItem(KEY, JSON.stringify(finished));
    }

}

/**
 * Tékkar hvort fyrirlestur sé búinn
 */
export function isFinished(slug) {
    return load().includes(slug);
}