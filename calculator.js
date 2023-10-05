class AbilityScores {
    constructor() {
        this.scores = {
            strength: 10,/*
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,*/
        };
        this.modifiers = {};
        this.primaryAbility = null;
        this.secondaryAbility = null;
        this.tableDOM = document.getElementsByClassName('ability-score-table')[0];
    }

    decreaseScore(ability) {
        if (this.scores[ability] > 8) {
            this.scores[ability] -= 1;
            this.updateHTML(ability);
        }
    }

    increaseScore(ability) {
        if (this.scores[ability] < 15) {
            this.scores[ability] += 1;
            this.updateHTML(ability);
        }
    }

    updatePrimary(ability, checked) {
        if(checked){
            this.primaryAbility = ability;
            if(this.secondaryAbility === ability){
                this.secondaryAbility = null;
            }            
        }
        else {
            this.primaryAbility = null;
        }
        this.updateAllAbilities();
    }

    updateSecondary(ability, checked) {
        if(checked){
            this.secondaryAbility = ability;
            if(this.primaryAbility === ability){
                this.primaryAbility = null;
            }            
        }
        else {
            this.secondaryAbility = null;
        }
        this.updateAllAbilities();
    }

    getAttributeModifier(ability) {
        return this.primaryAbility === ability ? 2 : this.secondaryAbility === ability ? 1 : 0;
    }

    updateAllAbilities() {
        for (const ability in this.scores) {
            this.updateHTML(ability);
        }
    }

    updateHTML(ability) {
        const scoreElement = this.tableDOM.querySelector(`#${ability}-score`);
        const modifierElement = this.tableDOM.querySelector(`#${ability}-modifier`);
        const score = this.scores[ability] + this.getAttributeModifier(ability);
        const primaryCheckbox = this.tableDOM.querySelector(`input[type="checkbox"][data-ability="${ability}"][data-type="primary"]`);
        const secondaryCheckbox = this.tableDOM.querySelector(`input[type="checkbox"][data-ability="${ability}"][data-type="secondary"]`);
        primaryCheckbox.checked = this.primaryAbility;
        secondaryCheckbox.checked = this.secondaryAbility;
        const modifier = Math.floor((score - 10) / 2);
        
        scoreElement.textContent = score;
        modifierElement.textContent = modifier > 0 ? `+${modifier}` : modifier;
    }

    addCheckboxListeners(){

    }
}

const abilityScores = new AbilityScores();

// Add event listeners to buttons
document.querySelectorAll('button').forEach((button) => {
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

// Add event listeners to checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    const ability = checkbox.dataset.ability;
    const type = checkbox.dataset.type;
    checkbox.addEventListener('change', () => {
        if (type === 'primary') {
            abilityScores.updatePrimary(ability, checkbox.checked);
        } else if (type === 'secondary') {
            abilityScores.updateSecondary(ability, checkbox.checked);
        }
    });
});
