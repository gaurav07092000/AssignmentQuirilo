import React, { useState } from 'react';
import axios from 'axios';

const AddSitePage = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validation here
        if (!name || !url || !category) {
            alert('Please fill in all fields');
            return;
        }
        // Submit the form
        try {
            const response = await axios.post('http://localhost:5000/api/add-site', {
                name,
                url,
                category,
                status: 'Pending' // Initial status set to "Pending"
            });
            console.log('Submitted:', response.data);
            alert('uploaded Successfully !')
            // Reset the form
            setName('');
            setUrl('');
            setCategory('');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Add Site</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="url" className="form-label">URL</label>
                    <input
                        type="url"
                        className="form-control"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select category</option>
                        <option value="Adult">Adult</option>
                        <option value="Mainstream">Mainstream</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AddSitePage;
