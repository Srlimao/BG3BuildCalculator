class Calculator {
    constructor(abilityScores) {
        this.abilities = abilityScores;
        this.level = 1;
        this.calcFormDOM = document.getElementsByClassName('calc-form')[0];
    }

    addButtonsListeners(){
        // Add event listeners to buttons
        this.tableDOM.querySelectorAll('button').forEach((button) => {
            const ability = button.dataset.ability;
            const action = button.dataset.action;
            button.addEventListener('click', () => {
                if (action === 'decrease') {
                    abilityScores.decreaseScore(ability);
                } else if (action === 'increase') {
                    abilityScores.increaseScore(ability);
                }
            });
        });
    }


}

const abilityScores = new AbilityScores();
abilityScores.init();