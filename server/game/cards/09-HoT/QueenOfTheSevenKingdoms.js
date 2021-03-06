const DrawCard = require('../../drawcard.js');

class QueenOfTheSevenKingdoms extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: ability.effects.addTrait('Queen')
        });

        this.action({
            title: 'Stand and remove character from challenge',
            condition: () => this.game.currentChallenge,
            cost: [
                ability.costs.standParent(),
                ability.costs.removeParentFromChallenge(() => this.game.currentChallenge)
            ],
            target: {
                cardCondition: card => this.game.currentChallenge.isParticipating(card)
            },
            handler: context => {
                context.target.controller.standCard(context.target);
                this.game.currentChallenge.removeFromChallenge(context.target);
                this.game.addMessage('{0} uses {1} and stands and removes {2} from the challenge to stand and remove {3} from the challenge',
                    context.player, this, this.parent, context.target);
            }
        });
    }

    canAttach(player, card) {
        if(card.getType() !== 'character' || !card.hasTrait('Lady')) {
            return false;
        }

        return super.canAttach(player, card);
    }
}

QueenOfTheSevenKingdoms.code = '09020';

module.exports = QueenOfTheSevenKingdoms;
