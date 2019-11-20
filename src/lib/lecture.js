

export class lecture {
    constructor() {
        this.content = document.querySelector('') //TODO Finna hentugt nafn á þetta, þarf að vera í samræmi við HTMl
        this.URL = 'lectures.json';
        this.SLUG; // Geyma slug-ið í þessu
    }

    /**
     * Finnur réttan fyrirlestur miðað við SLUG
     */
    getLecture() {
        fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Villa við að sækja gögn');
        })
        .then((data) => {
            const lectures = data.lectures;
            lectures.array.forEach(o => {
                if(o.slug == this.SLUG) {
                    return o;
                }
            });
            throw new Error('Rangt slug');
            
        })
        .catch((error) => {
            displayError('Villa!');
            console.error(error); /* eslint-disable-line */
        });
    }

    displayLecture(lecture) {
        //TODO 
    }



    load() {
        // Sækir slug úr browser urli
        // this.SLUG = url;
        // Sækir viðeigandi gögn úr .json skránni
        // Kallar á fleiri föll sem sjá um að birta
        this.SLUG = (new URLSearchParams(window.location.search)).get('slug'); // Sækja sluggið
        const lecture = this.getLecture(); // Sækja fyrirlestur
        displayLecture(lecture);

    }

    //TODO Fall til að merkja fyrirlestur sem lokið
}
