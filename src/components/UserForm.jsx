import React from 'react';

function validate({ firstName, lastName, email, department }) {
  const errors = {};
  if (!firstName?.trim()) errors.firstName = 'First name is required';
  if (!lastName?.trim()) errors.lastName = 'Last name is required';
  if (!email?.trim()) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
  if (!department?.trim()) errors.department = 'Department is required';
  return errors;
}

export default function UserForm({ initial = null, onClose = () => {}, onSave = () => {} }) {
  const [firstName, setFirstName] = React.useState(initial ? (initial.name?.split(' ')[0] || '') : '');
  const [lastName, setLastName] = React.useState(initial ? (initial.name?.split(' ').slice(1).join(' ') || '') : '');
  const [email, setEmail] = React.useState(initial?.email || '');
  const [department, setDepartment] = React.useState(initial?.company?.name || '');
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    setErrors({});
  }, [firstName, lastName, email, department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { firstName, lastName, email, department };
    const v = validate(payload);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setSubmitting(true);
    try {
      const userPayload = {
        name: `${firstName} ${lastName}`.trim(),
        email,
        company: { name: department }
      };

      // Pass the ID if editing, null if adding
      await onSave(userPayload, initial?.id || null);
      onClose();
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Failed to save user' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{initial ? 'Edit User' : 'Add User'}</h3>
          <button type="button" onClick={onClose} className="text-gray-500">✕</button>
        </div>

        {errors.form && <div className="text-red-500 mb-2">{errors.form}</div>}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">First Name</label>
            <input value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full border rounded px-3 py-2" />
            {errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
          </div>
          <div>
            <label className="block text-sm">Last Name</label>
            <input value={lastName} onChange={e => setLastName(e.target.value)} className="w-full border rounded px-3 py-2" />
            {errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
          </div>
          <div className="col-span-2">
            <label className="block text-sm">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div className="col-span-2">
            <label className="block text-sm">Department</label>
            <input value={department} onChange={e => setDepartment(e.target.value)} className="w-full border rounded px-3 py-2" />
            {errors.department && <div className="text-red-500 text-sm">{errors.department}</div>}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded">
            {submitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
