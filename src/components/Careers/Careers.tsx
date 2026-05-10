import React, { useState } from "react";

// Job/Internship type definition
interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

// Form data interface
interface FormData {
  // Personal Information
  fullName: string;
  cnic: string;
  dateOfBirth: string;
  gender: string;
  fatherName: string;
  phoneNumber: string;
  alternatePhone: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
  city: string;
  province: string;

  // Professional Information
  positionId: string;
  positionTitle: string;
  experience: string;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  isCurrentlyEmployed: string;

  // Education
  highestDegree: string;
  university: string;
  yearOfCompletion: string;
  cgpa: string;

  // Skills & Certifications
  technicalSkills: string;
  certifications: string;
  languagesSpoken: string;

  // References
  referenceName: string;
  referenceContact: string;
  referenceRelation: string;

  // Additional
  linkedinProfile: string;
  portfolioUrl: string;
  hearAboutUs: string;
  additionalInfo: string;

  // Declaration
  declaration: boolean;
  timestamp: string;
  status: string;
}

const positions: Position[] = [
  {
    id: "pos-1",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "NASTP, Pakistan",
    type: "Full-time, On-Site",
    description: "React, Next.js, Tailwind. Join our engineering team at NASTP to build cutting-edge web applications.",
  },
];

// IMPORTANT: Replace this URL with your deployed Google Apps Script URL
const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbx-jQckKH2mPOTX8W_8D2ZNv8kAzMFUr5LgtDQXMZnH9HNbNOlSNxukuOL1R_ZUUnfKmQ/exec';

