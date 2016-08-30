export default class Channel {

  constructor(channelId) {
    this.question = {
      text: `Hola, je vois que vous voulez créer une nouvelle action ! Quel nom allez-vous lui donner ?`,
      author: 'Zorro'
    };
    this.state = {
      inputMode: 'newChannel',
      dialogWithZorro: [this.question],
      ongoingAction: true,
    };
    this.channelId = channelId;
    this.expectedAnswer = 'chanName';
    this.result = {
      name: '',
      depth: 2
    };
  }

  resetState() {
    this.state = {
      inputMode: 'message',
      ongoingAction: false,
      dialogWithZorro: [],
      zorro: {}
    };
  }

  getState() {
    return this.state;
  }

  answerToZorro(answer) {
    const msg = {
      text: answer,
      author: 'self'
    };
    const dialog = this.state.dialogWithZorro;

    dialog.push(msg);
    let zorroMsg = {
      text: '',
      author: 'Zorro'
    };

    if (this.expectedAnswer === 'chanName') {
      this.result.name = answer;
      zorroMsg.text = `Vous souhaitez créer l'action : ${this.result.name}, dites oui pour confirmer.`;
      dialog.push(zorroMsg);
      this.expectedAnswer = 'confirm';
    } else if (this.expectedAnswer === 'confirm' && (answer === 'oui' || answer === 'Oui')) {
      Meteor.call('channels.insert', this.result, this.channelId);
      this.resetState();
    }
  }
}
