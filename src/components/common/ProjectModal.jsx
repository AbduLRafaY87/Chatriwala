import React, { useState } from 'react';
import './ProjectModal.css';

const phoneLimits = {
    '+1': 10, '+44': 10, '+61': 9, '+81': 10, '+49': 11, '+33': 9, '+39': 10,
    '+86': 11, '+971': 9, '+966': 9, '+880': 10, '+20': 10, '+234': 10, '+91': 10,
    '+92': 10, '+55': 10, '+34': 9, '+52': 10, '+62': 10, '+60': 10, '+63': 10,
    '+64': 8, '+65': 8, '+66': 9, '+82': 10, '+98': 10, '+972': 9, '+973': 8,
    '+974': 8, '+975': 8, '+976': 8, '+977': 10, '+212': 9, '+213': 9, '+216': 8,
    '+218': 9, '+220': 8, '+221': 8, '+222': 8, '+223': 8, '+224': 8, '+225': 8,
    '+226': 8, '+227': 8, '+228': 8, '+229': 8, '+230': 8, '+231': 8, '+232': 8,
    '+233': 8, '+235': 8, '+236': 8, '+237': 8, '+238': 8, '+239': 8, '+240': 8,
    '+241': 8, '+242': 8, '+243': 8, '+244': 8, '+245': 8, '+246': 8, '+247': 8,
    '+248': 8, '+249': 8, '+250': 8, '+251': 8, '+252': 8, '+253': 8, '+254': 8,
    '+255': 8, '+256': 8, '+257': 8, '+258': 8, '+260': 8, '+261': 8, '+262': 8,
    '+263': 8, '+264': 8, '+265': 8, '+266': 8, '+267': 8, '+268': 8, '+269': 8,
    '+290': 8, '+291': 8, '+297': 8, '+298': 8, '+299': 8,
};

export default function ProjectModal({ isOpen, onClose }) {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        countryCode: '+92',
        service: '',
        budget: '',
        message: '',
        hearedFrom: '',
        agree: false,
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.agree) {
            alert('Please accept the Privacy Policy to continue.');
            return;
        }

        setStatus('SUBMITTING');

        const payload = {
            fullName: form.fullName,
            email: form.email,
            phone: `${form.countryCode}${form.phone}`,
            service: form.service,
            budget: form.budget,
            message: form.message,
            hearedFrom: form.hearedFrom,
        };

        try {
            const res = await fetch('https://formspree.io/f/xpwdjlwq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (data.ok) {
                setStatus('SUCCESS');
                alert('Thanks! Your message was sent.');
                setForm({
                    fullName: '',
                    email: '',
                    phone: '',
                    countryCode: '+92',
                    service: '',
                    budget: '',
                    message: '',
                    hearedFrom: '',
                    agree: false,
                });
                onClose();
                setStatus(null);
            } else {
                setStatus('ERROR');
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            setStatus('ERROR');
            alert('Something went wrong. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
                    &times;
                </button>
                
                <div className="modal-header">
                    <p className="modal-eyebrow">// let's build</p>
                    <h2 className="modal-title">Kickstart Your Project</h2>
                    <p className="modal-sub">We're here to turn your ideas into reality. Let's create something amazing together!</p>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" required />
                        </div>
                    </div>
                    
                    <div className="form-row phone-row">
                        <div className="form-group">
                            <select name="countryCode" value={form.countryCode} onChange={handleChange} required>
                                {Object.keys(phoneLimits).map(code => (
                                    <option key={code} value={code}>{code}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group phone-input">
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <select name="service" value={form.service} onChange={handleChange} required>
                                <option value="" disabled>-- Please select a service --</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile App">Mobile App</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select name="budget" value={form.budget} onChange={handleChange} required>
                                <option value="" disabled>-- Select Budget --</option>
                                <option value="< $1k">&lt; $1,000</option>
                                <option value="$1k - $5k">$1,000 - $5,000</option>
                                <option value="$5k - $10k">$5,000 - $10,000</option>
                                <option value="> $10k">&gt; $10,000</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <select name="hearedFrom" value={form.hearedFrom} onChange={handleChange} required>
                            <option value="" disabled>How did you hear about us?</option>
                            <option value="Google">Google</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Friend/Colleague">Friend/Colleague</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <textarea 
                            name="message" 
                            value={form.message} 
                            onChange={handleChange} 
                            placeholder="Describe your project, goals, timeline, and any specific features or services you need..." 
                            required 
                            rows="4"
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
                            I accept the <a href="#">Privacy Policy</a>
                        </label>
                    </div>

                    <button type="submit" className="modal-submit-btn" disabled={status === 'SUBMITTING'}>
                        {status === 'SUBMITTING' ? 'Sending...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}
