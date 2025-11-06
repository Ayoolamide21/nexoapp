import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { fetchUserData, updateUserProfile } from "/src/api/authApi";
import { toast } from "react-toastify";
import countries from "/src/data/countries.json";

const occupations = ['Employed', 'Self-employed', 'Unemployed', 'Student'];
const fundsSources = ['Salary', 'Investments', 'Business income', 'Other'];
const cryptoSources = ['Exchange', 'Mining', 'Staking', 'Other'];
const industries = ['Finance', 'Tech', 'Retail', 'Other'];
const wealthRanges = ['< $10,000', '$10,000 - $50,000', '$50,000 - $100,000', '> $100,000'];
const countryData = countries.country;

const seenCodes = new Set();
const countryOptions = Object.values(countryData)
  .map(country => {
    const code = country.info?.alpha2 || country.alpha2;
    const name = country.info?.shortName || country.name || country.shortName;
    if (!code || seenCodes.has(code)) return null;
    seenCodes.add(code);
    return { code, name };
  })
  .filter(Boolean);


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    country: '',
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    postal_code: '',
    employment_status: '',
    source_of_funds: '',
    source_of_crypto: '',
    industry: '',
    total_wealth: '',
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);

        const profile = userData.profile || {};
        setFormData({
          country: profile.country || '',
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          address: profile.address || '',
          city: profile.city || '',
          postal_code: profile.postal_code || '',
          employment_status: profile.employment_status || '',
          source_of_funds: profile.source_of_funds || '',
          source_of_crypto: profile.source_of_crypto || '',
          industry: profile.industry || '',
          total_wealth: profile.total_wealth || '',
        });
      } catch {
         // silently ignore errors
  }
    };
    loadUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(formData);
      toast.success("Profile updated successfully!");
    } catch  {
      toast.error("Failed to update profile.");
    }
  };

  if (!user) return <div className="text-center mt-10">Loading user profile...</div>;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        {/* Avatar Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700">
            {user.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xl font-semibold">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Info Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <SummaryBox label="Loyalty Points" value={user.loyalty_points ?? 0} />
          <SummaryBox label="Balance" value={`$${Number(user.balance).toFixed(2)}`} />
          <SummaryBox label="Total Earnings" value={`$${Number(user.total_earnings || 0).toFixed(2)}`} />
          <SummaryBox label="Total Deposit" value={`$${Number(user.total_deposit || 0).toFixed(2)}`} />
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Country */}
          <div>
            <label className="block text-sm font-medium mb-2">Residential Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select a country</option>
              {countryOptions.map(({ code, name }) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          {/* Name & Address */}
          <FormSection title="Legal Name & Address">
            <Input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
            <Input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
            <Input name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} className="col-span-full" />
            <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            <Input name="postal_code" placeholder="Postal Code" value={formData.postal_code} onChange={handleChange} />
          </FormSection>

          {/* Regulatory Info */}
          <FormSection title="Regulatory Information">
            <Select name="employment_status" value={formData.employment_status} onChange={handleChange} options={occupations} label="Employment Status" />
            <Select name="source_of_funds" value={formData.source_of_funds} onChange={handleChange} options={fundsSources} label="Source of Funds" />
            <Select name="source_of_crypto" value={formData.source_of_crypto} onChange={handleChange} options={cryptoSources} label="Source of Crypto" />
            <Select name="industry" value={formData.industry} onChange={handleChange} options={industries} label="Industry" />
            <Select name="total_wealth" value={formData.total_wealth} onChange={handleChange} options={wealthRanges} label="Estimated Total Wealth" full />
          </FormSection>

          {/* Submit */}
          <div className="text-right">
            <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
              Submit →
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-400 mt-6 text-center">
          Your data is encrypted and securely stored on our system.
        </p>
      </div>
    </>
  );
};

export default UserProfile;

/** ✅ Reusable Helper Components */

const SummaryBox = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-md">
    <p className="text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const Input = ({ name, placeholder, value, onChange, className = "" }) => (
  <input
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border px-3 py-2 rounded ${className}`}
  />
);

const Select = ({ name, value, onChange, options, label, full = false }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className={`border px-3 py-2 rounded ${full ? "col-span-full" : ""}`}
  >
    <option value="">{label}</option>
    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
  </select>
);

const FormSection = ({ title, children }) => (
  <div>
    <h3 className="font-medium mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);
