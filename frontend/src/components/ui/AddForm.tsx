import React, { useEffect, useState } from 'react';
import Joi from 'joi';

import './AddForm.scss';
import Spinner from './Spinner';
import { useAppDispatch, useAppSelector } from '../../store';
import { createTalk } from '../../store/modules/talks/talks.api';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { toast } from './ToastManager';

export default function AddForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const talksStatus = useAppSelector((state) => state.talks.status);
  const talksError = useAppSelector((state) => state.talks.error);

  const [form, setForm] = useState({
    title: '',
    description: ''
  });

  const [error, setErrors] = useState({
    title: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading && talksStatus === 'succeeded') {
      navigate('/');
      toast.show({
        title: 'Talk added!',
        content: 'Your talk has been successfully added!',
        type: 'success',
        duration: 3000
      });
    } else if (loading && talksStatus === 'failed') {
      setErrors({
        title:
          talksError!.indexOf('Key (title)') > -1
            ? 'This talk title already exists. Please choose another.'
            : '',
        description: ''
      });
      setLoading(false);
    }
  }, [loading, talksStatus]);

  const schema = Joi.object({
    title: Joi.string().min(4).max(64).required(),
    description: Joi.string().min(10).max(200).required()
  });

  const validateForm = () => {
    setErrors({ title: '', description: '' });
    const result = schema.validate(form, { abortEarly: false });
    const { error } = result;

    setLoading(true);

    if (error) {
      const newErrors = { title: '', description: '' };
      for (const item of error.details) {
        if (item.context!.key! === 'title') {
          newErrors.title = item.message;
        } else if (item.context!.key! === 'description') {
          newErrors.description = item.message;
        }
      }
      setErrors(newErrors);
      setLoading(false);
      return false;
    }

    return true;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const update = form;

    if (target.name === 'title') {
      update.title = target.value;
    } else if (target.name === 'description') {
      update.description = target.value;
    }

    setForm(update);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const update = form;

    update.description = event.target.value;

    setForm(update);
  };

  const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    setForm({
      title: form.title.trim(),
      description: form.title.trim()
    });

    if (!validateForm()) return;

    await dispatch(createTalk(form));
  };

  const titleErrorClasses = classNames({
    error: !!error.title
  });

  const descriptionErrorClasses = classNames({
    error: !!error.description
  });

  return (
    <div className="flex items-center justify-center flex-col w-full">
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className={titleErrorClasses}
          name="title"
          placeholder="Title"
          onChange={handleInputChange}></input>
        <span className="w-full text-red text-left py-2">{error.title || '\u00A0'}</span>

        <textarea
          name="description"
          className={descriptionErrorClasses}
          placeholder="Description"
          rows={3}
          onChange={handleDescriptionChange}></textarea>
        <span className="w-full text-red text-left py-2">{error.description || '\u00A0'}</span>
        <div className="w-full flex items-center justify-end py-4">
          <button type="submit" className="bg-blue px-6 py-3 text-white">
            {loading ? (
              <div className="px-3 py-2">
                <Spinner large={false} />
              </div>
            ) : (
              'Add'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
