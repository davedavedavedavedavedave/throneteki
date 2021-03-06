const DrawCard = require('../../drawcard.js');

class Heartsbane extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Give attached character +3 STR',
            condition: () => this.parent && this.game.currentChallenge && this.game.currentChallenge.isParticipating(this.parent),
            cost: ability.costs.kneelSelf(),
            handler: () => {
                this.untilEndOfChallenge(ability => ({
                    match: card => card === this.parent,
                    effect: ability.effects.modifyStrength(3)
                }));
                this.game.addMessage('{0} kneels {1} to give {2} +3 STR until the end of the challenge', this.controller, this, this.parent);
            }
        });
    }

    canAttach(player, card) {
        if(card.getType() !== 'character' || !card.isFaction('tyrell')) {
            return false;
        }

        return super.canAttach(player, card);
    }
}

Heartsbane.code = '01191';

module.exports = Heartsbane;
