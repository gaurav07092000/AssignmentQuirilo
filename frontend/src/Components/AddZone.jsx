import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddZonePage = () => {
    const [sites, setSites] = useState([]);
    const [selectedSite, setSelectedSite] = useState('');
    const [type, setType] = useState('');
    const [CPC, setCPC] = useState('');

    useEffect(() => {
        fetchSites();
    }, []);

    const fetchSites = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/all-sites');
            setSites(response.data);
        } catch (error) {
            console.error('Failed to fetch sites:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/add-zone/${selectedSite}`, { type, CPC });
            const newZone = response.data;
            setSites([...sites, newZone]);
            alert('Zone added successfully!');
            setType('');
            setCPC('');
            window.location.reload();
        } catch (error) {
            console.error('Failed to add zone:', error);
            alert('Failed to add zone. Please try again.');
        }
    };

    return (
        <div>
            <h1>Add Zone</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="siteSelect">Select an approved site:</label>
                <select id="siteSelect" onChange={(e) => setSelectedSite(e.target.value)}>
                    <option value="">Select a site</option>
                    {sites.filter(site => site.status === 'Approved').map(site => (
                        <option key={site._id} value={site._id}>
                            {site.name} - {site.url}
                        </option>
                    ))}
                </select>
                <label htmlFor="type">Type:</label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="Direct Link">Direct Link</option>
                    <option value="Banner">Banner</option>
                    <option value="PopUnder">PopUnder</option>
                </select>
                <label htmlFor="CPC">CPC:</label>
                <input type="number" id="CPC" value={CPC} onChange={(e) => setCPC(e.target.value)} />
                <button type="submit">Submit</button>
            </form>

            <h2>All Sites</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Serial No</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tracking Code</th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map((site, index) => (
                        <tr key={site._id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{site._id}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{site.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{site.status}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{site.status === 'Approved' && site.zones.length > 0 ? site.zones[0].type : site.status}</td>
                           <td style={{ border: '1px solid #ddd', padding: '8px' }}>{site.status === 'Approved' && site.zones.length > 0 ? (<a href={site.zones[0].trackingCode}>{site.zones[0].trackingCode}</a>) : ('N/A')}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddZonePage;


