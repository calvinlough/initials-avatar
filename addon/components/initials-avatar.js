import Ember from 'ember';
const { Component, computed, isPresent, String: { htmlSafe } } = Ember;

export default Component.extend({
  classNameBindings: [':initialsAvatar', 'avatarColor'],
  attributeBindings: ['style'],

  firstName: '',
  lastName: '',
  company: '',
  email: '',
  image: '',
  colorIndex: 1,
  maxColorIndex: 1,

  hasImage: computed.notEmpty('image'),

  initials: computed('firstName', 'lastName', 'company', 'email', function() {
    let first = this.initial(this.get('firstName'));
    let last = this.initial(this.get('lastName'));
    let company = this.initial(this.get('company'));
    let email = this.initial(this.get('email'));
    return (first + last) || company || email;
  }),

  initial(word) {
    let initial = isPresent(word) ? word[0] : '';
    return initial.toUpperCase();
  },

  /**
   * Display the image using a background-image inline style
   */
  style: computed('hasImage', function() {
    if (this.get('hasImage')) {
      return htmlSafe(`background-image: url(${this.get('image')}); background-size: cover`);
    }
  }),

  avatarColor: computed('maxColors', 'colorIndex', function() {
    let index = this.get('colorIndex');
    index = (index - 1) % this.get('maxColorIndex') + 1;
    return `avatarColor-${index}`;
  })
});
