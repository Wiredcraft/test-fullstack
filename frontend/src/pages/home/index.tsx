import { DateTime } from 'luxon';
import React from 'react';
import LightningCard from '../../components/ui/LightningCard';
import { ITalk } from '../../store/modules/talks/talks.types';

export default class HomeIndex extends React.Component {
  render() {
    const talks: ITalk[] = [
      {
        id: '1',
        title: 'test title1',
        description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda. lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda. lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
        votes: 10,
        user: {
          name: 'testUser1'
        },
        createdAt: DateTime.now(),
        voted: false
      },
      {
        id: '2',
        title: 'test title2',
        description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
        votes: 20,
        user: {
          name: 'testUser2'
        },
        createdAt: DateTime.now(),
        voted: true
      },
      {
        id: '3',
        title: 'test title3',
        description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
        votes: 30,
        user: {
          name: 'testUser3'
        },
        createdAt: DateTime.now(),
        voted: false
      },
      {
        id: '4',
        title: 'test title4',
        description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
        votes: 40,
        user: {
          name: 'testUser4'
        },
        createdAt: DateTime.now(),
        voted: false
      },
      {
        id: '5',
        title: 'test title1',
        description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
        votes: 10,
        user: {
          name: 'testUser1'
        },
        createdAt: DateTime.now(),
        voted: true
      },
      {
        id: '6',
        title: 'test title2',
        description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
        votes: 20,
        user: {
          name: 'testUser2'
        },
        createdAt: DateTime.now(),
        voted: false
      },
      {
        id: '7',
        title: 'test title3',
        description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
        votes: 30,
        user: {
          name: 'testUser3'
        },
        createdAt: DateTime.now(),
        voted: true
      },
      {
        id: '8',
        title: 'test title4',
        description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
        votes: 40,
        user: {
          name: 'testUser4'
        },
        createdAt: DateTime.now(),
        voted: false
      }
    ];
    return (
      <div>
        {talks.map((talk, index) => (
          <LightningCard key={talk.id} {...talk} />
        ))}
        <div id="add-modal" className="modal-window">
          <div>
            <a href="#" title="Close" className="modal-close">
              Close
            </a>
            <h1>Voilà!</h1>
            <div>A CSS-only modal based on the :target pseudo-class. Hope you find it helpful.</div>
            <div>
              <small>Check out</small>
            </div>
            <a href="https://aminoeditor.com" target="_blank">
              � Amino: Live CSS Editor for Chrome
            </a>
          </div>
        </div>
      </div>
    );
  }
}
