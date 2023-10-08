class Calculator {
    constructor(abilityScores) {
        this.abilities = abilityScores;
        this.level = 1;
        this.crit = 20;
        this.AllInFeat = false;
        this.Sharpshooter = false;
        this.SavageFeat = false;
        this.WeaponDie = 1;
        this.WeaponDieAmount = 6;
        this.calcFormDom = document.getElementsByClassName('calc-form')[0];
        this.levelDom = this.calcFormDom.querySelector('#level-score');
        this.AllInFeatDom = this.calcFormDom.querySelector('#all-in-feat');
        this.SharpshooterDom = this.calcFormDom.querySelector('#sharpshooter-feat');
        this.critDom = this.calcFormDom.querySelector('#crit-score');
        this.SavageFeatDom = this.calcFormDom.querySelector('#savage-feat');
        this.maxLevel = () => { return 12;}
        this.getProficiencyBonus = () => {
            const baseBonus = 2;
            const rateOfIncrease = 1/4; // 1 point every 4 levels
            return Math.floor(baseBonus + rateOfIncrease * (this.level - 1 ));
        }
    }

    init(){
        this.addButtonsListeners();
        this.addCheckboxListeners();
        this.updateHTML();
    }

    increaseAttribute(ability){
        if(ability == "level"){
            if(this.level < this.maxLevel()){
                this.level++;
            }
        }
        if(ability == "crit"){
            if(this.crit < 20)
                this.crit++;
        }        
            
    }

    decreaseAttribute(ability){
        if(ability == "level"){
            if(this.level > 1){
                this.level--;
            }
        }
        if(ability == "crit"){
            if(this.crit > 1)
                this.crit--;
        }   
    }

    updateHTML(){
        this.levelDom.textContent = this.level;
        this.AllInFeatDom.checked = this.AllInFeat;
        this.SharpshooterDom.checked = this.Sharpshooter;
        this.SavageFeatDom.checked = this.SavageFeat;
        this.critDom.textContent = this.crit;
    }

    addButtonsListeners(){
        // Add event listeners to buttons
        this.calcFormDom.querySelectorAll('button').forEach((button) => {
            const action = button.dataset.action;
            const ability = button.dataset.ability;
            button.addEventListener('click', () => {
                if (action === 'decrease') {
                    this.decreaseAttribute(ability);
                } else if (action === 'increase') {
                    this.increaseAttribute(ability);
                }
                this.updateHTML();
            });
        });
    }

    addCheckboxListeners(){
        this.AllInFeatDom.addEventListener('change', (event) => {
            this.AllInFeat = event.target.checked;
            this.updateHTML();
        });

        this.SharpshooterDom.addEventListener('change', (event) => {
            this.Sharpshooter = event.target.checked;
            this.updateHTML();
        });

        this.SavageFeatDom.addEventListener('change', (event) => {
            this.SavageFeat = event.target.checked;
            this.updateHTML();
        });
    }


}

const abilityScores = new AbilityScores();
abilityScores.init();

const calculator = new Calculator(abilityScores);
calculator.init();