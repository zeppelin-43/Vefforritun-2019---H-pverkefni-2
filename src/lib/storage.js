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

    //TODO tékka hvort það sé þegar búið að vista slug í storage
    if(!finished.includes(slug)) {
        finished.push(slug);
        localStorage.setItem(KEY, JSON.stringify(finished));
    }

}