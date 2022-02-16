import React from 'react';

import './AddForm.scss';

export default class AddForm extends React.Component {
  render() {
    return (
      <div className="flex items-center justify-center flex-col w-full">
        <div className="add-form">
          <input type="text" name="title" placeholder="Title"></input>
          <textarea name="description" placeholder="Description" rows={3}></textarea>
          <div className="w-full flex items-center justify-end py-4">
            <button type="submit" className='bg-blue px-6 py-3 text-white'>Add</button>
          </div>
        </div>
      </div>
    );
  }
}