const Careers: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    cnic: "",
    dateOfBirth: "",
    gender: "",
    fatherName: "",
    phoneNumber: "",
    alternatePhone: "",
    email: "",
    currentAddress: "",
    permanentAddress: "",
    city: "",
    province: "Punjab",
    positionId: "",
    positionTitle: "",
    experience: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    isCurrentlyEmployed: "",
    highestDegree: "",
    university: "",
    yearOfCompletion: "",
    cgpa: "",
    technicalSkills: "",
    certifications: "",
    languagesSpoken: "",
    referenceName: "",
    referenceContact: "",
    referenceRelation: "",
    linkedinProfile: "",
    portfolioUrl: "",
    hearAboutUs: "",
    additionalInfo: "",
    declaration: false,
    timestamp: new Date().toISOString(),
    status: "pending",
  });

  const handleApply = (position: Position) => {
    setSelectedPosition(position);
    setFormData(prev => ({
      ...prev,
      positionId: position.id,
      positionTitle: position.title,
    }));
    setShowForm(true);
    setSubmitStatus(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.cnic || !formData.email || !formData.phoneNumber) {
      setSubmitStatus({ type: 'error', message: 'Please fill all required fields (*)' });
      return;
    }

    if (!formData.declaration) {
      setSubmitStatus({ type: 'error', message: 'Please accept the declaration' });
      return;
    }

    // CNIC validation
    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
    if (!cnicRegex.test(formData.cnic)) {
      setSubmitStatus({ type: 'error', message: 'Please enter valid CNIC format (XXXXX-XXXXXXX-X)' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter valid email address' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create URLSearchParams for proper form encoding
      const submitData = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, String(value));
      });

      // Submit to Google Sheets with CORS mode
      const response = await fetch(GOOGLE_SHEETS_API, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submitData,
      });

      let result;
      try {
        result = await response.json();
      } catch {
        result = { success: response.ok };
      }

      if (response.ok && result.success !== false) {
        setSubmitStatus({
          type: 'success',
          message: `Application submitted successfully for ${selectedPosition?.title}! We will contact you within 5-7 business days.`
        });

        // Reset form after 3 seconds
        setTimeout(() => {
          setShowForm(false);
          setSelectedPosition(null);
          setSubmitStatus(null);
          // Reset form data
          setFormData({
            fullName: "",
            cnic: "",
            dateOfBirth: "",
            gender: "",
            fatherName: "",
            phoneNumber: "",
            alternatePhone: "",
            email: "",
            currentAddress: "",
            permanentAddress: "",
            city: "",
            province: "Punjab",
            positionId: "",
            positionTitle: "",
            experience: "",
            currentSalary: "",
            expectedSalary: "",
            noticePeriod: "",
            isCurrentlyEmployed: "",
            highestDegree: "",
            university: "",
            yearOfCompletion: "",
            cgpa: "",
            technicalSkills: "",
            certifications: "",
            languagesSpoken: "",
            referenceName: "",
            referenceContact: "",
            referenceRelation: "",
            linkedinProfile: "",
            portfolioUrl: "",
            hearAboutUs: "",
            additionalInfo: "",
            declaration: false,
            timestamp: new Date().toISOString(),
            status: "pending",
          });
        }, 3000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Error submitting application. Please try again or email us directly at careers@yunipakistan.com' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="careers-section">
      <div className="careers-container">
        {/* Header */}
        <h2 className="careers-heading">
          Join The <span className="careers-heading-highlight">Movement.</span>
        </h2>
        <p className="careers-subtitle">
          We are looking for disruptors to join our HQ at NASTP.
        </p>

        {/* Positions List */}
        <div className="positions-list">
          {positions.map((position) => (
            <div key={position.id} className="position-panel">
              <div className="position-info">
                <h3 className="position-title">{position.title}</h3>
                <p className="position-description">{position.description}</p>
              </div>
              <button
                onClick={() => handleApply(position)}
                className="apply-button"
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        {/* Application Form Modal */}
        {showForm && selectedPosition && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>

              <h2 className="form-title">Application for {selectedPosition.title}</h2>

              {submitStatus && (
                <div className={`status-message ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="application-form">
                {/* Personal Information Section */}
                <div className="form-section">
                  <h3>Personal Information</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Full Name *</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                    </div>

                    <div className="form-field">
                      <label>CNIC (XXXXX-XXXXXXX-X) *</label>
                      <input type="text" name="cnic" placeholder="12345-1234567-1" value={formData.cnic} onChange={handleInputChange} required />
                    </div>

                    <div className="form-field">
                      <label>Father's Name *</label>
                      <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
                    </div>

                    <div className="form-field">
                      <label>Date of Birth *</label>
                      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
                    </div>

                    <div className="form-field">
                      <label>Gender *</label>
                      <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>Phone Number *</label>
                      <input type="tel" name="phoneNumber" placeholder="03XXXXXXXXX" value={formData.phoneNumber} onChange={handleInputChange} required />
                    </div>

                    <div className="form-field">
                      <label>Alternate Phone</label>
                      <input type="tel" name="alternatePhone" value={formData.alternatePhone} onChange={handleInputChange} />
                    </div>

                    <div className="form-field">
                      <label>Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    </div>

                    <div className="form-field">
                      <label>City *</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
                    </div>

                    <div className="form-field">
                      <label>Province *</label>
                      <select name="province" value={formData.province} onChange={handleInputChange} required>
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                        <option value="Azad Kashmir">Azad Kashmir</option>
                      </select>
                    </div>

                    <div className="form-field full-width">
                      <label>Current Address *</label>
                      <textarea name="currentAddress" rows={2} value={formData.currentAddress} onChange={handleInputChange} required></textarea>
                    </div>

                    <div className="form-field full-width">
                      <label>Permanent Address</label>
                      <textarea name="permanentAddress" rows={2} value={formData.permanentAddress} onChange={handleInputChange} placeholder="If different from current address"></textarea>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="form-section">
                  <h3>Professional Information</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Years of Experience *</label>
                      <select name="experience" value={formData.experience} onChange={handleInputChange} required>
                        <option value="">Select</option>
                        <option value="Fresher">Fresher (No experience)</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="6-8 years">6-8 years</option>
                        <option value="9+ years">9+ years</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>Are you currently employed?</label>
                      <select name="isCurrentlyEmployed" value={formData.isCurrentlyEmployed} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>Current Salary (PKR/month)</label>
                      <input type="text" name="currentSalary" placeholder="e.g., 100,000" value={formData.currentSalary} onChange={handleInputChange} />
                    </div>

                    <div className="form-field">
                      <label>Expected Salary (PKR/month) *</label>
                      <input type="text" name="expectedSalary" placeholder="e.g., 150,000" value={formData.expectedSalary} onChange={handleInputChange} required />
                    </div>

                    <div className="form-field">
                      <label>Notice Period *</label>
                      <select name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange} required>
                        <option value="">Select</option>
                        <option value="Immediate">Immediate</option>
                        <option value="15 days">15 days</option>
                        <option value="1 month">1 month</option>
                        <option value="2 months">2 months</option>
                        <option value="3 months">3 months</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="form-section">
                  <h3>Education</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Highest Degree *</label>
                      <select name="highestDegree" value={formData.highestDegree} onChange={handleInputChange} required>
                        <option value="">Select</option>
                        <option value="Matriculation">Matriculation</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Bachelor's">Bachelor's (14/16 years)</option>
                        <option value="Master's">Master's (16/18 years)</option>
                        <option value="MS/MPhil">MS/MPhil</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>University/Institute *</label>
                      <input type="text" name="university" value={formData.university} onChange={handleInputChange} required />
                    </div>

                    <div className="form-field">
                      <label>Year of Completion *</label>
                      <input type="text" name="yearOfCompletion" placeholder="YYYY" value={formData.yearOfCompletion} onChange={handleInputChange} required />
                    </div>

                    <div className="form-field">
                      <label>CGPA/Percentage *</label>
                      <input type="text" name="cgpa" placeholder="3.5/4.0 or 85%" value={formData.cgpa} onChange={handleInputChange} required />
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="form-section">
                  <h3>Skills & Certifications</h3>
                  <div className="form-grid">
                    <div className="form-field full-width">
                      <label>Technical Skills * (comma-separated)</label>
                      <textarea name="technicalSkills" rows={3} placeholder="React, Next.js, TypeScript, Tailwind CSS, etc." value={formData.technicalSkills} onChange={handleInputChange} required></textarea>
                    </div>

                    <div className="form-field full-width">
                      <label>Certifications</label>
                      <textarea name="certifications" rows={2} placeholder="List any relevant certifications (e.g., AWS Certified, React Certification, etc.)" value={formData.certifications} onChange={handleInputChange}></textarea>
                    </div>

                    <div className="form-field full-width">
                      <label>Languages Spoken</label>
                      <input type="text" name="languagesSpoken" placeholder="Urdu (Native), English (Fluent), etc." value={formData.languagesSpoken} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>

                {/* Professional Links */}
                <div className="form-section">
                  <h3>Professional Links</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>LinkedIn Profile</label>
                      <input type="url" name="linkedinProfile" placeholder="https://linkedin.com/in/username" value={formData.linkedinProfile} onChange={handleInputChange} />
                    </div>

                    <div className="form-field">
                      <label>Portfolio/GitHub</label>
                      <input type="url" name="portfolioUrl" placeholder="https://github.com/username" value={formData.portfolioUrl} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>

                {/* References */}
                <div className="form-section">
                  <h3>Professional References</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Reference Name</label>
                      <input type="text" name="referenceName" placeholder="Full name of reference" value={formData.referenceName} onChange={handleInputChange} />
                    </div>

                    <div className="form-field">
                      <label>Reference Contact</label>
                      <input type="text" name="referenceContact" placeholder="Phone number or email" value={formData.referenceContact} onChange={handleInputChange} />
                    </div>

                    <div className="form-field">
                      <label>Reference Relation</label>
                      <input type="text" name="referenceRelation" placeholder="Former Employer/Colleague/Professor" value={formData.referenceRelation} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="form-section">
                  <h3>Additional Information</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>How did you hear about us?</label>
                      <select name="hearAboutUs" value={formData.hearAboutUs} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Indeed">Indeed</option>
                        <option value="Rozee.pk">Rozee.pk</option>
                        <option value="Company Website">Company Website</option>
                        <option value="Friend/Colleague">Friend/Colleague</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-field full-width">
                      <label>Additional Information (optional)</label>
                      <textarea name="additionalInfo" rows={3} placeholder="Any other relevant information you'd like to share (e.g., portfolio links, projects, achievements)" value={formData.additionalInfo} onChange={handleInputChange}></textarea>
                    </div>
                  </div>
                </div>

                {/* Declaration */}
                <div className="form-section">
                  <div className="declaration">
                    <label>
                      <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleInputChange} required />
                      I declare that all the information provided in this application is true and correct to the best of my knowledge. I understand that any false information may lead to disqualification or termination. I authorize YUNI Education to verify the information provided.
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bottom-cta">
          <h2>Don't see a perfect fit?</h2>
          <p>
            We're always looking for talented individuals. Send your resume to{" "}
            <a href="mailto:careers@yunipakistan.com">careers@yunipakistan.com</a>
          </p>
        </div>
      </div>

      <style>{`
        .careers-section {
          min-height: 100vh;
          background: var(--bg-primary);
          font-family: 'Space Grotesk', system-ui, sans-serif;
          color: var(--text-primary);
          padding-top: 10rem;
          padding-bottom: 8rem;
        }

        .careers-container {
          max-width: 56rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
        }

        .careers-heading {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 3rem;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        @media (min-width: 768px) {
          .careers-heading {
            font-size: 4rem;
          }
        }

        .careers-heading-highlight {
          color: var(--pk-green);
        }

        .careers-subtitle {
          color: var(--text-secondary);
          margin-bottom: 4rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
        }

        .positions-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .position-panel {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border-radius: 1.5rem;
          padding: 2rem;
          text-align: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid var(--glass-border);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
          .position-panel {
            flex-direction: column;
            text-align: center;
            padding: 1.75rem;
          }
          
          .position-info {
            margin-right: 0;
            margin-bottom: 1.25rem;
          }
        }

        .position-panel:hover {
          transform: translateY(-4px);
          border-color: var(--pk-green);
          box-shadow: 0 12px 40px rgba(17, 140, 79, 0.15);
        }

        .position-info {
          flex: 1;
          margin-right: 2rem;
        }

        .position-title {
          font-weight: 800;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .position-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .apply-button {
          background: var(--pk-green);
          color: #ffffff;
          font-weight: 800;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          border: none;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          white-space: nowrap;
          flex-shrink: 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 15px var(--pk-green-glow);
        }

        .apply-button:hover {
          background: var(--pk-green-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px var(--pk-green-glow);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
          overflow-y: auto;
        }

        .modal-content {
          background: var(--bg-primary);
          border-radius: 2rem;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          border: 1px solid var(--border-light);
          padding: 2.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .modal-content {
            padding: 1.5rem;
          }
        }

        .modal-close {
          position: sticky;
          top: 0;
          float: right;
          font-size: 2rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-weight: bold;
          transition: color 0.2s;
          z-index: 1;
        }

        .modal-close:hover {
          color: var(--pk-green);
        }

        .form-title {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 2rem;
          color: var(--text-primary);
          text-align: center;
          clear: both;
        }

        .status-message {
          padding: 1rem;
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
          text-align: center;
          font-weight: 600;
        }

        .status-message.success {
          background: rgba(17, 140, 79, 0.1);
          border: 1px solid var(--pk-green);
          color: var(--pk-green);
        }

        .status-message.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          color: #ef4444;
        }

        .application-form {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .form-section {
          background: var(--bg-secondary);
          border-radius: 1.25rem;
          padding: 2rem;
          border: 1px solid var(--border-light);
        }

        .form-section h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--pk-green);
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-field.full-width {
          grid-column: span 1;
        }

        @media (min-width: 768px) {
          .form-field.full-width {
            grid-column: span 2;
          }
        }

        .form-field label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-field input,
        .form-field select,
        .form-field textarea {
          background: var(--bg-tertiary);
          border: 1.5px solid var(--border-light);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: var(--pk-green);
          box-shadow: 0 0 0 3px rgba(17, 140, 79, 0.15);
          background: var(--bg-primary);
        }

        .form-field input::placeholder,
        .form-field textarea::placeholder {
          color: var(--text-tertiary);
        }

        .declaration {
          padding: 1.5rem;
          background: rgba(17, 140, 79, 0.05);
          border-radius: 1rem;
          border: 1px solid rgba(17, 140, 79, 0.2);
        }

        .declaration label {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          cursor: pointer;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .declaration input[type="checkbox"] {
          width: 1.25rem;
          height: 1.25rem;
          cursor: pointer;
          margin-top: 0.1rem;
          flex-shrink: 0;
          accent-color: var(--pk-green);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1rem;
        }

        .cancel-btn {
          background: transparent;
          color: var(--text-primary);
          border: 1.5px solid var(--border-light);
          padding: 0.875rem 2rem;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .cancel-btn:hover {
          background: var(--bg-tertiary);
        }

        .submit-btn {
          background: var(--pk-green);
          color: #ffffff;
          border: none;
          padding: 0.875rem 2.5rem;
          border-radius: 9999px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 15px var(--pk-green-glow);
        }

        .submit-btn:hover:not(:disabled) {
          background: var(--pk-green-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px var(--pk-green-glow);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .bottom-cta {
          margin-top: 4rem;
          padding: 3rem;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border-radius: 1.5rem;
          border: 1px solid var(--glass-border);
          text-align: center;
        }

        .bottom-cta h2 {
          color: var(--text-primary);
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .bottom-cta p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .bottom-cta a {
          color: var(--pk-green);
          text-decoration: none;
          font-weight: 700;
          transition: color 0.2s ease;
        }

        .bottom-cta a:hover {
          color: var(--pk-green-light);
          text-decoration: underline;
        }

        /* Scrollbar Styling */
        .modal-content::-webkit-scrollbar {
          width: 8px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: var(--bg-secondary);
          border-radius: 4px;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: var(--pk-green);
          border-radius: 4px;
        }

        .modal-content::-webkit-scrollbar-thumb:hover {
          background: var(--pk-green-light);
        }
      `}</style>
    </section>
  );
};

export default Careers;