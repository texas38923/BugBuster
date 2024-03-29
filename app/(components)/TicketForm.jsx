//to use the client-side JavaScript:
'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === 'new' ? false : true;
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: 'PUT',
        body: JSON.stringify({ formData }),
        'content-type': 'application/json',
      });

      if (!res.ok) {
        throw new Error('Failed to update the ticket..');
      }
    } else {
      const res = await fetch('/api/Tickets', {
        method: 'POST',
        body: JSON.stringify({ formData }),
        'content-type': 'application/json',
      });

      if (!res.ok) {
        throw new Error('Failed to create a ticket..');
      }
    }

    router.refresh();
    router.push('/');
    router.refresh();
  };

  const startingTicketData = {
    title: '',
    description: '',
    priority: 1,
    progress: 0,
    status: 'not started',
    category: 'Hardware Problem',
  };

  if (EDITMODE) {
    startingTicketData['title'] = ticket.title;
    startingTicketData['description'] = ticket.description;
    startingTicketData['priority'] = ticket.priority;
    startingTicketData['progress'] = ticket.progress;
    startingTicketData['status'] = ticket.status;
    startingTicketData['category'] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className='flex justify-center'>
      <form
        className='flex flex-col gap-3 w-1/2'
        method='post'
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? 'Update Your Ticket' : 'Create Your Ticket..'}</h3>
        <label>Title</label>
        <input
          type='text'
          id='title'
          name='title'
          placeholder='Enter Problem Title..'
          onChange={handleChange}
          required={true}
          value={formData.title}
        />

        <label>Description</label>
        <textarea
          id='description'
          name='description'
          placeholder='Enter the problem description..'
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows='5'
        />

        <label>Category</label>
        <select
          name='category'
          value={formData.category}
          onChange={handleChange}
        >
          <option value='Hardware Problem'>Hardware Problem</option>
          <option value='Software Problem'>Software Problem</option>
          <option value='Project Problem'>Project Problem</option>
          <option value='Miscellaneous'>Miscellaneous </option>
        </select>

        <label>Priority</label>
        <div>
          <input
            type='radio'
            name='priority'
            id='priority-1'
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            type='radio'
            name='priority'
            id='priority-2'
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            type='radio'
            name='priority'
            id='priority-3'
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            type='radio'
            name='priority'
            id='priority-4'
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            type='radio'
            name='priority'
            id='priority-5'
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>

        <label>Progress</label>
        <input
          className='appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:w-[25px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500'
          type='range'
          id='progress'
          name='progress'
          value={formData.progress}
          min='0'
          max='100'
          onChange={handleChange}
        />

        <label>Status</label>
        <select name='status' value={formData.status} onChange={handleChange}>
          <option value='not started'>Not Started</option>
          <option value='started'>Started</option>
          <option value='done'>Done</option>
        </select>

        <div className='flex justify-center mt-2 mb-5'>
          <input
            type='submit'
            className='btn max-w-xs'
            value={EDITMODE ? 'Update Ticket' : 'Create Ticket..'}
          />
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
