import {ADD_TALK_SUCCESS, ADD_TALK_FAIL} from './talks'
import talkBox, {CHANGE_FIELD} from './talkBox'

describe('automatic basic validation', () => {
  it('gives violation when change a required field to empty', () => {
    expect(
      talkBox({
        author: {
          value: 'j',
          violation: '',
        },
        title: {
          value: '',
          violation: '',
        },
        description: {
          value: '',
          violation: '',
        }
      }, {
        type: CHANGE_FIELD,
        field: 'author',
        value: ''
      })
    ).toEqual({
      author: {
        value: '',
        violation: 'Please fill out the field.',
      },
      title: {
        value: '',
        violation: '',
      },
      description: {
        value: '',
        violation: '',
      }
    })
  })

  it('gives violation when change a field with maxLength too long', () => {
    expect(
      talkBox({
        author: {
          value: 'j',
          violation: '',
        },
        title: {
          value: '',
          violation: '',
        },
        description: {
          value: '',
          violation: '',
        }
      }, {
        type: CHANGE_FIELD,
        field: 'author',
        value: 'This is too long.This is too long.'
      })
    ).toEqual({
      author: {
        value: 'This is too long.This is too long.',
        violation: 'Exceed words limit by 15.',
      },
      title: {
        value: '',
        violation: '',
      },
      description: {
        value: '',
        violation: '',
      }
    })
  })
})

describe('submit form', () => {
  it('clears all the fields after a talk is successfully added', () => {
    expect(
      talkBox({
        author: {
          value: 'j',
          violation: '',
        },
        title: {
          value: 'zxc',
          violation: '',
        },
        description: {
          value: 'asd',
          violation: '',
        }
      }, {
        type: ADD_TALK_SUCCESS,
      })
    ).toEqual({
      author: {
        value: '',
        violation: '',
      },
      title: {
        value: '',
        violation: '',
      },
      description: {
        value: '',
        violation: '',
      }
    })
  })

  it('merges violations when adding a talk fails', () => {
    expect(
      talkBox({
        author: {
          value: 'j',
          violation: '',
        },
        title: {
          value: 'zxc',
          violation: '',
        },
        description: {
          value: 'asd',
          violation: '',
        }
      }, {
        type: ADD_TALK_FAIL,
        violations: {
          title: 'Title exists.'
        },
      })
    ).toEqual({
      author: {
        value: 'j',
        violation: '',
      },
      title: {
        value: 'zxc',
        violation: 'Title exists.'
      },
      description: {
        value: 'asd',
        violation: '',
      }
    })
  })

  it('does nothing if adding a talk fails without violations provided', () => {
    expect(
      talkBox({
        author: {
          value: 'j',
          violation: '',
        },
        title: {
          value: 'zxc',
          violation: '',
        },
        description: {
          value: 'asd',
          violation: '',
        }
      }, {
        type: ADD_TALK_FAIL,
      })
    ).toEqual({
      author: {
        value: 'j',
        violation: '',
      },
      title: {
        value: 'zxc',
        violation: ''
      },
      description: {
        value: 'asd',
        violation: '',
      }
    })
  })
})
