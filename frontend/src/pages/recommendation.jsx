import React, { useEffect, useState } from 'react';
import { MessageSquare, User, Briefcase, Send, Loader2, Mail, Building } from 'lucide-react';
import './recommendation.css';
import './Pages.css';
import Footer from '../components/Footer';

export default function Recommendations() {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    email: '',
    company:'',
  });

  // Target your local Django API port
  const API_URL = 'https://fkk18mk5-8000.inc1.devtunnels.ms/api/recommendations/';

  // 1. GET Request: Fetch recommendations from Django
  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setRecs(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  // 2. POST Request: Send new recommendation to Django
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Submitting...');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('Thank you! Your recommendation was added.');
        setFormData({ name: '', designation: '', company: '', description: '', email: '' }); // Clear form
        fetchRecommendations(); // Refresh list automatically
      } else {
        setSubmitStatus('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('Server connection error.');
    }
  };

  return (
    <>
      <div className="page-container recommendations-page">
        <div className="page-header">
          <h2><MessageSquare className="title-icon" /> Peer Recommendations</h2>
          <p>What colleagues, managers, and clients say about working with me.</p>
        </div>

        <div className="recommendations-layout">
          {/* Display List Column */}
          <div className="recs-display-section">
            <h3>Recent Recommendations</h3>
            
            {loading ? (
              <div className="loading-state">
                <Loader2 className="spinner" />
                <p>Fetching data from Django API...</p>
              </div>
            ) : recs.length === 0 ? (
              <p className="empty-state">No recommendations yet. Be the first to add one below!</p>
            ) : (
              <div className="recs-grid">
                {recs.map((rec) => (
                  <div key={rec.id} className="glass-card rec-card">
                    <p className="rec-text">"{rec.description}"</p>
                    <div className="rec-author">
                      <div className="author-avatar">
                        {rec.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4>{rec.name}</h4>
                        <p className="author-title">{rec.designation} - {rec.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input Form Column */}
          <div className="recs-form-section">
            <div className="glass-card form-wrapper">
              <h3>Leave a Recommendation</h3>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <User className="input-icon" />
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <Building className="input-icon" />
                  <input
                    type="text"
                    placeholder="Your Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <Briefcase className="input-icon" />
                  <input
                    type="text"
                    placeholder="Designation (e.g., Senior Dev at Company)"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group textarea-group">
                  <textarea
                    placeholder="Your recommendation text..."
                    rows="6"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <Send size={16} /> Submit
                </button>

                {submitStatus && <p className="form-status">{submitStatus}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}